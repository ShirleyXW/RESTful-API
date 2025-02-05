import { getMessage } from "./modules/getMessage.js";
const message = getMessage();
const xhttp = new XMLHttpRequest();
function search() {
    const queryWord = document.getElementById("word").value;
    const definition = document.getElementById("definition");
    const display = document.getElementById("message");

    xhttp.open("GET", `https://bcit-anthony-sh-s.com/api/definition?word=${queryWord}`, true);
    xhttp.send();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            const response = JSON.parse(this.responseText);
            if (response.message) {
                definition.value = response.message.definition;
                console.log(response.message.definition);
                display.innerHTML = message.getSuccess;
            } else {
                definition.value = "";
                display.innerHTML = message.getFail;
            }
        }
    }


}

document.addEventListener('DOMContentLoaded', () => {
    const submitButton = document.getElementById("search");
    if (submitButton) {
        submitButton.addEventListener('click', search);
    } else {
        console.error("Submit button not found!");
    }
});