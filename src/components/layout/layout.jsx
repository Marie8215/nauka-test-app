import { Button, ConfigProvider, Segmented, Space } from "antd";
import { useContext } from "react";
import { ThemeContext } from "../theme-context/theme-context";
import styles from "./layout.module.css";
import { MoonOutlined, SunOutlined } from "@ant-design/icons";

export const Layout = ({ children }) => {
  const { switchTheme, theme } = useContext(ThemeContext);

  return (
    <>
      <ConfigProvider
        theme={{
          algorithm: theme.algorithm,
        }}
      >
        <div className={styles.wrapper}>
          <Space>
            Тема
            <Segmented
              value={theme.isLight}
              onChange={switchTheme}
              options={[
                { label: <SunOutlined />, value: true },
                { label: <MoonOutlined />, value: false },
              ]}
            />
          </Space>
          {children}
        </div>
      </ConfigProvider>
    </>
  );
};
