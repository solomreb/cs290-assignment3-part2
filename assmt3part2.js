window.onload = function() {

}

function validateNumber(){
    var x = document.forms["gistForm"]["number-input"].value;
    if (x == null || x == "" || x<1 || x>5) {
        alert("Number must be between 1 and 5");
        return false;
    }
}
function display(){
    localStorage.setItem('number',document.getElementsByName('number-input')[0].value);
    document.getElementById('output').innerHTML = localStorage.getItem('number');
}