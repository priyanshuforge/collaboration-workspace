import { useEffect, useRef, useState } from "react";
import Sidebar from "./components/Sidebar";
import Editor from "./components/Editor";
import Topbar from "./components/Topbar"; 
import "./App.css";

function App() {
  const editorRef = useRef(null); 

  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem("collabwork_notes");     

    if (savedNotes) {
      return JSON.parse(savedNotes);  
    }

    return [ 
      {
        id: 1,  
        title: "Welcome to Workspace",
        content:
          "Start writing your ideas here. Create notes, format your text and collaborate with your team.",
        updatedAt: "Just now", 
      },
    ];
  });

  const [selectedNote, setSelectedNote] = useState(notes[0]); 

  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false); 

  useEffect(() => {
    localStorage.setItem("collabwork_notes", JSON.stringify(notes)); 
  }, [notes]);

  const createNote = () => {
    const newNote = {
      id: Date.now(),
      title: "Untitled Note",
      content: "",
      updatedAt: "Just now",
    };

    setNotes((prev) => [newNote, ...prev]);
    setSelectedNote(newNote);
  };

  const deleteNote = (id) => {
    const updatedNotes = notes.filter((note) => note.id !== id);

    setNotes(updatedNotes);

    if (selectedNote?.id === id) {
      setSelectedNote(updatedNotes[0] || null);
    }
  };

  const updateNote = (changes) => {
    if (!selectedNote) return;

    const updated = {
      ...selectedNote,
      ...changes,
      updatedAt: "Just now",
    };

    setSelectedNote(updated);

    setNotes((prev) =>
      prev.map((note) => (note.id === updated.id ? updated : note)),
    );
  };

  const formatText = (command, value = null) => {
    editorRef.current?.focus();

    document.execCommand(command, false, value);

    if (editorRef.current) {
      updateNote({
        content: editorRef.current.innerHTML,
      });
    }
  };

  const createHeading = (level) => {
    formatText("formatBlock", level);
  };

  const createList = (type) => {
    if (type === "bullet") {
      formatText("insertUnorderedList");
    } else {
      formatText("insertOrderedList");
    }
  };

  return (
    <div className="app">
      <Sidebar
        notes={notes}
        selectedNote={selectedNote}
        setSelectedNote={setSelectedNote}
        deleteNote={deleteNote}
        createNote={createNote}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        showSearch={showSearch}
        setShowSearch={setShowSearch}
      />

      <main className="main-content">
        <Topbar />

        <Editor
          selectedNote={selectedNote}
          updateNote={updateNote}
          editorRef={editorRef}
          formatText={formatText}
          createHeading={createHeading}
          createList={createList}
        />
      </main>
    </div>
  );
}

export default App;
