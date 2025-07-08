import { useState } from "react";

function Todo({ todo, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(todo.content);

  const handleSave = () => {
    if (editedText.trim()) {
      onUpdate(todo.id, editedText, todo.checked);
      setIsEditing(false);
    }
  };

  const handleCheckboxChange = () => {
    onUpdate(todo.id, todo.content, !todo.checked);
  };

  return (
    <li className={`todo-item ${todo.checked ? "completed" : ""}`}>
      <input
        type="checkbox"
        checked={todo.checked || false}
        onChange={handleCheckboxChange}
      />
      {isEditing ? (
        <input
          type="text"
          value={editedText}
          onChange={(e) => setEditedText(e.target.value)}
          className="edit-input"
        />
      ) : (
        <span className="todo-content">{todo.content}</span>
      )}
      <span className="todo-time">{todo.time}</span>
      <span className="todo-actions">
        {isEditing ? (
          <button onClick={handleSave} className="save-button">
            Save
          </button>
        ) : (
          <button onClick={() => setIsEditing(true)} className="edit-button">
            Edit
          </button>
        )}
        <button onClick={() => onDelete(todo.id)} className="delete-button">
          Delete
        </button>
      </span>
    </li>
  );
}

export default Todo;
