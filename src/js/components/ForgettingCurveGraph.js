import React from "react";
import {
  XYPlot,
  XAxis,
  YAxis,
  LineSeries,
  MarkSeries,
  Hint,
  Borders
} from "react-vis";
import {
  LightenDarkenColor,
  getScoreStats,
  getCurveData,
  retentionFn,
  getNextRevisionDate
} from "../util";
import styled from "styled-components";

const MyMarker = styled.div`
  font-size: 12px;
  color: ${props => props.theme.mainVibrant};
  font-weight: 600;
  padding: 0 0 10px 10px;
`;
const ScoreMarker = MyMarker.extend`
  color: ${props => props.theme.second};
`;
class Example extends React.Component {
  getDummyCurves = () => {
    const dashedLine = {
      fill: "none",
      stroke: LightenDarkenColor(this.props.theme.bg, 60),
      strokeWidth: 1
    };
    const { theme } = this.props;
    const { start, end } = this.props.graph;
    const stats = getScoreStats(this.props.list);
    const intervals = [0, 1, 2, 7, 18, 30, 90, 180, 350];
    let series = [];
    intervals.forEach((num, i) => {
      if (num <= this.props.graph.end) {
        series.push(
          <LineSeries
            key={i}
            data={getCurveData(num, i + 1, start, end)}
            style={{
              fill: "none",
              stroke: LightenDarkenColor(theme.bg2, theme.scheme + 40),
              strokeWidth: 1
            }}
            curve={"curveBasis"}
          />
        );
        series.push(
          <LineSeries
            key={`${i}_pastVLines_dummy`}
            data={[{ x: num, y: 0 }, { x: num, y: 1 }]}
            strokeStyle="dashed"
            style={dashedLine}
          />
        );
      }
    });
    return series;
  };
  getPastCurves = () => {
    const { theme } = this.props;
    const { start, end } = this.props.graph;
    const stats = getScoreStats(this.props.list);
    let series = [];
    stats.scores.forEach((s, i) => {
      const startDay = (s.date - stats.earliest) / 86400000;

      series.push(
        <LineSeries
          key={`${i}_pastCurves`}
          data={getCurveData(startDay, i + 1, start, end)}
          style={{
            fill: "none",
            stroke: LightenDarkenColor(theme.bg2, theme.scheme + 40),
            strokeWidth: 1
          }}
          curve={"curveBasis"}
        />
      );
    });
    return series;
  };
  getCurrentCurve = () => {
    const { list, graph } = this.props;
    const stats = getScoreStats(list);
    return (
      <LineSeries
        key={`currCurve`}
        data={getCurveData(
          stats.currCurveDay,
          stats.strength,
          graph.start,
          graph.end
        )}
        style={{
          fill: "none",
          stroke: this.props.theme.mainMiddle,
          strokeWidth: 2
        }}
        curve={"curveBasis"}
      />
    );
  };
  getOldScores = () => {
    const dashedLine = {
      fill: "none",
      stroke: LightenDarkenColor(this.props.theme.bg, 60),
      strokeWidth: 1
    };
    const stats = getScoreStats(this.props.list);
    let oldScores = [];
    let oldScoresData = [];
    let oldScoresLines = [];
    stats.scores.forEach((s, i) => {
      const startDay = (s.date - stats.earliest) / 86400000;
      oldScoresData.push({
        x: startDay,
        y: 1 //s.score / 100
      });
      oldScoresLines.push(
        <LineSeries
          key={`${i}_pastVLines`}
          data={[{ x: startDay, y: 0 }, { x: startDay, y: 1 }]}
          strokeStyle="dashed"
          style={dashedLine}
        />
      );
    });
    oldScores = [
      oldScoresLines,
      <MarkSeries
        key={`oldScores`}
        color={this.props.theme.mainMiddle}
        size={6}
        data={oldScoresData}
      />
    ];
    return oldScores;
  };
  getCurrentPosition = () => {
    const { start, end } = this.props.graph;
    const stats = getScoreStats(this.props.list);
    const loc = {
      x: stats.totalDays,
      y: retentionFn(stats.strength * 3, stats.totalDays - stats.currCurveDay)
    };
    let marker = [];

    marker.push([
      <MarkSeries
        key={`currPos`}
        color={this.props.theme.mainVibrant}
        size={6}
        data={[loc]}
      />
    ]);
    if (start < stats.totalDays && stats.totalDays < end) {
      marker.push([
        <Hint value={loc} orientation="topleft">
          <MyMarker>my position</MyMarker>
        </Hint>
      ]);
    }

    return marker;
  };
  getGameCompletedDays = () => {
    const { start, end } = this.props.graph;
    const { list } = this.props;
    const ticks = [];
    if (list.scores) {
      const stats = getScoreStats(list);
      stats.scores.forEach((s, i) => {
        const startDay = (s.date - stats.earliest) / 86400000;
        if (start <= startDay && startDay <= end) {
          ticks.push(startDay);
        }
      });
      const daysTill = getNextRevisionDate(list);
      const day = Math.round(stats.totalDays + daysTill);
      ticks.push(day);
    }
    return ticks;
  };
  currentPlots = () => {
    const { scores } = this.props.list;
    if (scores) {
      const midLine = this.getDashedMidline();
      const past = this.getPastCurves();
      const curr = this.getCurrentCurve();
      const oldScores = this.getOldScores();
      const pos = this.getCurrentPosition();
      return [midLine, past, curr, oldScores, pos];
    } else {
      const dummy = this.getDummyCurves();
      return dummy;
    }
  };
  getDashedMidline = () => {
    const { start, end } = this.props.graph;
    const midLine = {
      fill: "none",
      stroke: LightenDarkenColor(this.props.theme.bg, 60),
      strokeWidth: 1,

      title: {
        stroke: "none",
        fill: LightenDarkenColor(this.props.theme.bg, 60),
        fontSize: "10px"
      }
    };
    return [
      <LineSeries
        data={[{ x: start, y: 0.5 }, { x: end, y: 0.5 }]}
        strokeStyle="dashed"
        style={midLine}
      />,
      <XAxis
        top={115}
        hideTicks
        hideLine
        style={midLine}
        title="time to revise"
      />
    ];
  };

