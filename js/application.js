$(document).ready(function(){
    // init values
  	var guessesRemaining = 5;
    var theNumber = Math.floor(Math.random() * 100) + 1;
    var difference;  // determine how close the guess is
    var previousDifference = 0; // 0 will indicate no previous guess
    var guessesMade = {};  
    var currentGuess;
    var historyMessage = "";
    $('#playAgain').hide();
    $('#playerGuess').focus();

    function gameOverHideAndShow () {
      $("#checkGuess").hide();
      $("#giveHint").hide();
      $('#guessCount').hide();
      $('#playerGuess').hide();
      $('#theHistory').hide();
      $('#playAgain').show();
    };

    function checkTheGuess() {
      currentGuess = ($('#playerGuess').val());
      $('#playerGuess').val("");
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
      guessesRemaining--;

      if (difference == 0) {
        $('#result').text("Congratulations: You may pass!");
        gameOverHideAndShow();
        $('#titleImage').attr('src', './img/chicken.jpg');
        $('#theLead').text("Winner Winner! Chicken Dinner!");
      } else if (difference <= 5 && difference > 0) {
        $('#result').text("You are very hot. Guess a little higher");
        historyMessage += currentGuess + " = Very Hot. ";
      } else if (difference >= -5 && difference < 0) {
        $('#result').text("You are very hot. Guess a little lower");
        historyMessage += currentGuess + " = Very Hot. ";
      } else if (difference <= 10 && difference > 5) {
        $('#result').text("You are hot. Guess higher");
        historyMessage += currentGuess + " = Hot. ";
      } else if (difference >= -10 && difference < -5) {
        $('#result').text("You are hot. Guess lower");
        historyMessage += currentGuess + " = Hot. ";
      } else if (difference <= 20 && difference > 10) {
        $('#result').text("You are warm at best. Guess higher");
        historyMessage += currentGuess + " = Warm. ";
      } else if (difference >= -20 && difference < -10) {
        $('#result').text("You are warm at best. Guess lower");
        historyMessage += currentGuess + " = Warm. ";
      } else if (difference > 20) {
        $('#result').text("You are cold. Guess much higher");
        historyMessage += currentGuess + " = Cold. ";
      } else if (difference < 20) {
        $('#result').text("You are cold. Guess much lower");
        historyMessage += currentGuess + " = Cold. ";
      }
      if (guessesRemaining == 0) {
        $('#result').text("You have been cast into the gorge of eternal peril!");
        $('#titleImage').attr('src', './img/falling.jpg');
        $('#theLead').hide();
        gameOverHideAndShow();
      }else{
        $("#guessCount").text(guessesRemaining + " Guesses Remaining");
        $('#theHistory').text(historyMessage); 
        // check to see if player is closer to correct number as compared
        // to the previous guess.
        if (previousDifference != 0 && Math.abs(difference) <= Math.abs(previousDifference)){
          $('#theLead').text("Getting Hotter!");
        } else if (previousDifference !=0) {
          $('#theLead').text("Getting Colder!");
        }
        previousDifference = difference;
      }
    };

    $('#checkGuess').click(function(){
      checkTheGuess();
    });

    $('#playerGuess').keypress(function(event) {
      if(event.which == 13) {
        checkTheGuess();
      }
    });

    $('#playAgain').click(function(){
      $("#checkGuess").show();
      $("#giveHint").show();
      $('#guessCount').show();
      $('#playerGuess').show();
      $('#theHistory').show();
      $('#playAgain').hide();
      $('#theLead').show();
      guessesMade = {};
      historyMessage = "";
      theNumber = Math.floor(Math.random() * 100) + 1;
      guessesRemaining = 5;
      previousDifference = 0;
      $('#theHistory').text(historyMessage); 
      $('#result').text("Game has restarted... Good Luck!")
      $("#guessCount").text(guessesRemaining + " Guesses Remaining");
      $('#theLead').text("Guess correctly to pass or be cast into the gorge of eternal peril!");
      $('#titleImage').attr('src', './img/bridgegorge.jpg');
      $('#playerGuess').focus();
    }); 

    $('#giveHint').click(function() {
      $('#result').text("um.... you can try " + theNumber + ", but you didn't hear it from me!");
    });
  });