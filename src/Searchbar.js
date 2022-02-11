export default function Searchbar() {
  function handleChange() {}

  return (
    <>
      <h2>What do you want to buy?</h2>
      <label>
        <input type="search" onChange={handleChange}></input>
      </label>
    </>
  );
}
