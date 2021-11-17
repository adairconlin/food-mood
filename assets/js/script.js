
let getMeals = function(cuisine) {
    let adairKey = "52217abe5a7b45b58b6466ee89a8d551";
    let apiUrl = "https://api.spoonacular.com/recipes/complexSearch?cuisine=" + cuisine + "&number=3&apiKey=" + adairKey;

    fetch(apiUrl).then(function(response) {
        if(response.ok) {
            response.json().then(function(data) {
                console.log(data);
            })
        }
    })
};

let cuisines = document.querySelectorAll("#cuisines");
cuisines.forEach(cuisine => {
    cuisine.addEventListener("click", function(event) {
        let choice = event.target.textContent;
        getMeals(choice.trim());
    })
});