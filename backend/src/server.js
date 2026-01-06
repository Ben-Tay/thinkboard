import express from "express"
import notesRoutes from "./routes/notesRoutes.js"
import { connectDb } from "./config/db.js";
import dotenv from "dotenv"
import rateLimiter from "./middleware/rateLimiter.js";
import cors from "cors";

// Allow env variables accessibility
dotenv.config();


const app = express();
const port = process.env.PORT || 5001

// What is an Endpoint?
// An endpoint is a combination of a URL + HTTP method that lets
// the client interact with a specific resource

// middleware to parse JSON bodies; gain access to req.body
app.use(express.json()); 

// our simple custom middleware
app.use((req, _, next) => {
    console.log(`Req method is ${req.method} & Req URL is ${req.url}`); // middleware that runs before the next function to return response is called
    next();
})


// Middleware to allow cors sharing for other domain to acess the API
app.use(cors({
    origin: "http://localhost:5173", // only allow the frontend to access
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));


// Use cases of middleware ==> authentication check/rate limiting (eg: control how often someone can do something on an website or app ==> page refresh, api request, login attempts)
// Check if user is authenticated before allowing them to create a post for example
// Eg of rate limit: 100 requests per user every 15mins [using upstash and redis[key-value store for noSQL]
app.use(rateLimiter);

// Use a router middleware to allow for synthetic sugar
app.use("/api/notes", notesRoutes)

// Connect to the DB first before listening on the port
connectDb().then(() => {
    app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
    })
})



