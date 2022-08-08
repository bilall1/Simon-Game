var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = -1;


function checkPattern(index) {

    if (gamePattern[index] == userClickedPattern[index]) {
        return 1;

    } else {
        return 0;
    }

}


function gameOver() {

    $("#body1").addClass("game-over");
}

function remove(currentColour) {

    $("#" + currentColour).removeClass("pressed");
}


function animatePress(currentColour) {

    $("#" + currentColour).addClass("pressed");
    setTimeout(function() { remove(currentColour); }, 500);
}

function nextSequence() {

    randomNumber = (Math.floor(Math.random() * 4));

    var randomChosenColour = buttonColours[randomNumber];

    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    var fileName = "sounds/" + randomChosenColour + ".mp3";
    var audio = new Audio(fileName);
    audio.play();


}

$(document).keypress(function(event) {

    var whichKey = event.key;

    
    if (whichKey === 'r' ){
        location.reload();
    }


    if (whichKey === 'Enter' && level === -1) {
        level = 0;
        $("#level-title").text("Level " + level);
        nextSequence();


        $(".btn").click(function(event) {

            var userChosenColour = event.target.id;

            userClickedPattern.push(userChosenColour);

            animatePress(userChosenColour);
            $("#" + userChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

            var fileName = "sounds/" + userChosenColour + ".mp3";
            var audio = new Audio(fileName);
            audio.play();

            var index = (userClickedPattern.length) - 1;

            var answer = checkPattern(index);

            if (answer == 0) {
                $("#level-title").text("Game Over! Press r to Restart !!!!");
                level = -1;
                gamePattern.length = 0;
                userClickedPattern.length = 0;
                gameOver();

                var fileName = "sounds/wrong.mp3";
                var audio = new Audio(fileName);
                audio.play();
                
                return;
            }
            
            if ((userClickedPattern.length === gamePattern.length)) {

                userClickedPattern.length = 0;
                setTimeout(function() {
                    level = level + 1;
                    nextSequence();

                    $("#level-title").text("Level " + level);
                }, 1200);

            }
        });
    }
});