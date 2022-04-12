import styled from 'styled-components';

export default function Searchbar({ setSearchValue, searchValue }) {
  return (
    <>
      <SearchbarContainer>
        <h2>What do you want to buy?</h2>
        <label>
          <input
            placeholder="search your food"
            value={searchValue}
            type="search"
            onChange={event => {
              setSearchValue(event.target.value);
            }}
          ></input>
        </label>
      </SearchbarContainer>
    </>
  );
}

const SearchbarContainer = styled.div`
  margin: 10px 0;
  border: 1px solid black;
  border-radius: 5px;
  padding: 0 10px 10px;

  input {
    width: 200px;
    height: 1.5rem;
    border: none;
    border-radius: 3px;
  }
`;
