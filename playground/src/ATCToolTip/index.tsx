import { styled } from "goober";
import { FC } from "react";
import { MutableRefObject } from "react";
import { useEffect, useRef, useState } from "react";

interface TTProps {
  message: string;
  delay?: number;
}

export const ATCToolTip: FC<TTProps> = ({
  message,
  delay = 1000,
  children,
}) => {
  const [toolTipTimer, setToolTipTimer] = useState(false);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | false>(false);
  const [showToolTip, setShowToolTip] = useState(false);
  const [currentRef, setCurrentRef] = useState<MutableRefObject<any> | null>();
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [childWidth, setChildWidth] = useState(0);
  const [childHeight, setChildHeight] = useState(0);

  const ref = useRef(null);

  useEffect(() => {
    if (toolTipTimer) {
      const timeout = setTimeout(() => {
        const boundingBox = currentRef.current.getBoundingClientRect();
        setX(boundingBox.x);
        setY(boundingBox.y);
        setChildWidth(boundingBox.width);
        setChildHeight(boundingBox.height);
        setShowToolTip(true);
      }, delay);
      setTimeoutId(timeout);
    } else {
      clearTimeout(timeoutId as NodeJS.Timeout);
      setTimeoutId(false);
    }
  }, [toolTipTimer]);

  return (
    <>
      {showToolTip ? (
        <ATCToolTipStyled
          x={x}
          y={y}
          childWidth={childWidth}
          childHeight={childHeight}
        >
          <div>{message}</div>
          <ATCTipPointer />
        </ATCToolTipStyled>
      ) : null}
      <div
        ref={ref}
        onMouseEnter={(event) => {
          setToolTipTimer(true);
          setCurrentRef(ref);
        }}
        onMouseLeave={() => {
          setToolTipTimer(false);
          setShowToolTip(false);
          setCurrentRef(null);
        }}
      >
        {children}
      </div>
    </>
  );
};

const ATCToolTipStyled = styled("div")`
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

const ATCTipPointer = styled("i")`
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
