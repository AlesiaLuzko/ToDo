import React, { useState } from 'react';
import './search-panel.css';

type SearchPanelProps = {
  onSearchChange: (term: string) => void,
};

const SearchPanel: React.FC<SearchPanelProps> = ({ onSearchChange: onSearch }) => {

  const [term, setTerm] = useState('');

  const onSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value;
    setTerm(term);
    onSearch(term);
  };

  return (<input
    placeholder="type here to search"
    className="form-control"
    value={term}
    onChange={onSearchChange} />);
};

export default SearchPanel;