import React, { Component } from 'react';
import windowSize from 'react-window-size';
import { CSSTransitionGroup } from 'react-transition-group'

class ScreenSize extends Component {
  constructor(props) {
    super(props);
    this.state = {play: false};
  }

  switchViews = () => {
    this.setState({play:!this.state.play})
    console.log(this.state.play);
  }

  render() {
    const {windowWidth, windowHeight} = this.props;
    const PageOneLeft = <div className="backPanel tFromTop left" style={{
      background: 'red' }}>
      <div className="contentCt">Left List</div>
    </div>
    const PageOneRight = <div className="backPanel tFromBottom right" style={{
      background: 'blue' }}>
      <div className="contentCt">Right List</div>
    </div>
    const PageTwoLeft = <div className="backPanel tFromBottom left" style={{
      background: 'yellow'}}>
      <div className="contentCt">Left Play</div>
    </div>
    const PageTwoRight = <div className="backPanel tFromTop right" style={{
      background: 'green' }}>
      <div className="contentCt">Right Play</div>
    </div>
    return (
      <div style={{position: 'relative' }}>
        <div className="topNav">
          <button onClick={this.switchViews}>Play</button>
        </div>
        <CSSTransitionGroup
          transitionName="example"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={500}>
          {
            !this.state.play ?
            <div key="bgPageOne">{PageOneLeft}{PageOneRight}</div> :
            <div key="bgPageTwo">{PageTwoLeft}{PageTwoRight}</div>
          }
        </CSSTransitionGroup>

      </div>
    );
  }

}

export default windowSize(ScreenSize);
