import { useEffect, useState } from "react";
import { getFullPokedexNumber, getPokedexNumber } from "../utils";
import TypeCard from "./TypeCard";
import Modal from "./Modal";
// This is going to contain all the pokemon information
export default function PokeCard(props) {
  const { selectedPokemon } = props;

  // this use state is used for updating the pokemon data
  const [data, setData] = useState(null);

  // this is about when we fetch the information, when we first load the page we are not fetching info hence value false , but if value changes to true means we are looking for information already
  const [loading, setLoading] = useState(false);

  const [skill, setSkill] = useState(null);

  const [loadingSkill, setLoadingSkill] = useState(false); //we need this useState so that when we are loading a skill we can prevent a user from doubling up on the skills they are loading





  // here we are destructuring the properties of a pokemon to be displayed in the pokeCard from the object data that we have fetched
  const { name, height, abilities, stats, types, moves, sprites } = data || {}; //either we will fetch from data if available else for backup an empty object is there

  //imgList is an array of images where we store those images that can be included
  // object.keys function er through akta object er bhitor j keys gulo ache seta amra print korate parbo
  //jodi sprites na thke oi jnne for backup akta empty array lekha
  const imgList = Object.keys(sprites || {}).filter((val) => {
    if (!sprites[val]) {
      return false;
    } //firstly ekhane boleche k sprites object er bhitor jdi kono key er value null thake then filter it out, mne null/undefined values thakbena so false return kro
    if (["version", "other"].includes(val)) {
      return false;
    } //etao check kro if there is other and version as keys , then delete it also
    return true; //if above 2 conditions dont satisfy then return true , returning true means we keep the image else we filter it out when false is returned means above 2 conditions satisfy
  });

  //for modal function. the modal will open as soon as data assigned to the skill state
  async function fetchMoveData(move, moveUrl) {
    if (loadingSkill || !localStorage || !moveUrl) {
      return;
    }
    // check cache for move
    let c = {};
    if (localStorage.getItem("pokemon-moves")) {
      // if pokeom-moves exists in our local storage then include them in the cache
      c = JSON.parse(localStorage.getItem("pokemon-moves"));
    }
    if (move in c) {
      setSkill(c[move]);
      console.log("Found move in cache");
      return;
    }
    // 3.if we cannot find it in thecache i.e we get passed the 2nd condition then we will throw a try catch error to see what the actual scenario is
    try {
      setLoadingSkill(true); //set the loading skill state to true which will imply that move is being fetched
      const res = await fetch(moveUrl); //fetch theinfo from moveUrl
      const moveData = await res.json(); //store the fetched data in moveData by converting the fetched data to JSON
      console.log("Fetched move from API", moveData); //printing the fetched API data
      const description = moveData?.flavor_text_entries.filter(
        //here we will be doing data filtering , filtering out all those specific texts whose flavour text entry doesn't have name parameter firered-leafgreen
        (val) => {
          return val.version_group.name == "firered-leafgreen";
        }
      )[0]?.flavor_text; //after the above process we wil only have one value left hence accessing the  0th index wala elemnt left and from within that flavour text amra access kr6i

      //we are creating an object called skillData amd inserting the move that we fetched and description in it
      const skillData = {
        name: move,
        description,
      };

      //then oi skillData object take skill er new state hisebe set lre di6i
      setSkill(skillData);
      c[move] = skillData; //and cache e teo dhukiyew ni6i oi move take
      localStorage.setItem("pokemon-moves", JSON.stringify(c)); //basically eta j save kre ni6i to pore r jate ei same jinish fetch krte na hoy leading to duplicate fetches hence
    } catch (err) {
      console.log(err);
    } finally {
      setLoadingSkill(false);
    }
  }

  // as we know use effect is a function thats invoked when the value of the dependency array changes and then the function inside the curly braces is performed
  useEffect(
    () => {
      //if information loading, exit logic
      if (loading || !localStorage) {
        return;
      }
      // check if selected pokemon info is available in the cash
      // 1.define the cache
      let cache = {};
      //if the pokedex key exists in the local storage means we have information in the localStorage so fill those information also inside the cache variable
      if (localStorage.getItem("pokedex")) {
        cache = JSON.parse(localStorage.getItem("pokedex"));
      }

      //2. check if the selected pokemon is in the cache otherwise fetch from the API
      if (selectedPokemon in cache) {
        // read from cache
        setData(cache[selectedPokemon]);
        console.log("Found pokemon in cache");
        return;
      }

      // we passed all the cache stuff to no avail and now need to fetch the data from the API if the above conditions dont satisfy

      /*🔹 async mane holo asynchronous — mane hocche, ei function ta ekhon-e kaj sesh korbe na, ekto pore (ba kono wait er pore) kaj sesh korbe.
                🔥 Normal function er moto na!
                🔸 Normal function:

                js
                Copy code
                function greet() {
                return "Hello";
                }
                Eta jokhon call korbi, instantly "Hello" return kore dibe.

                🔸 Async function:

                async function greet() {
                return "Hello";
                }
                Eta call korle direct value na, eta ekta Promise return kore.

                🔁 Sohoje bojha jonne:
                🔸 async function mane:
                "Ami tomake ekta kajer prothisruti dicchi — ami porobortite kaj ta kore tomake result debo."

                🧪 Real Life Bangla Analogy:
                🧍‍♀️ Tumi ekta cake order korle:
            
                function normalCakeShop() {
                return "Cake ready";
                }
                ➡️ Eta saathe saathe cake diye dey — unrealistic 😅

                But ekta async cake shop:

                async function asyncCakeShop() {
                await wait(2 hours);
                return "Cake ready!";
                }
                ➡️ Eta ekta promise dei:

                "Ami cake ready kore dibo — ekto wait koro."

                ✅ JavaScript e tokhon use kori:
                🔸 Jodi kono API theke data fetch korte hoy

                🔸 Jodi kono time lagbe emon kaj thake (file read, server theke data ana, database query etc)

                */

      async function fetchPokemonData() {
        setLoading(true); //setting this true means we have started fetching info from API hence information is loading
        // we try a logic
        try {
          const baseUrl = "https://pokeapi.co/api/v2/";
          const suffixUrl = "pokemon/" + getPokedexNumber(selectedPokemon);
          const finalUrl = baseUrl + suffixUrl;
          const response = await fetch(finalUrl); //we are sending the api network request to fetch the data and thae output is going to be stored in the response
          const pokemonData = await response.json(); //jei data ta peyechi otake json e convert kre data variable e store krchi so that javascript code can access it
          setData(pokemonData); //setting the pokemonData fetched

          console.log("Fetched pokemon data");
          //3. if we fetch from the API , make sure to save the information to the cache for the next time
          // ebar amra je information ta peyechi otake cache er j pokemon select hoyeche tate store korbo
          cache[selectedPokemon] = pokemonData;
          localStorage.setItem("pokedex", JSON.stringify(cache)); //then local storage e stringify kre dhokabo cache by saving it to the key 'pokedex'
        } catch (err) {
          //if we catch an error then we display it
          console.log(err.message);
        } finally {
          // irrespective of whether we find the error or not we set the loading to false signifying fetching from API has been completed
          setLoading(false);
        }
      }
      fetchPokemonData(); //we are invoking/calling the async function at the end for API call
    },
    // this means jkhn selected pokemon change hobbe or jokhon loading state change hbe tokhoni amra above function invoke krbo
    [selectedPokemon]
  );

  //  if data is being fetched(loading) or we dont find data then display loading in the Todo Card
  if (loading || !data) {
    return (
      <div>
        <h4>Loading...</h4>
      </div>
    );
  }

  return (
    <div className="poke-card">
      {/* if skill is true i.e when the skill will be clicked if it exists then displaying the modal card which will contain the skill name and description and when the */}
      {skill && (
        <Modal
          handleCloseModal={() => {
            setSkill(null);
          }}
        >
          <div>
            <h6>Name</h6>
            <h2 className="skill-name">{skill.name.replaceAll("-", " ")}</h2>
          </div>
          <div>
            <h6>Description</h6>
            <p>{skill.description}</p>
          </div>
        </Modal>
      )}
      <div>
        <h4>#{getFullPokedexNumber(selectedPokemon)}</h4>
        <h2>{name}</h2>
      </div>
      <div className="type-container">
        {types.map((typeObj, typeIndex) => {
          return (
            // we are passing the typr name as property to the tupeCard component
            <TypeCard key={typeIndex} type={typeObj?.type?.name}></TypeCard>
          );
        })}
      </div>
      <img
        className="default-img"
        src={"/pokemon/" + getFullPokedexNumber(selectedPokemon) + ".png"}
        alt={`${name}-large-img`}
      />
      {/* sprite e amra dekjechi pokemon er bibhinno dimension diye chobi ache means pichon thke shamne thke onno pose e , so in the frontend parrt we decided akta boro actual chobi er niche charipash diye kmn dekhte detao dekhiye dbo like a product */}
      <div className="img-container">
        {
          // hence oi sprite object e j value gulote url chilo ogulotei chobi ache eshb er hence we passes spriteurl for pictures and spriteIndex for being the key of each picture leading to unique identifaction
          imgList.map((spriteUrl, spriteIndex) => {
            const imgUrl = sprites[spriteUrl]; //storing the spriteUrl in image irl variable
            return (
              // then displaying the images
              <img
                key={spriteIndex}
                src={imgUrl}
                alt={`${name}-img-${spriteUrl}`}
              />
            );
          })
        }
      </div>
      {/* below the pictures we will now display the stats */}
      <h3>Stats</h3>
      <div className="stats-card">
        {
          //stats is an array of stat objects
          // base-stat mane holo value ta and state stores the key name
          stats.map((statObj, statIndex) => {
            const { stat, base_stat } = statObj; //destructuring the base stat key and stat object from the stats obj
            return (
              // stats akta object or mddhe ache stat bole akta object jetate name and url ache
              <div key={statIndex} className="stat-item">
                <p>
                  {
                    stat?.name.replaceAll(
                      "-",
                      " "
                    ) /*acces the name key of the stat object and replace all the hyphen with spaces in the name then print the name */
                  }
                </p>
                <h4>
                  {
                    base_stat /*base stat is the key that signifies the stat in numerical form  */
                  }
                </h4>
              </div>
            );
          })
        }
      </div>
      <h3>Moves</h3>
      <div className="pokemon-move-grid">
        {
          //gonna print all the moves in the form of buttons using map function as moves is an array of move objects in the database
          moves.map((moveObj, moveIndex) => {
            return (
              <button
                className="button-card pokemon-move"
                key={moveIndex}
                onClick={() => {
                  fetchMoveData(moveObj?.move?.name, moveObj?.move?.url);
                }}
              >
                <p>{moveObj?.move?.name.replaceAll("-", " ")}</p>
              </button>
            );
          })
        }
      </div>
    </div>
  );
}
