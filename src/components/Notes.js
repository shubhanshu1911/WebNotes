import React, { useContext, useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import noteContext from "../context/notes/noteContext";
import NoteItem from "./NoteItem";
import AddNote from "./AddNote";

const Notes = (props) => {
    const context = useContext(noteContext);
    let navigate = useNavigate();
    const { notes, getNotes, editNote } = context;

    const [note, setNote] = useState({
        id: "",
        etitle: "",
        edescription: "",
    });

    useEffect(() => {
        if (localStorage.getItem('token')) {
            getNotes();
        } else {
            navigate("/login");
        }
        // eslint-disable-next-line
    }, []);

    const ref = useRef(null);
    const refClose = useRef(null);

    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({
            id: currentNote._id,
            etitle: currentNote.title,
            edescription: currentNote.description
        });
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setNote(prevNote => ({ ...prevNote, [name]: value }));
    }

    const handleClick = () => {
        editNote(note.id, note.etitle, note.edescription);
        refClose.current.click();
        props.showAlert("Updated Successfully", "success");
    }

    return (
        <div>
            <AddNote showAlert={props.showAlert} />

            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form className="create-note">
                                <input
                                    name="etitle"
                                    onChange={handleChange}
                                    value={note.etitle}
                                    placeholder="Title"
                                    minLength={5}
                                    required
                                />
                                <textarea
                                    name="edescription"
                                    onChange={handleChange}
                                    value={note.edescription}
                                    placeholder="Take a note..."
                                    minLength={5}
                                    required
                                />
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button
                                type="button"
                                className="btn btn-primary"
                                disabled={note.etitle.length < 5 || note.edescription.length < 5}
                                onClick={handleClick}
                            >
                                Update Note
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {notes.map((note) => (
                <NoteItem
                    key={note._id}
                    updateNote={updateNote}
                    note={note}
                    showAlert={props.showAlert}
                />
            ))}
        </div>
    );
}

export default Notes;
