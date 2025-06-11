// Header component has some conditional displays
// and it only shows up when we are in the mobile device size
export default function Header(props){
    const {handleToggleMenu}=props
    return(
        <header>
            {/* nav bar er jnne icon */}
            {/* in case  when we want to invoke a function by calling it then only we use arrow function and wrap it inside the curly braces as we did here */}
            {/* but if we just want to pass the function as a reference then will write it just as it is without arrow function. This means that we are referring to the function which needs to be called as soon as button is clicked here without */}
            <button className="open-nav-button" onClick={handleToggleMenu}> 
                <i className="fa-solid fa-bars"></i> 
            </button>
            <h1 className="text-gradient">Pokédex</h1>
        </header>
    )
}