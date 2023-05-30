import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Zoom } from "@mui/material";

export default function CreateArea(props) {
  const [note, updateNote] = useState({
    title: "",
    content: ""
  });

  function inputNote(event) {
    const { name, value } = event.target;
    updateNote((prev) => {
      return { ...prev, [name]: value };
    });
  }

  const [isExpanded, changeState] = React.useState(false);

  return (
    <div>
      <form>
        {isExpanded && (
          <Zoom in={true}>
            <input
              name="title"
              placeholder="Title"
              value={note.title}
              onChange={inputNote}
            />
          </Zoom>
        )}

        <textarea
          name="content"
          placeholder="Take a note..."
          rows={isExpanded ? "3" : "1"}
          value={note.content}
          onChange={inputNote}
          onFocus={() => {
            changeState(true);
          }}
        />

        {isExpanded && (
          <Zoom in={true}>
            <button
              onClick={(event) => {
                props.addNote(note);
                changeState(false);
                updateNote({ title: "", content: "" });
                event.preventDefault();
              }}
            >
              <AddIcon />
            </button>
          </Zoom>
        )}
      </form>
    </div>
  );
}
