import { Segmented, Space, Table } from "antd";
import { useMemo, useState } from "react";

const prepareData = (data, parentKey = "") => {
  let flatData = [];
  let treeData = [];
  let totalSalary = 0;

  for (let i = 0; i < data.length; i++) {
    const element = data[i];
    const currentKey = "" + parentKey + i;

    if (element.type === "user") {

      const dataElement = {
        key: currentKey,
        ...element,
      };

      flatData.push(dataElement);
      treeData.push(dataElement);

      totalSalary += element.salary;
    } else {
      const preparedChildren = prepareData(element.childs, currentKey);
      totalSalary += preparedChildren.totalSalary;

      treeData.push({
        key: currentKey,
        type: element.type,
        name: element.name,
        children: preparedChildren.treeData,
        salary: preparedChildren.totalSalary,
      });
      flatData = flatData.concat(preparedChildren.flatData);
    }
  }

  return { flatData, treeData, totalSalary };
};

export const EmployeesPage = ({ employees }) => {
  const [isTreeView, setIsTreeView] = useState(true);

  const { treeData, flatData, totalSalary } = useMemo(() => prepareData(employees), [employees]);
  const data = isTreeView ? treeData : flatData;

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
      render: (text, record) => {
        return record.type !== "user" ? (
          <span style={{ color: "#afafaf" }}>{text}</span>
        ) : (
          text
        );
      },
    },
  ];

  return (
    <>
      <Space direction="vertical" style={{ width: "100%" }}>
        <Space>
          Структура
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
