import {
  FiSearch,
  FiPlus,
  FiFileText,
  FiTrash2,
  FiSettings,
  FiUsers,
  FiClock,
} from "react-icons/fi";

function Sidebar({
  notes,
  selectedNote,
  setSelectedNote,
  deleteNote,
  createNote,
  searchQuery,
  setSearchQuery,
  showSearch,
  setShowSearch,
}) {
  return (
    <aside className="sidebar">
      {/* Workspace Header */}
      <div className="workspace-header">
        <div className="workspace-logo">CW</div>

        <div>
          <h2>CollabWork</h2>
          <span>My Workspace</span>
        </div>
      </div>

      {/* Sidebar Actions */}
      <div className="sidebar-actions">
        <button onClick={() => setShowSearch((prev) => !prev)}>
          <FiSearch />
          Search
        </button>

        <button onClick={createNote}>
          <FiPlus />
          New Note
        </button>

        {showSearch && (
          <input
            className="search-input"
            type="text"
            placeholder="Search notes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            autoFocus
          />
        )}
      </div>

      {/* Workspace Navigation */}
      <div className="sidebar-section">
        <p className="section-title">WORKSPACE</p>

        <button className="sidebar-item active">
          <FiFileText />
          All Notes
        </button>

        <button className="sidebar-item">
          <FiUsers />
          Shared With Me
        </button>

        <button className="sidebar-item">
          <FiClock />
          Recent
        </button>
      </div>

      {/* Notes */}
      <div className="notes-section">
        <p className="section-title">MY NOTES</p>

        {notes
          .filter((note) =>
            note.title.toLowerCase().includes(searchQuery.toLowerCase()),
          )
          .map((note) => (
            <div
              className={`note-item ${
                selectedNote?.id === note.id ? "selected" : ""
              }`}
              key={note.id}
              onClick={() => setSelectedNote(note)}
            >
              <FiFileText />

              <div className="note-info">
                <span>{note.title}</span>
                <small>{note.updatedAt}</small>
              </div>

              <button
                className="delete-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteNote(note.id);
                }}
              >
                <FiTrash2 />
              </button>
            </div>
          ))}
      </div>

      {/* Bottom */}
      <div className="sidebar-bottom">
        <button className="sidebar-item">
          <FiSettings />
          Settings
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
