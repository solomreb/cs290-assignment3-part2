window.onload = function() {
    document.getElementById('output').innerHTML = 'test';
}


function display(){
    localStorage.setItem('number-Text',document.getElementsByName('number-input')[0].value);
    document.getElementById('output').innerHTML = localStorage.getItem('number-Text');
}