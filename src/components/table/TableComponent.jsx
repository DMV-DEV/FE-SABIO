/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Table, Button } from "antd";
import "../table/StyleTable.css";


const TableComponent = ({ columns, data, onDocumentClick, onInfoClick }) => {
  const scroll = { x: 'max-content' };

  // Renderiza el encabezado de la columna
  const renderColumnHeader = (text) => <p>{text}</p>;

  // Renderiza el contenido de la celda
  const renderTableCell = (text, record, index) => <p>{text}</p>;

  // Modifica las columnas para incluir renderizadores personalizados
  const columnsWithRender = columns.map(column => ({
    ...column,
    title: renderColumnHeader(column.title),
    render: (text, record, index) => {
      if (column.key === 'document') {
        return (
          <Button onClick={() => onDocumentClick(record.documents)}>Document</Button>
        );
      }
      if (column.key === 'info') {
        return (
          <a href="#" className="black-link" onClick={() => onInfoClick(record.classInfo) }>Details</a>
        );
      }
      return renderTableCell(text, record, index);
    }
  }));

  return (
    <Table className="table" columns={columnsWithRender} dataSource={data} scroll={scroll}  />
  );
};

export default TableComponent;