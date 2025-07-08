import { useEffect, useState } from "react";
import "./App.css";
import TodoList from "./components/TodoList";
import { supabase } from "./createClient";
import Filter from "./components/Filter";
import Sort from "./components/Sort";
import Header from "./components/Header";

function App() {
  function formatDate(dateStr) {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat("ko-KR", {
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    }).format(date);
  }

  const [todoList, setTodoList] = useState([]);

  useEffect(() => {
    async function fetchTodos() {
      const { data, error } = await supabase
        .from("lists")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching todos:", error);
      } else {
        // Supabase에서 받은 데이터를 앱의 상태 형식에 맞게 변환
        const formattedData = data.map((list) => ({
          id: list.id,
          content: list.content,
          time: formatDate(list.created_at),
          checked: list.is_completed,
        }));
        setTodoList(formattedData);
      }
    }

    fetchTodos();
  }, []); // 빈 배열을 전달하여 컴포넌트가 처음 마운트될 때 한 번만 실행

  const handleList = async (content) => {
    const { data, error } = await supabase
      .from("todos")
      .insert([{ content: content, is_completed: false }])
      .select();

    if (error) {
      console.error("Error adding todo:", error);
    } else if (data) {
      // UI에 즉시 반영하기 위해 새로 추가된 할 일을 상태에 추가
      const newTodo = {
        id: data[0].id,
        content: data[0].content,
        time: formatDate(data[0].created_at),
        checked: data[0].is_completed,
      };
      setTodoList([newTodo, ...todoList]); // 새 항목을 맨 위에 추가
    }
  };

  return (
    <>
      <Header formatDate={formatDate} />
      <div className="container">
        <Filter handleList={handleList} />
        <Sort />
        <div className="todo-container">
          <TodoList todoList={todoList} setTodoList={setTodoList} />
        </div>
      </div>
    </>
  );
}

export default App;
