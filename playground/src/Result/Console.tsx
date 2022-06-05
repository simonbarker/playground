import React, { FC } from "react";
import { styled } from "goober";
import Inspector, { chromeDark } from "@agney/react-inspector";

const Container = styled("div")`
  height: 100%;

  li {
    font-size: 16px !important;
    padding-left: 22px;
  }

  span {
    color: white;
  }
`;

interface IProps {
  logs: unknown[];
}

const Console: FC<IProps> = ({ logs }) => {
  return (
    <Container>
      {logs.map((log: unknown, index: number) => (
        <Inspector
          data={log}
          key={index}
          theme={{
            ...chromeDark,
            OBJECT_VALUE_STRING_COLOR: "#fa9a1b",
            BASE_BACKGROUND_COLOR: "#1b2935",
          }}
        />
      ))}
    </Container>
  );
};

export default Console;
