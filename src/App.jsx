import { useReducer, useEffect, useCallback, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import { supabase } from "./createClient";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import Filter from "./components/Filter";
import Sort from "./components/Sort";
import useFilter from "./hooks/useFilter";

const todoReducer = (state, action) => {
  switch (action.type) {
    case "SET_TODOS":
      return { ...state, todos: action.payload };
    case "CREATE_TODO":
      return { ...state, todos: [action.payload, ...state.todos] };
    case "UPDATE_TODO":
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id ? action.payload : todo
        ),
      };
    case "DELETE_TODO":
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      };
    case "SET_FILTER":
      return { ...state, activeFilter: action.payload };
    default:
      return state;
  }
};

const initialState = {
  todos: [],
  activeFilter: "all",
};

function App() {
  const [state, dispatch] = useReducer(todoReducer, initialState);
  const { todos, activeFilter } = state;
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTodoList = useFilter(todos, activeFilter, searchTerm);

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

  const fetchTodos = useCallback(async () => {
    const { data, error } = await supabase
      .from("lists")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching todos:", error);
    } else {
      const formattedData = data.map((list) => ({
        id: list.id,
        content: list.content,
        time: formatDate(list.created_at),
        checked: list.is_completed,
      }));
      dispatch({ type: "SET_TODOS", payload: formattedData });
    }
  }, []);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const handleAdd = async (content) => {
    const { data, error } = await supabase
      .from("lists")
      .insert([
        {
          content: content,
          is_completed: false,
          created_at: new Date().toISOString(),
        },
      ])
      .select();

    if (error) {
      console.error("Error adding todo:", error);
    } else if (data) {
      const newTodo = {
        id: data[0].id,
        content: data[0].content,
        time: formatDate(data[0].created_at),
        checked: data[0].is_completed,
      };
      dispatch({ type: "CREATE_TODO", payload: newTodo });
    }
  };

  const handleUpdate = async (id, newContent, newChecked) => {
    const { data, error } = await supabase
      .from("lists")
      .update({ content: newContent, is_completed: newChecked })
      .eq("id", id)
      .select();

    if (error) {
      console.error("Error updating todo:", error);
    } else if (data) {
      const updatedTodo = {
        id: data[0].id,
        content: data[0].content,
        time: formatDate(data[0].created_at),
        checked: data[0].is_completed,
      };
      dispatch({ type: "UPDATE_TODO", payload: updatedTodo });
    }
  };

  const handleDelete = async (id) => {
    const { error } = await supabase.from("lists").delete().eq("id", id);

    if (error) {
      console.error("Error deleting todo:", error);
    } else {
      dispatch({ type: "DELETE_TODO", payload: id });
    }
  };

  const handleFilterChange = (filter) => {
    dispatch({ type: "SET_FILTER", payload: filter });
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <>
      <Header formatDate={formatDate} />
      <div className="container">
        <Filter
          activeFilter={activeFilter}
          onFilterChange={handleFilterChange}
          onSearch={handleSearch}
        />
        <TodoInput onAdd={handleAdd} />
        <Sort />
        <div className="todo-container">
          <TodoList
            todoList={filteredTodoList}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
          />
        </div>
      </div>
    </>
  );
}

export default App;
