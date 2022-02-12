export default function SearchItem({ text, currentButton, setCurrentButton }) {
  function handleClick() {
    setCurrentButton(new Set([text, ...currentButton]));
  }

  return <button onClick={handleClick}>{text}</button>;
}
