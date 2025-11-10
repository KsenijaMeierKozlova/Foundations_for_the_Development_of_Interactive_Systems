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

const getRandomMeal = async () => {
    const resp = await fetch(randomMealURL);
    const data = await resp.json();
    console.log(data.meals[0]);
}

getRandomMeal();