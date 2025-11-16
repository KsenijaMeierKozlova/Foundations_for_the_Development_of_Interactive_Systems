/* 1 - Link to get a random meal: https://www.themealdb.com/api/json/v1/1/random.php */

/* 2 - Link to lookup a specific meal with an id: https://www.themealdb.com/api/json/v1/1/lookup.php?i= */

/* 3 - Link to search for meals using a keyword: https://www.themealdb.com/api/json/v1/1/search.php?s= */

let randomMealURL = 'https://www.themealdb.com/api/json/v1/1/random.php';

/* const getRandomMeal = () => {
    fetch(randomMealURL)
    .then((item) => item.json())
    .then((data) => console.log(data.meals[0]))
    .catch((err) => console.log("There was issue in the fetching ", err));
} */

const mealsElement = document.getElementById("meals");

const getRandomMeal = async () => {
    const resp = await fetch(randomMealURL);
    const data = await resp.json();
    const randomMeal = data.meals[0];

    mealsElement.innerHTML = "";
    
    addMeal(randomMeal);
}

getRandomMeal();

const addMeal = (mealData) => {
    const meal = document.createElement('div');
    meal.classList.add("meal");

    meal.innerHTML = `<div class="meal-header">
                        <span class="random">Meal of the Day</span>
                        <img src="${mealData.strMealThumb}" alt="${mealData.strMeal}">
                    </div>
                    <div class="meal-body">
                        <h3>${mealData.strMeal}</h3>
                            <button class="fav-btn">
                            <i class="fas fa-heart"></i>
                        </button>
                    </div>`;
    
    let favouriteButton = meal.querySelector(".fav-btn");
    favouriteButton.addEventListener("click", () => {
        if(favouriteButton.classList.contains('active')) {
            favouriteButton.classList.remove('active')
        } else {
            favouriteButton.classList.add('active');
            addMealToLocalStorage(mealData.idMeal);
        }
    })
    
    mealsElement.appendChild(meal);
}

const addMealToLocalStorage = (mealId) => {
    const mealIds = getMealsFromLocalStorage();

    localStorage.setItem('mealId', JSON.stringify([...mealIds, mealId]));
}

const removeMealFromLocalStorage = (mealId) => {
    const mealIds = getMealsFromLocalStorage();
    localStorage.setItem('mealIds', JSON.stringify(mealIds.filter(id => id != mealId)));
}

const getMealsFromLocalStorage = () => {
    const mealIds = JSON.parse(localStorage.getItem('mealIds'));

    return mealIds === null? [] : mealIds;
}