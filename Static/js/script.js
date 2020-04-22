//Challange Get BirthDate in Days 
function BitrhDays(){
    var BirthYear = prompt('Please tell your Birth Year')
    var numberOfDays =(2020 - BirthYear) * 365;
    h1 = document.createElement('h1')
    var textAnswer = document.createTextNode("You are " + numberOfDays + " Days");
    h1.setAttribute("id","AgeInDays");
    h1.appendChild(textAnswer);
    document.getElementById('flex-box-item').appendChild(h1);
}

function reset() {
    document.getElementById("AgeInDays").remove();
}

//Challange 2: Create Cat Objects
function GenrateCat() {
    var Div = document.getElementById("CatDiv");
    var img = document.createElement('img');
    img.setAttribute("src","Static/images/img1.webp");
    img.setAttribute("width","300px");
    img.setAttribute("height","300px");
    Div.appendChild(img);
}

/*Challage 3 :  This is RPS game  */
function rpsGame(yourChoice) {
    var humanChoice = yourChoice.id;
    var botChoice = numberToChoice(randTorpsInt())
    var result = DecideWiner(humanChoice,botChoice)
    var Final_message = Finalmessage(result)
    ForntEnd(humanChoice,botChoice,Final_message);

}

function randTorpsInt() {
    return Math.floor(Math.random() * 3)
}

function numberToChoice(number){
    return ["rock","paper","scissors"][number]
}

function DecideWiner(yourChoice,ComputerChoice) {
    rpsDataBase = {
        "rock":{"scissors":1,"rock":0.5,"paper":0},
        "paper":{"scissors":0,"rock":1,"paper":0.5},
        "scissors":{"scissors":0.5,"rock":0,"paper":1},
    }
    var YourScore = rpsDataBase[yourChoice][ComputerChoice]
    var ComputerScore = rpsDataBase[ComputerChoice][yourChoice]
    return [YourScore,ComputerScore]
}

function Finalmessage([YourScore,ComputerScore]) {
    if (YourScore == 0) {
        return {"message":"You Lost!","color":"red"};
    } else if(YourScore == 0.5) {
        return {"message":"You Tied!","color":"Yellow"};
    }else {
        return {"message":"You Won!","color":"Green"};
    }
}

function ForntEnd(yourChoice,ComputerChoice,message)
{
    ImageDatabase = {
        "rock":document.getElementById("rock").src,
        "scissors":document.getElementById("scissors").src,
        "paper":document.getElementById("paper").src,
    }

    document.getElementById("rock").remove();
    document.getElementById("scissors").remove();
    document.getElementById("paper").remove();

    var humanDiv = document.createElement('div');
    var BotDiv = document.createElement('div');
    var MessageDiv = document.createElement('div');
    humanDiv.innerHTML = "<img src='" + ImageDatabase[yourChoice] +"' style='width: 150px;height: 150px;box-shadow: 0px 10px 50px rgba(37, 50, 233, 1);'>"
    MessageDiv.innerHTML = "<h1 style='color:"+message["color"]+ ";font-size:60px '>"+ message["message"]+ "</h1>" 
    BotDiv.innerHTML = "<img src='" + ImageDatabase[ComputerChoice] +"' style='width: 150px;height: 150px;box-shadow: 0px 10px 50px rgba(243, 38, 24, 1);'>"
    document.getElementById("flex-box-rps-div").appendChild(humanDiv);
    document.getElementById("flex-box-rps-div").appendChild(MessageDiv);
    document.getElementById("flex-box-rps-div").appendChild(BotDiv);
}


const copyColor = []
var allButtonColor = document.getElementsByTagName('button');
for (let index = 0; index < allButtonColor.length; index++) {
    copyColor.push(allButtonColor[index]);        
}

function changeColor()
{
    var selectedColor = document.getElementById("background").value
    if (selectedColor == "red") {
        ButtonRed();
    } else if(selectedColor == "green") {
        ButtonGreen();
    } else if(selectedColor == "Randum") {
        Buttonrandum();
    }
    else if(selectedColor == "reset") {
        ButtonReset();
    }
}

function ButtonRed()
{
    for (let index = 0; index < allButtonColor.length; index++) {
        allButtonColor[index].classList.remove(allButtonColor[index].classList[1])
        allButtonColor[index].classList.add("btn-danger"); 
    }
}

function ButtonGreen()
{
    for (let index = 0; index < allButtonColor.length; index++) {
        allButtonColor[index].classList.remove(allButtonColor[index].classList[1])
        allButtonColor[index].classList.add("btn-success"); 
    }
}


function Buttonrandum()
{
    ColorChoice = ["btn-danger","btn-success","btn-warning","btn-primary"]
    for (let index = 0; index < allButtonColor.length; index++) {
        allButtonColor[index].classList.remove(allButtonColor[index].classList[1])
        allButtonColor[index].classList.add(ColorChoice[Math.floor(Math.random()*4)])
    }
}


function ButtonReset()
{
    for (let index = 0; index < allButtonColor.length; index++) {
        allButtonColor[index].classList.remove(allButtonColor[index].classList[1])
        allButtonColor[index].classList.add(copyColor[index].classList[1]); 
    }
}

//Chalange 5 BlackJack

