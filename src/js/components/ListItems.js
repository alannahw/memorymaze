import React from "react";
import {
  ListItemInput,
  BtnSubtle,
  BtnSubtleToned,
  ListItemIndex,
  ListItemTd,
  ListTable,
  ListTableCt
} from "../util/styledComponents.js";

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
          weight={activeSideState === cellData.type ? 500 : 100}
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
    return (
      <ListTableCt>
        <TableStructure
          items={this.props.items}
          handleItemTextChange={this.props.handleItemTextChange}
          handleDeleteItem={this.props.handleDeleteItem}
          activeSideState={this.props.activeSideState}
        />
        <div style={listEndStyle}>
          <BtnSubtle color="#fff" onClick={this.props.handleAddItem}>
            <span className="ion ion-android-add" />
          </BtnSubtle>
        </div>
      </ListTableCt>
    );
  }
}

export default Table;
