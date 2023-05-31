import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import { keeper_backend } from "../../../declarations/keeper_backend";

function App() {
  const [notes, updateNotes] = useState([]);
  async function addNote(newNotes) {
    if (newNotes.title !== "" && newNotes.content !== "") {
      loading(true);
      await keeper_backend.createNote(newNotes.title, newNotes.content);
      loading(false);
      fetchData();
    } else {
      console.log("Please insert both title and content");
    }
  }
  async function deleteNote(targetIndex) {
    loading(true);
    await keeper_backend.deleteNote(targetIndex);
    loading(false);
    fetchData();
  }
  async function fetchData() {
    loading(true);
    updateNotes(await keeper_backend.showNotes());
    loading(false);
  }

  useEffect(() => {
    fetchData();
  }, []);

  function loading(status) {
    const input = document.querySelector("input");
    if (status) {
      input.disabled = true;
      input.placeholder = "Updating....";
    } else {
      input.disabled = false;
      input.placeholder = "Title";
    }
  }

  return (
    <div>
      <Header />
      <CreateArea addNote={addNote} />
      {notes.map((note, index) => {
        return (
          <Note
            key={index}
            id={index}
            title={note.title}
            content={note.content}
            deleteNote={deleteNote}
          />
        );
      })}

      <Footer />
    </div>
  );
}

export default App;
