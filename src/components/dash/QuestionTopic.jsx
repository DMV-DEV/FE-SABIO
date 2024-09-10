import React, { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import TopicAnalysisModal from "./TopicAnalysisModal";
import "../../components/dash/questionTopic.css";

const data = [
  { name: "1 Aug", Blue: 120, Black: 100 },
  { name: "8 Aug", Blue: 100, Black: 90 },
  { name: "16 Aug", Blue: 150, Black: 110 },
  { name: "22 Aug", Blue: 110, Black: 100 },
  { name: "29 Aug", Blue: 140, Black: 120 },
  { name: "5 Sep", Blue: 130, Black: 110 },
];

const QuestionTopic = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="bar-chart-container">
      <h3>Question Topic Distribution</h3>
      <ResponsiveContainer width="100%" height="90%">
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Blue" fill="#007ed6" onClick={showModal} />
          <Bar dataKey="Black" fill="#013e69" onClick={showModal} />
        </BarChart>
      </ResponsiveContainer>
      <TopicAnalysisModal visible={isModalVisible} onClose={handleCloseModal} />
    </div>
  );
};

export default QuestionTopic;

