import { useState, useEffect } from "react";
import api from "../api";
import Note from "../components/Note";
import "../styles/Home.css";
import Header from "../components/Header";

function Home() {
  const [notes, setNotes] = useState([]);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");

  const getNote = () => {
    api.get("/api/notes/").then((response) => {
      setNotes(response.data);
    });
  }

  useEffect(() => {
    getNote();
  }, []);

  const deleteNote = (id) => {
    api.delete(`/api/notes/delete/${id}/`).then((res) => {
      if (res.status === 204) alert("Note deleted");
      else alert("Error deleting note");
      getNote();
    }).catch((error) => alert("Error deleting note"));
     
    
  }   

  const createNote = (e) => {
    e.preventDefault();
    api.post("/api/notes/", {
      title,
      content,
    }).then((res) => {
      if (res.status === 201) alert("Note created");
      else alert("Error creating note");
      getNote();
    }).catch((error) => alert(error));
   
  };


  return (
    <div>
      <Header />
      <h1>create a Note</h1>
      {notes.map((note) => (
        <Note note={note} onDelete={deleteNote} key={note.id} />
      ))}
      <form onSubmit={createNote}>
        <label htmlFor="tile">Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label htmlFor="content">Content:</label>
        <br />
        <textarea
          id="content"
          name="content"
          required
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <br />

        <button type="submit">Sumbit</button>
      </form>
  
    </div>
  );
}

export default Home;