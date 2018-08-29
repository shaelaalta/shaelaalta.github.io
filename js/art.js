var artists = ["Leonardo Da Vinci", "Remembrant", "Vincent Van Gogh", "Raphael", "Claude Monet"];
var numberList = [];
var questions = 0;
var correct;

/*******************************
* mixes up numbers
********************************/
function getNumber(max){
    return Math.floor((Math.random() * max));
}

/******************************
* gets xml doc
*******************************/
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

/***********************************
* checks if image has been displayed
************************************/
function checkNumbers(number, lilNum){
    var i;
    var m;
    for(i = 0; i < numberList.length; i++){
        if(numberList[i][0] == number){
            if(numberList[i][1] == lilNum){
                    console.log(numberList[i][1]);
                    console.log(numberList);
                    return false;
                }
            }
        }
    numberList.push([number, lilNum]);
    return true;
}

/********************************
* shuffle the array
*********************************/
function shuffle(array, item){
    var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
    
    var showThem = arrangeIt(array, item);
    return showThem;
}

/*******************************
* get list of artists
********************************/
function arrangeIt(array, item){
    console.log(array);
    console.log(item);
    var i;
    var m;
    var hit = false;
    var list = [];
    for(i = 0; i < 3; i++){
        console.log(array[i]);
        if(array[i] == item){
            hit = true;
        }
        list.push(array[i]);
    }
    console.log(list);
    if(hit == true){
        return list
    }
    else{
        replaceNum = getNumber(3);
        list[replaceNum] = item;
        return list;
    }
}

/***********************************
* shows xml stuff 
***********************************/
function myFunction(xml){
    var xmlDoc = xml.responseXML;
    var number;
    var lilNum;
    do {
        number = getNumber(5);
        lilNum = getNumber(3);
    } while (checkNumbers(number, lilNum) == false);
    
    questions++;
    if(questions > 11){
        document.getElementById("home").innerHTML = "<h1>You Have Completed The Game!</h1>";
    }
    else {
        var i;
        var name = xmlDoc.getElementsByTagName("ARTIST")[number].getElementsByTagName("NAME")[0].childNodes[0].nodeValue;
        correct = name;
        var artistList = shuffle(artists, name);
        var show = "<p id='sayIt'><img id='quizPic' src='/images/";
        show += xmlDoc.getElementsByTagName("ARTIST")[number].getElementsByTagName("ART")[lilNum].childNodes[0].nodeValue + "'></p>";
        
        for(i = 0; i < artistList.length; i++){
            if(artistList[i] == name){
                show += "<div id='parts'><div class='answers'><img src='/images/graphics/yes.png'></div>"
            }
            else {
            show += "<div id='parts'><div class='answers'><img src='/images/graphics/no.png'></div>";
            }
            show += "<button onclick='submitAnswer(\"" + artistList[i] + "\")'>" + artistList[i] + "</button></div>";
        }
        
        show += "<button onclick='loadDoc()'>Next Question</button>";
        document.getElementById("home").innerHTML = show;
    }
}

/**************************************
* check submitted answer
***************************************/
function submitAnswer(answer){
    var announce = document.createElement("h1");
    var node;
    if(correct == answer){
        node = document.createTextNode("Correct Answer!");
    }
    else{
        node = document.createTextNode("Wrong Answer");
    }
    announce.appendChild(node);
    var element = document.getElementById("sayIt");
    element.appendChild(announce);
    var pics = document.getElementsByClassName("answers");
    var i;
    for(i = 0; i < pics.length; i++){
        pics[i].style.display = "inline";
    }
}