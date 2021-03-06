import styled from 'styled-components';

export default function ShoppingList({ text, id, setShoppingListItem }) {
  return <Button onClick={handleClick}>{text}</Button>;

  function handleClick() {
    setShoppingListItem(prev => prev.filter(item => item !== id));
  }
}

const Button = styled.button`
  background-color: papayawhip;
  border: 2px solid black;
  border-radius: 10px;
  padding: 0.5rem;
  margin: 5px;

  &:active {
    opacity: 0.8;
    transform: scale(1.1);
    transition: 0.1s;
  }
`;
