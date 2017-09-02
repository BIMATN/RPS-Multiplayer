//RPS Multiplayer Logic

/*----------------------------VARIABLES-----------------------------------*/

var player1;//player 1 object reflects database
var player2;//player 2 object reflects database
var hero;
var villain;
var gameCode = '<br><div class="row"><div class="col-4"><div class="card mx-auto" style="width:20rem;border:2px solid grey"><div class="carousel slide" data-ride="carousel" data-interval="2000" id="carouselExampleIndicators"><div class="carousel-inner"><div class="carousel-item active"><img alt="First slide" class="d-block rpsPics w-100" src="assets/images/rps-rock.png" data-value="rock"></div><div class="carousel-item"><img alt="Second slide" class="d-block rpsPics w-100" src="assets/images/rps-paper.png" data-value="paper"></div><div class="carousel-item"><img alt="Third slide" class="d-block rpsPics w-100" src="assets/images/rps-scissors.png" data-value="scissors"></div></div></div><div class="card-body"><h4 class="text-center card-title" id="playerWeaponChoice">Choose Your Weapon</h4></div><ul class="list-group list-group-flush" style="color:#fff"><li class="list-group-item bg-success" id="wins">Wins:<li class="list-group-item bg-danger" id="losses">Losses:<li class="list-group-item bg-primary" id="ties">Ties:</ul></div></div><div class="col-4"><div class="card" style="margin-top:20%;border:2px solid grey"><h2 class="text-center">Chat Room</h2><div class="form-group"><textarea class="form-control" id="chatBox" readonly rows="10"></textarea></div><div class="input-group mb-2 mb-sm-0 mr-sm-2"><div class="input-group-addon">Chat</div><input class="form-control" id="chatWrite" placeholder="Witty Banter Goes Here"> <button class="btn btn-primary" type="submit">Send</button></div></div></div><div class="col-4"><div class="card mx-auto" style="width:20rem;border:2px solid grey"><img alt="rules of the game" class="card-img-top" src="assets/images/rps-howto.png"><div class="card-body"><h4 class="text-center card-title">Opponent Choosing</h4><p class="text-center card-text" id="p2Name">Oppossing Force</div><ul class="list-group list-group-flush" style="color:#fff"><li class="list-group-item bg-success" id="opWins">Wins:<li class="list-group-item bg-danger" id="opLosses">Losses:<li class="list-group-item bg-primary" id="opTies">Ties:</ul></div></div>';

// Initialize Firebase
var config = {
  apiKey: "AIzaSyCvMFh6oDXHag4HC4Q7PHvVTHIzyWlEfUM",
  authDomain: "bimatn-rps-multiplayer.firebaseapp.com",
  databaseURL: "https://bimatn-rps-multiplayer.firebaseio.com",
  projectId: "bimatn-rps-multiplayer",
  storageBucket: "bimatn-rps-multiplayer.appspot.com",
  messagingSenderId: "542772235303"
};
firebase.initializeApp(config);
var database = firebase.database(); // declare variable to make using firebase database easier


/*---------------------------------------------------------------FUNCTIONS----------------------------------------------------------------------*/

//function runs tests for who won and updates player screens accordingly, but only after the villain has made their choice
function gamePlay (){
		if((player1.choice==="rock"&&player2.choice==="rock")||(player1.choice==="scissors"&&player2.choice==="scissors")||(player1.choice==="paper"&&player2.choice==="paper")){
			player1.ties++;
			player2.ties++;
			database.ref('/player1').update({ties: player1.ties});
			database.ref('/player2').update({ties: player2.ties});
			$("#ties").html("Ties: "+hero.ties);
			$("#opTies").html("Ties: "+villain.ties);
		}
		else if(player1.choice === "rock" && player2.choice === "scissors"){
			player1.wins++;
			player2.losses++;
			database.ref('/player1').update({wins: player1.wins});
			database.ref('/player2').update({losses: player2.losses});
			$("#wins").html("Wins: "+hero.wins);
			$("#opLosses").html("Losses: "+villain.losses);
		}
		else if(player1.choice === "rock" && player2.choice === "paper"){
			player1.losses++;
			player2.wins++;
			database.ref('/player1').update({losses: player1.losses});
			database.ref('/player2').update({wins: player2.wins});
			$("#losses").html("Losses: "+hero.losses);
			$("#opWins").html("Wins: "+villain.wins);
		}
		else if(player1.choice === "scissors" && player2.choice === "paper"){
			player1.wins++;
			player2.losses++;
			database.ref('/player1').update({wins: player1.wins});
			database.ref('/player2').update({losses: player2.losses});
			$("#wins").html("Wins: "+hero.wins);
			$("#opLosses").html("Losses: "+villain.losses);
		}
		else if(player1.choice === "scissors" && player2.choice === "rock"){
			player1.losses++;
			player2.wins++;
			database.ref('/player1').update({losses: player1.losses});
			database.ref('/player2').update({wins: player2.wins});
			$("#losses").html("Losses: "+hero.losses);
			$("#opWins").html("Wins: "+villain.wins);
		}
		else if(player1.choice === "paper" && player2.choice === "scissors"){
			player1.losses++;
			player2.wins++;
			database.ref('/player1').update({losses: player1.losses});
			database.ref('/player2').update({wins: player2.wins});
			$("#losses").html("Losses: "+hero.losses);
			$("#opWins").html("Wins: "+villain.wins);
		}
		else if(player1.choice === "paper" && player2.choice === "rock"){
			player1.wins++;
			player2.losses++;
			database.ref('/player1').update({wins: player1.wins});
			database.ref('/player2').update({losses: player2.losses});
			$("#wins").html("Wins: "+hero.wins);
			$("#opLosses").html("Losses: "+villain.losses);
		}
		else{
			return;
		}
}

