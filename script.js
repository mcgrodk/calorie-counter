const budget = document.querySelector("#budget");
const breakfast = document.querySelector("#breakfast");
const lunch = document.querySelector("#lunch");
const dinner = document.querySelector("#dinner");
const snacks = document.querySelector("#snacks");
const exercise = document.querySelector("#exercise");
const dropdown = document.querySelector("#dropdown");
const btnAdd = document.querySelector("#btn-add");
const btnCalculate = document.querySelector("#btn-calculate");
const btnClear = document.querySelector("#btn-clear");
const results = document.querySelector("#results");

btnAdd.onclick = addEntry;
btnCalculate.onclick = calculateCalories;
btnClear.onclick = clearForm;

function addEntry() {
    // Uses string interpolation to target HTML element with the ID of the dropdown menu's value
    const targetContainer = document.querySelector(`#${dropdown.value}`); 
    
    const entryNumber = targetContainer.querySelectorAll('input[type = "text"]').length + 1;

    const HTMLstring = `
    <div class="user-entry">
      <label for="entry-name">Entry ${entryNumber} Name</label>
      <input type="text" placeholder = "Entry name">
      <label for="entry-calories">Entry ${entryNumber} Calories</label>
      <input type="number"
      min = "0"
      id = "${dropdown.value}-${entryNumber}-calories"
      placeholder = "# of calories"
      />
    </div>
    `; // Add horizontal line here to separate entries for readability?;
    targetContainer.insertAdjacentHTML('beforeend', HTMLstring)
  }

  function getCaloriesFromInputs(list) {
    let calories = 0;
    
    for (const item of list) {
      calories += Number(item.value);
    }

    return calories;
}

function calculateCalories() {
  
    const budgetCalories = budget.value;
    
    // Build nodelists of each category by querySelecting all elements with that ID + inputs with type "number"
    // Access the "value" of all those number inputs in getCaloriesFromInputs function to add the calories
    const breakfastNumberInputs = document.querySelectorAll("#breakfast input[type = 'number']");
    const lunchNumberInputs = document.querySelectorAll("#lunch input[type = 'number']");
    const dinnerNumberInputs = document.querySelectorAll("#dinner input[type = 'number']");
    const snacksNumberInputs = document.querySelectorAll("#snacks input[type = 'number']");
    const exerciseNumberInputs = document.querySelectorAll("#exercise input[type = 'number']");
    
    const breakfastCalories = getCaloriesFromInputs(breakfastNumberInputs);
    const lunchCalories = getCaloriesFromInputs(lunchNumberInputs);
    const dinnerCalories = getCaloriesFromInputs(dinnerNumberInputs);
    const snacksCalories = getCaloriesFromInputs(snacksNumberInputs);
    const exerciseCalories = getCaloriesFromInputs(exerciseNumberInputs);
    
    const consumedCalories = breakfastCalories + lunchCalories + dinnerCalories + snacksCalories;
    const remainingCalories = (budgetCalories - consumedCalories) + exerciseCalories;

    displayResults(budgetCalories, consumedCalories, exerciseCalories, remainingCalories);
  }

  function displayResults(budgetCalories, consumedCalories, exerciseCalories, remainingCalories) {
    results.style.display = "block";
    let resultsString = `
    <span>${remainingCalories} Calories Remaining</span>
    <div id="results-summary">
      <span>Calorie Budget: ${budgetCalories} Calories Consumed: 
      ${consumedCalories} Calories Burned: ${exerciseCalories}</span>
    </div>
    `

    results.innerHTML = resultsString;
  }

  function clearForm() {
    budget.value = "";
    for (let entry of document.querySelectorAll(".user-entry")) { // for-of loop selects all "Entry" divs in fieldsets
      entry.remove();
    }
    results.style.display = "none";
  }