import { mapRawCocktailData } from "./utilities.js"; //importing function to get a good object


//  UNDERSÖKA DETTA SKITET
//     const navbar = document.querySelector(".navbar1");
//     const startPage = document.querySelector("#start-page");
//     const detailsPage = document.querySelector("#details-page");
//     const searchPage = document.querySelector("#search-page");


//     navbar.addEventListener("click", handleNavBarClick);

//     function handleNavBarClick(event) {
//         const classList = event.target.classList;
//         if (classList.contains("link")) return handleNavBarClick(event.target.id);
//     };

//     function handleOnLinkClick(id) {
//         if (id === "start-link") {
//             startPage.classList.add("open");
//             detailsPage.classList.remove("open");
//             searchPage.classList.remove("open");
//         }
   

//     if (id === "search-link") {
//         startPage.classList.remove("open");
//         detailsPage.classList.remove("open");
//         searchPage.classList.add("open");
//     }
// }
//  UNDERSÖKA DETTA SKITET

        const randomCocktailButton = document.querySelector(".randomCocktail")
        randomCocktailButton.addEventListener("click", randomcocktailgenerator); //bra ställe?


// funktioner nedför

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
        
        //innerhtml för visa cocktail grundinfo
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

    function updateDom(Info) {
        // dom förändring ->

        const Infotarget = document.querySelector(".moreInfoDiv")
        Infotarget.innerHTML =`
        <ul>
        <p>${Info.name} </p>
        <p>${Info.category} </p>
        <ul>
        ${Info.tags.map((tag) => `
            <li>${tag}
            </li>
            `
        ).join("")} 
        </ul>
         <p>${Info.glass}</p>
         ${Info.ingredients.map((ingredient) => `
            <li>${ingredient.measure}
            ${ingredient.ingredient} </li>
            `
        ).join("")} 
        </ul>
         <p>${Info.instructions} </p>
         <p>${Info.thumbnail} </p>
        `
    // skriver ut namn -> category -> mappar igenom taggar om det finns flera skrivs de ut -> sedan vilket glass -> till ingredienser+hur mycket -> instruktioner -> till länk
    }

async function InfoId(cocktailId) {
    const detailedInfoapi = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${cocktailId}`
    try {
    const responsecocktailid = await fetch(detailedInfoapi)
    const res = await responsecocktailid.json();
        const info = res.drinks ? res.drinks[0] : res;
        const mappadInfo = mapRawCocktailData(info);
        console.log(mappadInfo)
        updateDom(mappadInfo)
    }   catch (error) {
    console.log(error);

    } 
}







//instruktion = instructions



