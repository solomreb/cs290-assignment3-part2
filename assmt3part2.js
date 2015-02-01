
function validateNumber(){
    var x = document.forms["gistForm"]["number-input"].value;
    if (x == null || x == "" || x<1 || x>5) {
        alert("Number must be between 1 and 5");
        return false;
    }
}

     function getGists() {
        var url = "https://api.github.com/search/";
        var xmlhttp = new XMLHttpRequest();
        if (!xmlhttp) {
            throw 'Unable to create HttpRequest.';
        }
        url += "repositories?q=language:";
        var x = document.querySelectorAll('input:checked');
        for (i=0; i<x.length; i++)
        {
            url += x[i].value;
            url += '+language:';
        }
        console.log("Url= " + url);
        xmlhttp.onreadystatechange = function() {
            var text, content, html;
            if (xmlhttp.readyState==4 && xmlhttp.status==200) {
                text = xmlhttp.responseText;
                content = JSON.parse(text);
                html = "<table>\n";
                html += "<h2>Gists matching your search:</h2>";
                html += "<tr><th>Description</th><th>Language</th></tr>";
                for (var i = 0; i < content.items.length; i++) {
                    html += "<tr><td>";
                    html += i + ": ";
                    html += "<a href='" + content.items[i].url + "'>" + content.items[i].description + "</a>";
                    html += "<td>" + content.items[i].language;
                    html += "<tr>\n";
                }
                html += "</table>\n";
                console.log(html);
                document.getElementById("content").innerHTML = html;
            }
        }
        console.log("opening URL " + url);
        xmlhttp.open("GET",url,true);
        xmlhttp.send();
         
         
    }