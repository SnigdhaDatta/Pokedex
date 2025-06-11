// there are 151 pokemon so the nav bar is used to display each and every pokemon on the side bar 
import { useState } from "react"
import { first151Pokemon, getFullPokedexNumber } from "../utils" // here we have wrote the utils folder path directly but generally we wriite the file path inside the quotation for for identifying the correct file , but here utils only has 1 file called index so even if we name the folder path the computer will consider the only file present inside it. Folder impprt always double dot diye hoy and file import single dot

//Rule 1 always write any javascript code/function/variable inside within an html inside curly
export default function SideNav(props){
    const {selectedPokemon, setSelectedPokemon, handleToggleMenu, showSideMenu, handleCloseMenu}=props

    const [searchValue, setSearchValue]=useState('')

    const filteredPokemon=first151Pokemon.filter((ele, eleIndex)=>{
        // if the full pokedex number includes the current szerach value then return true
        if(toString(getFullPokedexNumber(eleIndex)).includes(searchValue)){
            return true
        }
        // if pokemon name includes the current search value return true
        if(ele.toLowerCase().includes(searchValue.toLowerCase())){ return true }
        
        // otherwise, exclude value from the array
        return false 
    })
    return(
        // everytime we use dynamic class we mention the class name inside curly braces
        //duto class name er mjhe jkhn space thkbe then both will be treated as 2 diff clss anmes working in the same operation
        <nav className={' ' + (!showSideMenu ? " open" : '')}> {/*if show side menu is true then class name is open else empty class, these will only work when the mobile device is used hence we have used dynamic classes */}
            <div className={"header " + (!showSideMenu ? " open" : '')}> {/*now if the nav bar is opened in the mobile device means header is open then we need a back button to close it  */}
                <button onClick={handleCloseMenu} className="open-nav-button"> {/* we close the menu through on click event */}
                    <i className="fa-solid fa-arrow-left-long"></i> {/*the back icon */}
                </button>
                {/* the pokedex heading will be in the header section of the side nav bar , means side nav er akdm upore */}
                <h1 className="text-gradient">Pokédex</h1>
            </div>
            {/* then below the heading we have an input fied which will be treated as the search bar */}
            <input placeholder="E.g. 001 or Bulba..." value={searchValue} onChange={(e)=>{
                setSearchValue(e.target.value)
            }}></input>
            {/* below this we are displaying all the pokemon names with their full pokedex number
            // jehetu amra side nav e protita pokemon er naam display korbo in the form of buttons and oi button guloke click korlei main screen e information dekhabe about the pokemon via the PokeCard component hence amra map function use korbo cuz we know map function is used to perform the same function over all the elemnts of the array */}
            {filteredPokemon.map((pokemon,pokemonIndex)=>{
                const truePokedexNumber=first151Pokemon.indexOf(pokemon)
                return(
                    <button onClick={()=>{
                        setSelectedPokemon(truePokedexNumber)
                        handleCloseMenu()
                     }} key={pokemonIndex} className={'nav-card '+ (pokemonIndex===selectedPokemon? ' nav-card-selected': ' ')}> {/*we are using dynamic class for user interactivity , based on condition styling apne apne chnge hbe jmn hovering effect and all. Here we are giving also the condition that je button selected thakbe jodi otar index selected pokemon er index er sthe match khae then apply the nav-card-selected card on it */}
                        <p>{getFullPokedexNumber(truePokedexNumber)}</p>
                        <p>{pokemon}</p>  
                        {/* each pokemon name through map function is displayed in the form of button in the side nav */}
                    </button>
                )
            })}
        </nav>
    )
}