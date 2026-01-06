import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router';
import api from '../lib/axios';
import { ArrowLeftIcon, LoaderIcon, TrashIcon } from 'lucide-react';
import toast from 'react-hot-toast';
import Note from '../../../backend/src/models/Note';

const NoteDetailPage = () => {

    const [note, setNote] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const navigate = useNavigate();

    const {id} = useParams(); // id follows the convention in the browser router

    console.log({id}) // see the id


    useEffect(() => {
        const fetchNote = async() => {
             try{
                const res = await api.get(`/notes/${id}`); // pass in id from use params
                setNote(res.data); // pass in the res data to the particular note
            }
            catch(error) {
                console.error("Error retrieving note details", error);
                toast.error("Failed to fetch the note");
            }
            finally {
                setLoading(false);                
            }
        }

        fetchNote(); // call the fetch note
       
    },[id]);

    const handleDelete = async () => {

        if (!window.confirm("Are you sure you want to delete this note?")) return; // return out of function if they say no

        // if say yes
        try {
            await api.delete(`/notes/${id}`); // send to the delete api
            // update UI ASAP
            // setNotes((prev) => prev.filter((note) => note._id !== id)); // the one that matches will return false, effectively deleting it from the array
            toast.success("Note deleted successfully");
            navigate("/");
        } catch (error) {
            console.log("Error in deleting the note", error);
            toast.error("Failed to delete note");
        }
    };

    const handleSave = async () => {

        if(!note.title.trim() || !note.content.trim()) {
            toast.error("Please add a title or content");
            return;
        }

        setSaving(true);
        
        try{
            // update to that page
            await api.put(`/notes/${id}`, note) // send u[dated note]
            
            toast.success("Note updated successfully!")
            navigate("/") // navigate back to notes page
        } 
        catch(error) {  
            console.error("Error saving the note", error);
            toast.error("Failed to save the note");
        }
        finally {
            setLoading(false);
            setSaving(false);
        }
    }
    

    if(loading) {
        return (
            <div className="min-h-screen bg-base-200 flex items-center justify-center">
                <LoaderIcon className="animate-spin size-10"/>
            </div>
        )
    }

    return(
        <div className="min-h-screen bg-base-200">
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-2xl mx-auto">
                    <div className="flex items-center justify-between mb-6">
                        <Link to="/" className="btn btn-ghost">
                            <ArrowLeftIcon className="h-5 w-5"/>
                            Back to Notes
                        </Link>

                        <button onClick={handleDelete} className="btn btn-error btn-outline">
                            <TrashIcon className="h-5 w5"/>
                            Delete Note
                        </button>
                    </div>

                    <div className="card bg-base-100">
                        <div className="card-body">
                            <div className="form-control mb-4">
                                <label className="label">
                                    <span className="label-text">
                                        Title
                                    </span>
                                </label>
                                <input 
                                    type="text" 
                                    placeholder="Note title"
                                    className="input input-bordered"
                                    value={note.title}
                                    onChange={(e) => setNote({ ...note, title: e.target.value })} // only update title
                                />
                            </div>
                            <div className="form-control mb-4">
                                <label className="label">
                                <span className="label-text">Content</span>
                                </label>
                                <textarea
                                placeholder="Write your note here..."
                                className="textarea textarea-bordered h-32"
                                value={note.content}
                                onChange={(e) => setNote({ ...note, content: e.target.value })}
                                />
                            </div>

                            <div className="card-actions justify-end">
                                <button className="btn btn-primary" disabled={saving} onClick={handleSave}>
                                    {saving ? "Saving...": "Save Changes"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NoteDetailPage