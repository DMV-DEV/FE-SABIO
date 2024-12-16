import React, { useEffect, useState } from "react";
import { Modal, Progress, List, Card, Row, Col } from "antd";
import "../../components/dash/questionTopic.css";

const TopicAnalysisModal = ({ visible, onClose }) => {
  const [modalMarginTop, setModalMarginTop] = useState("3rem");

  // Esta función ajusta el margen superior en función del tamaño de la pantalla.
  const handleResize = () => {
    if (window.innerWidth <= 600) {
      setModalMarginTop("5rem");
    } else {
      setModalMarginTop("3rem");
    }
  };

  useEffect(() => {
    // Configuramos la función para ejecutarse en cada cambio de tamaño de ventana
    window.addEventListener("resize", handleResize);
    // Ejecutamos la función inmediatamente para establecer el valor correcto
    handleResize();

    // Limpiamos el event listener cuando el componente se desmonta
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const data = [
    { title: "Interpretación incorrecta", percentage: "35%", color: "#c23531" },
    { title: "Falta de datos", percentage: "25%", color: "#2f4554" },
    { title: "Inadecuada capacitación", percentage: "20%", color: "#61a0a8" },
    { title: "Datos desactualizados", percentage: "20%", color: "#d48265" },
  ];

  const recommendedActions = [
    "Organizar talleres prácticos y estudios de caso",
    "Facilitar el acceso a diversas bases de datos",
    "Fomentar el uso de fuentes actualizadas",
    "Introducir herramientas avanzadas para la validación de datos",
  ];

  const improvementStrategies = [
    "Aula invertida: teoría en casa con videos y lecturas; clase para actividades prácticas y discusiones, maximizando la interacción",
    "Gamificación del aprendizaje: Integrar elementos de juego en las lecciones, como puntos, niveles y recompensas",
    "Uso de simulaciones interactivas: Usar simulaciones y software interactivo para recrear escenarios de análisis de riesgos",
    "Guest Lectures: Utilizar laboratorios virtuales para permitir a los estudiantes realizar experimentos en un entorno seguro",
  ];

  return (
    <div className="dash-modal-container">
      <Modal
        title="Topic Analysis - Análisis de Riesgos"
        visible={visible}
        onCancel={onClose}
        centered
        width="75vw"
        style={{
          maxWidth: "1200px",
          marginTop: modalMarginTop, // Utiliza el margen dinámico
          marginBottom: "2rem",
        }}
        bodyStyle={{
          padding: "2rem",
        }}
      >
        <div>
          <h3>Understanding level</h3>
          <Progress percent={65} />
        </div>

        <Row gutter={[16, 16]} style={{ marginTop: "20px" }}>
          <Col xs={24} sm={24} md={12}>
            <h4>Common challenges</h4>
            {data.map((item, index) => (
              <Card key={index} style={{ marginBottom: "10px" }}>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <span>{item.title}</span>
                  <span style={{ color: item.color }}>{item.percentage}</span>
                </div>
              </Card>
            ))}
          </Col>

          <Col xs={24} sm={24} md={12}>
            <h4>Recommended actions</h4>
            <List
              dataSource={recommendedActions}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta description={item} />
                </List.Item>
              )}
            />
          </Col>
        </Row>

        <div style={{ marginTop: "20px" }}>
          <h4>Improvement strategies</h4>
          <List
            grid={{
              gutter: 16,
              xs: 1,
              sm: 2,
              md: 2,
            }}
            dataSource={improvementStrategies}
            renderItem={(item) => (
              <List.Item>
                <Card>{item}</Card>
              </List.Item>
            )}
          />
        </div>
      </Modal>
    </div>
  );
};

export default TopicAnalysisModal;
