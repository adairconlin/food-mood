// Display the cocktail and it's ingredients on the page
let displayDrink = function(data) {
    console.log(data.drinks);
};

// Replace this fetch with the correct url with the corresponding cocktail
// based on the selected dish
let getCocktail = function() {
    // Call API three times for three random drinks
    for(let i = 0; i < 3; i++) {
        fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php").then(function(response) {
            if(response.ok) {
                response.json().then(function(data) {
                    displayDrink(data);
                })
            }
        })
    }
};

let displayIngredients = function(data) {
    // Assign the ingredient array to the variable `ingredients`
    let ingredients = data.results[0].missedIngredients;
    let mainBody = document.querySelector(".options-container");

    let newList = document.createElement("ul");
    mainBody.appendChild(newList);

    // Loop through the ingredients array and display ingredients
    for(let i = 0; i < ingredients.length; i++) {
        let newItem = document.createElement("li");
        newItem.textContent = ingredients[i].original;
        newList.appendChild(newItem);
    }

    // Replace current event listener - might have to be in another place?
    cuisines.forEach(cuisine => {
        cuisine.removeEventListener("click", getRecipe);
        cuisine.addEventListener("click", getCocktail);
    });
};

let clearOtherMeals = function(event) {
    // Grab main section with meal options as child elements
    let mainBody = document.querySelector(".options-container");
    // Assign the div of the meal that the user chose
    let selectedDish = $(event.target).closest("#cuisines")[0];

    // Clear the main section
    while(mainBody.firstChild) {
        mainBody.removeChild(mainBody.firstChild);
    }

    // Add the div of the meal that the user chose
    mainBody.appendChild(selectedDish);
}

// When a meal is selected, display the ingredient data of that specified meal
let getRecipe = function(event) {
    // Call function to clear other meal options
    clearOtherMeals(event);
    // Find the correct element with dish name based on the event variable
    let dish = $(event.target).closest("#cuisines").find(".title").text();
    // Add a variable with your own API key and replace mine in the apiUrl
    let adairKey = "52217abe5a7b45b58b6466ee89a8d551";
    let apiUrl = "https://api.spoonacular.com/recipes/complexSearch?query=" + dish + "&fillIngredients=true&apiKey=" + adairKey;

    // Grab ingredient data from the specified dish
    fetch(apiUrl).then(function(response) {
        if(response.ok) {
            response.json().then(function(data) {
                // Call displayIngredients() with the dish data
                displayIngredients(data, event);
            })
        }
    })
};

// Display the loaded meals
let displayDishes = function(data) {
    // Loop through the amount of meal results and display them on the page
    for(let i = 0; i < data.results.length; i++) {
        // Search for the correct div specified by its targe attribute
        let selectDiv = $("[target=dish" + i + "]");
        let parentDiv = selectDiv[0].parentNode;
        selectDiv[0].innerHTML = data.results[i].title;
        parentDiv.style.backgroundImage = ("url('" + data.results[i].image + "')");
        parentDiv.style.backgroundRepeat = "no-repeat";
    }

    // Remove initial event listener and add another onClick event listener
    // to call getRecipe() when a meal is selected
    cuisines.forEach(cuisine => {
        cuisine.removeEventListener("click", cuisineSelectEvent);
        cuisine.addEventListener("click", getRecipe);
    });
};

// Search for a specified amount of meals based on the selected cuisine
let getMeals = function(cuisine) {
    // Add your own apiKey and replace mine in the apiUrl
    let adairKey = "52217abe5a7b45b58b6466ee89a8d551";
    let apiUrl = "https://api.spoonacular.com/recipes/complexSearch?cuisine=" + cuisine + "&number=6&apiKey=" + adairKey;

    fetch(apiUrl).then(function(response) {
        if(response.ok) {
            response.json().then(function(data) {
                // Get meal data from selected cuisine and call displayDishes()
                displayDishes(data);
            })
        }
    })
};

//  When the user clicks on a cuisine options, this function saves
// that cuisine, trims the contents of any whitespace, then calls getMeals()
let cuisineSelectEvent = function(event) {
    let choice = event.target.textContent;
    getMeals(choice.trim());
}

// Add an onClick event listener for the cuisine boxes
let cuisines = document.querySelectorAll("#cuisines");
cuisines.forEach(cuisine => {
    cuisine.addEventListener("click", cuisineSelectEvent)
});