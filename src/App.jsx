// here in this project we are going to  learn how to do API call
// basically api call is the process in which your website makes a call/ a network request to someone elese's body of code that is linked or connected to the internet and when you send that request they basically send you back a whole lot of data\
// we acn think a restful api as the public database which anyone can access and use
// here we are also going to learn how to cache the information from the internet. Basically suppose you have fetchef info from api and then after fetchig we will store that info locally in local storage which is called caching.
// the reason we do that is beacuse if we fetch info for evry time then it makes an incomparabale amount of call. As so many products are also using that api , the seravers maybe busy at times and there is also a certain amount of calls you can make, if that number exceeds it results in the server blocking you. hence akbar j indo fetch kre niyechi seta cache hisebe store kre rakhbo jate akta definite amount of times e call krte hy 
import  Header  from"./components/Header"
import  PokeCard  from "./components/PokeCard"
import  SideNav  from "./components/SideNav"
import { useState } from "react"

// anything whose result depends on user activity needs to be controlled through useState
function App() {
  const [selectedPokemon, setSelectedPokemon]=useState(0) 
  /* We have to do do a bit of chop and size of the components here to make it mobile responsive. So our main way of naviagtion would be side nav for the website and for mobile it would be Header*/
  
  const [showSideMenu, setShowSideMenu]=useState(true) //so the side nav acts a overlay by using header component, to whenever the value will be true then only the side nav will show in the mbile device(toggling) else not
  function handleToggleMenu() {
    setShowSideMenu(!showSideMenu) //inverting the current value of showSideMenu , means jeta thakbe tar ulto te convert kore debe for toggling
  }
  function handleCloseMenu() {
    setShowSideMenu(true) //if the menu is open on the desktop screen also then close it function is needed
  }

  return (
    <>
      <Header handleToggleMenu={handleToggleMenu}></Header>
      <SideNav 
      selectedPokemon={selectedPokemon} 
      setSelectedPokemon={setSelectedPokemon}  
      handleToggleMenu={handleToggleMenu} 
      showSideMenu={showSideMenu}
      handleCloseMenu={handleCloseMenu}></SideNav>
      <PokeCard selectedPokemon={selectedPokemon}></PokeCard>
    </>
  )
}

export default App