//function for processing player choice
function playerChoice(){
	
	$(document).on("click", ".rpsPics", function (){
		event.preventDefault();
		hero.choice = $(this).data("value");
		if(hero.name === "player1")
		{
			database.ref('/player1').update({choice: hero.choice});
			$('.carousel').carousel('pause');
			$("#playerWeaponChoice").text("Your weapon: "+hero.choice);
		}
		else
		{
			database.ref('/player2').update({choice: hero.choice});
			$('.carousel').carousel('pause');
			$("#playerWeaponChoice").text("Your weapon: "+hero.choice);
		}
	})
}

//Function for starting game
function loadGame() {
	
	database.ref('/'+hero.name).onDisconnect().update({choice:"", losses:0, present:false, ties:0, wins:0});
	$("#gameSection").html(gameCode);
	$('.carousel').carousel();
	database.ref('/'+hero.name).update({present :true}); //changes database status of present to true because this hero is now playerX
}


/*------------------------------------------------------------Game Run-------------------------------------------------*/

//player 1 Object Monitor
database.ref('/player1').once("value").then(function (childSnapshot){
	player1 = childSnapshot.val();
	console.log(player1);
	hero=player1;
})
//player 2 Object Monitors
database.ref('/player2').once("value").then(function (childSnapshot){
	player2 = childSnapshot.val();
	console.log(player2);
	villain=player2;
})

//Upon a client selecting the start button they receive a response dependant on player count and they are assigned a player object from the database if the server has room available
$(document).on("click", "#start", function(){
	if(player1.present===false&&player2.present===false){
		//player 1 Object Monitor
		database.ref('/player1').on("value", function (childSnapshot){
			player1 = childSnapshot.val();
			console.log(player1);
			hero=player1;
		})
		//player 2 Object Monitors
		database.ref('/player2').on("value", function (childSnapshot){
			player2 = childSnapshot.val();
			console.log(player2);
			villain=player2;
		})
		loadGame();
		playerChoice();
		database.ref('/player1/choice').on("value", function(){gamePlay()});
		database.ref('/player2/choice').on("value", function(){gamePlay()});
	}
	else if(player1.present===false&&player2.present===true){
		//player 1 Object Monitor
		database.ref('/player1').on("value", function (childSnapshot){
			player1 = childSnapshot.val();
			console.log(player1);
			hero=player1;
		})
		//player 2 Object Monitors
		database.ref('/player2').on("value", function (childSnapshot){
			player2 = childSnapshot.val();
			console.log(player2);
			villain=player2;
		})
		loadGame();
		playerChoice();
		database.ref('/player1/choice').on("value", function(){gamePlay()});
		database.ref('/player2/choice').on("value", function(){gamePlay()});
	}
	else if(player1.present===true&&player2.present===false){
		//player 1 Object Monitor
		database.ref('/player1').on("value", function (childSnapshot){
			player1 = childSnapshot.val();
			console.log(player1);
			villain=player1;
		})
		//player 2 Object Monitors
		database.ref('/player2').on("value", function (childSnapshot){
			player2 = childSnapshot.val();
			console.log(player2);
			hero=player2;
		})
		loadGame();
		playerChoice();
		database.ref('/player1/choice').on("value", function(){gamePlay()});
		database.ref('/player2/choice').on("value", function(){gamePlay()});
	}
	else {
		$("#gameFull").text("This server is full. Please try again later. Thank you."); //rejects players because player1 and player2 are set
	}
})
