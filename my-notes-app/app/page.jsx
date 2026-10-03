"use client";

import { useEffect, useState } from "react";
import NoteItem from "./components/NoteItem";

export default function Home() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const savedNotes = localStorage.getItem("notes");

    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    }

    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) {
      localStorage.setItem("notes", JSON.stringify(notes));
    }
  }, [notes, loaded]);

  function addNote(e) {
    e.preventDefault();

    if (title.trim() === "" || description.trim() === "") {
      alert("Please enter a title and description.");
      return;
    }

    const newNote = {
      id: Date.now(),
      title: title,
      description: description,
      date: new Date().toLocaleDateString()
    };

    setNotes([...notes, newNote]);

    setTitle("");
    setDescription("");
  }

  function deleteNote(id) {
    const updatedNotes = notes.filter((note) => note.id !== id);

    setNotes(updatedNotes);
  }

  function editNote(note) {
    setTitle(note.title);
    setDescription(note.description);
    setEditingId(note.id);

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }

  function updateNote(e) {
    e.preventDefault();

    if (title.trim() === "" || description.trim() === "") {
      alert("Please enter a title and description.");
      return;
    }

    const updatedNotes = notes.map((note) => {
      if (note.id === editingId) {
        return {
          ...note,
          title: title,
          description: description
        };
      }

      return note;
    });

    setNotes(updatedNotes);

    setTitle("");
    setDescription("");
    setEditingId(null);
  }

  return (
    <main className="page">

      <header className="topbar">
        <div className="brand">
          <div className="brandIcon">▣</div>
          <h1>My Notes</h1>
        </div>
      </header>

      <section className="content">

        <form
          className="noteForm"
          onSubmit={editingId ? updateNote : addNote}
        >

          <div className="formHeader">
            <div className="formIcon">✎</div>

            <div>
              <h2>
                {editingId ? "Update Note" : "Add New Note"}
              </h2>

              <p>
                {editingId
                  ? "Edit your note below..."
                  : "Write something down..."}
              </p>
            </div>
          </div>

          <input
            type="text"
            placeholder="Note title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            placeholder="Write your note description..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="5"
          />

          <div className="formButtons">

            <button
              type="submit"
              className="saveButton"
            >
              {editingId ? "Update Note" : "Save Note"}
            </button>

            {editingId && (
              <button
                type="button"
                className="cancelButton"
                onClick={() => {
                  setTitle("");
                  setDescription("");
                  setEditingId(null);
                }}
              >
                Cancel
              </button>
            )}

          </div>

        </form>

        <div className="notesHeading">

          <h2>All Notes</h2>

          <span>
            {notes.length} note(s)
          </span>

        </div>

        <div className="notesList">

          {notes.length === 0 ? (

            <div className="empty">

              <div className="emptyIcon">
                ✎
              </div>

              <h3>No notes yet</h3>

              <p>
                Create your first note above.
              </p>

            </div>

          ) : (

            notes.map((note) => (
              <NoteItem
                key={note.id}
                note={note}
                onDelete={deleteNote}
                onEdit={editNote}
              />
            ))

          )}

        </div>

      </section>

    </main>
  );
}