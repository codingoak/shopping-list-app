// import styled from "styled-components/macro";
import { useState } from "react";
import { useEffect } from "react";
import Searchbar from "./Searchbar.js";
import SearchItem from "./SearchItem.js";

export default function App() {
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

  // const [dataOfItems, setDataOfItems] = useState([]);
  // setDataOfItems(items.map((item) => {name: item.name.de, id: item.key._id}));
  const [searchValue, setSearchValue] = useState("");

  const filteredItems = items.filter((item) => {
    if (searchValue === "") {
      return "";
    } else {
      return item.name.de.toLowerCase().includes(searchValue.toLowerCase());
    }
  });

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
      <Searchbar setSearchValue={setSearchValue} />
      <section className="recentlyItems">
        <p></p>
        <ul>
          {filteredItems.map((item) => (
            <SearchItem key={item._id} text={item.name.de} />
          ))}
        </ul>
      </section>
    </div>
  );
}
