import React, { Component } from "react";
import { connect } from "react-redux";
import { updateList } from "../actions";
import { ListTitleCt, ListTitleInput } from "../util/styledComponents.js";
import { editItemPropertyInArray, deleteItemFromArray } from "../util";
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
    this.props.dispatch(updateList(this.props.list, "items", items));
  };
  handleDeleteItem = id => {
    const items = deleteItemFromArray(this.props.list.items, id);
    this.props.dispatch(updateList(this.props.list, "items", items));
  };
  handleAddItem = e => {
    const newItem = {
      id:
        "i_" + (+new Date() + Math.floor(Math.random() * 999999)).toString(36),
      side1: "",
      side2: "",
      level: 0
    };
    const items = [...this.props.list.items, newItem];
    this.props.dispatch(updateList(this.props.list, "items", items));
  };
  render() {
    const { list } = this.props;
    const inputId = `listTitle_${list.id}`;

    return (
      <div>
        <ListTitleCt>
          <ListTitleInput
            value={list.name}
            placeholder="Title"
            id={inputId}
            onChange={this.handleListNameChange}
          />
        </ListTitleCt>
        {list.items ? (
          <Table
            items={list.items}
            handleItemTextChange={this.handleItemTextChange}
            handleDeleteItem={this.handleDeleteItem}
            handleAddItem={this.handleAddItem}
            activeSideState={this.props.activeSideState}
          />
        ) : (
          <div>no items</div>
        )}
      </div>
    );
  }
}

function mapStateToProps(store) {
  return {
    list: store.user.list,
    activeSideState: store.layout.activeSideState
  };
}

export default connect(mapStateToProps)(ListCt);
