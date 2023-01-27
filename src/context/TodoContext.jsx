import React, { createContext, useContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
  const [filter, setFilter] = useState('all');
  const [todos, setTodos] = useState([
    {
      id: 1,
      text: "Learn React",
      completed: true,
    },
  ]);

  const addTodo = (text) =>
    setTodos((prev) => [...prev, { id: uuidv4(), completed: false, text }]);


  const toggleTodo = (id) => {
    const cloned_todos = [...todos]; // Yapılacaklar lisetine tekrar ulaştık orjinal yapıyı bozmamak için yeni bir değişkene atadık

    const itemIndex = cloned_todos.findIndex((todo) => todo.id === id); // Tıklandığında id i bulmak için oluşturduğumuz değişken
    const item = todos[itemIndex]; // tıklandığında tüm değerlerini bulmak için oluşturduğumuz değişken id text ve completed

    item.completed = !item.completed; // item completed se tersini al
    setTodos(cloned_todos); // settodo a cloned todo u verdik ve bu işlemi kulanılacak olan component yapısı içerisinde onchange function içerisinde çağırdık
  };

  const destroyTodo = (id) => {
    const cloned_todos = [...todos];

    const itemIndex = cloned_todos.findIndex(todo => todo.id === id)
    cloned_todos.splice(itemIndex, 1)
    setTodos(cloned_todos);
    
  }


  const values = {
    todos,
    setTodos,
    addTodo,
    toggleTodo,
    destroyTodo,
    filter,
    setFilter,
  };

  return <TodoContext.Provider value={values}>{children}</TodoContext.Provider>;
};

export const useTodo = () => {
  const context = useContext(TodoContext);

  if (context === undefined) {
    throw new Error("useTodo hook must be call inside TodoProvider component");
  }

  return context;
};
