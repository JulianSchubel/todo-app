
// generateTodoDOM: Generate the DOM structure for a todo
const generateTodoDOM = function(todo) {
    let newElement = document.createElement('p');
    newElement.className = "todo";
    newElement.textContent = todo.text;
    return newElement;
} 

// getSummaryDOM: returns a heading (h2) that contains a summary message of the number of incomplete todos
const getSummaryDOM = function(nTodos) {
    summary = document.createElement("h2");
    summary.id = "todo-summary";
    summary.textContent = `You have ${nTodos} todo items left`;
    return summary;
}

// renderNotes: Render notes to the DOM
const renderNotes = function(notes, filter) {
    //clear the notes content division
    document.querySelector("#todos").innerHTML = "";

    //filter the notes array
    const filtered_notes = notes.filter(function(element){
        const searchTextMatch = (element.text != null) ? 
            element
                .text
                .toLowerCase()
                .includes(filter.searchText.toLowerCase()) : false;
        const hideCompletedMatch = !filter.hideCompleted || !element.completed;
        return searchTextMatch && hideCompletedMatch;
    });

    // count the number of incomplete todo items
    let incompleteTodoCount = filtered_notes.filter(function(element){
        return !element.completed;
    }).length;

    //debugger: add a breakpoint here - can interrogate variable values in the browser debugger console
    //debugger 

    // add a summary message indicating the remaining todo items
    const body = document.querySelector("#todos");
    body.appendChild(getSummaryDOM(incompleteTodoCount));

    //create new elements and render them to the DOM
    filtered_notes.forEach(function(element) {
        document
            .querySelector("#todos")
            .appendChild(generateTodoDOM(element));
    });
}

// getSavedTodos: Read application todos from local storage
const getSavedTodos = function(localStorageKey) {
    const localStorageNotes = JSON.parse(localStorage.getItem(localStorageKey));
    if(localStorageNotes != null) {
        return localStorageNotes;
    }
    return [];
}

// saveTodos: Write application todos to local storage
const saveTodos = function(todosArray, localStorageKey) {
    localStorage
        .setItem(
            localStorageKey, 
            JSON.stringify(todosArray)
        );
}
