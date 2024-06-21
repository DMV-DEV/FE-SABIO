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
      class: "Math 101",
      section: "A",
      category: "Assignment",
      document: "Assignment 1",
      date: "2024-01-01",
      info: "Due next week",
      documents: [
        { subject: "Physics", title: "Title of Document", link: "#" },
        { subject: "Maths", title: "Title of Document", link: "#" },
        { subject: "English", title: "Title of Document", link: "#" },
      ],
      classInfo: "Math 101 - Section A: Basic Math assignments due next week.",
    },
    {
      key: "2",
      class: "History 201",
      section: "B",
      category: "Exam",
      document: "Midterm Exam",
      date: "2024-02-15",
      info: "Study chapters 1-5",
      documents: [
        { subject: "Physics", title: "Title of Document", link: "#" },
        { subject: "Maths", title: "Title of Document", link: "#" },
        { subject: "English", title: "Title of Document", link: "#" },
      ],
      classInfo: "History 201 - Section B: Study chapters 1-5 for the midterm.",
    },
    {
      key: "3",
      class: "Science 301",
      section: "A",
      category: "Project",
      document: "Science Fair Project",
      date: "2024-03-10",
      info: "Group project",
      documents: [
        { subject: "Physics", title: "Title of Document", link: "#" },
        { subject: "Maths", title: "Title of Document", link: "#" },
        { subject: "English", title: "Title of Document", link: "#" },
      ],
      classInfo:
        "Science 301 - Section A: Group project on various science topics.",
    },
    {
      key: "4",
      class: "English 101",
      section: "C",
      category: "Essay",
      document: "Final Essay",
      date: "2024-04-22",
      info: "Minimum 2000 words",
      documents: [
        { subject: "Physics", title: "Title of Document", link: "#" },
        { subject: "Maths", title: "Title of Document", link: "#" },
        { subject: "English", title: "Title of Document", link: "#" },
      ],
      classInfo:
        "English 101 - Section C: Final essay should be at least 2000 words.",
    },
    {
      key: "5",
      class: "Art 101",
      section: "B",
      category: "Portfolio",
      document: "Art Portfolio",
      date: "2024-05-30",
      info: "Submit online",
      documents: [
        { subject: "Physics", title: "Title of Document", link: "#" },
        { subject: "Maths", title: "Title of Document", link: "#" },
        { subject: "English", title: "Title of Document", link: "#" },
      ],
      classInfo: "Art 101 - Section B: Submit your art portfolio online.",
    },
  ];

  const columns = [
    {
      title: "Class",
      dataIndex: "class",
      key: "class",
    },
    {
      title: "Section",
      dataIndex: "section",
      key: "section",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Document",
      dataIndex: "document",
      key: "document",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
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
        title={<h2>List of documents</h2>}
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
