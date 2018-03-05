import styled from "styled-components";

export const TopNav = styled.div`
  position: absolute;
  top: 0;
  width: 100vw;
  height: 50px;
  background: ${props => props.theme.bg};
  color: #fff;
  z-index: 3;
`;
export const BackPanel = styled.div`
  width: 50vw;
  height: 100vh;
  position: absolute;
  z-index: 1;
`;
export const SideBarStyle = styled.div`
  width: 300px;
  height: 100vh;
  position: absolute;
  color: #fff;
  background: ${props => props.theme.bg};
  right: 0;
  z-index: 2;
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
  color: ${props => props.color || props.theme.main};
  border: none;
  padding: 5px;
  margin: 1px;
  background: transparent;
`;
export const ListLink = BtnSubtle.extend`
  width: 100%;
  color: #fff;
  font-size: 0.9em;
  text-align: left;
  transition: color 0.25s;
  position: relative;
  &:hover {
    color: ${props => props.theme.main};
  }
  &::after {
    position: absolute;
    top: 10px;
    right: 10px;
    font-family: "Ionicons";
    content: "\f21b";
    color: ${props => props.themeGrad};
  }
`;
export const BtnTheme = styled.button`
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
`;
export const ListTitle = styled.div`
  padding: 30px 0;
  width: 100%;
  background-color: ${props => props.theme.second};
  font-size: 21px;
  color: ${props => props.theme.main};
`;
