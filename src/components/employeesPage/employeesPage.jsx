import { Segmented, Space, Table } from "antd";
import { useMemo, useState } from "react";

const prepareTreeData = (data, parentKey = "") => {
  const preparedData = [];
  let totalSalary = 0;

  for (let i = 0; i < data.length; i++) {
    const element = data[i];
    const currentKey = parentKey + i;

    if (element.type === "user") {
      preparedData.push({
        key: currentKey,
        ...element,
      });

      totalSalary += element.salary;
    } else {
      const preparedChildren = prepareTreeData(element.childs, currentKey);
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
  let preparedData = [];
  let totalSalary = 0;

  for (let i = 0; i < data.length; i++) {
    const element = data[i];
    const currentKey = parentKey + i;

    if (element.type === "user") {
      preparedData.push({
        key: currentKey,
        ...element,
      });
      
      totalSalary += element.salary;
    } else {
      const preparedChildren = prepareFlatData(element.childs, currentKey);
      totalSalary += preparedChildren.totalSalary;

      preparedData = preparedData.concat(preparedChildren.data);
    }
  }

  return { data: preparedData, totalSalary };
};

export const EmployeesPage = ({employees}) => {
  const [isTreeView, setIsTreeView] = useState(true);

  const treeData = useMemo(
    () => prepareTreeData(employees),
    [employees]
  );

  const flatData = useMemo(
    () => prepareFlatData(employees),
    [employees]
  );

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

  let { data, totalSalary } = isTreeView ? treeData : flatData;

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
