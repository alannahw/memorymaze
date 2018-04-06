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
  background: ${props => props.theme.third};
`;
const IconBtn = BtnSubtle.extend`
  font-size: 1.5em;
  color: ${props =>
    props.theme.scheme === "+" ? props.theme.mainVibrant : props.theme.main};
`;
const ResetBtn = BtnSubtle.extend`
  color: ${props =>
    props.theme.scheme === "+" ? props.theme.mainVibrant : props.theme.main};
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
  background: ${props =>
    LightenDarkenColor(props.theme.main, props.theme.scheme + 30)};
  border: none;
  font-size: 18px;
  color: ${props => props.theme.bg};
  &::placeholder {
    transition: color 0.1s;
    color: ${props =>
      LightenDarkenColor(props.theme.main, props.theme.scheme + 0)};
  }
  &:disabled {
    color: ${props =>
      LightenDarkenColor(props.theme.bg, props.theme.scheme + 20)};
  }
`;

const CorrectAnswerCt = styled.div`
  font-size: 24px;
  font-weight: 400;
  padding: 30px 0 10px;
  opacity: ${props => (props.show ? 1 : 0)};
  color: ${props =>
    LightenDarkenColor(props.theme.main, props.theme.scheme + 50)};
`;
const CompletedCt = styled.div`
  font-size: 18px;
  padding: 30px;
  color: ${props =>
    LightenDarkenColor(props.theme.second, props.theme.scheme + 10)};
`;
const ScoreCt = styled.div`
  font-size: 24px;
  padding: 15px;
  color: ${props => props.theme.third};
`;

const SubBtnCt = styled.div`
  padding: 15px 0;
  box-sizing: border-box;
  color: ${props =>
    LightenDarkenColor(props.theme.main, props.theme.scheme + 30)};
`;
const GoBtn = BtnSubtle.extend`
  position: absolute;
  transition: opacity 0.3s;
  top: 10px;
  right: 15px;
  padding: 15px;
  font-weight: 600;
  color: ${props =>
    props.theme.scheme === "+" ? props.theme.main : props.theme.mainVibrant};
  &:focus {
    opacity: 0.7;
  }
  &:hover {
    opacity: 0.7;
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
    return items.every(i => i.level === this.props.gameLevels) ? true : false;
  };
  checkIfLastItem = (items, currItem) => {
    const rest = [];
    items.forEach((el, i) => {
      if (el.id !== currItem.id) {
        rest.push(el);
      }
    });
    return rest.every(i => i.level === this.props.gameLevels) ? true : false;
  };
  handleSetItem = () => {
    const { items } = this.props.list;
    const { currItem, gameLevels } = this.props;
    const randomNo = Math.floor(Math.random() * items.length);
    const nextItem = items[randomNo];
    const last = this.checkIfLastItem(items, currItem);
    if (nextItem.level < gameLevels) {
      if (currItem.id === nextItem.id && !last) {
        this.handleSetItem();
      } else {
        this.props.dispatch(setCurrentItem(nextItem));
        this.props.dispatch(setItemCompleteState(false));
        this.props.dispatch(updateAnswerInputText(""));
        this.ansInput.focus();
      }
    } else if (!this.checkGameCompleted(items)) {
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
    const { list } = this.props;
    const { attemptCount, successCount } = list.currentGame;
    const counters = { ...list.currentGame, attemptCount: attemptCount + 1 };
    if (this.checkMatch()) {
      this.handleUpdateItem("success");
      counters.successCount = successCount + 1;
    } else {
      this.handleUpdateItem();
    }
    this.props.dispatch(updateList(list.id, "currentGame", counters));
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
      const { successCount, attemptCount } = list.currentGame;
      const newScore = [
        {
          date: new Date().setHours(0, 0, 0, 0),
          score: successCount / attemptCount * 100
        }
      ];
      let scores = null;
      if (list.scores) {
        scores = list.scores.concat(newScore);
      } else {
        scores = newScore;
      }
      this.props.dispatch(updateList(list.id, "scores", scores));
      this.props.dispatch(setGameCompleteState(true));
    }
  };
  handleDisplayNext = () => {
    this.handleSetItem();
  };
  handleCheckKeyPress = e => {
    e.key === "Enter" && this.handleGoBtnClick();
  };
  handleResetGame = () => {
    const { list } = this.props;
    const items = [];
    list.items.forEach(i => {
      items.push({
        ...i,
        level: 0
      });
    });
    this.props.dispatch(
      updateList(list.id, "currentGame", { attemptCount: 0, successCount: 0 })
    );
    this.props.dispatch(updateList(list.id, "items", items));
    this.props.dispatch(updateAnswerInputText(""));
    this.props.dispatch(setItemCompleteState(false));
    this.props.dispatch(setGameCompleteState(false));
    this.props.dispatch(setCurrentItem(items[0]));
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
  componentWillUnmount() {
    if (this.props.gameComplete) {
      this.handleResetGame();
    }
  }

  render() {
    const {
      currItem,
      activeSide,
      ansText,
      itemComplete,
      gameComplete,
      list,
      theme
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
      color: theme.scheme === "+" ? theme.second : theme.bg
    };
    const FullHeightStyle = { height: "100%" };
    const FullWidthStyle = { width: "100%" };
    const score = Math.round(
      list.currentGame.successCount / list.currentGame.attemptCount * 100
    );
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
    const completedDisplay = (
      <CompletedCt>
        Congrats, you finished with a score of
        <ScoreCt>{score}%</ScoreCt>
      </CompletedCt>
    );
    if (gameComplete) {
      display = completedDisplay;
    } else {
      display = questionsDisplay;
    }
    return (
      <div style={FullHeightStyle}>
        <ToolbarCt>
          <IconBtn onClick={this.handlePlayState}>
            <span className="ion-arrow-left-c" />
          </IconBtn>
          <ResetBtn onClick={this.handleResetGame}>Reset Game</ResetBtn>
        </ToolbarCt>
        <FlexBox ignore="100px">
          <div style={FullWidthStyle}>
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
    itemComplete: store.game.itemComplete,
    gameComplete: store.game.gameComplete,
    theme: translateTheme(store.user.theme),
    gameLevels: store.user.gameLevels
  };
}

export default connect(mapStateToProps)(FlashCardsCt);
