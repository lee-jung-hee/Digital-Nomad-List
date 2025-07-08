import Todo from "./Todo";

function TodoList({ todoList, onUpdate, onDelete }) {
  const skeletonUi = [...Array(10)];
  return (
    <ul>
      {todoList.length === 0
        ? skeletonUi.map((item, index) => <li key={index} className="skeleton">{item}</li>)
        : todoList.map((todo) => (
            <Todo key={todo.id} todo={todo} onUpdate={onUpdate} onDelete={onDelete} />
          ))}
    </ul>
  );
}

export default TodoList;
