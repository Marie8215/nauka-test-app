import styles from "./App.module.css";
import { EmployeesPage } from "./components/employeesPage/employeesPage";
import "normalize.css";

function App() {
  return (
    <>
      <div className={styles.layout}>
        <EmployeesPage></EmployeesPage>
      </div>
    </>
  );
}

export default App;
