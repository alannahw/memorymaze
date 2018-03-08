import React, { Component } from "react";
import { ListLink, BtnSubtle, RelativeCt } from "../util/styledComponents.js";
import { translateTheme } from "../util";

class List extends Component {
  render() {
    const removeBtnId = `removeBtn_${this.props.listId}`;

    return (
      <RelativeCt>
        <ListLink
          id={this.props.listId}
          onClick={this.props.handleSetList}
          grad1={this.props.grad1}
          grad2={this.props.grad2}
          className="listLink"
        >
          {this.props.listName}
        </ListLink>
        <BtnSubtle
          onClick={this.props.handleRemoveBtnClick}
          id={removeBtnId}
          name={this.props.listName}
          color="#aaa"
          className="removeBtn ion-close-round"
        />
      </RelativeCt>
    );
  }
}
class Lists extends Component {
  render() {
    return (
      <div>
        {this.props.lists.map(l => {
          return (
            <List
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
