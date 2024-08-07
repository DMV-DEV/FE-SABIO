import React, { useState, useEffect } from "react";
import "../studentsList/stylesStudentsList.css";
import { Modal, Button, Input, Space, message } from "antd";
import TableComponent from "../../components/table/TableComponent";
import { CloseOutlined, PlusOutlined } from "@ant-design/icons"; 
import { SearchIcon } from "../../assets/icons/SearchIcon";
import {
  useGetStudentsQuery,
  useAddStudentMutation,
  useDeleteStudentMutation,
} from "../../redux/studentsApi";
import { useGetDocumentsByClassQuery } from "../../redux/documentsApi";
import { useSelector } from "react-redux";

const StudentsList = () => {
  const classId = useSelector((state) => state.classes.id);

  const [isAddStudentModalVisible, setIsAddStudentModalVisible] = useState(false);
  const [isDocumentModalVisible, setIsDocumentModalVisible] = useState(false);
  const [currentDocuments, setCurrentDocuments] = useState([]);
  const [newStudentEmail, setNewStudentEmail] = useState("");
  const [searchText, setSearchText] = useState("");

  const { data: students, error: studentsError, isLoading } = useGetStudentsQuery(classId);
  const { data: documents, error: documentsError } = useGetDocumentsByClassQuery(classId);
  const [addStudent] = useAddStudentMutation();
  const [deleteStudent] = useDeleteStudentMutation();

  useEffect(() => {
    if (studentsError) {
      console.error("Error fetching students:", studentsError);
    }
  }, [studentsError]);

  useEffect(() => {
    if (documentsError) {
      console.error("Error fetching documents:", documentsError);
    }
  }, [documentsError]);

  useEffect(() => {
    if (documents) {
      setCurrentDocuments(documents);
    }
  }, [documents]);

  const handleAddStudent = async () => {
    console.log("Adding student with classId:", classId, "and email:", newStudentEmail);
    try {
      await addStudent({ classId, email: newStudentEmail });
      message.success("Student added successfully");
      setIsAddStudentModalVisible(false);
    } catch (error) {
      message.error("Failed to add student");
    }
  };

  const handleDeleteStudent = async (id) => {
    try {
      await deleteStudent({ classId, id });
      message.success("Student deleted successfully");
    } catch (error) {
      message.error("Failed to delete student");
    }
  };

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const filteredStudents = students?.filter(student =>
    student.first_name.toLowerCase().includes(searchText.toLowerCase()) ||
    student.last_name.toLowerCase().includes(searchText.toLowerCase()) ||
    student.email.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns = [
    {
      title: "First Name",
      dataIndex: "first_name",
      key: "first_name",
    },
    {
      title: "Last Name",
      dataIndex: "last_name",
      key: "last_name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Date of Birth",
      dataIndex: "fecha_nacimiento",
      key: "fecha_nacimiento",
    },
    {
      title: "Gender",
      dataIndex: "sexo",
      key: "sexo",
    },
    {
      title: "Document",
      dataIndex: "document",
      key: "document",
    },
  ];

  const showDocumentModal = () => {
    if (documents) {
      setCurrentDocuments(documents);
    }
    setIsDocumentModalVisible(true);
  };

  const handleDocumentModalOk = () => {
    setIsDocumentModalVisible(false);
  };

  const handleDocumentModalCancel = () => {
    setIsDocumentModalVisible(false);
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
            onChange={handleSearchChange}
            className="input-search"
          />
          <Button
            icon={<PlusOutlined />}
            className="button-upload"
            onClick={() => setIsAddStudentModalVisible(true)}
          >
            Add new student
          </Button>
        </Space>
      </div>
      <TableComponent
        type="student"
        columns={columns}
        data={filteredStudents}
        onDocumentClick={showDocumentModal}
      />
      <Modal
        title="Add New Student"
        visible={isAddStudentModalVisible}
        onCancel={() => setIsAddStudentModalVisible(false)}
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
            <div className="inputModal">
              <label>Email</label>
              <Input
                className="inputModal"
                defaultValue="user3456@mail.com"
                onChange={(e) => setNewStudentEmail(e.target.value)}
              />
            </div>
            <Button
              className="button-copy-invite"
              type="primary"
              onClick={handleAddStudent}
            >
              Invite by email
            </Button>
          </div>
        </Space>
      </Modal>
      <Modal
        title={<h2>List of documents</h2>}
        visible={isDocumentModalVisible}
        onCancel={handleDocumentModalCancel}
        footer={null}
        wrapClassName="custom-modal-wrapper"
        style={{ top: "30%" }}
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
        <table className="documentTable">
          <tbody>
            {currentDocuments.map((doc, index) => (
              <tr key={index}>
                <td>{doc.archivo}</td>
                <td>
                  <a
                    href={doc.archivo}
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
    </div>
  );
};

export default StudentsList;
