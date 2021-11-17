let displayDishes = function(data) {
    let targetDiv = document.querySelectorAll("#cuisines")
    targetDiv.forEach(div => {
        let target = div.getAttribute("target");
        if(target === "0") {
            div.textContent = data.results[0].title;
        } else if(target === "1") {
            div.textContent = data.results[1].title;
        } else {
            div.textContent = data.results[2].title;
        }
        div.removeEventListener("click", cuisineEvent);
    })
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

let cuisineEvent = function(event) {
    let choice = event.target.textContent;
    getMeals(choice.trim());
}

let cuisines = document.querySelectorAll("#cuisines");
cuisines.forEach(cuisine => {
    cuisine.addEventListener("click", cuisineEvent)
});