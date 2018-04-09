import styled from "styled-components";
import { LightenDarkenColor } from "../util";
import Textarea from "react-textarea-autosize";

export const Link = styled.a`
  cursor: pointer;
  color: ${props => props.theme.mainMiddle};
`;
export const BackPanel = styled.div`
  transition: background 0.1s;
  width: 50vw;
  height: 100vh;
  position: absolute;
  overflow-x: hidden;
  z-index: 1;
`;
export const SideBarStyle = styled.div`
  transition: background 0.1s;
  width: 350px;
  height: 100vh;
  max-height: 100vh;
  position: absolute;
  color: #fff;
  background: ${props => props.theme.bg};
  right: 0;
  z-index: 2;
  overflow: scroll;
`;
export const SideBarLarge = SideBarStyle.extend`
  width: 500px;
`;
export const BackPanelLeft = BackPanel.extend`
  left: 0;
  background: ${props => props.theme.main};
`;
export const BackPanelRight = BackPanel.extend`
  right: 0;
  background: ${props => props.theme.bg2};
`;
export const BtnMain = styled.button`
  transition: background 0.1s, border 0.1s;
  font-family: "Montserrat";
  font-size: 1em;
  margin: 5px;
  padding: 0.25em 1em;
  border-radius: 3px;
  float: ${props => props.align};
  background: ${props => props.theme.mainMiddle};
  border: 2px solid ${props => props.theme.mainMiddle};
  color: ${props => props.theme.btntext};
  cursor: pointer;
  &:disabled {
    cursor: default;
    color: rgba(255, 255, 255, 0.5);
  }
`;
export const BtnInverted = BtnMain.extend`
  color: ${props => props.theme.mainMiddle};
  background: transparent;
  &:disabled {
    color: ${props => props.theme.mainMiddle};
    opacity: 0.5;
  }
`;
export const BtnSubtle = BtnMain.extend`
  transition: color 0.1s;
  color: ${props => props.color || props.theme.mainMiddle};
  border: none;
  padding: 5px;
  margin: 1px;
  background: transparent;
  &:disabled {
    color: ${props => props.color || props.theme.mainMiddle};
    opacity: 0.5;
  }
`;

export const BtnSubtleToned = BtnSubtle.extend`
  color: ${props =>
    LightenDarkenColor(props.theme.main, props.theme.scheme + props.tone)};
  &:disabled {
    color: ${props =>
      LightenDarkenColor(props.theme.main, props.theme.scheme + props.tone)};
    opacity: 0.5;
  }
`;
export const AddBtn = BtnSubtle.extend`
  &::after {
    height: 1em;
    width: 1em;
    font-family: "Ionicons";
    content: "\f217";
  }
`;

export const BtnTheme = styled.button`
  transition: background 0.1s;
  font-size: 1em;
  margin: 5px;
  padding: 0.5em 0;
  border-radius: 3px;
  width: 150px;
  border: none;
  color: #fff;
  background: ${props => props.color};
`;
export const PanelContent = styled.div`
  padding-top: 50px;
  box-sizing: border-box;
  height: 100%;
`;
export const RelativeCt = styled.div`
  position: relative;
`;

export const EmptyListCt = styled.div`
  width: 60%;
  margin: auto;
  text-align: center;
  font-size: 1.2em;
  color: ${props => LightenDarkenColor(props.theme.main, 60)};
`;

export const FlexBox = styled.div`
  min-height: ${props => `calc(100% - ${props.ignore ? props.ignore : "0px"})`};
  display: flex;

  align-items: center;
  overflow-y: scroll;
`;
