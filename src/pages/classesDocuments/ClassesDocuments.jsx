import React, { useState } from "react";
import "../classesDocuments/stylesClassesDocuments.css";
import { Modal, Button, message, Upload } from "antd";
import TableComponent from "../../components/table/TableComponent";
import { CloseOutlined, PlusOutlined  } from "@ant-design/icons"; 

const ClassesDocuments = () => {
  const [isDocumentModalVisible, setIsDocumentModalVisible] = useState(false);
  const [isInfoModalVisible, setIsInfoModalVisible] = useState(false);
  const [currentDocuments, setCurrentDocuments] = useState([]);
  const [currentInfo, setCurrentInfo] = useState('');

  const data = [
    {
      key: '1',
      class: 'Math 101',
      section: 'A',
      category: 'Assignment',
      date: '2024-01-01',
      document: 'Assignment 1',
      documents: [
        { subject: 'Physics', title: 'Title of Document', link: '#' },
        { subject: 'Maths', title: 'Title of Document', link: '#' },
        { subject: 'English', title: 'Title of Document', link: '#' }
      ],
      info: 'Due next week',
      classInfo: 'Math 101 - Section A: Basic Math assignments due next week.',
    },
    {
      key: '2',
      class: 'History 201',
      section: 'B',
      category: 'Exam',
      document: 'Midterm Exam',
      date: '2024-02-15',
      info: 'Study chapters 1-5',
      documents: [
        { subject: 'Physics', title: 'Title of Document', link: '#' },
        { subject: 'Maths', title: 'Title of Document', link: '#' },
        { subject: 'English', title: 'Title of Document', link: '#' }
      ],
      classInfo: 'History 201 - Section B: Study chapters 1-5 for the midterm.',
    },
    {
      key: '3',
      class: 'Science 301',
      section: 'A',
      category: 'Project',
      document: 'Science Fair Project',
      date: '2024-03-10',
      info: 'Group project',
      documents: [
        { subject: 'Physics', title: 'Title of Document', link: '#' },
        { subject: 'Maths', title: 'Title of Document', link: '#' },
        { subject: 'English', title: 'Title of Document', link: '#' }
      ],
      classInfo: 'Science 301 - Section A: Group project on various science topics.',
    },
    {
      key: '4',
      class: 'English 101',
      section: 'C',
      category: 'Essay',
      document: 'Final Essay',
      date: '2024-04-22',
      info: 'Minimum 2000 words',
      documents: [
        { subject: 'Physics', title: 'Title of Document', link: '#' },
        { subject: 'Maths', title: 'Title of Document', link: '#' },
        { subject: 'English', title: 'Title of Document', link: '#' }
      ],
      classInfo: 'English 101 - Section C: Final essay should be at least 2000 words.',
    },
    {
      key: '5',
      class: 'Art 101',
      section: 'B',
      category: 'Portfolio',
      document: 'Art Portfolio',
      date: '2024-05-30',
      info: 'Submit online',
      documents: [
        { subject: 'Physics', title: 'Title of Document', link: '#' },
        { subject: 'Maths', title: 'Title of Document', link: '#' },
        { subject: 'English', title: 'Title of Document', link: '#' }
      ],
      classInfo: 'Art 101 - Section B: Submit your art portfolio online.',
    },
  ];

  const columns = [
    {
      title: 'Class',
      dataIndex: 'class',
      key: 'class',
    },
    {
      title: 'Section',
      dataIndex: 'section',
      key: 'section',
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'Document',
      dataIndex: 'document',
      key: 'document',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Info',
      dataIndex: 'info',
      key: 'info',
    },
  ];
  const props = {
    name: "file",
    action: "https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload",
    headers: {
      authorization: "authorization-text",
    },
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };
  const showDocumentModal = (documents) => {
    setCurrentDocuments(documents);
    setIsDocumentModalVisible(true);
  };

  const showInfoModal = (info) => {
    setCurrentInfo(info);
    setIsInfoModalVisible(true);
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
        <h1>Classes</h1>
        <Upload {...props} >
              <Button icon={<PlusOutlined />} className="button-upload">
              Upload document
              </Button>
            </Upload>
        </div>
      <TableComponent
        columns={columns}
        data={data}
        onDocumentClick={showDocumentModal}
        onInfoClick={showInfoModal}
      />
      <Modal
        title={<h2>List of documents</h2>}
        visible={isDocumentModalVisible}
        onOk={handleDocumentModalOk}
        onCancel={handleDocumentModalCancel}
        footer={null}
        wrapClassName="custom-modal-wrapper"
        style={{ top: "30%" }}
        closeIcon={<CloseOutlined   style={{ fontSize: 20, backgroundColor: "#EF8F37", borderRadius:" 50%", borderColor:"#EF8F37",padding:"4px" }} />}
      >
        <table className="documentTable">
          <tbody>
            {currentDocuments.map((doc, index) => (
              <tr key={index}>
                <td>{doc.subject}</td>
                <td>{doc.title}</td>
                <td><a href={doc.link} target="_blank" rel="noopener noreferrer" className="black-link">View PDF</a></td>
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
      closeIcon={<CloseOutlined   style={{ fontSize: 20, backgroundColor: "#EF8F37", borderRadius:" 50%", borderColor:"#EF8F37",padding:"4px" }} />}
    >
        <p>{currentInfo}</p>
      </Modal>
    </div>
  );
};

export default ClassesDocuments;