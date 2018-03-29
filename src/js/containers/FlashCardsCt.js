import React, { Component } from "react";
import { connect } from "react-redux";
import {
  setPlayState,
  setCurrentItem,
  updateAnswerInputText,
  setAttemptCount,
  setSuccessCount,
  updateList,
  setItemCompleteState,
  setGameCompleteState
} from "../actions";
import {
  findListInFolders,
  LightenDarkenColor,
  editItemPropertyInArray
} from "../util";
import { translateTheme } from "../util/themes";
import { BtnSubtle, BtnSubtleToned, FlexBox } from "../util/styledComponents";
import Textarea from "react-textarea-autosize";
import styled from "styled-components";
import CollapsibleStylable from "../lib/CollapsibleStylable";

const ToolbarCt = styled.div`
  transition: background 0.1s;
  padding: 10px 15px;
  box-sizing: border-box;
  width: 100%;
  font-size: 16px;
  text-align: left;
  color: ${props => LightenDarkenColor(props.theme.second, 15)};
  background: ${props => props.theme.third};
`;
const IconBtn = BtnSubtle.extend`
  font-size: 1.5em;
  color: ${props => LightenDarkenColor(props.theme.second, 15)};
`;
const ResetBtn = BtnSubtle.extend`
  color: ${props => LightenDarkenColor(props.theme.second, 15)};
  padding: 10px;
  float: right;
`;
const InputCt = styled.div`
  width: 60%;
  margin: auto;
  position: relative;
`;
const AnswerInput = styled.input`
  transition: background 0.1s;
  resize: none;
  padding: 25px 60px 25px 35px;
  text-align: left;
  width: 100%;
  border-radius: 40px;
  box-sizing: border-box;
  background: ${props => LightenDarkenColor(props.theme.main, 80)};
  border: none;
  font-size: 18px;
  color: ${props => props.theme.bg};
  &::placeholder {
    transition: color 0.1s;
    color: ${props => LightenDarkenColor(props.theme.main, 40)};
  }
  &:disabled {
    color: ${props => LightenDarkenColor(props.theme.bg, 60)};
  }
`;

