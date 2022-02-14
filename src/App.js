// import styled from "styled-components/macro";
import { useState, useEffect } from 'react';
import Searchbar from './Searchbar.js';
import SearchItem from './SearchItem.js';
import ShopingList from './ShopingList.js';
import styled from 'styled-components';

export default function App() {
  const [items, setItems] = useState([]);
  const [hasError, setHasError] = useState(false);
  const { Searcher } = require('fast-fuzzy');
  const [searchValue, setSearchValue] = useState('');
  const [currentButton, setCurrentButton] = useState([]);

  useEffect(() => {
    loadItems();
  }, []);

  //only run once the first time this component is rendered
  useEffect(() => {
    if (localStorage.getItem('shoping-list')) {
      setCurrentButton(JSON.parse(localStorage.getItem('shoping-list')));
    }
  }, []);
  // run every time our pet state changes
  useEffect(() => {
    localStorage.setItem('shoping-list', JSON.stringify(currentButton));
  }, [currentButton]);

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
    <AppContainer className="App">
      <h1 className="App-header">Shopping List</h1>
      <section className="addedItems">
        {currentButton.map(item => (
          <ShopingList
            key={item}
            text={item}
            setCurrentButton={setCurrentButton}
            currentButton={currentButton}
            id={item}
          />
        ))}
      </section>
      <Searchbar setSearchValue={setSearchValue} searchValue={searchValue} />
      <section className="recentlyItems">
        {newFilteredFuzzyItems === '' && !searchValue === '' ? (
          <p>could not find your food!</p>
        ) : (
          newFilteredFuzzyItems.map(item => (
            <SearchItem
              key={item}
              text={item}
              currentButton={currentButton}
              setCurrentButton={setCurrentButton}
              setSearchValue={setSearchValue}
              searchValue={searchValue}
            />
          ))
        )}
      </section>
    </AppContainer>
  );
}
const AppContainer = styled.div``;
