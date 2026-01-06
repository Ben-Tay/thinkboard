import {useEffect, useState} from "react"
import Navbar from "../components/Navbar";
import RateLimitedUI from "../components/RateLimitedUI";
import api from "../lib/axios";
import NoteCard from "../components/NoteCard";
import NotesNotFound from "../components/NotesNotFound";


const HomePage = () => {

    const [isRateLimited, setIsRateLimited] = useState(false);
    const [notes, setNotes] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchNotes = async() => {
            try{
                /* AJAX Approach
                const res = await fetch("http://localhost:5001/api/notes")
                const data = await res.json();
                console.log(data) */

                // AXIOS apparoch (no need res.json approach)
                const res = await api.get("/notes");
                console.log(res);
                setNotes(res.data) // parse the response array 
                setIsRateLimited(false);  // if able to get the data then it wont be true

            }
            catch(error) {
                console.log("Error retrieving notes");
                if(error.response?.status === 429) {
                  setIsRateLimited(true);
                } else {
                  toast.error("Failed to load notes")
                }
            } finally {
              setLoading(false);
            }
        }

        fetchNotes(); // call the ajax request
    },[])

    return (

        <div className="min-h-screen">
            <Navbar/>
            {isRateLimited && <RateLimitedUI/>}

            <div className="text-center text-primary py-10">
                {loading && <div>Loading notes...</div> }

                {notes.length === 0 && !isRateLimited && <NotesNotFound/>}

                {notes.length > 0 && !isRateLimited && (
                    
                    <div className="grid grid-cols 1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {notes.map((note) => {
                            return(
                                // component rerenders based on new mapped value of notes, useEffect is not ran again
                            <NoteCard key={note._id} note={note} setNotes={setNotes} />
                            )
                        })}
                    </div>
                )}
            </div>
        </div>
    )
  }

export default HomePage