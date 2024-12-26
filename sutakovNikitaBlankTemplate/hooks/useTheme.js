import useThemeStore from "../store/themeStore";

const useTheme = () => {
  const isDarkTheme = useThemeStore((state) => state.isDarkTheme);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);

  const backgroundColor = isDarkTheme ? "#252525" : "#f5f5f5";
  const textColor = isDarkTheme ? "#f5f5f5" : "#252525";

  return { isDarkTheme, toggleTheme, backgroundColor, textColor };
};

export default useTheme;
