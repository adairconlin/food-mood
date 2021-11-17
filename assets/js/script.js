let getCocktail = function() {
    fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php").then(function(response) {
        if(response.ok) {
            response.json().then(function(data) {
                console.log(data.drinks[0].strDrink);
            })
        }
    })
}

let displayDishes = function(data) {
    for(let i = 0; i < data.results.length; i++) {
        let selectDiv = $("[target=dish" + i + "]");
        selectDiv[0].innerHTML = data.results[i].title;
    }

    cuisines.forEach(cuisine => {
        cuisine.removeEventListener("click", cuisineSelectEvent);
        cuisine.addEventListener("click", getCocktail);
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