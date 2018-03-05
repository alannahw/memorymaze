import React, { Component } from "react";
import Lists from "./Lists";
import Collapsibles from "./Collapsibles";
import { editFolderName } from "../actions";
import { connect } from "react-redux";
//import Collapsible from "react-collapsible";

class Folder extends Component {
  render() {
    return (
      <div>
        <Collapsibles
          classParentString="accordianSub"
          trigger={this.props.folderName}
          open={true}
          id={this.props.id}
          handleInputChange={this.props.handleFolderNameChange}
        >
          <Lists lists={this.props.lists} />
        </Collapsibles>
      </div>
    );
  }
}

class Folders extends Component {
  handleFolderNameChange = e => {
    this.props.dispatch(editFolderName(e.target.id, e.target.value));
  };
  render() {
    return (
      <div>
        {this.props.folders.map(f => {
          return (
            <Folder
              key={f.id}
              id={f.id}
              folderName={f.name}
              lists={f.lists}
              handleFolderNameChange={this.handleFolderNameChange}
            />
          );
        })}
      </div>
    );
  }
}

function mapStateToProps(store) {
  return {};
}

export default connect(mapStateToProps)(Folders);
