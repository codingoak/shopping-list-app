import styled from 'styled-components/macro';

export default function SearchItem({
  text,
  currentButton,
  setCurrentButton,
  setSearchValue,
}) {
  function handleClick() {
    setCurrentButton([...currentButton, text]);
    setSearchValue('');
  }

  return <Button onClick={handleClick}>{text}</Button>;
}

const Button = styled.button`
  background-color: coral;
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
