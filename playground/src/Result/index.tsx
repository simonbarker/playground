import React, { FC, useMemo, useEffect, useState } from "react";
import { MutableRefObject } from "react";
import { useRef } from "react";

import {
  StyledTabList,
  StyledTab,
  StyledTabPanels,
  StyledTabPanel,
  StyledTabs,
  TabButton,
  TabSpace,
  ATCToolTipStyled,
  ATCTipPointer,
} from "../TabStyles";
import { ISnippet, ITabConfig, IResultTabs } from "../types";
import Console from "./Console";
import Frame from "./Frame";

interface IProps {
  id: string | number;
  snippet: ISnippet;
  defaultTab: IResultTabs;
  transformJs: boolean;
  presets: string[];
  width: number;
  onResetHandler: () => void;
}

interface TTProps {
  x: number;
  y: number;
  show: boolean;
  message: string;
}

const ATCToolTip: FC<TTProps> = ({ x, y, show, message }) => {
  return show ? (
    <ATCToolTipStyled x={x} y={y}>
      <div>{message}</div>
      <ATCTipPointer />
    </ATCToolTipStyled>
  ) : null;
};

const Result: FC<IProps> = ({
  id,
  snippet,
  presets,
  defaultTab,
  transformJs,
  width,
  onResetHandler,
}) => {
  const [logs, setLogs] = useState<unknown[]>([]);
  const tabs: Readonly<ITabConfig<IResultTabs>[]> = useMemo(
    () => [
      { name: "Result", value: "result" as IResultTabs },
      { name: "Console", value: "console" as IResultTabs },
    ],
    []
  );
  useEffect(() => {
    function waitForMessage() {
      if (typeof window !== "undefined") {
        window.addEventListener("message", (data) => {
          if (
            data.data.source === `frame-${id}` &&
            data.data.message.type === "log"
          ) {
            setLogs((prevLogs) => [...prevLogs, ...data.data.message.data]);
          }
        });
      }
    }
    waitForMessage();
  }, [id]);

  /* tool tip code */
  const [tooltipTimer, setToolTipTimer] = useState(false);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | false>(false);
  const [showToolTip, setShowToolTip] = useState(false);
  const [toolTipMessage, setToolTipMessage] = useState("");
  const [currentRef, setCurrentRef] = useState<MutableRefObject<any> | null>();
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  const ref1 = useRef(null);
  const ref2 = useRef(null);

  useEffect(() => {
    if (tooltipTimer) {
      const timeout = setTimeout(() => {
        const boundingBox = currentRef.current.getBoundingClientRect();
        setX(boundingBox.x);
        setY(boundingBox.y);
        setShowToolTip(true);
      }, 1000);
      setTimeoutId(timeout);
    } else {
      clearTimeout(timeoutId as NodeJS.Timeout);
      setTimeoutId(false);
    }
  }, [tooltipTimer]);
  /* tool tip code */

  return (
    <StyledTabs
      defaultIndex={tabs.findIndex((tab) => tab.value === defaultTab)}
      style={{ width: width }}
    >
      <ATCToolTip x={x} y={y} show={showToolTip} message={toolTipMessage} />
      <StyledTabList>
        {tabs.map((tab) => (
          <StyledTab key={tab.value}>{tab.name}</StyledTab>
        ))}
        <TabSpace />
        <TabButton
          onMouseEnter={(event) => {
            setToolTipMessage("Clear terminal");
            setToolTipTimer(true);
            setCurrentRef(ref1);
          }}
          onMouseLeave={() => {
            setToolTipTimer(false);
            setToolTipMessage("");
            setShowToolTip(false);
            setCurrentRef(null);
          }}
          onClick={() => {
            setLogs([]);
          }}
        >
          <svg
            ref={ref1}
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 576 512"
          >
            <path d="M9.372 86.63C-3.124 74.13-3.124 53.87 9.372 41.37C21.87 28.88 42.13 28.88 54.63 41.37L246.6 233.4C259.1 245.9 259.1 266.1 246.6 278.6L54.63 470.6C42.13 483.1 21.87 483.1 9.372 470.6C-3.124 458.1-3.124 437.9 9.372 425.4L178.7 256L9.372 86.63zM544 416C561.7 416 576 430.3 576 448C576 465.7 561.7 480 544 480H256C238.3 480 224 465.7 224 448C224 430.3 238.3 416 256 416H544z" />
          </svg>
        </TabButton>
        <TabButton
          onClick={onResetHandler}
          onMouseEnter={(event) => {
            setToolTipMessage("Reset code");
            setToolTipTimer(true);
            setCurrentRef(ref2);
          }}
          onMouseLeave={() => {
            setToolTipTimer(false);
            setToolTipMessage("");
            setShowToolTip(false);
            setCurrentRef(null);
          }}
        >
          <svg
            ref={ref2}
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 512 512"
          >
            <path d="M449.9 39.96l-48.5 48.53C362.5 53.19 311.4 32 256 32C161.5 32 78.59 92.34 49.58 182.2c-5.438 16.81 3.797 34.88 20.61 40.28c16.97 5.5 34.86-3.812 40.3-20.59C130.9 138.5 189.4 96 256 96c37.96 0 73 14.18 100.2 37.8L311.1 178C295.1 194.8 306.8 223.4 330.4 224h146.9C487.7 223.7 496 215.3 496 204.9V59.04C496 34.99 466.9 22.95 449.9 39.96zM441.8 289.6c-16.94-5.438-34.88 3.812-40.3 20.59C381.1 373.5 322.6 416 256 416c-37.96 0-73-14.18-100.2-37.8L200 334C216.9 317.2 205.2 288.6 181.6 288H34.66C24.32 288.3 16 296.7 16 307.1v145.9c0 24.04 29.07 36.08 46.07 19.07l48.5-48.53C149.5 458.8 200.6 480 255.1 480c94.45 0 177.4-60.34 206.4-150.2C467.9 313 458.6 294.1 441.8 289.6z" />
          </svg>
        </TabButton>
      </StyledTabList>
      <StyledTabPanels>
        <StyledTabPanel>
          <Frame
            id={id}
            snippet={snippet}
            transformJs={transformJs}
            presets={presets}
          />
        </StyledTabPanel>

        <StyledTabPanel>
          <Console logs={logs} />
        </StyledTabPanel>
      </StyledTabPanels>
    </StyledTabs>
  );
};

export default Result;
