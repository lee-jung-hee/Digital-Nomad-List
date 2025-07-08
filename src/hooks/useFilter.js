import { useMemo } from "react";

const useFilter = (todoList, activeFilter, searchTerm) => {
  const filteredList = useMemo(() => {
    let tempTodos = todoList;

    if (activeFilter === "active") {
      tempTodos = tempTodos.filter((todo) => !todo.checked);
    } else if (activeFilter === "completed") {
      tempTodos = tempTodos.filter((todo) => todo.checked);
    }

    if (searchTerm) {
      tempTodos = tempTodos.filter((todo) =>
        todo.content.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return tempTodos;
  }, [todoList, activeFilter, searchTerm]);

  return filteredList;
};

export default useFilter;
