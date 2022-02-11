// import styled from "styled-components/macro";
import { useState } from "react";
import { useEffect } from "react";

function App() {
  const [items, setItems] = useState([]);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    loadItems();
  }, []);

  async function loadItems() {
    try {
      const response = await fetch(
        "https://fetch-me.vercel.app/api/shopping/items"
      );

      if (response.ok) {
        // check, if there is "no 404"
        const data = await response.json();
        setItems(data.data);
      } else {
        // make code execution continue in catch block
        throw new Error("404 - not found");
      }
    } catch (error) {
      console.log(error.message);
      setHasError(true);
    }
  }

  console.log(items);

  return (
    <div className="App">
      <h1 className="App-header">Shopping List</h1>
      <section className="addedItems">
        <p></p>
        <ul>
          <li>Apple</li>
          <li>Pineapple</li>
        </ul>
      </section>
      <div>
        <h2>What do you want to buy?</h2>
        <input type="search"></input>
      </div>
      <section className="recentlyItems">
        <p></p>
        <ul>
          <li>Banana</li>
          <li>Mango</li>
        </ul>
      </section>
    </div>
  );
}

export default App;
