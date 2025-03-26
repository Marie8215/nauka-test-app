import { Segmented, Space, Table } from "antd";
import { employees } from "../../mockData/employeesMock";
import { useState } from "react";

const prepareTreeData = (data, parentKey = "") => {
  const preparedData = [];
  let totalSalary = 0;

  for (let i = 0; i < data.length; i++) {
    let element = data[i];
    const currentKey = parentKey + i;

    if (element.type === "user") {
      preparedData.push({
        key: currentKey,
        ...element,
      });

      totalSalary += element.salary;
    } else {
      let preparedChildren = prepareTreeData(element.childs, currentKey);
      totalSalary += preparedChildren.totalSalary;

      preparedData.push({
        key: currentKey,
        type: element.type,
        name: element.name,
        children: preparedChildren.data,
        salary: preparedChildren.totalSalary,
      });
    }
  }

  return { data: preparedData, totalSalary };
};

const prepareFlatData = (data, parentKey = "") => {
  let result = [];
  let totalSalary = 0;

  for (let i = 0; i < data.length; i++) {
    const element = data[i];
    const currentKey = parentKey + i;

    if (element.type === "user") {
      result.push({
        key: currentKey,
        ...element,
      });
      totalSalary += element.salary;
    } else {
      const preparedChildren = prepareFlatData(element.childs, currentKey);
      result = result.concat(preparedChildren.data);
      totalSalary += preparedChildren.totalSalary;
    }
  }

  return { data: result, totalSalary };
};

export const EmployeesPage = () => {
  const [isTreeView, setIsTreeView] = useState(true);

  const tableColumns = [
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

  let { data, totalSalary } = isTreeView
    ? prepareTreeData(employees)
    : prepareFlatData(employees);

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
          columns={tableColumns}
          bordered
          pagination={false}
          summary={() => (
            <Table.Summary fixed>
              <Table.Summary.Row>
                <Table.Summary.Cell index={0}>Итого</Table.Summary.Cell>
                <Table.Summary.Cell index={1}>{totalSalary}</Table.Summary.Cell>
              </Table.Summary.Row>
            </Table.Summary>
          )}
        ></Table>
      </Space>
    </>
  );
};
