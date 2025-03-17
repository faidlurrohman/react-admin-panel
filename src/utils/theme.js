import { theme as themeAntd } from "antd";

export const theme = (styles, isDarkMode) => {
  return {
    algorithm: isDarkMode
      ? themeAntd.darkAlgorithm
      : themeAntd.defaultAlgorithm,
    token: {
      colorPrimary: styles?.getPropertyValue("--color-primary"),
      colorError: styles?.getPropertyValue("--color-error"),
      fontFamily:
        "'Rubik', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'",
      fontFamilyCode:
        "'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace",
      fontSize: 14,
    },
    components: {
      Layout: {
        bodyBg: layoutBg(styles, isDarkMode),
        headerBg: layoutBg(styles, isDarkMode),
        footerBg: layoutBg(styles, isDarkMode),
      },
    },
  };
};

const layoutBg = (styles, isDarkMode) => {
  return isDarkMode
    ? styles?.getPropertyValue("--color-black")
    : styles?.getPropertyValue("--color-grey");
};