const CorrectAnswerCt = styled.div`
  font-size: 24px;
  font-weight: 400;
  padding: 30px 0 10px;
  opacity: ${props => (props.show ? 1 : 0)};
  color: ${props => LightenDarkenColor(props.theme.main, 60)};
`;
const SubBtnCt = styled.div`
  padding: 15px 0;
  box-sizing: border-box;
  color: ${props => LightenDarkenColor(props.theme.main, 30)};
`;
const GoBtn = BtnSubtle.extend`
  position: absolute;
  transition: color 0.3s;
  top: 10px;
  right: 15px;
  padding: 15px;
  font-weight: 600;
  &:focus {
    color: ${props => LightenDarkenColor(props.theme.main, 20)};
  }
  &:hover {
    color: ${props => LightenDarkenColor(props.theme.main, 20)};
  }
`;
class FlashCardsCt extends Component {
  handlePlayState = () => {
    this.props.dispatch(setPlayState(!this.props.playState));
  };
  getQuestionSide = () => {
    return this.props.activeSide === "side1" ? "side2" : "side1";
  };
  checkGameCompleted = items => {
    return items.every(i => i.level === 3) ? true : false;
  };
  handleSetItem = () => {
    const { items } = this.props.list;
    const { currItem } = this.props;
    const random = items[Math.floor(Math.random() * items.length)];
    if (random.level < 3) {
      this.props.dispatch(setCurrentItem(random));
      this.props.dispatch(setItemCompleteState(false));
      this.props.dispatch(updateAnswerInputText(""));
      this.ansInput.focus();
    } else {
      this.handleSetItem();
    }
  };
  handleAnsTextChange = e => {
    this.props.dispatch(updateAnswerInputText(e.target.value));
  };
  checkMatch = () => {
    const { ansText, currItem, activeSide } = this.props;
    const guess = ansText.toLowerCase();
    const correctAns = currItem[activeSide].toLowerCase();
    const partialMatch = correctAns.replace(/ *\([^)]*\) */g, "");
    return guess === correctAns || guess === partialMatch;
  };
  handleGoBtnClick = () => {
    const { attemptCount, successCount } = this.props;
    if (this.checkMatch()) {
      this.handleUpdateItem("success");
      this.props.dispatch(setSuccessCount(successCount + 1));
    } else {
      this.handleUpdateItem();
    }
  };

  handleUpdateItem = success => {
    const { currItem, list, activeSide } = this.props;
    const levelNo = success ? currItem.level + 1 : 0;
    const items = editItemPropertyInArray(
      list.items,
      currItem.id,
      "level",
      levelNo
    );
    this.props.dispatch(updateList(list.id, "items", items));
    this.props.dispatch(setItemCompleteState(true));
    if (this.checkGameCompleted(items)) {
      this.props.dispatch(setGameCompleteState(true));
    }
  };
  handleDisplayNext = () => {
    this.handleSetItem();
  };
  handleCheckKeyPress = e => {
    e.key === "Enter" && this.handleGoBtnClick();
  };
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.itemComplete !== this.props.itemComplete) {
      this.ansInput.focus();
      this.nextBtn.focus();
    }
  }
  componentDidMount() {
    this.handleSetItem();
  }

  render() {
    const {
      currItem,
      activeSide,
      ansText,
      itemComplete,
      gameComplete
    } = this.props;
    const QuestionCtStyle = {
      transition: "color 0.1s",
      boxSizing: "border-box",
      height: "auto",
      width: "100%",
      fontSize: "24px",
      fontWeight: "400",
      padding: "35px",
      textAlign: "center",
      color: this.props.theme.second
    };
    const FullHeightStyle = { height: "100%" };

    let display = "";

    const questionsDisplay = (
      <CollapsibleStylable
        style={QuestionCtStyle}
        transitionTime={100}
        trigger={currItem[this.getQuestionSide()]}
        open={itemComplete}
      >
        <CorrectAnswerCt show={itemComplete}>
          {currItem[activeSide]}
        </CorrectAnswerCt>
      </CollapsibleStylable>
    );

    if (gameComplete) {
      display = "Congrats, you finished";
    } else {
      display = questionsDisplay;
    }
    // let resultIcon = "";
    // if (itemComplete && this.checkMatch()) {
    //   resultIcon = (
    //     <span style={{ padding: "10px" }} className="ion-checkmark" />
    //   );
    // } else if (itemComplete && !this.checkMatch()) {
    //   resultIcon = <span style={{ padding: "10px" }} className="ion-close" />;
    // }
    return (
      <div style={FullHeightStyle}>
        <ToolbarCt>
          <IconBtn onClick={this.handlePlayState}>
            <span className="ion-arrow-left-c" />
          </IconBtn>
          <ResetBtn>Reset Game</ResetBtn>
        </ToolbarCt>
        <FlexBox ignore="100px">
          <div style={{ width: "100%" }}>
            {display}
            <InputCt>
              <AnswerInput
                innerRef={input => {
                  this.ansInput = input;
                }}
                onKeyPress={this.handleCheckKeyPress}
                placeholder="Answer..."
                disabled={itemComplete || gameComplete}
                value={ansText}
                onChange={this.handleAnsTextChange}
              />
              <GoBtn hidden={itemComplete} onClick={this.handleGoBtnClick}>
                Go
              </GoBtn>
              <GoBtn
                innerRef={input => {
                  this.nextBtn = input;
                }}
                hidden={!itemComplete || gameComplete}
                onClick={this.handleDisplayNext}
              >
                Next
              </GoBtn>
            </InputCt>
            <SubBtnCt>
              <BtnSubtleToned
                tone={50}
                onClick={this.handleGoBtnClick}
                disabled={gameComplete}
              >
                Give up
              </BtnSubtleToned>|
              <BtnSubtleToned
                tone={90}
                onClick={this.handleSetItem}
                disabled={gameComplete}
              >
                Skip
              </BtnSubtleToned>
            </SubBtnCt>
          </div>
        </FlexBox>
      </div>
    );
  }
}

function mapStateToProps(store) {
  return {
    playState: store.game.playState,
    activeSide: store.layout.activeSideState,
    list: findListInFolders(
      store.user.userData.folders,
      store.user.currentListId
    ),
    currItem: store.game.currItem,
    ansText: store.game.ansText,
    attemptCount: store.game.attemptCount,
    successCount: store.game.successCount,
    itemComplete: store.game.itemComplete,
    gameComplete: store.game.gameComplete,
    theme: translateTheme(store.user.theme)
  };
}

export default connect(mapStateToProps)(FlashCardsCt);
