import React from "react";
import "../table/StyleTable.css";
import { Table } from "antd";

const TableComponent = ({columns, data}) => {
    const scroll = { x: 'max-content' };
    const renderColumnHeader = (text) => <p>{text}</p>;
    const renderTableCell = (text, record, index) => <p>{text}</p>;


    const columnsWithRender = columns.map(column => ({
        ...column,
        title: renderColumnHeader(column.title),
        render: (text, record, index) => renderTableCell(text, record, index)
      }));

  return (
  <Table className="table" columns={columnsWithRender} dataSource={data}  scroll={scroll}/>
  )
};

export default TableComponent;
