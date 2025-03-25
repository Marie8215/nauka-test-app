import { Table } from "antd";
import { employees } from "../../mockData/employeesMock";

export const EmployeesPage = (props) => {
  const columns = [
    {
      title: "Имя",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Заработная плата",
      dataIndex: "salary",
      key: "salary",
    },
  ];

  const adaptData = (element, i) => {
    let result = {
      name: element.name,
      salary: element.salary,
      key: i.toString(),
    };

    if (element.type === "user") {
      return result;
    }

    let children = element.childs?.map((el, k) => adaptData(el, "" + i + k)); // + sumSalary

    result.children = children;

    return result;
  };

  const sumSalary = (el) => {
    let salaries = 0;

    if (!el.childs) {
      salaries += el.salary;
    } else {
      for (let child of el.childs) {
        salaries += sumSalary(child);
      }
    }
    return salaries;
  };

  let totalSalary = 0;
  for (let employee of employees) {
    totalSalary += sumSalary(employee);
  }

  const data = employees.map(adaptData);

  return (
    <>
      <Table
        dataSource={data}
        columns={columns}
        bordered
        pagination={false}
        summary={() => (
          <Table.Summary fixed>
            <Table.Summary.Row>
              <Table.Summary.Cell index={0}>Итого </Table.Summary.Cell>
              <Table.Summary.Cell index={1}>{totalSalary}</Table.Summary.Cell>
            </Table.Summary.Row>
          </Table.Summary>
        )}
      ></Table>
    </>
  );
};
