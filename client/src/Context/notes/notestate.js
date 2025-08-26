import noteContext from './noteContext';
import { useState } from 'react';

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const [notes, setNotes] = useState([]);

  // Fetch all notes
const GetNotes = async () => {
  const response = await fetch(`${host}/api/notes/fetchusernotes`, {
    method: 'GET',
    headers: {
      'Content-Type': "application/json",
      'auth-token': localStorage.getItem('token')
    },
  });
  const json = await response.json();
  console.log("Fetched notes:", json);
  setNotes(Array.isArray(json) ? json : json.notes || []);
};

  // Add a Note
  const addNote = async (title, desc, tag) => {
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',
      headers: {
        'Content-Type': "application/json",
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify({ title, desc, tag }) 
    });

    const data = await response.json();
    console.log("Added note:", data);

    // backend usually returns { note: savedNote }
    console.log("Current notes state:", notes);
   setNotes([...notes, data.note ? data.note : data]);
   alert("Notes Added successfully!!"); 
  };

  // Delete a Note
  const DeleteNote = async (id) => {
    await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': "application/json",
        'auth-token': localStorage.getItem('token')
      },
    });
    const newNotes = notes.filter((note) => note._id !== id);
    setNotes(newNotes);
    alert("Notes Deleted successfully!!");
  };

  // Edit a Note
  const EditNote = async (id, title, desc, tag) => {
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': "application/json",
        'auth-token': localStorage.getItem('token'),
      },
      body: JSON.stringify({ title, desc, tag })
    });

    const data = await response.json();
    console.log("Updated note:", data);

    // Update locally
    const newNotes = notes.map((note) =>
      note._id === id ? { ...note, title, desc, tag } : note
    );
    setNotes(newNotes);
  };

  return (
    <noteContext.Provider value={{ notes, addNote, DeleteNote, EditNote, GetNotes }}>
      {props.children}
    </noteContext.Provider>
  );
};

export default NoteState;
