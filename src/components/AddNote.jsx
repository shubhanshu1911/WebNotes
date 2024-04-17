
import React from "react";
import { useState } from 'react';
import { useContext } from 'react';
import AddIcon from '@mui/icons-material/Add';
import Zoom from '@mui/material/Zoom';
import Fab from '@mui/material/Fab';
import noteContext from "../context/notes/noteContext";


function AddNote(props) {
  const context = useContext(noteContext);
  const {addNote } = context;

  const [isExpanded, setExpand] = useState(false);

  const [note, setNote] = useState({
    title: "",
    description: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setNote((prevNote) => {
      return {
        ...prevNote,
        [name]: value,
      };
    });
  }

  function submitNote(event) {
    addNote(note.title, note.description, note.tag);
    setNote({
      title: "",
      description: "",
    });
    event.preventDefault();
    props.showAlert("Added Successfully", "success"); 

  }

  function expand() {
    setExpand(true);
  }
  return (
    <div>
      <form className="create-note">
        {isExpanded && (
          <input
            name="title" 
            onChange={handleChange}
            value={note.title}
            placeholder="Title"
            minLength={5}
            required
          />
        )}

        <textarea
          name="description"
          onClick={expand}
          onChange={handleChange}
          value={note.description}
          placeholder="Take a note..."
          rows={isExpanded ? 3 : 1}
          minLength={5}
          required
        />
        <Zoom in={isExpanded}>
          <Fab disabled = {note.title.length<5 || note.description.length<5} onClick={submitNote}>
            <AddIcon />
          </Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default AddNote;
