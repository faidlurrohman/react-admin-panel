import { theme as themeAntd } from "antd";

export const theme = (styles, radius, theme) => {
  return {
    algorithm:
      theme === "dark" ? themeAntd.darkAlgorithm : themeAntd.defaultAlgorithm,
    token: {
      colorPrimary: styles?.getPropertyValue("--color-primary"),
      colorError: styles?.getPropertyValue("--color-error"),
      fontFamily:
        "'Rubik', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'",
      fontFamilyCode:
        "'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace",
      fontSize: 14,
      borderRadius: radius ?? 0,
    },
    components: {
      Layout: {
        bodyBg: layoutBg(styles, theme),
        headerBg: layoutBg(styles, theme),
        footerBg: layoutBg(styles, theme),
      },
    },
  };
};

const layoutBg = (styles, theme) => {
  return theme === "dark"
    ? styles?.getPropertyValue("--color-black")
    : styles?.getPropertyValue("--color-grey");
};
