const gameContainer = document.getElementById("game");
let firstBox = null;
let secondBox = null;
let noClicking = false;
let matches = 0;

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
function handleCardClick(event) {
  if (noClicking) return;
  if (event.target.classList.contains('colored')) return;
  event.target.style.backgroundColor = event.target.classList[0];

  if (!firstBox || !secondBox) {
    event.target.classList.add("colored");
    firstBox = firstBox || event.target;
    secondBox = event.target === firstBox ? null : event.target;}

  if (firstBox && secondBox) {
    noClicking = true;
 
  if (firstBox.className === secondBox.className) {
      firstBox.removeEventListener("click", handleCardClick);
      secondBox.removeEventListener("click", handleCardClick);
      firstBox = null;
      secondBox = null;
      noClicking = false
      matches = matches + 1
      console.log("You have found a match!!!")
      console.log("You now have a score of", matches, "out of 5")}
  else {
    setTimeout( function() {
      firstBox.style.backgroundColor = ""
      secondBox.style.backgroundColor = ""
      firstBox.classList.remove("colored")
      secondBox.classList.remove("colored")
      firstBox = null;
      secondBox = null;
      noClicking = false
      console.log("That is not a match. Please try again!")
    },1000)}
}

  if (matches === COLORS.length/2) {
    alert("You have won the game!")
    console.log("You have won the game!")
}}

// when the DOM loads
createDivsForColors(shuffledColors);