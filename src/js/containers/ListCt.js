import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { updateList, setListItemQuery } from "../actions";
import { EmptyListCt, FlexBox } from "../util/styledComponents.js";
import {
  editItemPropertyInArray,
  deleteItemFromArray,
  getDefaultItem,
  findListInFolders,
  filterItems,
  LightenDarkenColor
} from "../util";
import Table from "../components/ListItems";
import ListPageToolbar from "../components/ListPageToolbar";

import styled from "styled-components";
import Textarea from "react-textarea-autosize";

const ListTitleCt = styled.div`
  box-sizing: border-box;
  transition: background 0.1s;
  padding: 20px 0;
  width: 100%;

  background: ${props => props.theme.second};
  font-size: 21px;
  color: ${props => props.theme.main};
`;
const ListTitleInput = styled(Textarea)`
  transition: color 0.1s;
  resize: none;
  width: 100%;
  text-align: center;
  font-weight: 600;
  background: none;
  border: none;
  font-size: 21px;
  color: ${props => props.theme.main};
  &::placeholder {
    color: ${props => LightenDarkenColor(props.theme.second, 45)};
  }
`;

class ListCt extends PureComponent {
  handleListNameChange = e => {
    this.props.dispatch(
      updateList(this.props.currentListId, "name", e.target.value)
    );
  };
  handleItemTextChange = (id, name, value) => {
    const items = editItemPropertyInArray(
      this.props.list.items,
      id,
      name,
      value
    );
    this.props.dispatch(updateList(this.props.currentListId, "items", items));
  };

  handleDeleteItem = id => {
    const items = deleteItemFromArray(this.props.list.items, id);
    this.props.dispatch(updateList(this.props.currentListId, "items", items));
  };
  handleAddItem = e => {
    const newItem = getDefaultItem();
    const items = [...this.props.list.items, newItem];
    this.props.dispatch(updateList(this.props.currentListId, "items", items));
    this.props.dispatch(setListItemQuery(""));
  };
  handleSearchListItems = val => {
    this.props.dispatch(setListItemQuery(val));
  };
  render() {
    const { list, listItemQuery } = this.props;
    const filteredItems = filterItems(listItemQuery, list.items);
    const FullHeightStyle = { height: "100%" };
    const ListCtStyle = {
      height: "100%",
      position: "relative",
      overflowY: "scroll"
    };

    return (
      <div style={FullHeightStyle}>
        {list.items ? (
          <div style={FullHeightStyle}>
            <div style={ListCtStyle}>
              <ListTitleCt>
                <ListTitleInput
                  value={list.name}
                  placeholder="Title"
                  onChange={this.handleListNameChange}
                />
              </ListTitleCt>
              <FlexBox ignore="125px">
                <Table
                  items={filteredItems}
                  handleItemTextChange={this.handleItemTextChange}
                  handleDeleteItem={this.handleDeleteItem}
                  handleAddItem={this.handleAddItem}
                  activeSideState={this.props.activeSideState}
                />
              </FlexBox>
            </div>
            <ListPageToolbar
              handleSearch={this.handleSearchListItems}
              queryVal={this.props.listItemQuery}
              theme={this.props.theme}
            />
          </div>
        ) : (
          <FlexBox ignore="50px">
            <EmptyListCt>
              Select a list from the sidebar menu{" "}
              <span className="ion-arrow-right-c" />
            </EmptyListCt>
          </FlexBox>
        )}
      </div>
    );
  }
}

function mapStateToProps(store) {
  return {
    currentListId: store.user.currentListId,
    list: findListInFolders(
      store.user.userData.folders,
      store.user.currentListId
    ),
    listItemQuery: store.user.listItemQuery,
    activeSideState: store.layout.activeSideState,
    theme: store.user.theme
  };
}

export default connect(mapStateToProps)(ListCt);
