import React, { useState, useEffect } from "react";
import "../classesDocuments/stylesClassesDocuments.css";
import { Modal, Button, message, Upload } from "antd";
import { CloseOutlined, PlusOutlined } from "@ant-design/icons";
import TableComponent from "../../components/table/TableComponent";
import { useGetClassesByEducatorQuery } from "../../redux/classesApi";
import {
  useUploadDocumentsMutation,
  useGetDocumentsByClassQuery,
} from "../../redux/documentsApi";
import { useSelector } from "react-redux";

const ClassesDocuments = () => {
  const profesorId = useSelector((state)=>state.user.id)
  const classId = useSelector((state) => state.classes.id);
  const [uploadDocuments] = useUploadDocumentsMutation(); 

  const [isDocumentModalVisible, setIsDocumentModalVisible] = useState(false);
  const [isInfoModalVisible, setIsInfoModalVisible] = useState(false);
  const [currentDocuments, setCurrentDocuments] = useState([]);
  const [currentInfo, setCurrentInfo] = useState("");

  const {
    data: classesData,
    error: classesError,
    isLoading: classesLoading,
  } = useGetClassesByEducatorQuery(profesorId);
  const {
    data: documentsData,
    error: documentsError,
    isLoading: documentsLoading,
  } = useGetDocumentsByClassQuery(classId);

  useEffect(() => {
    if (classesError) {
      console.error("Error fetching classes:", classesError);
    }
  }, [classesError]);

  useEffect(() => {
    if (documentsError) {
      console.error("Error fetching documents:", documentsError);
    }
  }, [documentsError]);

  useEffect(() => {
    if (classesData) {
      console.log("Clases:", classesData);
    }
  }, [classesData]);

  const columns = [
    {
      title: "Class",
      dataIndex: "nombre",
      key: "nombre",
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

  const handleUpload = async (file) => {
    const formData = new FormData();
    formData.append("archivo", file);
    const claseId = classesData?.[0]?.id; // O el id de la clase que elijas
    const hiloId = null; // O el id del hilo si es aplicable
    if (claseId) formData.append("clase_id", claseId);
    if (hiloId) formData.append("hilo_id", hiloId);

    try {
      await uploadDocuments({
        clase_id: claseId,
        hilo_id: hiloId,
        archivo: file,
      }).unwrap();
      message.success(`${file.name} file uploaded successfully`);
    } catch (error) {
      message.error(`${file.name} file upload failed.`);
    }
  };

  const showDocumentModal = () => {
    if (documentsData) {
      setCurrentDocuments(documentsData);
    }
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

  if (classesLoading || documentsLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="containerPage">
      <div className="title-section">
        <h1>Classes</h1>
        <Upload
          customRequest={({ file, onSuccess, onError }) => {
            handleUpload(file)
              .then(() => onSuccess())
              .catch((error) => onError(error));
          }}
          showUploadList={false} // Oculta la lista de archivos cargados
        >
          <Button icon={<PlusOutlined />} className="button-upload">
            Upload document
          </Button>
        </Upload>
      </div>
      <TableComponent
        columns={columns}
        data={classesData}
        onDocumentClick={showDocumentModal}
        onInfoClick={showInfoModal}
      />
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
          {Array.isArray(currentDocuments) && currentDocuments.map((doc, index) => (
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

export default ClassesDocuments;
