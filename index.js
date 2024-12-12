import { mapRawCocktailData } from "./utilities.js"; //importing function to get a good object


        const randomCocktailButton = document.querySelector(".randomCocktail")
        randomCocktailButton.addEventListener("click", randomcocktail); //bra ställe?


// funktioner nedför

function searchFunciton() {
    const searchfunktion = document.getElementById("search").value;
    // search funktionen här när jag får tag på id
}

async function randomcocktailgenerator() {
    try {
        const responeRandomCocktail = await fetch(randomcocktailapi);
        const response = await responeRandomCocktail.json(); //omvandlar till JSON 
        const cocktail = response.drinks ? response.drinks[0] : response; //man får en undefined cocktail så behöver vi denna if checken (terinary operator enl wiktor) 
        // översatt cocktail = är detta sant?  isåfall gör detta : annars gör detta
        //om en cocktail finns så mappas den genom funktionen
      
}
catch (error) {
    console.log(error);
}
}

//randomcocktail api
const randomcocktailapi = "https://www.thecocktaildb.com/api/json/v1/1/random.php";

randomcocktailgenerator() {
    
    const mappedcocktail = mapRawCocktailData(cocktail);
    randomcocktail(mappedcocktail)
};

function randomcocktail(mappedcocktail) {
        
        //innerhtml för visa cocktail grundinfo
        const randomCocktailInfo = document.querySelector(".cocktailSection");
        randomCocktailInfo.innerHTML = `
        <strong>${mappedcocktail.name}</strong>
        <img src="${mappedcocktail.thumbnail}" alt="${mappedcocktail.name}" />
        <button class="moreInfo">More info!</button>`;
        
        const buttoninfo = randomCocktailInfo.querySelector(".moreInfo")
        buttoninfo.addEventListener("click", () => {
            Info(mappedcocktail.id)
        } )
        
    } ;



async function Info(cocktailId) {
    const detailedInfoapi = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${cocktailId}`
    try {
    const responsecocktailid = await fetch(detailedInfoapi)
    const res = await responsecocktailid.json();
        const info = res.drinks ? res.drinks[0] : res;
        const mappadInfo = mapRawCocktailData(info);
        console.log(mappadInfo)
    
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

