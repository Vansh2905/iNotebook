import React, { useContext, useState } from "react";
import noteContext from "../Context/notes/noteContext";

const AddNote = () => {
  const { addNote } = useContext(noteContext);
  const [note, setNote] = useState({ title: "", desc: "", tag: "" });

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic frontend validation before hitting backend
    if (note.title.length < 3) {
      alert("Title must be at least 3 characters");
      return;
    }
    if (note.desc.length < 5) {
      alert("Description must be at least 5 characters");
      return;
    }

    addNote(note.title, note.desc, note.tag);
    setNote({ title: "", desc: "", tag: "" });
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <div className="container mx-auto max-w-lg mt-10 p-8 bg-gradient-to-br from-yellow-50 to-white rounded-3xl shadow-xl border border-yellow-100">
      <h1 className="text-3xl font-extrabold text-gray-800 mb-6 text-center flex items-center justify-center gap-2">
        Add a Note
      </h1>

      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* Title */}
        <div>
          <label htmlFor="title" className="block font-semibold text-gray-700 mb-2">
            Title
          </label>
          <input
            type="text"
            name="title"
            value={note.title}  
            className="w-full border border-gray-300 bg-white text-gray-900 p-3 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition"
            placeholder="Enter note title"
            required
            minLength={3}
            onChange={onChange}
          />
        </div>

        {/* Description */}
        <div>
          <label htmlFor="desc" className="block font-semibold text-gray-700 mb-2">
            Description
          </label>
          <textarea
            name="desc"
            value={note.desc}   
            className="w-full border border-gray-300 bg-white text-gray-900 p-3 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition"
            placeholder="Enter note description"
            rows="4"
            required
            minLength={5}
            onChange={onChange}
          />
        </div>
        {/*Tag*/}
         <div>
          <label htmlFor="tag" className="block font-semibold text-gray-700 mb-2">
            Tag
          </label>
          <input
            type="text"
            name="tag"
            value={note.tag} 
            className="w-full border border-gray-300 bg-white text-gray-900 p-3 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition"
            placeholder="Enter note tag"
            required
            minLength={3}
            onChange={onChange}
          />
        </div>

        {/* Submit */}
        <button
        disabled={note.title.length<3||note.desc.length<5}
          type="submit"
          className="w-full bg-yellow-400 text-gray-900 font-semibold py-3 rounded-xl shadow-md hover:bg-yellow-500 hover:shadow-lg active:scale-95 transition duration-200"
        >
          + Add Note
        </button>
      </form>
    </div>
  );
};

export default AddNote;
