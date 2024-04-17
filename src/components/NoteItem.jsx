import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';


const NoteItems = (props) => {
  const context = useContext(noteContext);
  const { deleteNote } = context;
  const { note, updateNote } = props
  return (
    <div className="note">
      <h1>{note.title}</h1>
      <p>{note.description}</p>
      <button onClick={() => {
          deleteNote(note._id);
          props.showAlert("Deleted Successfully", "success");
        }
      }>
        <DeleteIcon />
      </button>
      <button onClick={() => { 
          updateNote(note); 
        }
      }>
        <EditIcon />
      </button>
    </div>
  );
}

export default NoteItems;
