var squares = document.querySelectorAll(".square");
var container = document.querySelector(".container");
var player = document.querySelector(".players");
var pass = document.querySelectorAll(".players input");
var pStatus = document.querySelectorAll(".pStatus");
var pname = document.querySelector("#pname");
var button = document.querySelector("button");
var label = document.querySelectorAll("label");
var pNums = [];
var tempNums = [];
var names = [];

setName();
check();


// disables the square container and player input field on page load
function disableContainer() {
    container.classList.add("disabledbutton");
    player.classList.add("disabledbutton");
}


// checks if the value entered in the text field is withing the range of squares and valid
function check() {
    for (var i = 0; i < pass.length; i++) {
        pass[i].addEventListener("change", function () {
            if (Number(this.value) <= 12 && Number(this.value) >= 0) {
                pNums.push(Number(this.value));
                tempNums.push(Number(this.value)); // Added line
                this.disabled = true;
                statusChange();
            }
            else {
                this.value = 0;
                alert("Enter valid Number");
            }
        });
    }
}


// add listener to squares and check if the div value matches the entered value
for (var i = 0; i < squares.length; i++) {
    squares[i].addEventListener("click", function () {
        // safeStatus(); // check if the player is safe of not
        for (var i = 0; i < tempNums.length; i++) {
            if (tempNums[i] == Number(this.innerText) && !lost(pNums)) {
                pStatus[i].textContent = "" + names[i] + " is safe."
                this.classList.add("safeSquare"); // newly added line
                removeNums(tempNums[i]);
            }
            else if (tempNums[i] == Number(this.innerText) && lost(pNums) && (pNums.length > 1)) {
                this.classList.add("lostSquare");
                container.classList.add("disabledbutton"); // new added line
                treat();
                // pStatus[i].textContent = "" + names[i] + " you owe us a treat. :D";

            }
        }
         this.classList.add("cut");
         //this.innerText = ".";
    });
}


// changes the aside status once player selected accurate number
function statusChange() {
    for (var i = 0; i < pStatus.length; i++) {
        if (pass[i].disabled)
            pStatus[i].textContent = "" + names[i] + " has selected the number";
    }
    // undo the container disabled state to select the square
    if (pNums.length == pStatus.length)
        container.classList.remove("disabledbutton");
}


// remove element from pNums array that is selected 
function removeNums(num) {
    const index = pNums.indexOf(num);
    pNums.splice(index, 1);

    // NEW CODE +++++++++++++++++++++++++++++++++++++++++++>>>>>>>>>>>>>>>>>>>>>>>
    if (pNums.length === 1) {
        var loseIndex = tempNums.indexOf(pNums[0]);
        pStatus[loseIndex].textContent = "" + label[loseIndex].textContent + " you owe us a treat. "
            + pNums[0] + " is unlucky for you my friend :D";


            squares[pNums[0] - 1].classList.add("lostSquare"); // new added line 
            container.classList.add("disabledbutton"); // new added line
        // NEW LINE
      
    }
}


// check if the pNum array has same numbers/elements. If yes then multiple losers
function lost(pNums) {
    const allEqual = arr => arr.every(v => v === arr[0])
    return allEqual(pNums);
}


// sets the players name on the left side labels
function setName() {
    button.addEventListener("click", function () {
        if (pname.value.length > 1 && names.length < 4) {
            names.push(pname.value);
            pname.value = ""; // new line
        }
        for (var i = 0; i < names.length; i++) {
            label[i].innerText = names[i];
            if (names.length == 4) {
                player.classList.remove("disabledbutton");
            }
        }
    });
}


// triggers when pNums have same elements and displays lost message to all the players with same number
function treat() {
    var text = "";
    var indexes = [];
    for (var i = 0; i < tempNums.length; i++) {
        if (tempNums[i] == pNums[0] && indexes.length < (pNums.length+1)) {
            indexes.push(i);
        }
    }
    for (var i = 0; i < indexes.length; i++) {
        text += label[indexes[i]].textContent + ", ";
    }
    text += "you guys owe us a treat. "
        + pNums[0] + " is unlucky for you guys :D";

    pStatus[indexes[0]].textContent = text;
    for (var i = 1; i < indexes.length; i++) {
        pStatus[indexes[i]].textContent = "";
    }
}
