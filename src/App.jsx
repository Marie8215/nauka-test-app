import styles from "./App.module.css";
import { EmployeesPage } from "./components/employeesPage/employeesPage";
import "normalize.css";
import { ThemeContextProvider } from "./components/theme-context/theme-context-provider";

function App() {
  return (
    <ThemeContextProvider>
      <div className={styles.layout}>
        <EmployeesPage />
      </div>
    </ThemeContextProvider>
  );
}

export default App;
