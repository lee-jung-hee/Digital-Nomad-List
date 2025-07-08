import Todo from "./Todo";

function TodoList({ todoList, setTodoList }) {
  const skeletonUi = [...Array(10)];
  console.log(skeletonUi);

  return (
    <ul>
      {todoList.length === 0
        ? skeletonUi.map((item) => <li className="skeleton">{item}</li>)
        : todoList.map((todo) => (
            <Todo key={todo.id} todo={todo} setTodoList={setTodoList} />
          ))}
    </ul>
  );
}

export default TodoList;
