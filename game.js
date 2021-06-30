
var buttonColours = ["red", "blue", "green", "yellow"];
var level=0;
var started=false;
var gamePattern = [];
var userClickedPattern= [];
function nextSequence() {
	userClickedPattern =[];
	level++;
	$("#level-title").text("Level "+level);
  	var randomNumber = Math.floor(Math.random() * 4);
  	var randomChosenColour = buttonColours[randomNumber];
  	gamePattern.push(randomChosenColour);	

  	$("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

 	 playSound("sounds/" + randomChosenColour + ".mp3");

}	
$(".btn").click(function (){
	var userChoosenColor = $(this).attr("id");
	userClickedPattern.push(userChoosenColor);
	playSound("sounds/" + userChoosenColor+".mp3");
	animatePress(userChoosenColor);
	checkAnswer(userClickedPattern.length-1);
});
function playSound(name){
  var audio = new Audio(name);
  audio.play();
}
function animatePress(currentColor){
	$("#"+currentColor).addClass("pressed");

	setTimeout(function (){
		$("#" + currentColor).removeClass("pressed");
	},100);
}
$(document).on("keypress",function(){
	if(started===false){
		stated=true;
		$("#level-title").text("Level "+ level);
		nextSequence();
	}
});
function checkAnswer(currentIdx){
	if(userClickedPattern[currentIdx]!=gamePattern[currentIdx]){
		playSound("sounds/wrong.mp3");
		$("body").addClass("game-over");
		setTimeout(function (){
		$("body").removeClass("game-over");
		},200);
		$("#level-title").text("Game Over, Press Any Key to Restart");
		startOver();
	}else{
		console.log("success");
		if(userClickedPattern.length==gamePattern.length){
			setTimeout(function(){
				nextSequence();
			},1000);
		}
	}
}
function startOver(){
	level=0;
	started=false;
	gamePattern=[];
}