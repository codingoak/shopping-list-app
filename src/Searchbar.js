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
  margin: 10px;

  input {
    width: 200px;
  }
`;
