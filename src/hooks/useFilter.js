import { useState, useEffect } from 'react';

const useFilter = (items, activeFilter = 'all') => {
  const [filteredItems, setFilteredItems] = useState([]);

  useEffect(() => {
    if (activeFilter === 'completed') {
      setFilteredItems(items.filter((item) => item.checked));
    } else if (activeFilter === 'active') {
      setFilteredItems(items.filter((item) => !item.checked));
    } else {
      setFilteredItems(items);
    }
  }, [items, activeFilter]);

  return filteredItems;
};

export default useFilter;
