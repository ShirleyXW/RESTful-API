const xhttp = new XMLHttpRequest();
function fetch(){
        console.log("fetching");
        xhttp.open("GET", "http://localhost:8000/", true);
        xhttp.send();
        xhttp.onreadystatechange = function(){
            if(this.readyState == 4 && this.status == 200){
                console.log("the content received:",this.responseText);
            }
        }
    
}