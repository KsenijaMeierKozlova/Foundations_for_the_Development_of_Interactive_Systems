/* 1 - Link to get a random meal: https://www.themealdb.com/api/json/v1/1/random.php */
/* 2 - Link to lookup a specific meal with an id: https://www.themealdb.com/api/json/v1/1/lookup.php?i= */
/* 3 - Link to search for meals using a keyword: https://www.themealdb.com/api/json/v1/1/search.php?s= */

let randomMealURL = 'https://www.themealdb.com/api/json/v1/1/random.php';
let mealURL = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';
let searchURL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

const mealsElement = document.getElementById("meals");
const favorites = document.querySelector(".favorites");
const searchTerm = document.querySelector("#search-term");
const searchBtn = document.querySelector("#search");

const getRandomMeal = async () => {
    const resp = await fetch(randomMealURL);
    const data = await resp.json();
    const randomMeal = data.meals[0];

    mealsElement.innerHTML = "";
    addMeal(randomMeal, true);
}

const addMeal = (mealData, random = false) => {
    const meal = document.createElement('div');
    meal.classList.add("meal");

    meal.innerHTML = `
        <div class="meal-header">
            ${random?`<span class="random">Meal of the Day</span>`: ""}
            <img src="${mealData.strMealThumb}" alt="${mealData.strMeal}">
        </div>
        <div class="meal-body">
            <h3>${mealData.strMeal}</h3>
            <button class="fav-btn">
                <i class="fas fa-heart"></i>
            </button>
        </div>`;

    let favoriteButton = meal.querySelector(".fav-btn");

    favoriteButton.addEventListener("click", () => {
        if (favoriteButton.classList.contains('active')) {
            favoriteButton.classList.remove('active');
            removeMealFromLocalStorage(mealData.idMeal);
        } else {
            favoriteButton.classList.add('active');
            addMealToLocalStorage(mealData.idMeal);
        }

        updateFavoriteMeals();
    });

    mealsElement.appendChild(meal);

    const mealHeader = meal.querySelector('.meal-header');

    mealHeader.addEventListener('click', () => {
        OpenMealDetailsPage();
    });


}

const addMealToLocalStorage = (mealId) => {
    const mealIds = getMealsFromLocalStorage();
    localStorage.setItem('mealIds', JSON.stringify([...mealIds, mealId]));
}

const removeMealFromLocalStorage = (mealId) => {
    const mealIds = getMealsFromLocalStorage();
    localStorage.setItem('mealIds', JSON.stringify(mealIds.filter(id => id !== mealId))
    );
}

const getMealsFromLocalStorage = () => {
    const mealIds = JSON.parse(localStorage.getItem('mealIds'));

    return mealIds === null ? [] : mealIds;
}

const updateFavoriteMeals = () => {
    favorites.innerHTML = "";
    const mealIds = getMealsFromLocalStorage();

    mealIds.forEach(async (mealId) => {
        let tmpMeal = await getMealByID(mealId);
        addMealToFavorites(tmpMeal);
    });
}

const getMealByID = async (id) => {
    const resp = await fetch(mealURL + id);
    const data = await resp.json();
    const output = data.meals[0];

    return output;
};

const addMealToFavorites = (mealData) => {
    const favoriteMeal = document.createElement('li');

    favoriteMeal.innerHTML = `
        <img id="fav-img" src="${mealData.strMealThumb}" alt="${mealData.strMeal}">
        <span>${mealData.strMeal}</span>
        <button class="clear"><i class="fas fa-window-close"></i></button>
    `;

    const clearBtn = favoriteMeal.querySelector('.clear');
    clearBtn.addEventListener("click", () => {
        removeMealFromLocalStorage(mealData.idMeal);
        updateFavoriteMeals();
    });

    favorites.appendChild(favoriteMeal);

    const favImg = favoriteMeal.querySelector('#fav-img');

    favImg.addEventListener('click', () => {
        OpenMealDetailsPage();
    })
}

const initMain = () => {
    getRandomMeal();
    updateFavoriteMeals();

    searchBtn.addEventListener('click', () => {
        const searchWord = searchTerm.value;
        searchForMeal(searchWord);
    });

    searchTerm.addEventListener('input', () => {
        const searchWord = searchTerm.value;
        searchForMeal(searchWord);
    });

    // Displaying the searched meals
    const searchForMeal = async (word) => {
        const searchResults = await getMealsBySearch(word);

        mealsElement.innerHTML = "";
        if (searchResults) {
            searchResults.forEach((meal) => addMeal(meal));
        }
    }

    // Searching the meals
    const getMealsBySearch = async (word) => {
        const resp = await fetch(searchURL + word);
        const data = await resp.json();
        const output = data.meals;

        return output;
    }
}


const OpenMealDetailsPage = (meal) => {
    window.open("details.html?mealId=" + meal.idMeal, "_self")
}

const initDetailsPage = () => {
    const urlParams = new URLSearchParams(window.location.search);
    let mealId = urlParams.get('mealId');
};