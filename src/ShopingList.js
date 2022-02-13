export default function ShopingList({
  text,
  id,
  currentButton,
  setCurrentButton,
}) {
  return <button onClick={handleClick}>{text}</button>;

  function handleClick() {
    // setCurrentButton(currentButton.filter(item => item != id));
    setCurrentButton(prev => prev.filter(item => item != id));
  }
}
