let buttonColors = ["red", "blue", "green", "yellow"]
let gamePattern = []
let userClickedPattern = []
let level = 0
let started = false

function nextSequence(){
    let randomNumber = Math.floor(Math.random() * 4)
    let randomChosenColor = buttonColors[randomNumber]
    gamePattern.push(randomChosenColor)
    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100)
    let audio = new Audio("sounds/" + randomChosenColor + ".mp3")
    audio.play()
    level++
    $("h1").text("Level " + level)
}

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel] == gamePattern[currentLevel]){
        if(userClickedPattern.length === gamePattern.length){
            userClickedPattern = []
            setTimeout(function(){
                nextSequence()
            },1000) 
        }
    } else { // Game Over
        let audio = new Audio("sounds/wrong.mp3")
        audio.play()
        $("body").addClass("game-over")
        setTimeout(function(){
            $("body").removeClass("game-over")
        }, 200)
        $("h1").text("Game Over, Press Any Key To Try Again")
        started = false
        level = 0
        userClickedPattern = []
        gamePattern = []
    }
}

$(".btn").on("click", function(event){
    let userChoice = event.target.id
    userClickedPattern.push(userChoice)
    $("#" + userChoice).fadeIn(100).fadeOut(100).fadeIn(100)
    let audio = new Audio("sounds/" + userChoice + ".mp3")
    audio.play()
    checkAnswer(userClickedPattern.length - 1)

})

$("html").keypress(function(){
    if(!started) nextSequence()
    started = true
    $("h1").text("Level " + level)
})

