import React, { Component } from "react";
import { connect } from "react-redux";
import { setListTitle } from "../actions";
import { translateTheme } from "../util/themes";
import { XYPlot, ArcSeries, GradientDefs } from "react-vis";
import { findListInFolders, LightenDarkenColor } from "../util";
import { FlexBox } from "../util/styledComponents";
import styled from "styled-components";

const outerRadius = 200;
const innerRadius = 100;
const levels = 3;
const segmentSize = (outerRadius - innerRadius) / levels;

const GraphCt = styled.div`
  position: relative;
  width: ${outerRadius * 2}px;
  height: ${outerRadius * 2}px;
  margin: 0px auto;
`;
const GraphPos = styled.div`
  position: absolute;
  x: 0;
  y: 0;
`;
const CompletedScoreCt = styled.div`
  transition: color 0.1s;
  height: 100%;
  margin: auto;
  text-align: center;
  font-weight: 600;
  color: ${props =>
    props.started
      ? props.theme.mainVibrant
      : LightenDarkenColor(props.theme.bg2, props.theme.scheme + 40)};
`;
const Completed = styled.div`
  font-size: 42px !important;
  padding: 10px;
  font-size: 30px;
`;
const Total = styled.div`
  transition: color 0.1s;
  font-size: 24px;
  padding: 10px;
  border-top: 1px solid
    ${props => LightenDarkenColor(props.theme.bg2, props.theme.scheme + 40)};
  color: ${props =>
    props.completed
      ? props.theme.mainVibrant
      : LightenDarkenColor(props.theme.bg2, props.theme.scheme + 40)};
`;

const BgCircle = props => {
  return (
    <circle
      cx={outerRadius}
      cy={outerRadius}
      r={props.radius}
      stroke={LightenDarkenColor(props.theme.bg2, 25)}
      fill="transparent"
      strokeWidth="1"
    />
  );
};
class FlashGameCt extends Component {
  constructor() {
    super();
    this.state = {
      graphData: []
    };
  }

  setGraphData = items => {
    const dataCount = items.length;
    let graphData = this.state.graphData;
    if (graphData.length > 0) {
      graphData = [];
    }
    items.forEach(function(item, i) {
      graphData.push({
        angle0: i * 2 * Math.PI / dataCount,
        angle: (i + 1) * 2 * Math.PI / dataCount,
        radius0: innerRadius - 1,
        radius: innerRadius + item.level * segmentSize,
        color: i
      });
    });
    this.setState({ graphData: graphData });
  };
  updateGraphData = items => {
    let graphData = [];
    items.forEach((item, i) => {
      graphData.push({
        ...this.state.graphData[i],
        radius: innerRadius + item.level * segmentSize
      });
    });
    this.setState({ graphData: graphData });
  };

  getCompletedNumber = () => {
    const { list } = this.props;
    const completed = list.items.filter(i => i.level === 3);
    return completed.length;
  };
  checkIfLastItem = (items, currItem) => {
    const rest = [];
    items.forEach((el, i) => {
      if (el.id !== currItem.id) {
        rest.push(el);
      }
    });
    return rest.every(i => i.level === 3) ? true : false;
  };
  componentWillReceiveProps(nextProps) {
    this.updateGraphData(nextProps.list.items);
  }

  componentDidMount() {
    this.setGraphData(this.props.list.items);
  }
  render() {
    const { graphData } = this.state;
    const { theme, list } = this.props;
    const firstCompleted = this.getCompletedNumber() > 0;
    const allCompleted = this.getCompletedNumber() === list.items.length;
    const Gradient = <GradientDefs>{theme.gradient}</GradientDefs>;

    return (
      <FlexBox>
        <GraphCt>
          <GraphPos>
            <svg
              width={outerRadius * 2}
              height={outerRadius * 2}
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
            >
              <BgCircle radius={segmentSize + innerRadius} theme={theme} />
              <BgCircle radius={segmentSize * 2 + innerRadius} theme={theme} />
              <BgCircle radius={segmentSize * 3 + innerRadius} theme={theme} />
            </svg>
          </GraphPos>
          <GraphPos>
            <XYPlot
              xDomain={[-5, 5]}
              yDomain={[-5, 5]}
              width={outerRadius * 2}
              height={outerRadius * 2}
            >
              {Gradient}
              <ArcSeries
                animation
                center={{ x: -0.45, y: -0.45 }}
                data={graphData}
                radiusType={"literal"}
                color={"url(#myGradient)"}
                colorType={"category"}
              />
            </XYPlot>
          </GraphPos>

          <FlexBox>
            <CompletedScoreCt started={firstCompleted}>
              <Completed>{this.getCompletedNumber()}</Completed>
              <Total completed={allCompleted}>{list.items.length}</Total>
            </CompletedScoreCt>
          </FlexBox>
        </GraphCt>
      </FlexBox>
    );
  }
}

function mapStateToProps(store) {
  return {
    list: findListInFolders(
      store.user.userData.folders,
      store.user.currentListId
    ),
    theme: translateTheme(store.user.theme)
  };
}

export default connect(mapStateToProps)(FlashGameCt);
