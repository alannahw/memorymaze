import React, { PureComponent, Component } from "react";
import { ListLink, BtnSubtle, ListLinkCt } from "../util/styledComponents.js";
import { translateTheme } from "../util/themes.js";
import { Drag, Drop } from "../lib/dragDropComponents.js";

class List extends PureComponent {
  setListEvent = () => {
    this.props.handleSetList(this.props.listId);
  };
  delEvent = () => {
    this.props.handleRemoveBtnClick(this.props.listId, this.props.listName);
  };
  render() {
    return (
      <Drag dragId={this.props.listId} index={this.props.index}>
        <ListLinkCt
          grad1={this.props.grad1}
          grad2={this.props.grad2}
          className="listLink"
        >
          <ListLink onClick={this.setListEvent} className="listLink">
            {this.props.listName}
          </ListLink>
          <BtnSubtle
            onClick={this.delEvent}
            color="#aaa"
            className="removeBtn ion-close-round listDelete"
          />
        </ListLinkCt>
      </Drag>
    );
  }
}
class Lists extends Component {
  render() {
    return (
      <div>
        {this.props.lists.map((l, index) => {
          return (
            <List
              index={index}
              key={l.id}
              listId={l.id}
              listName={l.name}
              grad1={translateTheme(l.theme).main}
              grad2={translateTheme(l.theme).second}
              handleRemoveBtnClick={this.props.handleRemoveBtnClick}
              handleSetList={this.props.handleSetList}
            />
          );
        })}
      </div>
    );
  }
}

export default Lists;
