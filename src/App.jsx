import { useState, useEffect } from "react";
import aotLogo from "../src/assets/Attack-on-Titan-Logo.png";

export default function App() {
  const [items, setItems] = useState([]);
  const [dataIsLoaded, setDataIsLoaded] = useState(false);

  useEffect(() => {
    async function getCharacters() {
      const requests = [];
      let randomNumber;
      let usedNumbers = new Set();

      for(let i = 0; i < 10; i++) {
        do{
          randomNumber = Math.floor(Math.random() * 201) + 1;
        }while(
          usedNumbers.has(randomNumber) 
          || randomNumber === 117 
          || randomNumber === 116 
          || randomNumber === 148
          || randomNumber === 115
          || randomNumber === 7
        )

        usedNumbers.add(randomNumber)

        requests.push(
          fetch(`https://api.attackontitanapi.com/characters/${randomNumber}`).then((res) => res.json())
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
  else if(dataIsLoaded) {
    console.log(items)
  }

  return (
    <>
        <div className="header">
          <h1>Wings Of Memory</h1>
          <img src={aotLogo} alt="aotLogo" className="aotLogo"/>
          <div className="scoreboard">
            <p>Best: </p>
            <p>Score: </p>
          </div>
        </div>
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
            characters.push({name: item.name, url: item.img})
          })
        }
        {characters.map(selectCharacter => {
          return (
            <div className="card" key={selectCharacter.name}>
              <img src={selectCharacter.url} alt={selectCharacter.name} referrerPolicy="no-referrer"/>
              <p>{selectCharacter.name}</p>
            </div>
          )
        })}
      </div>
    </>
  )
}