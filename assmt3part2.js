
function getPagesNumber(){
    var x = document.forms["gistForm"]["number-input"].value;
    if (x === null || x === "" || x<1 || x>5) {
        alert("Number must be between 1 and 5");
        return false;
    }
    return x;
}

function getURL(pages){
    var url = "https://api.github.com/search/";
    url += "repositories?page=" + pages + "&q=language:";
    var x = document.querySelectorAll('input:checked');
    if (x>0 || x!=null){
        for (i=0; i<x.length; i++){
            url += x[i].value;
            if (i+1==x.length)
                break;
            url += '+language:';
        }
    }
    return url;
}

function getGists() {
    var pages = getPagesNumber();
    for (var i=1; i <= pages; i++) {
        var xmlhttp = new XMLHttpRequest();
        var xmlhttp2 = new XMLHttpRequest();
        if (!xmlhttp) {
           throw 'Unable to create HttpRequest.';
        }
        xmlhttp.onreadystatechange = function() {
            var text, content, html;
            if (xmlhttp.readyState==4 && xmlhttp.status==200) {
                text = xmlhttp.responseText;
                displayResults(JSON.parse(text));
            }
        }

        var url = getURL(1);
        console.log("opening URL " + url);
        xmlhttp.open("GET",url,true);
        xmlhttp.send();

    }
}
        

function displayResults(content) {
    for ( i=1; i < content.items.length; i++ ) {
        var item = document.createElement("li");
        item.setAttribute("id", i);
        document.getElementById("gistsList").appendChild(item);
        
        var link = document.createElement("a");
        item.appendChild(link);
        var linkText = document.createTextNode(content.items[i].description);
        link.appendChild(linkText);
        link.href = content.items[i].url; 
        item.appendChild(link);
        
        var btn = document.createElement("button");
        var btnTxt = document.createTextNode("Save as favorite");
        btn.appendChild(btnTxt);
        item.appendChild(btn);
        
        btn.onclick = function() {console.log("saving " + this.parentElement.id + " to favorites"); localStorage.setItem(this.parentElement.id, this.previousSibling); displayFavorites()};
        
        var br = document.createElement("br");
        item.appendChild(br);   
    } 

}

function displayFavorites() {
    for ( i=1; i <= localStorage.length; i++ ) {
        document.getElementById("favorites").innerHTML = localStorage.getItem(i);
    }
    
}
/*
function deleteFavorite() {

}*/
