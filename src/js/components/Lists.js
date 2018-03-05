import React, { Component } from "react";
import { ListLink } from "../util/styledComponents.js";
import Collapsible from "react-collapsible";
import { translateTheme } from "../util";

class List extends Component {
  render() {
    return (
      <div>
        <ListLink themeGrad={this.props.themeGrad}>
          {this.props.listName}
        </ListLink>
      </div>
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
              listName={l.name}
              themeGrad={translateTheme(l.theme).main}
            />
          );
        })}
      </div>
    );
  }
}

export default Lists;