let BackjectGame = {
    "You":{"scoreSpan":'#your-blackject-result','div':'#your-box','score':0},
    "dealer":{"scoreSpan":'#dealer-blackject-result','div':'#dealer-box','score':0},
    'cards':['2','3','4','5','6','7','8','9','10','A','K','J','Q'],
    'cardsmap':{'2':2,'3':3,'4':4,'5':5,'6':6,'7':7,'8':8,'9':9,'10':10,'K':10,'J':10,'Q':10,'A':[1,11]},
    'wins':0,
    'lose':0,
    'drew':0
}
const YOU = BackjectGame["You"]
const DEALER = BackjectGame["dealer"]
const cards = BackjectGame['cards']

document.querySelector("#blackject-hit-button").addEventListener("click",BackjectHit);
document.querySelector("#blackject-Deal-button").addEventListener("click",BackjectDeal);
document.querySelector('#blackject-Stand-button').addEventListener('click',dealerLogic);
const hitSound = new Audio("Static/sounds/swish.m4a");
const WinnerSound = new Audio("Static/sounds/cash.mp3");
const LosserSound = new Audio("Static/sounds/aww.mp3")
function BackjectHit() {
    card = randumcards();
    ShowCard(card,YOU);
    UpdateScore(YOU,card);
    ShowScore(YOU);
}

function BackjectDeal() {
    ShowResult(computWinner());

    let YourImage = document.querySelector("#your-box").querySelectorAll("img");
    DEALER['score'] = 0;
    YOU['score']  = 0;
    document.querySelector("#your-blackject-result").style.color='white';
    document.querySelector("#dealer-blackject-result").style.color='white';
    ShowScore(YOU);
    ShowScore(DEALER);
    for (let i = 0; i < YourImage.length; i++) {
        YourImage[i].remove();
        
    }
    let DealImage = document.querySelector("#dealer-box").querySelectorAll("img");
    for (let i = 0; i < DealImage.length; i++) {
        DealImage[i].remove();
        
    }

    document.querySelector('#blackject-result').textContent = "Let's Play";
    document.querySelector('#blackject-result').style.color = "black";
}


function ShowCard(cards,ActivePlayer){
    if (ActivePlayer['score']<=21) {
        
    
    var img = document.createElement('img');
    
    img.src = `Static/images/${cards}.png`;
    document.querySelector(ActivePlayer['div']).appendChild(img);
    }
    hitSound.play();
}

function randumcards() {
    return cards[Math.floor(Math.random() * 13)]
}

function UpdateScore(ActivePlayer,card) {
    if (card =="A") {
        if (ActivePlayer['score'] + BackjectGame['cardsmap'][card][1] <= 21) {
            ActivePlayer['score'] += BackjectGame["cardsmap"][card][1]
        }else
        {
            ActivePlayer['score'] += BackjectGame["cardsmap"][card][0]
        }
        
        
    }else
    {
        ActivePlayer['score'] += BackjectGame["cardsmap"][card]
    }
    
}

function ShowScore(ActivePlayer) {
    if (ActivePlayer['score']>21) {
        document.querySelector(ActivePlayer["scoreSpan"]).textContent = "BUST!"
        document.querySelector(ActivePlayer["scoreSpan"]).style.color = 'red';
    }else
    {
        document.querySelector(ActivePlayer["scoreSpan"]).textContent = ActivePlayer["score"]
    }
    
}

function dealerLogic() {
    
    let card_dealer = randumcards();
    ShowCard(card_dealer,DEALER);
    UpdateScore(DEALER,card_dealer);
    ShowScore(DEALER);
    sleep(1000);
}

function computWinner() {
    let winner;
    if(YOU['score']<=21)
    {
        if (YOU['score']> DEALER['score'] || DEALER['score']<21) {
            BackjectGame['wins']++;
            winner = YOU;
        } else if(YOU['score']>DEALER['score']) {
            BackjectGame['lose']++;
            winner = DEALER;
        }else if(YOU['score'] === DEALER['score'])
        {
            BackjectGame['drew']++;
        }
    }
    else if(YOU['score']>21 &&  DEALER['score']<=21)
       {
        BackjectGame['lose']++;
           winner = DEALER;
       }
    else if(YOU['score']>21 && DEALER['score'] > 21)
    {
        BackjectGame['lose']++;
        winner = DEALER;
    }
    console.log('Winner is ',winner)
    return winner;
}

function ShowResult(winner)
{
    let message,messageColor
    if(winner==YOU){
        message = "You Won!";
        messageColor = 'Green';
        WinnerSound.play();
        document.querySelector('#wins').textContent = BackjectGame['wins'];
    }else if (winner==DEALER)
    {
        document.querySelector('#losses').textContent = BackjectGame['lose'];
        message = 'You Lose!';
        messageColor = 'red';
        LosserSound.play();
    }else{
        document.querySelector('#draws').textContent = BackjectGame['drew'];
        message = 'You drew!'
        messageColor = 'yellow'
    }
    document.querySelector('#blackject-result').textContent = message;
    document.querySelector('#blackject-result').style.color = messageColor;
}

function sleep(ms)
{
    return new Promise(resolve => setTimeout(resolve,ms))
}