import express from "express"
import { getAllNotes, createNote, updateNote, deleteNote, getNoteById } from "../controllers/notesController.js";

// can define the route endpoints here
const router = express.Router();


router.get("/", getAllNotes);
// fetch a specific note
router.get("/:id", getNoteById);

router.post("/", createNote);

// https://localhost:5001//21 (think of id = 21)
router.put("/:id", updateNote);

router.delete("/:id", deleteNote);

export default router