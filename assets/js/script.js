let displayDrink = function(data) {
    console.log(data.drinks);
};

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

let displayIngredients = function(data, event) {
    let ingredients = data.results[0].missedIngredients;
    let selectDiv = event.target;
    let newList = document.createElement("ul");
    selectDiv.appendChild(newList);

    for(let i = 0; i < ingredients.length; i++) {
        let newItem = document.createElement("li");
        newItem.textContent = ingredients[i].original;
        newList.appendChild(newItem);
    }

    cuisines.forEach(cuisine => {
        cuisine.removeEventListener("click", getRecipe);
        cuisine.addEventListener("click", getCocktail);
    });
};

let clearOtherMeals = function(event) {
    let mainBody = document.querySelector("section section")
    let selectedDish = $(event.target).closest("#cuisines")[0];

    while(mainBody.firstChild) {
        mainBody.removeChild(mainBody.firstChild);
    }

    mainBody.appendChild(selectedDish);
}

let getRecipe = function(event) {
    clearOtherMeals(event);
    let dish = $(event.target).closest("#cuisines").find(".title").text();
    let adairKey = "52217abe5a7b45b58b6466ee89a8d551";
    let apiUrl = "https://api.spoonacular.com/recipes/complexSearch?query=" + dish + "&fillIngredients=true&apiKey=" + adairKey;

    fetch(apiUrl).then(function(response) {
        if(response.ok) {
            response.json().then(function(data) {
                displayIngredients(data, event);
            })
        }
    })
};

let displayDishes = function(data) {
    for(let i = 0; i < data.results.length; i++) {
        let selectDiv = $("[target=dish" + i + "]");
        selectDiv[0].innerHTML = data.results[i].title;
    }

    cuisines.forEach(cuisine => {
        cuisine.removeEventListener("click", cuisineSelectEvent);
        cuisine.addEventListener("click", getRecipe);
    });
};

let getMeals = function(cuisine) {
    let adairKey = "52217abe5a7b45b58b6466ee89a8d551";
    let apiUrl = "https://api.spoonacular.com/recipes/complexSearch?cuisine=" + cuisine + "&number=3&apiKey=" + adairKey;

    fetch(apiUrl).then(function(response) {
        if(response.ok) {
            response.json().then(function(data) {
                displayDishes(data);
            })
        }
    })
};

let cuisineSelectEvent = function(event) {
    let choice = event.target.textContent;
    getMeals(choice.trim());
}

let cuisines = document.querySelectorAll("#cuisines");
cuisines.forEach(cuisine => {
    cuisine.addEventListener("click", cuisineSelectEvent)
});