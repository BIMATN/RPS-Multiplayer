//RPS Multiplater Logic

/*----------------------------VARIABLES-----------------------------------*/

var playerCount;
var player1;
var player2;
var gameCode = '<br><div class="row"><div class="col-4"><div class="card mx-auto" style="width:20rem;border:2px solid grey"><div class="carousel slide" data-ride="carousel" data-interval="2000" id="carouselExampleIndicators"><div class="carousel-inner"><div class="carousel-item active"><img alt="First slide" class="d-block rpsPics w-100" src="assets/images/rps-rock.png" data-value="rock"></div><div class="carousel-item"><img alt="Second slide" class="d-block rpsPics w-100" src="assets/images/rps-paper.png" data-value="paper"></div><div class="carousel-item"><img alt="Third slide" class="d-block rpsPics w-100" src="assets/images/rps-scissors.png" data-value="scissors"></div></div></div><div class="card-body"><h4 class="text-center card-title" id="playerWeaponChoice">Choose Your Weapon</h4></div><ul class="list-group list-group-flush" style="color:#fff"><li class="list-group-item bg-success" id="Wins">Wins:<li class="list-group-item bg-danger" id="Losses">Losses:<li class="list-group-item bg-primary" id="Ties">Ties:</ul></div></div><div class="col-4"><div class="card" style="margin-top:20%;border:2px solid grey"><h2 class="text-center">Chat Room</h2><div class="form-group"><textarea class="form-control" id="chatBox" readonly rows="10"></textarea></div><div class="input-group mb-2 mb-sm-0 mr-sm-2"><div class="input-group-addon">Chat</div><input class="form-control" id="chatWrite" placeholder="Witty Banter Goes Here"> <button class="btn btn-primary" type="submit">Send</button></div></div></div><div class="col-4"><div class="card mx-auto" style="width:20rem;border:2px solid grey"><img alt="rules of the game" class="card-img-top" src="assets/images/rps-howto.png"><div class="card-body"><h4 class="text-center card-title">Opponent Choosing</h4><p class="text-center card-text" id="p2Name">Player 2 Name</div><ul class="list-group list-group-flush" style="color:#fff"><li class="list-group-item bg-success" id="opWins">Wins:<li class="list-group-item bg-danger" id="opLosses">Losses:<li class="list-group-item bg-primary" id="opTies">Ties:</ul></div></div>';

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
var database = firebase.database(); // declare variable to make the using firebase database easier


/*---------------------------FUNCTIONS----------------------------------*/

//Listen for player1 Choice
function player1Choice(){$(document).on("click", ".rpsPics", function (){
	event.preventDefault();
	player1.choice = $(this).data("value");
	database.ref('/player1').update({choice: player1.choice});
	$('.carousel').carousel('pause');
	$("#playerWeaponChoice").text("Your weapon: "+player1.choice);
})}


//Any time a value changes in the player1 object in firebase, a push of that whole object is sent to the client
database.ref('/player1').on("value", function (childSnapshot){
	player1 = childSnapshot.val();
	console.log(player1);
});
//Any time a value changes in the player1 object in firebase, a push of that whole object is sent to the client
database.ref('/player2').on("value", function (childSnapshot){
	player2 = childSnapshot.val();
	console.log(player2);
});

//Upon a client selecting the start button they receive a response dependant on player count and they are assigned a player object from the database if the server has room available
$(document).on("click", "#start", function(){
	if(player1.present === false && player2.present === false){
		database.ref('/player1').onDisconnect().update({choice:"", losses:0, present:false, ties:0, wins:0});
		$("#gameSection").html(gameCode);
		$('.carousel').carousel();
		database.ref('/player1').update({present :true}); //changes status of present to true because this user is now player1
		//We now look for weapon choice from player1
		player1Choice();
		database.ref('/player2/choice').on("value", function(){
			if(player1.choice === player2.choice){
				ties++;
				database.ref('/player1').update({ties: ties});
				$("#Ties").html("#Ties: "+player1.ties);
			}
			else if(player1.choice === "rock" && player2.choice === "scissors"){
				wins++;
				database.ref('/player1').update({wins: wins});
				$("#Ties").html("#Wins: "+player1.wins);
			}
			else if(player1.choice === "rock" && player2.choice === "paper"){
				losses++;
				database.ref('/player1').update({wins: wins});
				$("#Ties").html("#Wins: "+player1.wins);
			}
			else if(player1.choice === "scissors" && player2.choice === "paper"){
				wins++;
				database.ref('/player1').update({wins: wins});
				$("#Ties").html("#Wins: "+player1.wins);
			}
			else if(player1.choice === "scissors" && player2.choice === "rock"){
				wins++;
				database.ref('/player1').update({wins: wins});
				$("#Ties").html("#Wins: "+player1.wins);
			}
			else if(player1.choice === "paper" && player2.choice === "scissors"){
				wins++;
				database.ref('/player1').update({wins: wins});
				$("#Ties").html("#Wins: "+player1.wins);
			}
			else if(player1.choice === "paper" && player2.choice === "rock"){
				wins++;
				database.ref('/player1').update({wins: wins});
				$("#Ties").html("#Wins: "+player1.wins);
			}
		})
	}
	else if(player1.present === false && player2.present === true){
		database.ref('/player1').onDisconnect().update({choice:"", losses:0, present:false, ties:0, wins:0});
		$("#gameSection").html(gameCode);
		$('.carousel').carousel();
		database.ref('/player1').update({present :true}); //changes status of present to true because this user is now player1
		//We now look for weapon choice from player1
		player1Choice();
	}
	else if(player1.present === true && player2.present === false){
		database.ref('/player2').onDisconnect().update({choice:"", losses:0, present:false, ties:0, wins:0});
		$("#gameSection").html(gameCode);
		$('.carousel').carousel();
		database.ref('/player2').update({present :true}); //changes status of present to true because this user is now player2
		//We now look for weapon choice from player2
		$(document).on("click", ".rpsPics", function(){
			event.preventDefault();
			player2.choice = $(this).data("value");
			database.ref('/player2').update({choice: player2.choice});
			$('.carousel').carousel('pause');
			$("#playerWeaponChoice").text("Your weapon: "+player2.choice);
		})
	}
	else {
		$("#gameFull").text("This server is full. Please try again later. Thank you."); //rejects players because player1 and player 2 are set
	}
})