import React, { useState, useEffect } from "react";
import "../classesDocuments/stylesClassesDocuments.css";
import { Modal, Button, message, Upload } from "antd";
import TableComponent from "../../components/table/TableComponent";
import { CloseOutlined, PlusOutlined  } from "@ant-design/icons"; 
import { useGetClassesByEducatorQuery } from "../../redux/classesApi"


const ClassesDocuments = () => {
  // const classId = useSelector((state) => state.classes.id);
  const profesorId = 8

  const [isDocumentModalVisible, setIsDocumentModalVisible] = useState(false);
  const [isInfoModalVisible, setIsInfoModalVisible] = useState(false);
  const [currentDocuments, setCurrentDocuments] = useState([]);
  const [currentInfo, setCurrentInfo] = useState('');

  const { data, error, isLoading } = useGetClassesByEducatorQuery(profesorId);

  useEffect(() => {
    if (data) {
      console.log('Clases:', data);
    }
    if (error) {
      console.error('Error:', error);
    }
  }, [data, error]);

  const columns = [
    {
      title: 'Class',
      dataIndex: 'nombre',
      key: 'nombre',
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