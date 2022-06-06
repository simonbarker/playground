import merge from "lodash.merge";

const lightModeColors = {
  container: {
    borderColor: "rgba(0, 0, 0, 0.2)",
  },
  error: {
    background: "#e74c3c",
    color: "#ffffff",
  },
  console: {
    background: "rgba(0, 0, 0, 1)",
  },
  divider: {
    background: "#202020",
    dividerBackground: "#202020",
  },
  editor: {
    backgroundColor: `#000000`,
    color: `#ffffff`,
  },
  tabs: {
    tabHeader: {
      background: "transparent",
      color: `#000000`,
      borderBottom: `0.1em solid rgba(0, 0, 0, 0.1)`,
    },
  },
};

const ATCDarkModeColors = {
  container: {
    borderColor: "rgba(0, 0, 0, 0.2)",
  },
  error: {
    background: "#e74c3c",
    color: "#ffffff",
  },
  console: {
    background: "#151F28",
  },
  divider: {
    width: 1,
    background: "rgba(255, 255, 255, 0.3)",
    dividerBackground: "#151F28",
    dividerBackgroundHover: "#2c4255",
    containerWidth: 10,
  },
  editor: {
    backgroundColor: `#151F28`,
    color: `white`,
  },
  tabs: {
    tabHeader: {
      panelBackground: "#151F28",
      background: "#151F28",
      color: `#4B91EF`,
      borderBottom: `1px solid rgba(255,255,255,0.3)`,
    },
    selectedTab: {
      borderBottom: `3px solid rgba(255,255,255,1)`,
    },
  },
};

const darkModeColors = {
  container: {
    borderColor: "rgba(255, 255, 255, 0.4)",
  },
  error: {
    background: "#e74c3c",
    color: "#ffffff",
  },
  console: {
    background: "rgba(0, 0, 0, 1)",
  },
  divider: {
    background: "rgba(255, 255, 255, 0.5)",
    dividerBackground: "rgba(255, 255, 255, 0.1)",
  },
  editor: {
    backgroundColor: `#000000`,
    color: `#ffffff`,
  },
  tabs: {
    tabHeader: {
      background: `rgba(1, 21, 21, 0.8)`,
      panelBackground: `rgb(1, 21, 21)`,
      color: `#ffffff`,
      borderBottom: `0.1em solid rgba(255, 255, 255, 0.4)`,
    },
    selectedTab: {
      borderBottom: "0.2em solid rgb(255, 255, 255)",
    },
  },
};

export const theme = {
  container: {
    borderColor: "",
    minHeight: "20em",
    minWidth: "15em",
    borderRadius: 8,
  },
  error: {
    background: "",
    color: "",
  },
  console: {
    background: "rgba(0, 0, 0, 1)",
  },
  divider: {
    width: 4,
    background: "",
    dividerBackground: "",
    containerWidth: 8,
    dividerBackgroundHover: "",
  },
  editor: {
    fontFamily: `Consolas, Menlo, Monaco, source-code-pro, Courier New, monospace`,
    backgroundColor: ``,
    color: ``,
  },
  tabs: {
    tabHeader: {
      borderBottom: "",
      panelBackground: "",
      background: "",
      color: "",
    },
    tabPanel: {
      phoneHeight: "10em",
    },
    selectedTab: {
      background: "",
      borderBottom: "0.2em solid rgb(0, 0, 0)",
    },
  },
};

export type ColorMode = "light" | "dark" | "ATCDark";

/**
 * Get corresponding theme.
 * @param mode color theme type
 */
export default function getTheme(mode: ColorMode = "light") {
  // const colorTheme = mode === "light" ? lightModeColors : darkModeColors;
  let colorTheme = lightModeColors;
  if (mode === "dark") {
    colorTheme = darkModeColors;
  }
  if (mode === "ATCDark") {
    colorTheme = ATCDarkModeColors;
  }
  return merge(theme, colorTheme);
}
