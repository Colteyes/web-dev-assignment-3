/********* create variables *********/
// useful variables might be: the cost per day, the number of days selected, and elements on the screen that will be clicked or will need to be modified. 
// Do any of these variables need to be initialized when the page is loaded? 
// When do they need to be reset or updated?



let selectedDays = 0; //tracks how many days are selected
let isFullDay = true; //whether or not full days was selected
let dailyRate = 35; //tracks the price between full and half days (Full days is on by default)

const dayButtons = document.querySelectorAll(".day-selector li"); //selects all the buttons in the week list
const fullButton = document.getElementById("full"); //gets every other button with the ids
const halfButton = document.getElementById("half");
const costDisplay = document.getElementById("calculated-cost");
const clearButton = document.getElementById("clear-button");;


/********* colour change days of week *********/
// when the day buttons are clicked, we will apply the "clicked" class to that element, and update any other relevant variables. Then, we can recalculate the total cost.
// added challenge: don't update the dayCounter if the same day is clicked more than once. hint: .classList.contains() might be helpful here!
dayButtons.forEach(button => { //for each button do this:
  button.addEventListener("click", () => { //check if it's been clicked on
  
  button.classList.toggle("clicked"); //change it to the clicked class

  if (button.classList.contains("clicked")) { //once it's been clicked either:
    selectedDays++; //add it to the tracker
  } else {
    selectedDays--; //or decrease it if not
  }

  // recalc cost
  updateCost();
  });
});




/********* clear days *********/
// when the clear-button is clicked, the "clicked" class is removed from all days, any other relevant variables are reset, and the calculated cost is set to 0.

clearButton.addEventListener('click', () => {
  dayButtons.forEach(button => {//for each button on the week list:
    if (button.classList.contains('clicked')){ //check if they were clicked on 
      button.classList.remove('clicked')//if they were, remove it.
    }  
  });
  selectedDays = 0;//reset back to default values

  halfButton.classList.remove('clicked');//put it back to default state with full button on
  fullButton.classList.add('clicked');
  dailyRate = 35; 

  costDisplay.textContent = 0;

});




/********* change rate *********/
// when the half-day button is clicked, set the daily rate to $20, add the "clicked" class to the "half" element, remove it from the "full" element, and recalculate the total cost.

halfButton.addEventListener('click', () => {
  dailyRate = 20;

  isFullDay = false;
  
  halfButton.classList.add('clicked');
  fullButton.classList.remove('clicked');

  updateCost();

});



// when the full-day button is clicked, the daily rate is set back to $35, the clicked class is added to "full" and removed from "half", and the total cost is recalculated.

fullButton.addEventListener('click', () => {
  dailyRate = 35;

  isFullDay = true;
  
  fullButton.classList.add('clicked');
  halfButton.classList.remove('clicked');

  updateCost();

});



/********* calculate *********/
// when a calculation is needed, set the innerHTML of the calculated-cost element to the appropriate value

function updateCost(){
  let total = selectedDays * dailyRate;

  costDisplay.textContent = total; 
}
