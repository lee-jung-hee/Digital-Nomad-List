import TodoInput from "./TodoInput";

function Filter({ handleList, activeFilter, setActiveFilter }) {
  const handleActiveFilter = (e) => {
    setActiveFilter(e.target.value);
  };

  return (
    <div className="filter-container">
      <div>
        Filter :
        <button
          value={"all"}
          className={activeFilter === "all" ? "active" : ""}
          onClick={handleActiveFilter}
        >
          All
        </button>
        <button
          value={"completed"}
          className={activeFilter === "completed" ? "active" : ""}
          onClick={handleActiveFilter}
        >
          Completed
        </button>
        <button
          value={"active"}
          className={activeFilter === "active" ? "active" : ""}
          onClick={handleActiveFilter}
        >
          Active
        </button>
      </div>
      <div>
        <TodoInput handleList={handleList} />
      </div>
    </div>
  );
}

export default Filter;
