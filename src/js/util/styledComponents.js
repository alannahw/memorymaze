import styled from "styled-components";
import { LightenDarkenColor } from "../util";
import Textarea from "react-textarea-autosize";

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
  width: 300px;
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
  background: ${props => LightenDarkenColor(props.theme.bg, 15)};
`;
export const BtnMain = styled.button`
  transition: background 0.1s, border 0.1s;
  font-family: "Montserrat";
  font-size: 1em;
  margin: 5px;
  padding: 0.25em 1em;
  border-radius: 3px;
  float: ${props => props.align};
  background: ${props => props.theme.main};
  border: 2px solid ${props => props.theme.main};
  color: ${props => props.theme.light};
  cursor: pointer;
`;
export const BtnInverted = BtnMain.extend`
  color: ${props => props.theme.main};
  background: transparent;
`;
export const BtnSubtle = BtnMain.extend`
  transition: color 0.1s;
  color: ${props => props.color || props.theme.main};
  border: none;
  padding: 5px;
  margin: 1px;
  background: transparent;
`;

export const BtnSubtleToned = BtnSubtle.extend`
  color: ${props => LightenDarkenColor(props.theme.main, props.tone)};
`;
export const AddBtn = BtnSubtle.extend`
  &::after {
    height: 1em;
    width: 1em;
    font-family: "Ionicons";
    content: "\f217";
  }
`;

export const ListLink = BtnSubtle.extend`
  color: #fff;
  font-size: 0.9em;
  text-align: left;
  transition: color 0.25s;
  position: relative;
  &:hover {
    color: ${props => props.theme.main};
  }
`;
export const ListLinkCt = styled.div`
  position: relative;
  width: 100%;
  &::after {
    transition: right 0.3s;
    position: absolute;
    top: 6px;
    right: 5px;
    font-family: "Ionicons";
    content: "\f21b";
    color: transparent;
    font-size: 21px;
    height: 17px;
    border-radius: 15px;
    background: linear-gradient(
      90deg,
      ${props => props.grad1},
      ${props => props.grad2}
    );
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
export const SideBarToolBar = styled.div`
  width: 100%;
  text-align: right;
  background: ${props => LightenDarkenColor(props.theme.bg, -5)};
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
