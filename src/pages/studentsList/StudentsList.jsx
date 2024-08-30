import React, { useState, useEffect, useRef } from "react";
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
import { useGetDocumentsByHiloQuery } from "../../redux/documentsApi";
import { useSelector } from "react-redux";

const StudentsList = () => {
  const classId = useSelector((state) => state.classes.id);
  const hiloId = 5; 
  const inputRef = useRef(null);

  const [isAddStudentModalVisible, setIsAddStudentModalVisible] = useState(false);
  const [isDocumentModalVisible, setIsDocumentModalVisible] = useState(false);
  const [currentDocuments, setCurrentDocuments] = useState([]);
  const [newStudentEmail, setNewStudentEmail] = useState("");
  const [searchText, setSearchText] = useState("");

  const { data: students, error: studentsError, isLoading } = useGetStudentsQuery(classId);
  const { data: documents, error: documentsError } = useGetDocumentsByHiloQuery(hiloId); 
  const [addStudent] = useAddStudentMutation();
  const [deleteStudent] = useDeleteStudentMutation();

  useEffect(() => {
    if (studentsError) {
      console.error("Error fetching students:", studentsError);
    }
  }, [studentsError]);

  useEffect(() => {
    if (documents) {
      setCurrentDocuments(documents);
    }
  }, [documents]);

  const handleAddStudent = async () => {
    console.log("Adding student with classId:", classId, "and email:", newStudentEmail);
    try {
      await addStudent({ classId, student_email: newStudentEmail }).unwrap();
      message.success("Student added successfully");
      setIsAddStudentModalVisible(false);
    } catch (error) {
      message.error("Failed to add student");
      console.error("Error adding student:", error);
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
            ref={inputRef}  // Aquí estamos usando la referencia
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
            {Array.isArray(currentDocuments) && currentDocuments.length > 0 ? (
              currentDocuments.map((doc, index) => (
                <tr key={index}>
                  <td>{doc.archivo}</td>
                  <td>
                    <a
                      href={doc.archivo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="documentLink"
                    >
                      View document
                    </a>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2">No documents available</td>
              </tr>
            )}
          </tbody>
        </table>
      </Modal>
    </div>
  );
};

export default StudentsList;
