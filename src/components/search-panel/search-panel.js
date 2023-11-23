import React, {useState} from "react";
import './search-panel.css';

const SearchPanel = ({onSearchChange: onSearch}) => {

  const [term, setTerm] = useState('');

  const onSearchChange = (event) => {
    const term = event.target.value;
    setTerm(term);
    onSearch(term);
  };

  return (<input
      placeholder="type here to search"
      className="form-control"
      value={term}
      onChange={onSearchChange}/>);
};

export default SearchPanel;