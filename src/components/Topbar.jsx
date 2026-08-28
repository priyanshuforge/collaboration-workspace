function Toolbar({ formatText, createHeading, createList }) {
  return (
    <div className="editor-toolbar">
      <button
        title="Bold"
        onMouseDown={(e) => e.preventDefault()}
        onClick={() => formatText("bold")}
      >
        <b>B</b>
      </button>

      <button
        title="Italic" 
        onMouseDown={(e) => e.preventDefault()}
        onClick={() => formatText("italic")} 
      >
        <i>I</i>
      </button>

      <button
        title="Underline"
        onMouseDown={(e) => e.preventDefault()}
        onClick={() => formatText("underline")} 
      >
        <u>U</u>
      </button>

      <span className="toolbar-divider"></span>

      <button
        title="Heading 1"
        onMouseDown={(e) => e.preventDefault()}
        onClick={() => createHeading("h1")}
      >
        H1
      </button>

      <button
        title="Heading 2"
        onMouseDown={(e) => e.preventDefault()}
        onClick={() => createHeading("h2")}
      >
        H2
      </button>

      <span className="toolbar-divider"></span>

      <button
        title="Bullet List"
        onMouseDown={(e) => e.preventDefault()}
        onClick={() => createList("bullet")}
      >
        • List
      </button>

      <button
        title="Numbered List"
        onMouseDown={(e) => e.preventDefault()}
        onClick={() => createList("number")}
      >
        1. List
      </button>
    </div>
  );
}

export default Toolbar;
