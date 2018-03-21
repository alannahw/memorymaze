import React from "react";
import {
  XYPlot,
  XAxis,
  YAxis,
  HorizontalGridLines,
  LineSeries,
  MarkSeries,
  Hint
} from "react-vis";
import { LightenDarkenColor } from "../util";
import styled from "styled-components";

const MyMarker = styled.div`
  font-size: 12px;
  color: ${props => props.theme.mainMiddle};
  font-weight: 600;
  padding: 0 0 10px 10px;
`;
const ScoreMarker = MyMarker.extend`
  color: ${props => props.theme.second};
`;
class Example extends React.Component {
  getInfo = () => {
    const { scores } = this.props.list;
    if (scores) {
      const earliest = scores.reduce((a, b) => (a.date < b.date ? a : b)).date;
      const strength = scores.length;
      const latestScore = scores.reduce((a, b) => (a.date > b.date ? a : b));
      const now = new Date();
      const totalDays = (now - earliest) / 86400000;
      const totalGraphDays = totalDays > 30 ? totalDays : 30;
      const currCurveDay = (latestScore.date - earliest) / 86400000;
      return {
        scores: scores,
        earliest: earliest,
        strength: strength,
        latestScore: latestScore,
        now: now,
        totalDays: totalDays,
        totalGraphDays: totalGraphDays,
        currCurveDay: currCurveDay
      };
    } else {
      return { totalGraphDays: 30 };
    }
  };

  getCurveData = (startDay, index) => {
    const info = this.getInfo();

    const daySeries = [];
    for (let i = 0; i <= info.totalGraphDays; i++) {
      daySeries.push(i);
    }
    //const daySeries = [0, 1, 2, 7, 18, 30];
    const data = [];
    daySeries.forEach((t, i) => {
      if (i >= startDay) {
        data.push({
          x: t,
          y: this.retentionFn((index + 1) * 3, i - startDay)
        });
      }
    });

    return data;
  };
  getDummyCurves = () => {
    const info = this.getInfo();
    const intervals = [0, 1, 2, 7, 18, 30, 90, 180, 350];
    let series = [];
    intervals.forEach((num, i) => {
      if (num <= info.totalGraphDays) {
        series.push(
          <LineSeries
            key={i}
            data={this.getCurveData(num, i)}
            style={{
              fill: "none",
              stroke: LightenDarkenColor(this.props.theme.bg, 40),
              strokeWidth: 1
            }}
            curve={"curveBasis"}
          />
        );
      }
    });
    return series;
  };
  getPastCurves = () => {
    const info = this.getInfo();
    let series = [];
    info.scores.forEach((s, i) => {
      const startDay = (s.date - info.earliest) / 86400000;

      series.push(
        <LineSeries
          key={`${i}_pastCurves`}
          data={this.getCurveData(startDay, i)}
          style={{
            fill: "none",
            stroke: LightenDarkenColor(this.props.theme.bg, 40),
            strokeWidth: 1
          }}
          curve={"curveBasis"}
        />
      );
    });
    return series;
  };
  getCurrentCurve = () => {
    const info = this.getInfo();
    return (
      <LineSeries
        key={`currCurve`}
        data={this.getCurveData(info.currCurveDay, info.strength - 1)}
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
    const info = this.getInfo();
    let oldScoresData = [];
    info.scores.forEach((s, i) => {
      const startDay = (s.date - info.earliest) / 86400000;
      oldScoresData.push({
        x: startDay,
        y: 1 //s.score / 100
      });
    });
    return (
      <MarkSeries
        key={`oldScores`}
        color={this.props.theme.mainVibrant}
        size={6}
        data={oldScoresData}
      />
    );
  };
  getCurrentPosition = () => {
    const info = this.getInfo();
    const loc = {
      x: info.totalDays,
      y: this.retentionFn(info.strength * 3, info.totalDays - info.currCurveDay)
    };
    return [
      <MarkSeries
        key={`currPos`}
        color={this.props.theme.mainMiddle}
        size={6}
        data={[loc]}
      />,
      <Hint value={loc} orientation="topleft">
        <MyMarker>my position</MyMarker>
      </Hint>
    ];
  };
  getGameCompletedDays = () => {
    const ticks = [];
    if (this.props.list.scores) {
      const info = this.getInfo();
      info.scores.forEach((s, i) => {
        const startDay = (s.date - info.earliest) / 86400000;
        ticks.push(startDay);
      });
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
        data={[{ x: 0, y: 0.5 }, { x: 30, y: 0.5 }]}
        strokeStyle="dashed"
        style={midLine}
      />,
      <XAxis
        top={110}
        hideTicks
        hideLine
        style={midLine}
        title="time to revise"
      />
    ];
  };

  // retentionFn = (s, l, t) => 1 / (1 + 1 / (l * s) * Math.log(1 + l * t));
  retentionFn = (s, t) => Math.pow(Math.E, -t / s);
  render() {
    const axesStyle = {
      line: { stroke: LightenDarkenColor(this.props.theme.mainSubtle, 0) },
      text: {
        stroke: "none",
        fill: LightenDarkenColor(this.props.theme.mainSubtle, 0),
        fontWeight: 600
      },
      title: {
        fill: LightenDarkenColor(this.props.theme.mainSubtle, 0),
        fontWeight: 400,
        fontSize: "10px"
      }
    };

    const completedDaysAxis = {
      line: { stroke: "none" },
      text: {
        stroke: "none",
        fill: this.props.theme.mainVibrant,
        fontWeight: 600
      }
    };
    const wrapperStyle = {
      overflow: "visible"
    };

    return (
      <XYPlot width={this.props.width} height={250} style={wrapperStyle}>
        <XAxis tickValues={[1, 2, 7, 18, 30]} tickSize={5} style={axesStyle} />

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
