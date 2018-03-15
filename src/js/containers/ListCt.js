import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { updateList, addList, setList, setTheme } from "../actions";
import {
  ListTitleCt,
  ListTitleInput,
  EmptyListCt,
  FlexBox,
  ListToolbar,
  IconBtn,
  IconSpanAbsolute
} from "../util/styledComponents.js";
import {
  editItemPropertyInArray,
  deleteItemFromArray,
  getDefaultItem,
  findListInFolder
} from "../util";
import Table from "../components/ListItems";

class ListCt extends PureComponent {
  handleListNameChange = e => {
    this.props.dispatch(updateList(this.props.list, "name", e.target.value));
  };
  handleItemTextChange = (id, name, value) => {
    console.log(id, name, value);
    const items = editItemPropertyInArray(
      this.props.list.items,
      id,
      name,
      value
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
                  items={list.items}
                  handleItemTextChange={this.handleItemTextChange}
                  handleDeleteItem={this.handleDeleteItem}
                  handleAddItem={this.handleAddItem}
                  activeSideState={this.props.activeSideState}
                />
              </FlexBox>
            </div>
            <ListToolbar>
              <IconBtn color={this.props.theme.third}>
                <span className="ion-arrow-up-c" />
              </IconBtn>
              <IconBtn color={this.props.theme.third}>
                <span className="ion-arrow-down-c" />
              </IconBtn>
            </ListToolbar>
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
    folders: store.user.folders,
    list: store.user.list,
    activeSideState: store.layout.activeSideState,
    theme: store.user.theme
  };
}

export default connect(mapStateToProps)(ListCt);
