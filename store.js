"use strict";
import { getMessage } from "./modules/getMessage.js";
const xhttp = new XMLHttpRequest();
const message = getMessage();

function Word(word, definition){
    this.word = word;
    this.definition = definition;
}

class Dictionary{
    constructor(){
        this.words = {};
    }
    addWord(word){
        this.words[word.word] = word.definition;
    }
    getWord(word){
        return this.words[word];
    }
}

const dictionary = new Dictionary();

function isValidInput(){

    const word = document.getElementById("word").value;
    const definition = document.getElementById("definition").value;
    if(word == "" || definition == ""){
        return false;
    } else if (typeof word !== "string" || typeof definition !== "string"){
        return false;
    }
    return true;
}

function store(){
    const wordName = document.getElementById("word").value;
    const definition = document.getElementById("definition").value;
    const display = document.getElementById("message");
    

    if(!isValidInput()){
        display.innerHTML = message.invalidInput;
        return;
    } else {
        display.innerHTML = message.postSuccess;
    }

    const word = new Word(wordName, definition);
    xhttp.open("POST", "https://bcit-anthony-sh-s.com/api/definition", true);
    xhttp.setRequestHeader("content-type", "application/json");
    const data = JSON.stringify(word);
    xhttp.send(data);
    xhttp.onreadystatechange = function(){
        if (this.readyState == 4 && this.status == 0){
            console.log("request failed");
        }
        if(this.readyState == 4 && this.status == 200){
            console.log("the content received:",this.responseText);
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const submitButton = document.getElementById("submit");
    if (submitButton) {
        submitButton.addEventListener('click', store);
    } else {
        console.error("Submit button not found!");
    }
});
