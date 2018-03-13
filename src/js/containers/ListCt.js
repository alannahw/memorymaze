import React, { Component } from "react";
import { connect } from "react-redux";
import { updateList, addList, setList, setTheme } from "../actions";
import {
  ListTitleCt,
  ListTitleInput,
  EmptyListCt
} from "../util/styledComponents.js";
import {
  editItemPropertyInArray,
  deleteItemFromArray,
  getDefaultItem,
  findListInFolder
} from "../util";
import Table from "../components/ListItems";

class ListCt extends Component {
  handleListNameChange = e => {
    this.props.dispatch(updateList(this.props.list, "name", e.target.value));
  };
  handleItemTextChange = e => {
    const items = editItemPropertyInArray(
      this.props.list.items,
      e.target.id,
      e.target.name,
      e.target.value
    );
    console.log(this.props.list);
    this.props.dispatch(updateList(this.props.list, "items", items));
  };

  handleDeleteItem = id => {
    const items = deleteItemFromArray(this.props.list.items, id);
    this.props.dispatch(updateList(this.props.list, "items", items));
  };
  handleAddItem = e => {
    const newItem = getDefaultItem();
    const items = [...this.props.list.items, newItem];
    this.props.dispatch(updateList(this.props.list, "items", items));
  };
  render() {
    const { list } = this.props;
    const inputId = `listTitle_${list.id}`;

    return (
      <div>
        {list.items ? (
          <div>
            <ListTitleCt>
              <ListTitleInput
                value={list.name}
                placeholder="Title"
                id={inputId}
                onChange={this.handleListNameChange}
              />
            </ListTitleCt>
            <Table
              items={list.items}
              handleItemTextChange={this.handleItemTextChange}
              handleDeleteItem={this.handleDeleteItem}
              handleAddItem={this.handleAddItem}
              activeSideState={this.props.activeSideState}
            />
          </div>
        ) : (
          <EmptyListCt>
            Select a list from the sidebar menu{" "}
            <span className="ion-arrow-right-c" />
          </EmptyListCt>
        )}
      </div>
    );
  }
}

function mapStateToProps(store) {
  return {
    folders: store.user.folders,
    list: store.user.list,
    activeSideState: store.layout.activeSideState
  };
}

export default connect(mapStateToProps)(ListCt);
