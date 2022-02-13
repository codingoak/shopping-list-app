export default function Searchbar({ setSearchValue, searchValue }) {
  return (
    <>
      <h2>What do you want to buy?</h2>
      <label>
        <input
          value={searchValue}
          type="search"
          onChange={event => {
            setSearchValue(event.target.value);
          }}
        ></input>
      </label>
    </>
  );
}
