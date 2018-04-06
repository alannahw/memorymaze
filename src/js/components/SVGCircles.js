import React, { PureComponent, Component } from "react";
import { LightenDarkenColor } from "../util";

const BgCircle = props => {
  return (
    <circle
      cx={props.outerRadius}
      cy={props.outerRadius}
      r={props.radius}
      stroke={LightenDarkenColor(props.theme.bg2, 25)}
      fill="transparent"
      strokeWidth="1"
    />
  );
};

class SVGCircles extends Component {
  render() {
    let circles = [];
    for (let i = 1; i <= this.props.levels; i++) {
      circles.push(
        <BgCircle
          key={`circle` + i}
          innerRadius={this.props.innerRadius}
          outerRadius={this.props.outerRadius}
          radius={this.props.segmentSize * i + this.props.innerRadius}
          theme={this.props.theme}
        />
      );
    }
    return (
      <svg
        width={this.props.outerRadius * 2}
        height={this.props.outerRadius * 2}
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        {circles}
      </svg>
    );
  }
}

export default SVGCircles;
