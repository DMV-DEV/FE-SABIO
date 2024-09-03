import React from "react";
import { Table, Button, Avatar } from "antd";
import "../table/StyleTable.css";
import { UserOutlined } from "@ant-design/icons";

const TableComponent = ({ columns, data, onDocumentClick, onInfoClick, type }) => {
  const scroll = { x: "max-content" };

  const renderColumnHeader = (text) => <p>{text}</p>;

  const renderTableCell = (text, record, index) => {
    const cellContent = typeof text === "object" ? JSON.stringify(text) : text;
    return <p>{cellContent}</p>;
  };

  const columnsWithRender = columns.map((column) => ({
    ...column,
    title: renderColumnHeader(column.title),
    render: (text, record, index) => {
      if (column.key === "document") {
        return (
          <Button
            className="button"
            onClick={() => onDocumentClick(record.documents)}
          >
            Document
          </Button>
        );
      }
      if (column.dataIndex === "archivo") {
        return (
          <a href={text} className="black-link" target="_blank" rel="noopener noreferrer">
            {text}
          </a>
        );
      }
      if (type === "student" && column.key === "image") {
        return (
          <Avatar
            size={36}
            icon={<UserOutlined />}
            className="avatar"
            src={record.image}
          />
        );
      }
      return renderTableCell(text, record, index);
    },
  }));

  return (
    <Table
      className="table"
      columns={columnsWithRender}
      dataSource={data}
      scroll={scroll}
    />
  );
};

export default TableComponent;
