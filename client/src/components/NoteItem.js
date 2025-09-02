import React, { useContext, useState } from "react";
import noteContext from "../Context/notes/noteContext";
import { Dialog } from "@headlessui/react";

const NoteItem = (props) => {
  const { DeleteNote } = useContext(noteContext);
  const { note, updateNote } = props;

  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
const handleSummarize = async () => {
  try {
    setLoading(true);

    const res = await fetch("http://localhost:5000/api/ai/summarize", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: note.desc }), // 👈 match your note field
    });

    const data = await res.json();
    console.log("Summary result:", data);

    setSummary(data.summary || "No summary available.");
    setIsOpen(true); // 👈 open modal when summary arrives
  } catch (err) {
    console.error("Error summarizing:", err);
    setSummary("Error fetching summary.");
    setIsOpen(true); // still open modal to show error
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="flex-auto border border-black p-5 rounded-xl shadow-md">
      <h3 className="text-xl font-bold">Title</h3>
      <p>{note.title}</p>
      <h3 className="text-xl font-bold mt-2">Description</h3>
      <p>{note.desc}</p>

      {/* Action buttons */}
      <div className="flex gap-2 mt-3">
        <button
          className="p-2 bg-blue-500 text-white rounded-xl"
          onClick={() => updateNote(note)}
        >
          <span className="material-symbols-outlined">edit</span>
        </button>
        <button
          className="p-2 bg-red-500 text-white rounded-xl"
          onClick={() => DeleteNote(note._id)}
        >
          <span className="material-symbols-outlined">delete</span>
        </button>
        <button
          className="p-2 rounded-xl text-white font-semibold 
                   bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 
                   hover:from-pink-500 hover:via-purple-500 hover:to-indigo-500 
                   transition-all duration-300"
          onClick={handleSummarize}
          disabled={loading}
        >
          {loading ? "Summarizing..." : "✨ Summarize"}
        </button>
      </div>

      {/* Modal for AI summary */}
      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center">
          <Dialog.Panel className="bg-gray-100 p-6 rounded-xl shadow-lg max-w-lg w-full">
            <Dialog.Title className="text-xl font-bold">✨AI Summary</Dialog.Title>
            <Dialog.Description className="px-6 py-3 rounded-xl text-gray-800 font-semibold 
                   bg-white/20 backdrop-blur-lg border border-white/30 
                   hover:bg-white/30 hover:shadow-lg 
                   transition-all duration-300">
              {summary || "No summary available."}
            </Dialog.Description>
            <button
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg"
              onClick={() => setIsOpen(false)}
            >
              Close
            </button>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
};
export default NoteItem;
