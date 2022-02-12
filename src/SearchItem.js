import styled from 'styled-components/macro';

export default function SearchItem({ text, currentButton, setCurrentButton }) {
  function handleClick() {
    setCurrentButton([...currentButton, text]);
  }

  return <Button onClick={handleClick}>{text}</Button>;
}

const Button = styled.button``;
