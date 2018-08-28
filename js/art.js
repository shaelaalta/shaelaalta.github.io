var artists = ["Leonardo", "Remembrant", "Vincent Van Gogh", "Raphael", "Claude Monet"];
var numberList = [];

function getNumber(max){
    return Math.floor((Math.random() * max));
}

function loadDoc(){
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
    myFunction(this);
    }
  };
  xhttp.open("GET", "/xml/artWork.xml", true);
  xhttp.send();
}

function myFunction(xml){
    var xmlDoc = xml.responseXML;
    var number = getNumber(5);
    var lilNum = getNumber(3);
    numberList.push(number + "." + lilNum);
    var show = "<p>";
    show += xmlDoc.getElementsByTagName("ARTIST")[number].getElementsByTagName("ART")[lilNum].childNodes[0].nodeValue + "</p><button onclick='loadDoc()'>Next Question</button>";
    document.getElementById("home").innerHTML = show;
}