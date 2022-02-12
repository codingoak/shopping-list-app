import { useState } from 'react';
import styled from 'styled-components/macro';

export default function SearchItem({ text, currentButton, setCurrentButton }) {
  const [hidden, setHidden] = useState('');

  function handleClick() {
    setCurrentButton([...currentButton, text]);
    setHidden('hidden');
  }

  return (
    <Button styling={hidden} onClick={handleClick}>
      {text}
    </Button>
  );
}

const Button = styled.button`
  ${props => (props.styling === 'hidden' ? 'display: none;' : '')}
`;
