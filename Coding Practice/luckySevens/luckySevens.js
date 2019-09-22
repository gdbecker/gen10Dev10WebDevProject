//Function for clearing errors
function clearErrors() {    
    for (var loopCounter = 0; loopCounter < document.forms["luckySevens"].elements.length; loopCounter++) {
        if (document.forms["luckySevens"].elements[loopCounter].parentElement.className.indexOf("has-") != -1) {
            document.forms["luckySevens"].elements[loopCounter].parentElement.className = "form-group";
        }
    }    
} 

//Function to clear the game in case the user wants to play again
//Attached to "Play Again" button
function resetGame() {
    clearErrors();
    document.forms["luckySevens"]["startingBet"].value = "";
    document.getElementById("results").style.visibility = "hidden";
    document.forms["luckySevens"]["startingBet"].focus();
}

//Function for rolling a 6-sided die
function rollDice() {
  return Math.floor(Math.random() * 6) + 1;
}

//Function for finding highest value in an array
function findMax(Array) {
    var max = 0;
    var testNum = 0;
    for(var i = 0; i < Array.length; i++) {
        testNum = Array[i];
        if(testNum>max) {
            max = testNum;  
        }
    }
    return max;
}

//Primary function for the Lucky Sevens game
//Attached to "Play" button
function playGame() {
    clearErrors();
    
    //Collect starting bet amount for the game
    //Check to make sure that it's a valid amount, otherwise notify of error and exit
    var startingBet = document.forms["luckySevens"]["startingBet"].value;
    if (startingBet == "" || isNaN(startingBet) || startingBet <= 0) {
        alert("Please place a bet greater than $0.00");
        document.forms["luckySevens"]["startingBet"]
           .parentElement.className = "form-group has-error";
        document.forms["luckySevens"]["startingBet"].focus();
        return false;
    }
    
    //Define key variables and initialize them
    var money = 0;
    money = Number(startingBet); //money active in the game, convert from string input
    var totalRolls = 0; //total rolls before going broke
    var highestAmt = 0; //highest amount won
    var rollCount = 0; //roll count at highest amount won
    
    var amtWon = new Array(); //Array for amount of money held at each round
    var amtWonRollsIndex = new Array(); //Array for the roll # index of above Array
    
    var die1 = 0;
    var die2 = 0;
    var total = 0;
    
    //Loop to play the game
    while(money>0) {
        //roll dice
        die1 = rollDice();
        die2 = rollDice();
        total = die1 + die2;
        totalRolls++;
        
        //Decision tree as game goes on
        if(total == 7) {
            money = money + 4;
            amtWon.push(money); //keep track of the amount of money held at each round
            amtWonRollsIndex.push(totalRolls); //roll index array for above
        } else {
            money = money - 1;
            amtWon.push(money); //keep track of the amount of money held at each round
            amtWonRollsIndex.push(totalRolls); //roll index array for above
        }
    }
    
    //Find highest value of amtWon
    highestAmt = findMax(amtWon);
    
    //Total rolls before going broke
    totalRolls = totalRolls - 1; //since final roll was the one that got player broke
    
    //Find the roll count for the highest amount won
    var highestAmtIndex = amtWon.indexOf(highestAmt);
    rollCount = amtWonRollsIndex[highestAmtIndex];
    
    //Format results
    var stringStartingBet = startingBet.toString();
    var stringHighestAmt = highestAmt.toString();
    var dollar = "$";
    var displayStartingBet = dollar.concat(stringStartingBet);
    var displayHighestAmt = dollar.concat(stringHighestAmt);
    
    //Display results information within the div
    document.getElementById("results").style.visibility = "visible";
    document.getElementById("startBet").innerText = displayStartingBet;
    document.getElementById("totalRolls").innerText = totalRolls;
    document.getElementById("highestAmt").innerText = displayHighestAmt;
    document.getElementById("rollCount").innerText = rollCount;
    
    // Returning false so that the form doesn't submit and to see results 
    return false;
}