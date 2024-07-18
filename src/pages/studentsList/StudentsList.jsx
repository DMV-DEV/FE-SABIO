import React, { useState, useEffect } from "react";
import "../studentsList/stylesStudentsList.css";
import { Modal, Button, Input, Space } from "antd";
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

  const onSearch = (value, _e, info) => console.log(info?.source, value);

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

  // if (isLoading) return <div>Loading</div>;
  // if (error) {
  //   console.log(error)
  // }

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
        onDocumentClick={(documents) => {
          setCurrentDocuments(documents);
          setIsDocumentModalVisible(true);
        }}
        onInfoClick={(info) => {
          setCurrentInfo(info);
          setIsInfoModalVisible(true);
        }}
      />
      <Modal
        title="Add New Student"
        visible={isAddStudentModalVisible}
        onOk={() => setIsAddStudentModalVisible(false)}
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


