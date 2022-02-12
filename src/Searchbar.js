export default function Searchbar({ setSearchValue }) {
  return (
    <>
      <h2>What do you want to buy?</h2>
      <label>
        <input
          type="search"
          onChange={event => {
            setSearchValue(event.target.value);
          }}
        ></input>
      </label>
    </>
  );
}
