$(document).ready(function(){
    // init values
  	var guessesRemaining = 5;
    var theNumber = Math.floor(Math.random() * 100) + 1;
    var difference;  // determine how close the guess is
    var guessesMade = {};  
    var currentGuess;
    $('#playAgain').hide();

    $('#checkGuess').click(function(){
      currentGuess = ($('#playerGuess').val());
      //$('#titleImage').attr('src', './img/chicken.jpg');
      $('#playerGuess').val("");
      //$('#playerGuess').attr('placeholder', "Input A Number 1-100");
      // check to see if input is a number from 1-100
      if (isNaN(currentGuess) || currentGuess < 1 || currentGuess > 100) {
        $('#result').text("You must enter a number between 1 - 100");
        return;
      } 
      // check to see if player has previously used the current guess
      // if unique, store the guess
      if (guessesMade.hasOwnProperty(currentGuess)) {
        $('#result').text("You have already guessed " + currentGuess + ". Try Again!");
        return;
      } else {
        guessesMade[currentGuess] = guessesRemaining;
      }

    	difference = theNumber - (currentGuess);
     // $('#result').text(difference); // here for testing
      guessesRemaining--;

      if (difference == 0) {
        $('#result').text("Congratulations: You may pass!");
        $("#checkGuess").hide();
        $("#giveHint").hide();
        $('#guessCount').hide();
        $('#playerGuess').hide();
        $('#playAgain').show();
        $('#titleImage').attr('src', './img/chicken.jpg');
        $('#theLead').text("Winner Winner! Chicken Dinner!");
      } else if (difference <= 5 && difference > 0) {
        $('#result').text("You are very hot. Guess a little higher");
      } else if (difference >= -5 && difference < 0) {
        $('#result').text("You are very hot. Guess a little lower");
      } else if (difference <= 10 && difference > 5) {
        $('#result').text("You are hot. Guess higher");
      } else if (difference >= -10 && difference < -5) {
        $('#result').text("You are hot. Guess lower");
      } else if (difference <= 20 && difference > 10) {
        $('#result').text("You are warm at best. Guess higher");
      } else if (difference >= -20 && difference < -10) {
        $('#result').text("You are warm at best. Guess lower");
      } else if (difference > 20) {
        $('#result').text("You are cold. Guess much higher");
      } else if (difference < 20) {
        $('#result').text("You are cold. Guess much lower");
      }
      if (guessesRemaining == 0) {
        $('#result').text("You have been cast into the gorge of eternal peril!");
        $("#checkGuess").hide();
        $("#giveHint").hide();
        $('#guessCount').hide();
        $('#playerGuess').hide();
        $('#playAgain').show();
      }else{
        $("#guessCount").text(guessesRemaining + " Guessess Remaining"); 
      }

    });
    $('#playAgain').click(function(){
      $("#checkGuess").show();
      $("#giveHint").show();
      $('#guessCount').show();
      $('#playerGuess').show();
      $('#playAgain').hide();
      guessesMade = {};
      $('#result').text("Game as restarted... Good Luck!")
      guessesRemaining = 5;
      $("#guessCount").text(guessesRemaining + " Guessess Remaining");
      $('#theLead').text("Guess correctly to pass or be cast into the gorge of eternal peril!");
      $('#titleImage').attr('src', './img/bridgegorge.jpg');
    }); 

    $('#giveHint').click(function() {
      $('#result').text("um.... you can try " + theNumber + ", but you didn't hear it from me!");
    });
  });