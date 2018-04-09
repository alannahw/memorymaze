import React, { PureComponent } from "react";
import { connect } from "react-redux";
import {
  updateList,
  setListItemQuery,
  setActiveSideState,
  setFolders
} from "../actions";
import { EmptyListCt, FlexBox, BtnSubtle } from "../util/styledComponents.js";

import {
  editItemPropertyInArray,
  deleteItemFromArray,
  getDefaultItem,
  findFolder,
  findListInFolders,
  filterItems,
  LightenDarkenColor,
  reorderMap
} from "../util";
import Table from "../components/Table";
import ListPageToolbar from "../components/ListPageToolbar";
import DropdownMenu from "../components/DropdownMenu";
import styled from "styled-components";
import Textarea from "react-textarea-autosize";

const TitleCt = styled.div`
  box-sizing: border-box;
  transition: background 0.1s;
  padding: 15px 0 12px;
  width: 100%;
  background: ${props => props.theme.second};
`;
const FolderTitle = styled.div`
  display: inline-block;
  vertical-align: top;
  transition: color 0.1s;
  font-size: 16px;
  font-weight: 200;
  text-align: center;
  padding-bottom: 5px;
  box-sizing: border-box;
  color: ${props =>
    props.theme.scheme === "+" ? props.theme.main : props.theme.bg};
`;
const ListTitleInput = styled(Textarea)`
  display: inline-block;
  transition: color 0.1s;
  resize: none;
  width: inherit;
  text-align: center;
  font-weight: 600;
  background: none;
  box-sizing: border-box;
  font-size: 21px;
  border-style: solid;
  border-width: 0 0 0 1px;
  border-color: ${props =>
    props.theme.scheme === "+" ? props.theme.main : props.theme.bg};
  color: ${props =>
    props.theme.scheme === "+" ? props.theme.main : props.theme.bg};
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
  handleToggleActiveSide = e => {
    this.props.dispatch(setActiveSideState(e.target.name));
  };
  changeFolder = nextFolder => {
    const { folder, folders, list } = this.props;
    const listIndex = folder.lists.indexOf(list);
    const source = { droppableId: folder.id, index: listIndex };
    const destination = { droppableId: nextFolder.id, index: 0 };
    const reordered = reorderMap(folders, source, destination);
    this.props.dispatch(setFolders(reordered));
  };

  handleCSVUpload = fileList => {
    const { currentListId } = this.props;
    let items = [];
    const Papa = require("papaparse/papaparse.min.js");
    Papa.parse(fileList[0], {
      header: true,
      complete: res => {
        res.data.forEach(d => {
          items.push({
            ...getDefaultItem(),
            side1: d.side1,
            side2: d.side2
          });
        });
        this.props.dispatch(updateList(currentListId, "items", items));
      }
    });
  };
  render() {
    const { list, listItemQuery, folder, folders } = this.props;
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
              <TitleCt>
                <FolderTitle>
                  <DropdownMenu
                    menuTitle={folder.name}
                    items={folders}
                    handleOnClick={this.changeFolder}
                    activeItemId={folder.id}
                  />{" "}
                </FolderTitle>
                <ListTitleInput
                  value={list.name}
                  placeholder="Title"
                  onChange={this.handleListNameChange}
                />
              </TitleCt>

              <FlexBox ignore="125px">
                <Table
                  items={filteredItems}
                  handleItemTextChange={this.handleItemTextChange}
                  handleDeleteItem={this.handleDeleteItem}
                  handleAddItem={this.handleAddItem}
                  activeSideState={this.props.activeSideState}
                  handleToggleActiveSide={this.handleToggleActiveSide}
                />
              </FlexBox>
            </div>
            <ListPageToolbar
              handleSearch={this.handleSearchListItems}
              queryVal={this.props.listItemQuery}
              list={list}
              handleCSVUpload={this.handleCSVUpload}
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
    folders: store.user.userData.folders,
    folder: findFolder(store.user.userData.folders, store.user.currentListId),
    list: findListInFolders(
      store.user.userData.folders,
      store.user.currentListId
    ),
    listItemQuery: store.user.listItemQuery,
    activeSideState: store.layout.activeSideState
  };
}

export default connect(mapStateToProps)(ListCt);
