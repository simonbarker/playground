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
`;

export const TabSpace = styled("div")`
  flex-grow: 1;
`;
