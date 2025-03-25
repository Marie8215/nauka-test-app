import { Segmented, Space, Table } from "antd";
import { employees } from "../../mockData/employeesMock";
import { useState } from "react";

export const EmployeesPage = (props) => {
  const [isTreeView, setIsTreeView] = useState(true);

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

  const getFlatData = (el) => {
    let result = [];

    if (el.type === 'user') {
      result.push({
        name: el.name,
        salary: el.salary,
      })

    } else {
      for (let child of el.childs) {
        result = result.concat(getFlatData(child));
      }
    }

    return result;
  }

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

  let data = []
  if (isTreeView) {
    data = employees.map(adaptData);
  } else {
    for (let employee of employees) {
      data = data.concat(getFlatData(employee));
    }

    data.forEach((x, i) => x.key = i.toString());
  }


  return (
    <>
      <Space direction="vertical" style={{ width: "100%" }}>
        <Space>
          <Segmented
            value={isTreeView}
            onChange={setIsTreeView}
            options={[
              { label: "Древовидная", value: true },
              { label: "Плоская", value: false },
            ]}
          />
        </Space>
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
      </Space>
    </>
  );
};
