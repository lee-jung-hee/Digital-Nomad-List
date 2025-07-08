import { useState } from "react";

function Filter({ activeFilter, onFilterChange, onSearch }) {
  const [searchText, setSearchText] = useState("");

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <div className="filter-container">
      <div className="filter-buttons">
        <button
          className={activeFilter === "all" ? "active" : ""}
          onClick={() => onFilterChange("all")}
        >
          All
        </button>
        <button
          className={activeFilter === "active" ? "active" : ""}
          onClick={() => onFilterChange("active")}
        >
          Active
        </button>
        <button
          className={activeFilter === "completed" ? "active" : ""}
          onClick={() => onFilterChange("completed")}
        >
          Completed
        </button>
      </div>
      <div className="search-container">
        <input
          type="text"
          value={searchText}
          onChange={handleSearchChange}
          placeholder="Search tasks..."
          className="search-input-field"
        />
      </div>
    </div>
  );
}

export default Filter;
