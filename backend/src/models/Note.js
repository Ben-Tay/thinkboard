import mongoose from "mongoose";

// 1 - Create a schema
// 2 - Create a model based off that schema

const noteSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        content: {
            type: String,
            required: true
        },
    },
    {timestamps: true} // createdAt and updatedAt fields will be added with this
);

const Note = mongoose.model("Note", noteSchema) // create a Note Model based off this schema and follow it

export default Note