  // retentionFn = (s, l, t) => 1 / (1 + 1 / (l * s) * Math.log(1 + l * t));
  // retentionFn = (s, t) => Math.pow(Math.E, -t / s);
  render() {
    const axesStyle = {
      line: { stroke: this.props.theme.mainSubtle },
      text: {
        stroke: "none",
        fill: this.props.theme.mainSubtle,
        fontWeight: 600,
        fontSize: "12px"
      }
    };

    const completedDaysAxis = {
      line: { stroke: "none" },
      text: {
        stroke: "none",
        fill: this.props.theme.mainMiddle,
        fontWeight: 600,
        fontSize: "12px"
      }
    };

    const wrapperStyle = {
      //overflow: "visible"
    };
    const { graph, width } = this.props;
    const xTickVals = [graph.start, graph.end];
    return (
      <XYPlot
        animation
        width={width}
        height={250}
        style={wrapperStyle}
        yDomain={[0, 1]}
        xDomain={[graph.start, graph.end]}
        margin={{ bottom: 25 }}
      >
        <XAxis tickValues={xTickVals} tickSize={5} style={axesStyle} />
        <XAxis
          tickValues={this.getGameCompletedDays()}
          tickSize={5}
          style={completedDaysAxis}
        />
        <YAxis
          tickValues={[0, 0.5, 1]}
          tickSize={0}
          tickFormat={t => {
            return <tspan>{t * 100}%</tspan>;
          }}
          style={axesStyle}
        />
        {this.currentPlots()}
      </XYPlot>
    );
  }
}
export default Example;
