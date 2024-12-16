import { mapRawCocktailData } from "./utilities.js"; //importing function to get a good object


        const randomCocktailButton = document.querySelector(".randomCocktail")
        randomCocktailButton.addEventListener("click", randomcocktailgenerator, ); 


        const homeButton = document.querySelector(".home-button");
        homeButton.addEventListener("click", showStartPage);

        
        

// funktioner nedför

// startpage
function showStartPage() {
    document.querySelector("#start-page").style.display = "block";
    document.querySelector("#details-page").style.display = "none";
    // document.querySelector("#search-page").style.display = "none";
}

//detaljsidan
function showDetailsPage() {
    document.querySelector("#start-page").style.display = "none";
    document.querySelector("#details-page").style.display = "block";
    // document.querySelector("#search-page").style.display = "none";
}
// söksidan
// function showSearchPage() {
//     document.querySelector("#start-page").style.display = "none";
//     document.querySelector("#details-page").style.display = "none";
//     document.querySelector("#search-page").style.display = "block";
// }


export async function searchFunciton() {
    const searchapi = `www.thecocktaildb.com/api/json/v1/1/search.php?s=${cocktailName}`
    const responseapi = await fetch(searchapi)
    const res = await responseapi.json();
    const cocktailName = res.drinks ? res.drinks[0] : res;
    const searchfunktion = document.getElementById("search").value;
    
    
};

export async function randomcocktailgenerator() {
    try {
        const responeRandomCocktail = await fetch(randomcocktailapi);
        const response = await responeRandomCocktail.json(); //omvandlar till JSON 
        const cocktail = response.drinks ? response.drinks[0] : response; //man får en undefined cocktail så behöver vi denna if checken (terinary operator enl wiktor) 
        // översatt cocktail = är detta sant?  isåfall gör detta : annars gör detta
        //om en cocktail finns så mappas den genom funktionen
        const mappedcocktail = mapRawCocktailData(cocktail);
        randomcocktail(mappedcocktail)
}
catch (error) {
    console.log(error);
}
};

//randomcocktail api
const randomcocktailapi = "https://www.thecocktaildb.com/api/json/v1/1/random.php";


function randomcocktail(mappedcocktail) {
        showStartPage();
        const randomCocktailInfo = document.querySelector(".cocktailSection");
        randomCocktailInfo.innerHTML = `
        <strong>${mappedcocktail.name}</strong>
        <img src="${mappedcocktail.thumbnail}" alt="${mappedcocktail.name}" />
        <button class="moreInfo">More info!</button>`;
        
        const buttoninfo = randomCocktailInfo.querySelector(".moreInfo")
        buttoninfo.addEventListener("click", () => {
            InfoId(mappedcocktail.id) //scopad till Info()
        } )
        
    } ;

    function updateDetailsPage(Info) {
        // dom förändring ->

        const Infotarget = document.querySelector("#cocktail-details")
        Infotarget.innerHTML =`
        <p>${Info.name} </p>
        <p>${Info.category} </p>
        <ul>
        ${Info.tags.map((tag) => `
            <li>${tag}
            </li>
            `
        ).join("")} 
        </ul>
        <ul>
         <p>${Info.glass}</p>
         ${Info.ingredients.map((ingredient) => `
            <li>${ingredient.measure}
            ${ingredient.ingredient} </li>
            `
        ).join("")} 
        </ul>
         <p>${Info.instructions} </p>
          <img src="${Info.thumbnail}" alt="${Info.name}" />
        `
        showDetailsPage(); //detaljsidan
    }

async function InfoId(cocktailId) {
    const detailedInfoapi = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${cocktailId}`
    try {
    const responsecocktailid = await fetch(detailedInfoapi)
    const res = await responsecocktailid.json();
        const info = res.drinks ? res.drinks[0] : res;
        const mappadInfo = mapRawCocktailData(info);
        console.log(mappadInfo)
        updateDetailsPage(mappadInfo)
    }   catch (error) {
    console.log(error);

    } 
}
showStartPage();