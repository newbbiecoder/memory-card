import { useState, useEffect } from "react";

export default function App() {
  const [items, setItems] = useState([]);
  const [dataIsLoaded, setDataIsLoaded] = useState(false);

  useEffect(() => {
    async function getPokemons() {
      const requests = [];

      for(let i = 0; i < 10; i++) {
        const randomNumber = Math.floor(Math.random() * 1025) + 1;
        requests.push(
          fetch(`https://pokeapi.co/api/v2/pokemon/${randomNumber}`).then((res) => res.json())
        );
      }

      const results = await Promise.all(requests);
      setItems(results);
      setDataIsLoaded(true);
    }
    getPokemons();
  },[]);
  if(!dataIsLoaded) {
    return (
      <div>
        <h2>Please wait for some time...</h2>
      </div>
    )
  }

  return (
    <>
      <h1 style={{color: 'white'}}>HELLo</h1>
      <div>
        <ShowPokemon items={items} /> 
      </div>
    </>
  )
}

function ShowPokemon({items}) {
  const pokemon = []
  return (
    <>  
      <div className="container">
        {
          items.map((item) => {
            pokemon.push({name: item.species.name, url: item.sprites.front_default})
          })
        }
        {pokemon.map(selectPokemon => {
          return (
            <img src={selectPokemon.url} alt={selectPokemon.name} key={selectPokemon.name}/>
          )
        })}
      </div>
    </>
    // <img src={items.sprites.front_default} alt={items.species.name} />
  )
}