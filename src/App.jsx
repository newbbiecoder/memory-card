import { useState, useEffect } from "react";

export default function App() {
  const [items, setItems] = useState([]);
  const [dataIsLoaded, setDataIsLoaded] = useState(false);

  useEffect(() => {
    async function getCharacters() {
      const requests = [];

      for(let i = 0; i < 10; i++) {
        requests.push(
          fetch(`https://api.nekosia.cat/api/v1/images/cute`).then((res) => res.json())
        );
      }

      const results = await Promise.all(requests);
      setItems(results);
      setDataIsLoaded(true);
    }
    getCharacters();
  },[]);
  if(!dataIsLoaded) {
    return (
      <div>
        <h2>Please wait for some time...</h2>
      </div>
    )
  }
  else if(dataIsLoaded) console.log(items)

  return (
    <>
      <h1 style={{color: 'white'}}>Memory Game</h1>
      <ShowCharacters items={items} />
    </>
  )
}

function ShowCharacters({items}) {
  const characters = []
  return (
    <>  
      <div className="container">
        {
          items.map((item) => {
            console.log(item)
            characters.push({name: item.attribution.artist.username, url: item.image.original.url})
          })
        }
        {characters.map(selectCharacter => {
          return (
            <div className="card">
              <img src={selectCharacter.url} alt={selectCharacter.name}/>
              <p>{selectCharacter.name}</p>
            </div>
          )
        })}
      </div>
    </>
  )
}