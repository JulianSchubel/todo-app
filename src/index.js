"use strict"

import { v4 as uuidv4 } from "uuid";
import { 
    renderTodos,
    updateFilters,
    createTodo
} from "./todo_functions";

renderTodos();

// todo filter event handler
document.querySelector("#todo-filter").addEventListener("input", (event) => {
    //console.log(event.target.value);
    updateFilters({searchText: event.target.value});
});

// new todo form submission handler
document.querySelector("#new-todo-form").addEventListener("submit", (event) => {
    // cancel default submit behaviour
    event.preventDefault();
    let todo_text = event.target.elements.newTodoText.value.trim();
    event.target.elements.newTodoText.value = "";
    createTodo(todo_text);
});

// add checkbox handler
document.querySelector("#hide-completed-checkbox").addEventListener("change", (event) => {
    updateFilters({hideCompleted: event.target.checked});
});
