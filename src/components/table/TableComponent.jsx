import React from "react";
import { Table, Button, Avatar } from "antd";
import "../table/StyleTable.css";
import { UserOutlined } from "@ant-design/icons";

const TableComponent = ({ columns, data, onDocumentClick, onInfoClick, type }) => {
  const scroll = { x: 'max-content' };

  // Renderiza el encabezado de la columna
  const renderColumnHeader = (text) => <p>{text}</p>;

  // Renderiza el contenido de la celda
  const renderTableCell = (text, record, index) => {
    // Verifica si text es un objeto, si es así, convierte a JSON
    const cellContent = typeof text === 'object' ? JSON.stringify(text) : text;
    return <p>{cellContent}</p>;
  };

  // Modifica las columnas para incluir renderizadores personalizados
  const columnsWithRender = columns.map(column => ({
    ...column,
    title: renderColumnHeader(column.title),
    render: (text, record, index) => {
      if (column.key === 'document') {
        return (
          <Button className="button" onClick={() => onDocumentClick(record.documents)}>Document</Button>
        );
      }
      if (column.key === 'info') {
        return (
          <a href="#" className="black-link" onClick={() => onInfoClick(record.info) }>Details</a>
        );
      }
      if (type === 'student' && column.key === 'image'){
        return (
          <Avatar size={36} icon={<UserOutlined />} className="avatar" src={record.image} />
        );
      }
      return renderTableCell(text, record, index);
    }
  }));

  return (
    <Table className="table" columns={columnsWithRender} dataSource={data} scroll={scroll} />
  );
};

export default TableComponent;