import { Button, ConfigProvider } from "antd";
import { useContext } from "react";
import { ThemeContext } from "../theme-context/theme-context";
import styles from "./layout.module.css";

export const Layout = ({ children }) => {
  const getThemeAlgorithm = () => {
    let themeContext = useContext(ThemeContext);
    return themeContext.theme.algorithm;
  };

  const { switchTheme } = useContext(ThemeContext);

  return (
    <>
      <ConfigProvider
        theme={{
          algorithm: getThemeAlgorithm(),
        }}
      >
        <div className={styles.wrapper}>
          <Button onClick={switchTheme}>Сменить тему</Button>
          {children}
        </div>
      </ConfigProvider>
    </>
  );
};
