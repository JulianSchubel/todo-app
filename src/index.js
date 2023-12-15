"use strict"

import { 
    createTodo
} from "./todos";

import {
    setFilters
} from "./filters";

import {
    renderTodos
} from "./views";

renderTodos();

// todo filter event handler
document.querySelector("#todo-filter").addEventListener("input", (event) => {
    //console.log(event.target.value);
    setFilters({searchText: event.target.value});
    renderTodos();
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
    setFilters({hideCompleted: event.target.checked});
    renderTodos();
});
