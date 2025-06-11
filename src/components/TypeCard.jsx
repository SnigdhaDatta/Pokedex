import { pokemonTypeColors } from "../utils"

//for rendering out the type of pokemon , if its firetype or water or poison or rock etc
export default function TypeCard(props){
    const {type} =props //destructuring out type from props
    return(
        // in the style part we are using the style colours we have mentioned in index.js file inside the array of type objects(hence we are accessing using dots because key balue pairs inside an object are meant to be accessed by that way)
        // the question mark just provides secutiy to our subsequent chaining of key value pairs , as the question mark simply gives sondition whether the thing written just before question mark exists or not
        <div className='type-tile' style={{color: pokemonTypeColors ?.[type] ?.color, background:pokemonTypeColors?.[type]?.background }}> 
            <p>{ type }</p>
        </div>
    )
}