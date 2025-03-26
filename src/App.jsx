import { EmployeesPage } from "./components/employeesPage/employeesPage";
import "normalize.css";
import { ThemeContextProvider } from "./components/theme-context/theme-context-provider";
import { Layout } from "./components/layout/layout";
import { employees } from "./mockData/employeesMock";


function App() {
  return (
    <ThemeContextProvider>
      <Layout>
        <EmployeesPage employees={employees}/>
      </Layout>
    </ThemeContextProvider>
  );
}

export default App;
