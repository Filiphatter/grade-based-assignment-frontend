import { mapRawCocktailData } from "./utilities.js"; //importing function to get a good object

function searchFunciton() {
    const searchfunktion = document.getElementById("search").value;
    // search funktionen här när jag får tag på id
}




//randomcocktail api
const randomcocktailapi = "https://www.thecocktaildb.com/api/json/v1/1/random.php";

const randomCocktailButton = document.querySelector(".randomCocktail")

export async function randomcocktail() {
    try {
        const responeRandomCocktail = await fetch(randomcocktailapi);
        const response = await responeRandomCocktail.json(); //omvandlar till JSON 

        const cocktail = response.drinks ? response.drinks[0] : response; //man får en undefined cocktail så behöver vi denna if checken (terinary operator enl wiktor) 
        // översatt cocktail = är detta sant?  isåfall gör detta : annars gör detta
        //om en cocktail finns så mappas den genom funktionen
        const mappedcocktail = mapRawCocktailData(cocktail);
        // console.log(mappedcocktail); //skriver ut mappad cocktail
        
        //innerhtml för visa cocktail grundinfo
        const randomCocktailInfo = document.querySelector(".cocktailSection");
        randomCocktailInfo.innerHTML = `
        <strong>${mappedcocktail.name}</strong>
        <img src="${mappedcocktail.thumbnail}" alt="${mappedcocktail.name}" />`;
        
    } catch (error) {
        console.log(error);
    }
};
const detailedInfoapi = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${cocktailId}"
const moreInfoButton = document.querySelector(".moreInfo")

async function Info() {
    try {
    const responsecocktailid = await fetch(detailedInfoapi)
    const response = await responsecocktailid.text();
    
    const info = response.drinks ? response.drinks[0] : response;

    const mappedinfo = mapRawCocktailData(info)
    
    console.log(mappedinfo.name);
    console.log(mappedinfo.category); //funkar
    console.log(mappedinfo.thumbnail); //funkar
    console.log(mappedinfo.tags); // if tom / skriv ut obj
    console.log(mappedinfo.instructions); // funkar
    console.log(mappedinfo.ingredients); //skriv ut obj
    console.log(mappedinfo.glass);


    }   catch (error) {
    console.log(error);

    } 
}



//kategori = category
//bild = thumbnail
//taggar = tags
//instruktion = instructions
//ingredienser = ingredients
//glas = glass
moreInfoButton.addEventListener("click", Info)
randomCocktailButton.addEventListener("click", randomcocktail);