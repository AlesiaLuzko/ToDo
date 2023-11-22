import React, {Component} from "react";
import './search-panel.css';

export default class SearchPanel extends Component {

  state = {
    term: ''
  };

  onSearchChange = (event) =>{
    const term = event.target.value;
    this.setState({term});
    this.props.onSearchChange(term);
  };

  render() {
    return (
        <input
          placeholder="type here to search"
          className="form-control"
          value={this.state.term}
          onChange={this.onSearchChange}/>
    );
  };
};

