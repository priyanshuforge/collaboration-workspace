import { FiSave } from "react-icons/fi";
import Toolbar from "./Toolbar";

function Editor({
  selectedNote,
  updateNote,
  editorRef,
  formatText,
  createHeading,
  createList,
}) {
  if (!selectedNote) {
    return (
      <div className="editor-container">
        <div className="empty-state">
          <h2>No note selected</h2>
          <p>Create a new note to get started.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="editor-container">
      {/* Editor Header */}
      <div className="editor-header">
        <input
          className="title-input"
          value={selectedNote.title}
          placeholder="Untitled Note"
          onChange={(e) =>
            updateNote({
              title: e.target.value,
            })
          }
        />

        <span className="saved-status">
          <FiSave />
          Saved
        </span>
      </div>

      {/* Toolbar */}
      <Toolbar
        formatText={formatText}
        createHeading={createHeading}
        createList={createList}
      />
      {/* Rich Text Editor */}
      <div
        ref={editorRef}
        className="editor"
        contentEditable
        suppressContentEditableWarning
        onInput={(e) => {
          updateNote({
            content: e.currentTarget.innerHTML,
          });
        }}
        dangerouslySetInnerHTML={{
          __html: selectedNote.content,
        }}
      />

      {/* Editor Footer */}
      <div className="editor-footer">
        <span>Last edited: {selectedNote.updatedAt}</span>

        <span>All changes saved</span>
      </div>
    </div>
  );
}

export default Editor;
