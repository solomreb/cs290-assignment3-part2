
function validateNumber(){
    var x = document.forms["gistForm"]["number-input"].value;
    if (x == null || x == "" || x<1 || x>5) {
        alert("Number must be between 1 and 5");
        return false;
    }
}

     function getGists() {
        var url = "https://api.github.com/search/repositories";
        var xmlhttp = new XMLHttpRequest();
        if (!xmlhttp) {
            throw 'Unable to create HttpRequest.';
        }
        //var params = {
        //    q: language 
        //};
        url += '?' + 'q=language:javascript';
        xmlhttp.onreadystatechange = function() {
            var text, content, html;
            if (xmlhttp.readyState==4 && xmlhttp.status==200) {
                console.log("calling onreadystatechange function");
                text = xmlhttp.responseText;
                content = JSON.parse(text);
                html = "<table>\n";
                console.log(content.items.length);
                for (var i = 0; i < content.items.length; i++) {
                    html += "<tr><td>";
                    html += i + ": " + content.items[i].description;
                    html += "<td>";
                    html += "<a href='" + content.items[i].url + "'>" + content.items[i].url + "</a>";
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