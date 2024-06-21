import React, { useState } from "react";
import "../studentsList/stylesStudentsList.css";
import { Modal, Button, Input, Space } from "antd";
import TableComponent from "../../components/table/TableComponent";
import { CloseOutlined, PlusOutlined } from "@ant-design/icons"; // Importa el ícono de cierre de Ant Design
import { SearchIcon } from "../../assets/icons/SearchIcon";
import { CopyIcon } from "../../assets/icons/copyIcon";

const StudentsList = () => {
  const [isAddStudentModalVisible, setIsAddStudentModalVisible] =
    useState(false);
  const [isDocumentModalVisible, setIsDocumentModalVisible] = useState(false);
  const [isInfoModalVisible, setIsInfoModalVisible] = useState(false);
  const [currentDocuments, setCurrentDocuments] = useState([]);
  const [currentInfo, setCurrentInfo] = useState("");
  const onSearch = (value, _e, info) => console.log(info?.source, value);

  const data = [
    {
      key: "1",
      image: "https://example.com/images/student1.jpg",
      name: "Juan Pérez",
      roll: "A001",
      document: 'Assignment 1',
      documents: [
        { subject: 'Physics', title: 'Title of Document', link: '#' },
        { subject: 'Maths', title: 'Title of Document', link: '#' },
        { subject: 'English', title: 'Title of Document', link: '#' }
      ],
      info: "Estudiante de ingeniería en sistemas",
    },
    {
      key: "2",
      image: "https://example.com/images/student2.jpg",
      name: "María López",
      roll: "A002",
      document: 'Assignment 1',
      documents: [
        { subject: 'Physics', title: 'Title of Document', link: '#' },
        { subject: 'Maths', title: 'Title of Document', link: '#' },
        { subject: 'English', title: 'Title of Document', link: '#' }
      ],
      info: "Estudiante de medicina",
    },
    {
      key: "3",
      image: "https://example.com/images/student3.jpg",
      name: "Carlos García",
      roll: "A003",
      date: '2024-01-01',
      info: 'Due next week',
      document: 'Assignment 1',
      documents: [
        { subject: 'Physics', title: 'Title of Document', link: '#' },
        { subject: 'Maths', title: 'Title of Document', link: '#' },
        { subject: 'English', title: 'Title of Document', link: '#' }
      ],
      classInfo: 'Math 101 - Section A: Basic Math assignments due next week.',
    },
    {
      key: "4",
      image: "https://example.com/images/student4.jpg",
      name: "Ana Martínez",
      roll: "A004",
      document: 'Assignment 1',
      documents: [
        { subject: 'Physics', title: 'Title of Document', link: '#' },
        { subject: 'Maths', title: 'Title of Document', link: '#' },
        { subject: 'English', title: 'Title of Document', link: '#' }
      ],
      info: "Estudiante de arquitectura",
    },
    {
      key: "5",
      image: "https://example.com/images/student5.jpg",
      name: "Luis Rodríguez",
      roll: "A005",
      document: 'Assignment 1',
      documents: [
        { subject: 'Physics', title: 'Title of Document', link: '#' },
        { subject: 'Maths', title: 'Title of Document', link: '#' },
        { subject: 'English', title: 'Title of Document', link: '#' }
      ],
      info: "Estudiante de economía",
    },
  ];

  const columns = [
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Roll No.",
      dataIndex: "roll",
      key: "roll",
    },
    {
      title: "Document",
      dataIndex: "document",
      key: "document",
    },
    {
      title: "Info",
      dataIndex: "info",
      key: "info",
    },
  ];

  const showAddStudentModal = () => {
    setIsAddStudentModalVisible(true);
  };

  const showDocumentModal = (documents) => {
    setCurrentDocuments(documents);
    setIsDocumentModalVisible(true);
  };

  const showInfoModal = (info) => {
    setCurrentInfo(info);
    setIsInfoModalVisible(true);
  };
  const handleAddStudentModalOk = () => {
    setIsAddStudentModalVisible(false);
  };

  const handleAddStudentModalCancel = () => {
    setIsAddStudentModalVisible(false);
  };
  const handleDocumentModalOk = () => {
    setIsDocumentModalVisible(false);
  };

  const handleDocumentModalCancel = () => {
    setIsDocumentModalVisible(false);
  };

  const handleInfoModalOk = () => {
    setIsInfoModalVisible(false);
  };

  const handleInfoModalCancel = () => {
    setIsInfoModalVisible(false);
  };

  return (
    <div className="containerPage">
      <div className="title-section">
        <h1>Students</h1>
        <Space direction="horizontal" className="search-button-container">
          <Input
            suffix={<SearchIcon />}
            placeholder="Search your student..."
            allowClear
            onSearch={onSearch}
            className="input-search"
          />
          <Button
            icon={<PlusOutlined />}
            className="button-upload"
            onClick={showAddStudentModal}
          >
            Add New Student
          </Button>
        </Space>
      </div>
      <TableComponent
        type="student"
        columns={columns}
        data={data}
        onDocumentClick={showDocumentModal}
        onInfoClick={showInfoModal}
      />
      <Modal
        title="Add New Student"
        visible={isAddStudentModalVisible}
        onOk={handleAddStudentModalOk}
        onCancel={handleAddStudentModalCancel}
        footer={null}
        wrapClassName="custom-modal-wrapper"
        style={{ top: "30%" }}
        className="modal-add-student"
        closeIcon={
          <CloseOutlined
            style={{
              fontSize: 20,
              backgroundColor: "#EF8F37",
              borderRadius: "50%",
              borderColor: "#EF8F37",
              padding: "4px",
            }}
          />
        }
      >
        <Space direction="vertical" className="modal-content">
          <div className="input-group">
            <Input
              className="inputModal"
              defaultValue="wwwinterfacefjfd5345/we23fwf4g851d14g414/g43ertetrr"
            />
            <Button
              icon={<CopyIcon />}
              className="button-copy-invite"
              type="primary"
            >
              Copy
            </Button>
          </div>
          <p className="tx-or">Or</p>
          <div className="input-group">
            <div className="inputModal">
              <label>Email</label>
              <Input className="inputModal" defaultValue="user3456@mail.com" />
            </div>

            <Button className="button-copy-invite" type="primary">
              Invite by email
            </Button>
          </div>
        </Space>
      </Modal>
      <Modal
        title={<h2>List of documents</h2>}
        visible={isDocumentModalVisible}
        onOk={handleDocumentModalOk}
        onCancel={handleDocumentModalCancel}
        footer={null}
        wrapClassName="custom-modal-wrapper"
        style={{ top: "30%" }}
        closeIcon={
          <CloseOutlined
            style={{
              fontSize: 20,
              backgroundColor: "#EF8F37",
              borderRadius: " 50%",
              borderColor: "#EF8F37",
              padding: "4px",
            }}
          />
        }
      >
        <table className="documentTable">
          <tbody>
            {currentDocuments.map((doc, index) => (
              <tr key={index}>
                <td>{doc.subject}</td>
                <td>{doc.title}</td>
                <td>
                  <a
                    href={doc.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="black-link"
                  >
                    View PDF
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Modal>

      <Modal
        title={<h2>Details</h2>}
        visible={isInfoModalVisible}
        onOk={handleInfoModalOk}
        onCancel={handleInfoModalCancel}
        footer={null}
        wrapClassName="custom-modal-wrapper"
        style={{ top: "30%" }}
        closeIcon={
          <CloseOutlined
            style={{
              fontSize: 20,
              backgroundColor: "#EF8F37",
              borderRadius: " 50%",
              borderColor: "#EF8F37",
              padding: "4px",
            }}
          />
        }
      >
        <p>{currentInfo}</p>
      </Modal>
    </div>
  );
};

export default StudentsList;
