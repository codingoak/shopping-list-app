import styled from 'styled-components/macro';

export default function SearchItem({
  text,
  currentButton,
  setCurrentButton,
  // setSearchValue,
}) {
  function handleClick() {
    setCurrentButton([...currentButton, text]);
    // setSearchValue('');
  }

  return <Button onClick={handleClick}>{text}</Button>;
}

const Button = styled.button``;
