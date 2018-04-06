import React from "react";
import { BtnSubtle, BtnSubtleToned } from "../util/styledComponents.js";
import styled from "styled-components";
import Textarea from "react-textarea-autosize";
import { LightenDarkenColor } from "../util";

const ReviseBtn = BtnSubtle.extend`
  color: ${props =>
    props.active
      ? LightenDarkenColor(props.theme.second, props.theme.scheme + 20)
      : "transparent"};
  width: 49%;
  padding: 10px;
  font-size: 14px;
  margin-bottom: 15px;
  border-width: 0 0 1px 0;
  box-sizing: border-box;
  border-style: dashed;
  border-color: ${props =>
    props.active
      ? LightenDarkenColor(props.theme.second, props.theme.scheme + 20)
      : LightenDarkenColor(props.theme.main, props.theme.scheme + 30)};
  &::after {
    font-family: "Ionicons";
    content: "\f105";
  }
`;
const ReviseBtnCt = styled.div`
  width: calc(100% - 60px);
  margin: auto;
`;

const ListItemTd = styled.td`
  border-bottom: 1px solid
    ${props => LightenDarkenColor(props.theme.main, props.theme.scheme + 30)};
`;
const ListItemInput = styled(Textarea)`
  resize: none;
  width: 100%;
  text-align: left;
  background: none;
  margin-top: 3px;
  border: none;
  font-size: 14px;
  color: ${props =>
    props.active === "t"
      ? LightenDarkenColor(props.theme.main, props.theme.scheme + 180)
      : LightenDarkenColor(props.theme.main, props.theme.scheme + 100)};
  &::placeholder {
    color: ${props =>
      LightenDarkenColor(props.theme.main, props.theme.scheme + 35)};
  }
`;
const ListItemIndex = styled.div`
  font-size: 16px;
  margin-right: 10px;
  font-weight: 100;
  color: ${props =>
    LightenDarkenColor(props.theme.main, props.theme.scheme + 60)};
`;
const ListTable = styled.table`
  border-spacing: 0;
  width: 100%;
`;
const ListTableCt = styled.div`
  width: 80%;
  margin: 20px auto 70px;
`;

class EditableCell extends React.PureComponent {
  changeEvent = e => {
    this.props.handleItemTextChange(
      this.props.cellData.id,
      this.props.cellData.type,
      e.target.value
    );
  };
  render() {
    const { cellData, activeSideState } = this.props;
    return (
      <ListItemTd>
        <ListItemInput
          type="text"
          placeholder={cellData.type === "side1" ? "Side 1" : "Side 2"}
          active={activeSideState === cellData.type ? "t" : "f"}
          value={cellData.value}
          onChange={this.changeEvent}
        />
      </ListItemTd>
    );
  }
}

class TableRow extends React.PureComponent {
  delEvent = () => {
    this.props.deleteItem(this.props.item.id);
  };

  render() {
    const rightAlign = {
      textAlign: "right"
    };
    return (
      <tr>
        <td>
          <ListItemIndex>{this.props.index + 1}</ListItemIndex>
        </td>
        <EditableCell
          handleItemTextChange={this.props.handleItemTextChange}
          activeSideState={this.props.activeSideState}
          cellData={{
            type: "side1",
            value: this.props.item.side1,
            id: this.props.item.id
          }}
        />
        <EditableCell
          handleItemTextChange={this.props.handleItemTextChange}
          activeSideState={this.props.activeSideState}
          cellData={{
            type: "side2",
            value: this.props.item.side2,
            id: this.props.item.id
          }}
        />
        <td style={rightAlign}>
          <BtnSubtleToned tone={60} tabIndex="-1" onClick={this.delEvent}>
            <span className="ion ion-android-close" />
          </BtnSubtleToned>
        </td>
      </tr>
    );
  }
}

const TableStructure = props => (
  <ListTable>
    <tbody>
      {props.items.map((item, index) => (
        <TableRow
          item={item}
          key={item.id}
          index={index}
          handleItemTextChange={props.handleItemTextChange}
          deleteItem={props.handleDeleteItem}
          activeSideState={props.activeSideState}
        />
      ))}
    </tbody>
  </ListTable>
);

class Table extends React.PureComponent {
  render() {
    const listEndStyle = {
      textAlign: "right",
      fontSize: "21px"
    };
    const iconStyle = {
      fontFamily: "Ionicons"
    };
    return (
      <ListTableCt>
        <ReviseBtnCt>
          <ReviseBtn
            name="side1"
            active={this.props.activeSideState === "side1"}
            onClick={this.props.handleToggleActiveSide}
          >
            Revise{" "}
          </ReviseBtn>
          <ReviseBtn
            name="side2"
            active={this.props.activeSideState === "side2"}
            onClick={this.props.handleToggleActiveSide}
          >
            Revise{" "}
          </ReviseBtn>
        </ReviseBtnCt>
        <TableStructure
          items={this.props.items}
          handleItemTextChange={this.props.handleItemTextChange}
          handleDeleteItem={this.props.handleDeleteItem}
          activeSideState={this.props.activeSideState}
        />
        <div style={listEndStyle}>
          <BtnSubtleToned tone={100} onClick={this.props.handleAddItem}>
            <span className="ion ion-android-add" />
          </BtnSubtleToned>
        </div>
      </ListTableCt>
    );
  }
}

export default Table;
