import { mapRawCocktailData } from "./utilities.js"; //importing function to get a good object

function searchFunciton() {
    const searchfunktion = document.getElementById("search").value;
    // search funktionen här när jag får tag på id
}




//randomcocktail api
const randomcocktailapi = "https://www.thecocktaildb.com/api/json/v1/1/random.php";

const randomCocktailButton = document.querySelector(".randomCocktail")

async function randomcocktail() {
    try {
        const responeRandomCocktail = await fetch(randomcocktailapi);
        const response = await responeRandomCocktail.json(); //omvandlar till JSON 

        const cocktail = response.drinks ? response.drinks[0] : response; //man får en undefined cocktail så behöver vi denna if checken (ternary operator enl wiktor) 
        // översatt cocktail = är detta sant?  isåfall gör detta : annars gör detta
        //om en cocktail finns så mappas den genom funktionen
        const mappedcocktail = mapRawCocktailData(cocktail);
        console.log(mappedcocktail); //skriver ut mappad cocktail
        
        //innerhtml för visa cocktail grundinfo
        const randomCocktailName = mappedcocktail.name;
        const randomCocktailImage = mappedcocktail.thumbnail;
        const randomcocktailInfo = document.querySelector(".cocktailSection");
        randomcocktailInfo.innerHTML = `
        <strong>${randomCocktailName}</strong>
        <img src="${randomCocktailImage}" alt="${randomCocktailName}" />`;
        console.log(mappedcocktail)
    } catch (error) {
        console.log(error)
    }
};



//kategori = category
//bild = thumbnail
//taggar = tags
//instruktion = instructions
//ingredienser = ingredients
//glas = glass
randomCocktailButton.addEventListener("click", randomcocktail);