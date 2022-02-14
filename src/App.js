// import styled from "styled-components/macro";
import { useState, useEffect } from 'react';
import Searchbar from './Searchbar.js';
import SearchItem from './SearchItem.js';
import ShoppingList from './ShoppingList.js';
import styled from 'styled-components';
import useLocalStorage from './hooks/useLocalStorage.js';
import useToggle from './hooks/useToggle.js';

export default function App() {
  const [items, setItems] = useState([]);
  const [hasError, setHasError] = useState(false);
  const { Searcher } = require('fast-fuzzy');
  const [searchValue, setSearchValue] = useState('');
  const [shoppingListItem, setShoppingListItem] = useLocalStorage(
    'Shopping-list',
    []
  );

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
  const [toggleLanguage, setToggleLanguage] = useToggle();
  const [language, setLanguage] = useState('de');
  let itemNames = items.map(item => item.name[language]);
  itemNames = new Set(itemNames);
  const searcher = new Searcher(itemNames, { ignoreCase: true });
  const filteredFuzzyItems = searcher.search(searchValue);
  const newFilteredFuzzyItems = filteredFuzzyItems.filter(
    fuzzyItem => !shoppingListItem.includes(fuzzyItem)
  );

  function handleToggle() {
    if (toggleLanguage === false) {
      setLanguage('en');
      setToggleLanguage();
    } else {
      setLanguage('de');
      setToggleLanguage();
    }
  }

  console.log(language, toggleLanguage);

  return (
    <AppContainer className="App">
      <h1 className="App-header">Shopping List</h1>
      <button onClick={handleToggle}>current language: {language}</button>
      <section className="addedItems">
        {shoppingListItem.map(item => (
          <ShoppingList
            key={item}
            text={item}
            setShoppingListItem={setShoppingListItem}
            shoppingListItem={shoppingListItem}
            id={item}
          />
        ))}
      </section>
      <Searchbar setSearchValue={setSearchValue} searchValue={searchValue} />
      {hasError && <p>Error: could not load shopping items</p>}
      <section className="recentlyItems">
        {newFilteredFuzzyItems.length === 0 && searchValue !== '' ? (
          <p>could not find your food!</p>
        ) : (
          newFilteredFuzzyItems.map(item => (
            <SearchItem
              key={item}
              text={item}
              shoppingListItem={shoppingListItem}
              setShoppingListItem={setShoppingListItem}
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
