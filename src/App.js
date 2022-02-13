// import styled from "styled-components/macro";
import { useState, useEffect } from 'react';
import Searchbar from './Searchbar.js';
import SearchItem from './SearchItem.js';
import ShopingList from './ShopingList.js';

export default function App() {
  const [items, setItems] = useState([]);
  const [hasError, setHasError] = useState(false);
  const { Searcher } = require('fast-fuzzy');
  const [searchValue, setSearchValue] = useState('');
  const [currentButton, setCurrentButton] = useState([]);

  useEffect(() => {
    loadItems();
  }, []);

  async function loadItems() {
    try {
      const response = await fetch(
        'https://fetch-me.vercel.app/api/shopping/items'
      );
      if (response.ok) {
        // check, if there is "no 404"
        const data = await response.json();
        setItems(data.data);
      } else {
        // make code execution continue in catch block
        throw new Error('404 - not found');
      }
    } catch (error) {
      console.log(error.message);
      setHasError(true);
    }
  }

  let itemNames = items.map(item => item.name.de);
  itemNames = new Set(itemNames);
  const searcher = new Searcher(itemNames, { ignoreCase: true });
  const filteredFuzzyItems = searcher.search(searchValue);
  const newFilteredFuzzyItems = filteredFuzzyItems.filter(
    fuzzyItem => !currentButton.includes(fuzzyItem)
  );

  return (
    <div className="App">
      <h1 className="App-header">Shopping List</h1>
      <section className="addedItems">
        {currentButton.map(item => (
          <ShopingList key={item} text={item} />
        ))}
      </section>
      <Searchbar setSearchValue={setSearchValue} />
      <section className="recentlyItems">
        <p></p>
        <ul>
          {newFilteredFuzzyItems.map(item => (
            <SearchItem
              key={item}
              text={item}
              currentButton={currentButton}
              setCurrentButton={setCurrentButton}
              // setSearchValue={setSearchValue}
            />
          ))}
        </ul>
      </section>
    </div>
  );
}
