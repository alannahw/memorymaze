import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import Example from "../components/ForgettingCurveGraph";
import { BtnSubtle, BtnMain, BtnInverted } from "../util/styledComponents";
import { translateTheme } from "../util/themes";
import {
  setGraphTimeframe,
  setPlayState,
  setSidebarState,
  updateList
} from "../actions";
import {
  findListInFolders,
  LightenDarkenColor,
  getNextRevisionDate,
  getScoreStats,
  removeEmptyItems
} from "../util";

const gWidth = 400;

const GraphCt = styled.div`
  position: relative;
  overflow: visible;
  width: ${gWidth}px;
  margin: 0px auto;
`;
const GraphHeaderCt = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: ${props => props.theme.mainSubtle};
  padding: 25px 0px;
`;
const HeaderDivider = styled.span`
  font-weight: 200;
  color: ${props => props.theme.mainSubtle};
  padding: 0 15px;
`;
const ResetBtn = BtnSubtle.extend`
  transition: color 0.3s;
  color: ${props => LightenDarkenColor(props.theme.mainSubtle, 5)};
  font-size: 12px;
  &:hover {
    color: ${props => LightenDarkenColor(props.theme.mainSubtle, 20)};
  }
`;
const AxesFont = styled.span`
  font-weight: 600;
  font-size: 12px;
  color: ${props => props.theme.mainSubtle};
  padding: 0 10px;
`;
const AxesBtn = BtnSubtle.extend`
  font-weight: 600;
  color: ${props => LightenDarkenColor(props.theme.mainSubtle, -15)};
  &:disabled {
    opacity: 0;
  }
`;
const GraphNoData = styled.div`
  position: absolute;
  top: 100px;
  text-align: center;
  font-size: 14px;
  line-height: 1.5em;
  width: 100%;
  color: ${props => LightenDarkenColor(props.theme.bg, 50)};
`;
const NextRevisionCt = styled.div`
  font-size: 14px;
  font-weight: 600;
  text-align: center;
  line-height: 2.2em;
  padding: 45px 10px;
  height: 70px;
  color: ${props => LightenDarkenColor(props.theme.bg, 50)};
`;
const NextRevisionAlert = styled.div`
  font-size: 21px;
  font-weight: 600;
  color: ${props => props.theme.mainMiddle};
`;
const PlayBtnStyle = BtnMain.extend`
  padding: 10px 50px;
  font-size: 21px;
  background-color: ${props => props.theme.mainMiddle};
  border-color: ${props => props.theme.mainMiddle};
`;

class ListScoreCt extends Component {
  handleGraphForward = () => {
    const stats = getScoreStats(this.props.list);

    const { start, end } = this.props.graph;
    const nextRev = stats.nextRevisionDay + stats.currCurveDay;
    if (start + 30 > stats.totalDays && start + 30 > nextRev) {
      return;
    } else {
      this.props.dispatch(setGraphTimeframe(start + 30, end + 30));
    }
  };
  handleGraphBack = () => {
    const { start, end } = this.props.graph;
    if (start > 0) {
      this.props.dispatch(setGraphTimeframe(start - 30, end - 30));
    }
  };
  handlePlayState = () => {
    this.props.dispatch(setPlayState(true));
    this.props.dispatch(setSidebarState(false));
  };
  handleResetScores = () => {
    const { list } = this.props;
    const scores = null;
    const msg =
      "Do you really want to reset all your scores for List '" +
      list.name +
      "'?";
    if (window.confirm(msg)) {
      this.props.dispatch(updateList(list.id, "scores", scores));
    }
  };
  render() {
    const { list, theme, graph } = this.props;
    let noDataNote = "";
    if (!list.scores) {
      noDataNote = <GraphNoData>Start game</GraphNoData>;
    }
    const emptyList = removeEmptyItems(list)[0] ? false : true;
    const stats = getScoreStats(list);
    const totalDays = stats ? stats.totalDays : 0;
    const nextRev = stats ? stats.nextRevisionDay + stats.currCurveDay : 0;
    console.log(nextRev);
    const ForwardBtnDisabled =
      graph.end > totalDays && graph.end > nextRev ? true : false;
    const BackBtnDisabled = graph.start > 0 ? false : true;
    const daysTill = getNextRevisionDate(list);

    let nextRevision = "";
    if (daysTill) {
      nextRevision =
        daysTill <= 0 ? "Today" : `${daysTill} day${daysTill > 1 ? "s" : ""}`;
    }
    return (
      <div>
        <GraphHeaderCt>
          Current Forgetting Curve <HeaderDivider>|</HeaderDivider>
          <ResetBtn onClick={this.handleResetScores}>Reset Scores</ResetBtn>
        </GraphHeaderCt>
        <GraphCt>
          <Example list={list} width={gWidth} theme={theme} graph={graph} />
        </GraphCt>
        <div>
          <AxesBtn disabled={BackBtnDisabled} onClick={this.handleGraphBack}>
            <span className="ion-chevron-left" />
          </AxesBtn>
          <AxesFont>Days</AxesFont>
          <AxesBtn
            disabled={ForwardBtnDisabled}
            onClick={this.handleGraphForward}
          >
            <span className="ion-chevron-right" />
          </AxesBtn>
        </div>
        <NextRevisionCt>
          Next revision due:
          <NextRevisionAlert>{nextRevision}</NextRevisionAlert>
        </NextRevisionCt>

        <PlayBtnStyle disabled={emptyList} onClick={this.handlePlayState}>
          Play
        </PlayBtnStyle>
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
    ),
    graph: store.user.graph,
    playState: store.game.playState
  };
}

export default connect(mapStateToProps)(ListScoreCt);
