"use strict"

import {
    saveTodos,
    getTodos,
    toggleTodo,
    removeTodo,
} from "./todos";

import {
    getFilters
} from "./filters"

// generateTodoDOM: Generate the DOM structure for a todo 
const generateTodoDOM = (todo) => {
    const todoElement = document.createElement('label');
    const containerElement = document.createElement('div');
    // span indicates an inline-level element
    const textElement = document.createElement('span');
    const removeButton = document.createElement('button');
    const checkboxElement = document.createElement('input');

    // setup remove todo button
    removeButton.textContent = 'remove';
    removeButton.id = todo.id;
    removeButton.classList.add("button", "button--text");
    removeButton.addEventListener("click", () => {
        removeTodo(todo.id);
        saveTodos();
        renderTodos();
    })

    // setup todo checkbox
    checkboxElement.type = "checkbox";
    checkboxElement.checked = todo.completed;
    checkboxElement.addEventListener("change", () => {
        toggleTodo(todo.id);
        saveTodos();
        renderTodos();
    });

    // setup todo title text
    todoElement.className = "todo";
    todoElement.id = todo.id;
    todoElement.classList.add("list-item");
    textElement.textContent = (todo.text.length === 0) ? "Empty Todo" : todo.text;
    
    //setup container element
    containerElement.classList.add("list-item__container");

    containerElement.appendChild(checkboxElement);
    containerElement.appendChild(textElement);
    todoElement.appendChild(containerElement);
    todoElement.appendChild(removeButton);
    return todoElement;
}

// getSummaryDOM: returns a heading (h2) that contains a summary message of the number of incomplete todos
const getSummaryDOM = (nTodos) => {
    let summary = document.createElement("h2");
    summary.id = "todo-summary";
    summary.classList.add("list-title");
    const plural = nTodos === 1 ? "" : "s";
    summary.textContent = `You have ${nTodos} todo${plural} left`;
    return summary;
}

// renderTodos: Render todos to the DOM
const renderTodos = () => {

    let todos = getTodos();
    let filters = getFilters();

    //clear the todos content division
    const todoContainer = document.querySelector("#todos")
    todoContainer.innerHTML = "";

    //filter the todos array
    const filtered_todos = todos.filter( (element) => {
        const searchTextMatch = element.text ? 
            element
                .text
                .toLowerCase()
                .includes(filters.searchText.toLowerCase()) : false;
        const hideCompletedMatch = !filters.hideCompleted || !element.completed;
        return searchTextMatch && hideCompletedMatch;
    });

    // count the number of incomplete todo items
    let incompleteTodoCount = filtered_todos.filter( (element) => !filters.hideCompleted || !element.completed).length;

    //debugger: add a breakpoint here - can interrogate variable values in the browser debugger console
    //debugger 

    // add a summary message indicating the remaining todo items
    todoContainer.appendChild(getSummaryDOM(incompleteTodoCount));

    if(incompleteTodoCount > 0) {
        //create new elements and render them to the DOM
        filtered_todos.forEach( (element) => {
            todoContainer.appendChild(generateTodoDOM(element));
        });
    } else {
        const noTodosNotification = document.createElement("p");
        noTodosNotification.classList.add("empty-message");
        noTodosNotification.textContent = "No todos to show";
        todoContainer.appendChild(noTodosNotification);
    }
}

export {
    renderTodos,
}
