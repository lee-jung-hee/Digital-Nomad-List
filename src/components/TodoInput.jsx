import { useState } from "react";

function TodoInput({ onAdd, onSearch, isSearch }) {
  const [text, setText] = useState("");

  const handleChange = (e) => {
    setText(e.target.value);
    if (isSearch) {
      onSearch(e.target.value);
    }
  };

  const handleAdd = () => {
    if (text.trim()) {
      onAdd(text);
      setText("");
    }
  };

  return (
    <div className={`todo-input-container ${isSearch ? 'search-input' : ''}`}>
      <input
        type="text"
        value={text}
        onChange={handleChange}
        placeholder={isSearch ? "Search..." : "Add a new task..."}
      />
      {!isSearch && <button onClick={handleAdd}>Add List</button>}
    </div>
  );
}

export default TodoInput;
