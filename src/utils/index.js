//we create a utility folder so that we can store there javascript utility/functions 
/*Utility Folder ta keno lage?
        Code Reusability:

            Utility functions holo emon chhoto functions ja onek jaygay use kora jay.

            Jemon: date formatting, string manipulation, number conversion, validation, etc.

            Same function bar bar na likhe ekta jaygay likhe, onno file e import kore use kora jay.

        Code Organization:

            Project joto boro hoy, toto beshi code structured thaka dorkar hoy.

            Utility folder er moddhe sob general-purpose functions rakle, bujhte o easy hoy.

        Maintainability:

            Kono logic change korte hole ek jaygay change korlei hobe.

            Ekhane rakha function gulo specific kono UI ba component dependent hoy na.

*/

// we have the name of the first generation 151 pokemon here which we need in order to be able to render out that side nav so we are going to return a button for every pokemon which allows the user to click on a pokemon and then cosequently show up all the information
export const first151Pokemon = [
    "Bulbasaur", "Ivysaur", "Venusaur", "Charmander", "Charmeleon", "Charizard", "Squirtle", "Wartortle", "Blastoise",
    "Caterpie", "Metapod", "Butterfree", "Weedle", "Kakuna", "Beedrill", "Pidgey", "Pidgeotto", "Pidgeot",
    "Rattata", "Raticate", "Spearow", "Fearow", "Ekans", "Arbok", "Pikachu", "Raichu", "Sandshrew", "Sandslash",
    "Nidoran♀", "Nidorina", "Nidoqueen", "Nidoran♂", "Nidorino", "Nidoking", "Clefairy", "Clefable", "Vulpix",
    "Ninetales", "Jigglypuff", "Wigglytuff", "Zubat", "Golbat", "Oddish", "Gloom", "Vileplume", "Paras", "Parasect",
    "Venonat", "Venomoth", "Diglett", "Dugtrio", "Meowth", "Persian", "Psyduck", "Golduck", "Mankey", "Primeape",
    "Growlithe", "Arcanine", "Poliwag", "Poliwhirl", "Poliwrath", "Abra", "Kadabra", "Alakazam", "Machop", "Machoke",
    "Machamp", "Bellsprout", "Weepinbell", "Victreebel", "Tentacool", "Tentacruel", "Geodude", "Graveler", "Golem",
    "Ponyta", "Rapidash", "Slowpoke", "Slowbro", "Magnemite", "Magneton", "Farfetch'd", "Doduo", "Dodrio",
    "Seel", "Dewgong", "Grimer", "Muk", "Shellder", "Cloyster", "Gastly", "Haunter", "Gengar", "Onix", "Drowzee",
    "Hypno", "Krabby", "Kingler", "Voltorb", "Electrode", "Exeggcute", "Exeggutor", "Cubone", "Marowak", "Hitmonlee",
    "Hitmonchan", "Lickitung", "Koffing", "Weezing", "Rhyhorn", "Rhydon", "Chansey", "Tangela", "Kangaskhan",
    "Horsea", "Seadra", "Goldeen", "Seaking", "Staryu", "Starmie", "Mr. Mime", "Scyther", "Jynx", "Electabuzz",
    "Magmar", "Pinsir", "Tauros", "Magikarp", "Gyarados", "Lapras", "Ditto", "Eevee", "Vaporeon", "Jolteon",
    "Flareon", "Porygon", "Omanyte", "Omastar", "Kabuto", "Kabutops", "Aerodactyl", "Snorlax", "Articuno",
    "Zapdos", "Moltres", "Dratini", "Dragonair", "Dragonite", "Mewtwo", "Mew"
]

// here we have some colour specification i.e for which type which colour will be relevant in the typeCard component
// each type contains a text colour which mentioned by colour attribute and the background colour of the TypeCard
export const pokemonTypeColors = {
    normal: {
        color: "#6C6C6C",
        background: "#A8A77A"
    },
    fire: {
        color: "#FFFFFF",
        background: "#EE8130"
    },
    water: {
        color: "#FFFFFF",
        background: "#6390F0"
    },
    electric: {
        color: "#000000",
        background: "#F7D02C"
    },
    grass: {
        color: "#FFFFFF",
        background: "#7AC74C"
    },
    ice: {
        color: "#000000",
        background: "#96D9D6"
    },
    fighting: {
        color: "#FFFFFF",
        background: "#C22E28"
    },
    poison: {
        color: "#FFFFFF",
        background: "#A33EA1"
    },
    ground: {
        color: "#FFFFFF",
        background: "#E2BF65"
    },
    flying: {
        color: "#000000",
        background: "#A98FF3"
    },
    psychic: {
        color: "#FFFFFF",
        background: "#F95587"
    },
    bug: {
        color: "#000000",
        background: "#A6B91A"
    },
    rock: {
        color: "#FFFFFF",
        background: "#B6A136"
    },
    ghost: {
        color: "#FFFFFF",
        background: "#735797"
    },
    dragon: {
        color: "#FFFFFF",
        background: "#6F35FC"
    },
    dark: {
        color: "#FFFFFF",
        background: "#705746"
    },
    steel: {
        color: "#000000",
        background: "#B7B7CE"
    },
    fairy: {
        color: "#000000",
        background: "#D685AD"
    }
}

//this function returns the pokeDex number , but since in Js indexing starts with 0 but the pokemon starts with 1 hence whatever the index will be we will add a 1 to it and then return
export function getPokedexNumber(index) {
    return index + 1
}

//this a function of getting the ful pokedex number. Basically pokedex no e ajei integer ta beroy setai display hoy but full pokedex no e 3digit integer e print hy so ekhane ei logic dewa j jdi result 99 er thke boro hoy then print the integer , else check jodi 9 er thke boror hy then shamne 100th place e 0 boshbe cuz 10th and 1 er place fill thlbe and akdm 9 thkeo choto means single digit which will result in putting 0's in 10th and 100th place
export function getFullPokedexNumber(index) {
    return `${index + 1 > 99 ? index + 1 : index + 1 > 9 ? `0${index + 1}` : `00${index + 1}`}`
}