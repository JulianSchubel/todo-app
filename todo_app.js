const notes = [
    {
        "text": "install unixODBC in alpine linux",
        "completed": true
    },
    {
        "text": "Build the DDE docker image with unixODBC and informix and oracle drivers",
        "completed": false
    },
    {
        "text":"Write IAC code",
        "completed": false
    }
]

/* count the number of incomplete todo items */
todo_count = 0

notes.forEach( function(element) {
    if(!element.completed) {
        ++todo_count;
    }
});

/* add a summary message indicating the remaining todo items */
todos_summary = document.createElement('h2');
todos_summary.textContent = `You have ${todo_count} todo items left:`;
const body = document.querySelector("body");
body.appendChild(todos_summary);

/* append the text of each todo item as a paragraph to the body of the DOM */
notes.forEach( function (element) {
    new_paragraph = document.createElement('p');
    new_paragraph.textContent = element.text;
    body.appendChild(new_paragraph);
});
