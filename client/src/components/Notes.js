import React, { useContext, useEffect } from 'react';
import noteContext from '../Context/notes/noteContext';
import NoteItem from '../components/NoteItem';
import { useNavigate } from 'react-router-dom';

const Notes = () => {
  const { notes, GetNotes,EditNote} = useContext(noteContext);
  let navigate =useNavigate();
  useEffect(() => {
    if(localStorage.getItem('token'))
    {
    GetNotes();
    }
    else
    {
      navigate("/login");
    }
  }, []); 
const updateNote = (note) => {
  const newTitle = prompt("Enter new title:", note.title);
  const newDesc = prompt("Enter new description:", note.desc);
  const newTag=prompt("Enter the new Tag",note.tag);

  if (newTitle && newDesc && newTag) {
    EditNote(note._id, newTitle, newDesc,newTag);
  }
};
  return (
    <div className="mx-auto max-w-6xl mt-10 p-6">
      <h2 className="text-3xl font-bold text-gray-800 border-b-4 border-yellow-400 pb-2 mb-6">
        Your Notes
      </h2>

      {notes && notes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {notes.map((note) => (
            <div
              key={note._id}
              className="bg-white shadow-lg rounded-2xl p-4 hover:shadow-xl transition-shadow duration-300"
            >
              <NoteItem key={note._id} updateNote={updateNote} note={note} />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-10 bg-yellow-50 rounded-xl">
          <p className="text-gray-600 text-lg">No notes available. 📄</p>
        </div>
      )}
    </div>
  );
};
export default Notes;
