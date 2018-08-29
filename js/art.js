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
    for(i = 0; i < array.length; i++){
        console.log(array[i]);
        if(array[i] == item){
            hit = true; }
        
        if(array[i + 2] == item){
            hit = true; }
        
        if(hit == true){
            console.log(array[i]);
            list.push(array[i]);
        }
        
        if(list.length == 3){
            break; }
    }
    console.log(list);
    return list;
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
        var name = artists[number];
        var correct = name;
        var artistList = shuffle(artists, name);
        var show = "<p><img id='quizPic' src='/images/";
        show += xmlDoc.getElementsByTagName("ARTIST")[number].getElementsByTagName("ART")[lilNum].childNodes[0].nodeValue + "'></p>";
        
        for(i = 0; i < artistList.length; i++){
            show += "<button>" + artistList[i] + "</button>";
        }
        
        show += "<button onclick='loadDoc()'>Next Question</button>";
        document.getElementById("home").innerHTML = show;
    }
}