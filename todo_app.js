/* iterate over every paragraph */
const paragraphs = document.querySelectorAll('p');
paragraphs.forEach( function(element) {
    if (element.textContent.toLowerCase().includes("the")) {
        element.remove();
    }
});
