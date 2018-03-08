import React, { Component } from "react";
import { connect } from "react-redux";
import { searchFolders } from "../actions";
import styled from "styled-components";
import { SearchBarInput } from "../util/styledComponents.js";

class SearchBar extends Component {
  search = e => {
    this.props.dispatch(searchFolders(e.target.value));
  };

  render() {
    const { searchValue } = this.props;

    const SearchIcon = styled.div`
      &::before {
        position: absolute;
        top: 3px;
        left: 10px;
        font-size: 1.2em;
        color: ${props => props.theme.bg};
        font-family: "Ionicons";
        content: "\f2f5";
      }
    `;
    return (
      <div className="searchCt">
        <SearchBarInput
          placeholder="Search..."
          onChange={this.search}
          value={searchValue}
        />
        <SearchIcon />
      </div>
    );
  }
}

function mapStateToProps(store) {
  return { searchValue: store.user.searchValue };
}

export default connect(mapStateToProps)(SearchBar);
