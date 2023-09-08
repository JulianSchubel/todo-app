
const localStorageKey = "todos";

let todos = getSavedTodos();

// const is top level const
const filters = {
    "searchText": "",
    "hideCompleted": false
};

renderNotes(todos, filters);

// todo filter event handler
document.querySelector("#todo-filter").addEventListener("input", function(event){
    //console.log(event.target.value);
    filters.searchText = event.target.value;
    renderNotes(todos, filters);
});

// new todo form submit handler
document.querySelector("#new-todo-form").addEventListener("submit", function(event){
    // cancel default submit behaviour
    event.preventDefault();

    let todo_text = event.target.elements.newTodoText.value;
    event.target.elements.newTodoText.value = "";

    if(todo_text === "" || todo_text === null) {
        todo_text = "Empty Todo";
    }

    todos.push({ 
        "text": todo_text,
        "completed": false
    });
    
    saveTodos(todos)
    renderNotes(todos, filters);
});

// add checkbox handler
document.querySelector("#hide-completed-checkbox").addEventListener("change", function(event){
    filters.hideCompleted = event.target.checked;
    renderNotes(todos,filters);
});