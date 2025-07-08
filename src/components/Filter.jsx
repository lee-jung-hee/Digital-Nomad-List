import TodoInput from "./TodoInput";

function Filter(handleList) {
  return (
    <div className="filter-container">
      <div>
        Filter :<button>All</button>
        <button>Completed</button>
        <button>Active</button>
      </div>
      <div>
        <TodoInput handleList={handleList} />
      </div>
    </div>
  );
}

export default Filter;
