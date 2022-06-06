import { styled } from "goober";
import { Tabs, TabList, Tab, TabPanels, TabPanel } from "@reach/tabs";

import media from "./utils/media";

export const StyledTabs = styled(Tabs)`
  display: flex;
  flex-direction: column;
  width: 50%;
  min-width: ${(props) => props.theme.container.minWidth};

  ${media.phone} {
    width: 100%;
  }
`;

export const StyledTabList = styled(TabList)`
  display: flex;
  flex-direction: row;

  font-family: Consolas, Menlo, Monaco, source-code-pro, Courier New, monospace;
  border-bottom: ${(props) => props.theme.tabs.tabHeader.borderBottom};
  padding: 0 0.8em;
  background-color: transparent;
`;

export const StyledTab = styled(Tab)`
  background-color: transparent;
  border: none;
  padding: 0.3em 0.6em;
  margin: 0.7em 0.2em;
  cursor: pointer;
  color: ${(props) => props.theme.tabs.tabHeader.color};

  &[data-selected] {
    background: rgba(255, 255, 255, 0.2);
    border-radius: 6px;
  }

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    border-radius: 6px;
    transition: 0.3s;
  }
`;

export const StyledTabPanels = styled(TabPanels)`
  flex: 1;

  ${media.phone} {
    height: ${(props) => props.theme.tabs.tabPanel.phoneHeight};
  }
`;

export const StyledTabPanel = styled(TabPanel)`
  height: 100%;
`;

export const TabButton = styled("div")`
  border: none;
  padding: 0.3em 0.6em;
  margin: 0.7em 0.2em;
  cursor: pointer;
  color: ${(props) => props.theme.tabs.tabHeader.color};
  width: 20px;
  height: 20px;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    border-radius: 6px;
    transition: 0.3s;
  }
`;

export const TabSpace = styled("div")`
  flex-grow: 1;
`;

export const ATCToolTipStyled = styled("div")`
  font-family: Consolas, Menlo, Monaco, source-code-pro, Courier New, monospace;
  position: absolute;
  top: ${(props) => props.y - props.childHeight / 2}px;
  left: ${(props) => props.x}px;
  max-width: 400px;
  background-color: #fa9a1b;
  padding: 5px 10px;
  font-size: 1rem;
  border-radius: 3px;
  color: white;
  transform: translateX(calc(-50% + ${(props) => props.childWidth / 2}px));
  z-index: 99999999;
  text-align: center;
  box-shadow: 0 1px 8px rgba(0, 0, 0, 0.5);
`;

export const ATCTipPointer = styled("i")`
  position: absolute;
  top: 100%;
  width: 30px;
  height: 15px;
  overflow: hidden;
  transform: translateX(calc(-50%));

  &:after {
    content: "";
    position: absolute;
    width: 10px;
    height: 10px;
    left: 50%;
    transform: translate(-50%, -50%) rotate(45deg);
    background-color: #fa9a1b;
    box-shadow: 0 1px 8px rgba(0, 0, 0, 0.5);
  }
`;
