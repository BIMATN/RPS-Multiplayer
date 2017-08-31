//RPS Multiplater Logic

/*----------------------------VARIABLES-----------------------------------*/

var playerCount;
var player1;
var player2;
var gameCode = '<br><div class="row"><div class="col-4"><div class="card mx-auto" style="width:20rem;border:2px solid grey"><div class="carousel slide" data-ride="carousel" data-interval="2000" id="carouselExampleIndicators"><div class="carousel-inner"><div class="carousel-item active"><img alt="First slide" class="d-block rpsPics w-100" src="assets/images/rps-rock.png" data-value="rock" id="rock"></div><div class="carousel-item"><img alt="Second slide" class="d-block rpsPics w-100" src="assets/images/rps-paper.png" data-value="paper" id="paper"></div><div class="carousel-item"><img alt="Third slide" class="d-block rpsPics w-100" src="assets/images/rps-scissors.png" data-value="scissors" id="scissors"></div></div></div><div class="card-body"><h4 class="text-center card-title">Choose Your Weapon</h4></div><ul class="list-group list-group-flush" style="color:#fff"><li class="list-group-item bg-success" id="Wins">Wins:<li class="list-group-item bg-danger" id="Losses">Losses:<li class="list-group-item bg-primary" id="Ties">Ties:</ul></div></div><div class="col-4"><div class="card" style="margin-top:20%;border:2px solid grey"><h2 class="text-center">Chat Room</h2><div class="form-group"><textarea class="form-control" id="chatBox" readonly rows="10"></textarea></div><div class="input-group mb-2 mb-sm-0 mr-sm-2"><div class="input-group-addon">Chat</div><input class="form-control" id="chatWrite" placeholder="Witty Banter Goes Here"> <button class="btn btn-primary" type="submit">Send</button></div></div></div><div class="col-4"><div class="card mx-auto" style="width:20rem;border:2px solid grey"><img alt="rules of the game" class="card-img-top" src="assets/images/rps-howto.png"><div class="card-body"><h4 class="text-center card-title">Opponent Choosing</h4><p class="text-center card-text" id="p2Name">Player 2 Name</div><ul class="list-group list-group-flush" style="color:#fff"><li class="list-group-item bg-success" id="opWins">Wins:<li class="list-group-item bg-danger" id="opLosses">Losses:<li class="list-group-item bg-primary" id="opTies">Ties:</ul></div></div>';

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

//Listen for player Choice
function rpsListen (){

	$(document).on("click", ".rpsPicks", function(){
		event.preventDefault();
		player1.choice = this.value;
	})
}

database.ref('/player1').on("value", function (childSnapshot){
	player1 = childSnapshot.val();
	console.log(player1);
});
database.ref('/player2').on("value", function (childSnapshot){
	player2 = childSnapshot.val();
	console.log(player2);
});


$(document).on("click", "#start", function(){
	if(player1.present === false && player2.present === false){
		$("#gameSection").html(gameCode);
		$('.carousel').carousel();
		database.ref().update(player1, function(){
			present: true;
		});
	}
	else if(player1.present === false && player2.present === true){
		$("#gameSection").html(gameCode);
		$('.carousel').carousel();
	}
	else if(player1.present === true && player2.present === false){
		$("#gameSection").html(gameCode);
		$('.carousel').carousel();
	}
	else {
		$("#gameFull").text("This server is full. Please try again later. Thank you.");
	}
})