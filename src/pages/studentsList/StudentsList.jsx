import React, { useState, useEffect } from "react";
import "../studentsList/stylesStudentsList.css";
import { Modal, Button, Input, Space, message } from "antd";
import TableComponent from "../../components/table/TableComponent";
import { CloseOutlined, PlusOutlined } from "@ant-design/icons";
import { SearchIcon } from "../../assets/icons/SearchIcon";
import { CopyIcon } from "../../assets/icons/copyIcon";
import {
  useGetStudentsQuery,
  useAddStudentMutation,
  useUpdateStudentMutation,
  useDeleteStudentMutation,
} from "../../redux/studentsApi";

const StudentsList = () => {
  const [isAddStudentModalVisible, setIsAddStudentModalVisible] = useState(false);
  const [isDocumentModalVisible, setIsDocumentModalVisible] = useState(false);
  const [isInfoModalVisible, setIsInfoModalVisible] = useState(false);
  const [currentDocuments, setCurrentDocuments] = useState([]);
  const [currentInfo, setCurrentInfo] = useState("");
  const [newStudent, setNewStudent] = useState({ firstName: "", lastName: "", email: "", birthDate: "", gender: "" });
  const [error, setError] = useState(null);

  const { data: students, error: queryError, isLoading } = useGetStudentsQuery();
  const [addStudent] = useAddStudentMutation();
  const [updateStudent] = useUpdateStudentMutation();
  const [deleteStudent] = useDeleteStudentMutation();

  useEffect(() => {
    if (queryError) {
      setError(queryError);
    }
  }, [queryError]);

  useEffect(() => {
    if (students) {
      console.log('Fetched students:', students); // Añadir este console.log para verificar los datos
    }
  }, [students]);

  const handleAddStudent = async () => {
    try {
      await addStudent(newStudent).unwrap();
      message.success('Student added successfully');
      setIsAddStudentModalVisible(false);
    } catch (error) {
      message.error('Failed to add student');
    }
  };

  const handleDeleteStudent = async (id) => {
    try {
      await deleteStudent(id).unwrap();
      message.success('Student deleted successfully');
    } catch (error) {
      message.error('Failed to delete student');
    }
  };

  const onSearch = (value) => console.log(value);

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

  if (isLoading) return <div>Loading...</div>;
  if (error) {
    console.error('Error fetching students:', error);
    return (
      <div>
        <div>Error: {error.message}</div>
        {/* <pre>{JSON.stringify(error, null, 2)}</pre> Muestra más detalles del error */}
      </div>
    );
  }

  const  documents= [
    { subject: 'Physics', title: 'Title of Document', link: '#' },
    { subject: 'Maths', title: 'Title of Document', link: '#' },
    { subject: 'English', title: 'Title of Document', link: '#' }
  ];

  const showDocumentModal = (documents) => {
    setCurrentDocuments(documents);
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
            onSearch={onSearch}
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
        data={students}
        onDocumentClick={showDocumentModal}
      />
      <Modal
        title="Add New Student"
        visible={isAddStudentModalVisible}
        onOk={handleAddStudent}
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
          <Input
            className="inputModal"
            placeholder="First Name"
            value={newStudent.firstName}
            onChange={(e) => setNewStudent({ ...newStudent, firstName: e.target.value })}
          />
          <Input
            className="inputModal"
            placeholder="Last Name"
            value={newStudent.lastName}
            onChange={(e) => setNewStudent({ ...newStudent, lastName: e.target.value })}
          />
          <Input
            className="inputModal"
            placeholder="Email"
            value={newStudent.email}
            onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
          />
          <Input
            className="inputModal"
            placeholder="Date of Birth"
            value={newStudent.birthDate}
            onChange={(e) => setNewStudent({ ...newStudent, birthDate: e.target.value })}
          />
          <Input
            className="inputModal"
            placeholder="Gender"
            value={newStudent.gender}
            onChange={(e) => setNewStudent({ ...newStudent, gender: e.target.value })}
          />
          <Button
            icon={<CopyIcon />}
            className="button-copy-invite"
            type="primary"
            onClick={handleAddStudent}
          >
            Add Student
          </Button>
        </Space>
      </Modal>
      <Modal
        title={<h2>List of documents</h2>}
        visible={isDocumentModalVisible}
        onOk={() => setIsDocumentModalVisible(false)}
        onCancel={() => setIsDocumentModalVisible(false)}
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
            {documents.map((doc, index) => (
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
        onOk={() => setIsInfoModalVisible(false)}
        onCancel={() => setIsInfoModalVisible(false)}
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
        <p>{currentInfo}</p>
      </Modal>
    </div>
  );
};

export default StudentsList;

