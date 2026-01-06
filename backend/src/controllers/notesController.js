import Note from "../models/Note.js";

export async function getAllNotes (_,res) {
    try {
        const notes = await Note.find().sort({createdAt: -1}); // -1 will sort in desc. order (newest first)
        return res.status(200).json(notes); // return back the array of json notes
    }
    catch(error) {
        console.error("Error in retrieving all Notes controller", error);
        return res.status(500).json({message: "Internal Server Error"});
    }
}

export async function getNoteById(req, res) {
    try {
        const note = await Note.findById(req.params.id);

        if (!note) {
            return res.status(404).json({message: "Note not found!"});
        }
        res.status(200).json(note); //  return the normal 
    }
    catch(error) {
        console.error("Error in getNoteById controller", error);
        res.status(500).json({ message: "Internal Server Error"});
    }
}

export async function createNote (req,res) {

    try {
        const { title, content } = req.body; // destructrure the title and content from the body
        // Instantiate the note object
        const note = new Note({title, content}); // key and value is same

        const savedNote = await note.save() // save into the database
        // Helps the user see the content of the created note
        res.status(201).json(savedNote)
    }
    catch(error) {
        console.error("Error in createNotes controller", error);
        res.status(500).json({message: "Internal Server Error"});

    }
}

export async function updateNote (req,res) {

    try {

          // update a specific note
        const id = req.params.id;

        const { title, content } = req.body;

        const updatedNote =  await Note.findByIdAndUpdate(id, {title, content}, {new: true});

        // if id inputed not found return this messages
        if(!updatedNote) {
            return res.status(404).json({message: "Note not found"});
        }
      
        res.status(200).json({updatedNote});
    }
    catch(error)
    {
        console.error("Error in updateNote controller", error);
        res.status(500).json({message: "Internal Server Error"});
    }
    
}

export async function deleteNote (req,res) {

    try{
        const id = req.params.id;
        // delete the note
        const deletedNote = await Note.findByIdAndDelete(id); // delete tge specific note;

        if (!deletedNote) {
            return res.status(404).json({ message: "Note not found!"});
        }
        // delete a specific note successfully
        res.status(200).json({message: "Note deleted successfully!"});
    }
    catch(error) {
        console.error("Error in deleteNote controller", error);
        res.status(500).json({message: "Internal Server Error"});
    }
    
}