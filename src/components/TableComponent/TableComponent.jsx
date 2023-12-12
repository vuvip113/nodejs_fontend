import { Button, Table } from "antd";
import React, { useMemo, useState } from "react";
import Loding from "../LoadingComponent/Loding";
import { Excel } from "antd-table-saveas-excel";

const TableComponent = (props) => {
  const {
    selectionType = "checkbox",
    data: dataSource = [],
    columns = [],
    isLoaing = false,
    handleDelteMany,
  } = props;
  const [rowSelectedKeys, setRowSelectedKeys] = useState([]);
  const newColumnExport = useMemo(() => {
    const arr = columns?.filter((col) => col.dataIndex !== "action");
    return arr;
  }, [columns]);

  // rowSelection object indicates the need for row selection
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setRowSelectedKeys(selectedRowKeys);
    },
    // getCheckboxProps: (record) => ({
    //   disabled: record.name === "Disabled User",
    //   // Column configuration not to be checked
    //   name: record.name,
    // }),
  };
  const handleDeleteAll = () => {
    handleDelteMany(rowSelectedKeys);
  };

  const exportExcel = () => {
    const excel = new Excel();
    excel
      .addSheet("test")
      .addColumns(newColumnExport)
      .addDataSource(dataSource, {
        str2Percent: true,
      })
      .saveAs("Excel.xlsx");
  };

  return (
    <Loding isLoading={isLoaing}>
      {rowSelectedKeys.length > 0 && (
        <div
          style={{
            background: "cyan",
            color: "#fff",
            fontWeight: "bold",
            padding: "10px",
            cursor: "pointer",
          }}
          onClick={handleDeleteAll}
        >
          Xóa tất cả
        </div>
      )}
      <Button onClick={exportExcel}>Export Excel</Button>
      <Table
        rowSelection={{
          type: selectionType,
          ...rowSelection,
        }}
        columns={columns}
        dataSource={dataSource}
        {...props}
      />
    </Loding>
  );
};

export default TableComponent;
