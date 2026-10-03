export default function NoteItem({ note, onDelete, onEdit }) {
  return (
    <article className="noteCard">
      <div className="noteCardContent">
        <h3>{note.title}</h3>

        <p className="noteDate">
          {note.date}
        </p>

        <p className="noteDescription">
          {note.description}
        </p>
      </div>

      <div className="noteActions">
        <button
          className="editButton"
          onClick={() => onEdit(note)}
        >
          ✎ Edit
        </button>

        <button
          className="deleteButton"
          onClick={() => onDelete(note.id)}
        >
          🗑 Delete
        </button>
      </div>
    </article>
  );
}