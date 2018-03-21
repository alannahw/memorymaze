import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import PlayBtn from "../components/PlayBtn";
import Example from "../components/ForgettingCurveGraph";
import { translateTheme } from "../util/themes";
import {
  findListInFolders,
  LightenDarkenColor,
  getNextRevisionDate
} from "../util";

const gWidth = 400;

const GraphCt = styled.div`
  position: relative;
  overflow: visible;
  width: ${gWidth}px;
  margin: 20px auto;
`;
const GraphHeaderCt = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: ${props => props.theme.mainSubtle};
  padding: 25px 0px;
`;
const GraphNoData = styled.div`
  position: absolute;
  top: 90px;
  text-align: center;
  font-size: 16px;
  line-height: 1.5em;
  width: 100%;
  color: ${props => LightenDarkenColor(props.theme.bg, 70)};
`;
const NextRevisionCt = styled.div`
  font-size: 16px;
  text-align: center;
  line-height: 2em;
  padding: 25px 10px;
  color: ${props => props.theme.mainSubtle};
`;
const NextRevisionAlert = styled.div`
  font-size: 21px;
  font-weight: 600;
  color: ${props => props.theme.mainMiddle};
`;

class ListScoreCt extends Component {
  render() {
    const NoData = () => {
      if (!this.props.list.scores) {
        return (
          <GraphNoData>
            To start plotting <br />play the game
          </GraphNoData>
        );
      } else return null;
    };
    return (
      <div>
        <GraphHeaderCt>Current Forgetting Curve</GraphHeaderCt>
        <GraphCt>
          <Example
            list={this.props.list}
            width={gWidth}
            theme={this.props.theme}
          />
          <NoData />
        </GraphCt>
        <NextRevisionCt>
          Next revision due:
          <NextRevisionAlert>
            {getNextRevisionDate(this.props.list)}
          </NextRevisionAlert>
        </NextRevisionCt>
        <PlayBtn />
      </div>
    );
  }
}

function mapStateToProps(store) {
  return {
    theme: translateTheme(store.user.theme),
    list: findListInFolders(
      store.user.userData.folders,
      store.user.currentListId
    )
  };
}

export default connect(mapStateToProps)(ListScoreCt);
