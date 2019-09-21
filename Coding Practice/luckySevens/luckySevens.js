//Function for clearing errors
function clearErrors() {    
    for (var loopCounter = 0; loopCounter < document.forms["luckySevens"].elements.length; loopCounter++) {
        if (document.forms["luckySevens"].elements[loopCounter].parentElement.className.indexOf("has-") != -1) {
            document.forms["luckySevens"].elements[loopCounter].parentElement.className = "form-group";
        }
    }    
} 

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
function playGame() {
    clearErrors();
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
    money = startingBet; //money active in the game
    var totalRolls = 0; //total rolls before going broke
    var highestAmt = 0; //highest amount won
    var rollCount = 0; //roll count at highest amount won
    
    var amtWon = new Array(); //Array for amount of money won per round
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
        
        if(total == 7) {
            money = money + 4;
            amtWon.unshift(money);
            amtWonRollsIndex.unshift(totalRolls);
        } else {
            money = money - 1;
            amtWon.unshift(money);
            amtWonRollsIndex.unshift(totalRolls);
        }
    }
    
    //Find highest value of amtWon
    highestAmt = findMax(amtWon);
    
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
    // We are returning false so that the form doesn't submit 
    // and so that we can see the results
    return false;
}