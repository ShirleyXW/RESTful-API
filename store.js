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

function isValidInput(word, definition){

    if(word == "" || definition == ""){
        return false;
    }
    if (typeof word !== "string" || !isNaN(word)) {
        return false;
    }
    return true;
}

function store(){
    const wordName = document.getElementById("word").value.trim();
    const definition = document.getElementById("definition").value.trim();
    const display = document.getElementById("message");
    

    if(!isValidInput(wordName, definition)){
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
        try{
            
            if (this.readyState == 4 && this.status == 409){
                const response  = JSON.parse(this.responseText);
                display.innerHTML = response.message;
            }
            if(this.readyState == 4 && this.status == 200){
                const response  = JSON.parse(this.responseText);
                display.innerHTML = response.message;
            }
        } catch (error){
            console.log(error);
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
