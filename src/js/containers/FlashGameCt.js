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
const BgCircle = props => {
  return (
    <circle
      cx={outerRadius}
      cy={outerRadius}
      r={props.radius}
      stroke={LightenDarkenColor(props.theme.bg, 25)}
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

  componentWillReceiveProps(nextProps) {
    this.updateGraphData(nextProps.list.items);
  }

  componentDidMount() {
    this.setGraphData(this.props.list.items);
  }
  render() {
    const { graphData } = this.state;
    const { theme } = this.props;
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
