import { v4 as uuidv4 } from "uuid";

import {
    renderTodos,
} from "./views"

let todos = []

const localStorageKey = "todos";

// getSavedTodos: Read application todos from local storage
const loadTodos = () => {
    const localStorageTodos = JSON.parse(localStorage.getItem(localStorageKey));
    try {
        return localStorageTodos ? localStorageTodos : [];
    } catch(error) {
        return [];
    }
}

todos = loadTodos();

// saveTodos: Write application todos to local storage
const saveTodos = () => {
    localStorage.setItem(localStorageKey, JSON.stringify(todos));
}

/* removeTodo: remove a todo based on its ID */
const removeTodo = (todoId) => {
    console.log("remove todo");
    const todoIndex = todos.findIndex( (element) => element.id === todoId);

    /* remove the todo */
    if(todoIndex > -1) {
        todos.splice(todoIndex, 1);
    }
    return;
}

/* toggleTodo: change the status of a todo if the checkbox is checked */
const toggleTodo = (todoId) => {
        const todo = todos.find( (element) =>  element.id === todoId);
        if(todo) {
            todo.completed = !todo.completed;
        }
}

const createTodo = (todo_text) => {
    if(todo_text.length > 0) {
        if(todo_text === "" || todo_text === null) {
            todo_text = "Empty Todo";
        }

        todos.push({ 
            id: uuidv4(),
            text: todo_text,
            completed: false
        });
        
        saveTodos();
        renderTodos();
    }
}

const getTodos = () => todos;

export {
    getTodos,
    saveTodos,
    toggleTodo,
    createTodo,
    removeTodo,
}
