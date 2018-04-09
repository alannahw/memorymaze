import React, { PureComponent, Component } from "react";
import { BtnSubtle } from "../util/styledComponents.js";
import { translateTheme } from "../util/themes.js";
import { Drag } from "../lib/dragDropComponents.js";
import styled from "styled-components";
import { LightenDarkenColor } from "../util";

const ListLink = BtnSubtle.extend`
  color: #fff;
  font-size: 0.9em;
  text-align: left;
  transition: color 0.25s, background 0.3s;
  position: relative;
  color: ${props =>
    props.active === "true"
      ? LightenDarkenColor(props.theme.mainMiddle, 20)
      : "#fff"};
  &:hover {
    color: ${props => props.theme.mainMiddle};
  }
`;
const ListLinkCt = styled.div`
  position: relative;
  width: 100%;
  &::after {
    transition: right 0.3s;
    position: absolute;
    top: 6px;
    right: 5px;
    font-family: "Ionicons";
    content: "\f21b";
    color: transparent;
    font-size: 21px;
    height: 17px;
    border-radius: 15px;
    background: linear-gradient(
      90deg,
      ${props => props.grad1},
      ${props => props.grad2}
    );
  }
`;
class List extends PureComponent {
  setListEvent = () => {
    this.props.handleSetList(this.props.listId);
  };
  delEvent = () => {
    this.props.handleListDelete(this.props.listId, this.props.listName);
  };
  render() {
    const { currentListId, listId, grad1, grad2, listName, index } = this.props;
    return (
      <Drag dragId={listId} index={index}>
        <ListLinkCt grad1={grad1} grad2={grad2} className="listLink">
          <ListLink
            onClick={this.setListEvent}
            className="listLink"
            active={listId === currentListId ? "true" : "false"}
          >
            {listName}
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
              currentListId={this.props.currentListId}
              grad1={translateTheme(l.theme).main}
              grad2={translateTheme(l.theme).second}
              handleListDelete={this.props.handleListDelete}
              handleSetList={this.props.handleSetList}
            />
          );
        })}
      </div>
    );
  }
}

export default Lists;
