"use strict";
const xhttp = new XMLHttpRequest();

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
        alert("Please fill in all fields");
        return false;
    }
    return true;
}

function store(){
        const wordName = document.getElementById("word").value;
        const definition = document.getElementById("definition").value;
        const word = new Word(wordName, definition);
        dictionary.addWord(word);
        console.log(dictionary.words);
        xhttp.open("GET", "http://localhost:8000/", true);
        xhttp.send();
        xhttp.onreadystatechange = function(){
            if(this.readyState == 4 && this.status == 200){
                console.log("the content received:",this.responseText);
            }
        }
    
}