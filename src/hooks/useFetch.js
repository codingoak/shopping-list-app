import { useEffect, useState } from 'react';

export default function useFetch() {
  const [items, setItems] = useState([]);
  const [hasError, setHasError] = useState(false);

  async function loadItems() {
    try {
      const response = await fetch(
        'https://fetch-me.vercel.app/api/shopping/items'
      );
      if (response.ok) {
        // check, if there is "no 404"
        const data = await response.json();
        setItems(data.data);
      } else {
        // make code execution continue in catch block
        throw new Error('404 - not found');
      }
    } catch (error) {
      console.log(error.message);
      setHasError(true);
    }
  }

  useEffect(() => {
    loadItems();
  }, []);

  return [items, hasError];
}
