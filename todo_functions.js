// generateTodoDOM: Generate the DOM structure for a todo 
const generateTodoDOM = function(todo) {
    const todoElement = document.createElement('div');
    // span indicates an inline-level element
    const textElement = document.createElement('span');
    const buttonElement = document.createElement('button');
    const checkboxElement = document.createElement('input');

    // setup remove todo button
    buttonElement.textContent = 'x';
    buttonElement.id = todo.id;
    buttonElement.addEventListener("click", function(event) {
        removeTodo(todo.id);
        saveTodos(todos, localStorageKey);
        renderTodos(todos, filters);
    })

    // setup todo checkbox
    checkboxElement.type = "checkbox";
    checkboxElement.checked = todo.completed;
    checkboxElement.addEventListener("change", function(event) {
        updateTodoStatus(todo.id);
        saveTodos(todos, localStorageKey);
        renderTodos(todos, filters);
    });

    // setup todo title text
    todoElement.className = "todo";
    todoElement.id = todo.id;
    textElement.textContent = (todo.text.length === 0) ? "Empty Todo" : todo.text;
    
    todoElement.appendChild(checkboxElement);
    todoElement.appendChild(textElement);
    todoElement.appendChild(buttonElement);
    return todoElement;
}

// getSummaryDOM: returns a heading (h2) that contains a summary message of the number of incomplete todos
const getSummaryDOM = function(nTodos) {
    summary = document.createElement("h2");
    summary.id = "todo-summary";
    summary.textContent = `You have ${nTodos} todo items left`;
    return summary;
}

// renderTodos: Render todos to the DOM
const renderTodos = function(todos, filters) {
    //clear the todos content division
    document.querySelector("#todos").innerHTML = "";

    //filter the todos array
    const filtered_todos = todos.filter(function(element){
        const searchTextMatch = (element.text != null) ? 
            element
                .text
                .toLowerCase()
                .includes(filters.searchText.toLowerCase()) : false;
        const hideCompletedMatch = !filters.hideCompleted || !element.completed;
        return searchTextMatch && hideCompletedMatch;
    });

    // count the number of incomplete todo items
    let incompleteTodoCount = filtered_todos.filter(function(element){
        return !element.completed;
    }).length;

    //debugger: add a breakpoint here - can interrogate variable values in the browser debugger console
    //debugger 

    // add a summary message indicating the remaining todo items
    const body = document.querySelector("#todos");
    body.appendChild(getSummaryDOM(incompleteTodoCount));

    //create new elements and render them to the DOM
    filtered_todos.forEach(function(element) {
        document
            .querySelector("#todos")
            .appendChild(generateTodoDOM(element));
    });
}

// getSavedTodos: Read application todos from local storage
const getSavedTodos = function(localStorageKey) {
    const localStorageTodos = JSON.parse(localStorage.getItem(localStorageKey));
    if(localStorageTodos != null) {
        return localStorageTodos;
    }
    return [];
}

// saveTodos: Write application todos to local storage
const saveTodos = function(todosArray, localStorageKeyl) {
    localStorage.setItem(localStorageKey, JSON.stringify(todosArray));
}

/* removeTodo: remove a todo based on its ID */
const removeTodo = function(todoId) {
    console.log("remove todo");
    const todoIndex = todos.findIndex( function(element) {
        return element.id === todoId;
    });

    /* remove the todo */
    if(todoIndex > -1) {
        todos.splice(todoIndex, 1);
    }
    return;
}

/* updateTodoStatus: change the status of a todo if the checkbox is checked */
const updateTodoStatus = function(todoId) {
        const todo = todos.find( function(element) {
            return element.id === todoId;
        });

        todo.completed = !todo.completed;
}
