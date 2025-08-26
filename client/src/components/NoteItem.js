import React, { useContext } from "react";
import noteContext from "../Context/notes/noteContext";
const NoteItem = (props) => {
  const {DeleteNote}=useContext(noteContext);
  const {note,updateNote} = props;
  return (
    <div className="flex-auto border border-black p-5">
      <h3 className="text-xl font-bold">Title</h3>
      <p>{note.title}</p>
      <h3 className="text-xl font-bold">Description</h3>
      <p>{note.desc}</p>
     <button className=" mx-1 p-2"onClick={()=>{updateNote(note)}}>
        <span className="material-symbols-outlined">edit</span>
      </button>
      <button className=" mx-1 p-2"onClick={()=>{DeleteNote(note._id)}}>
        <span className="material-symbols-outlined">delete</span>
      </button>
    </div>
  );
};
export default NoteItem;
