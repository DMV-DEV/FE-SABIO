import React, { useState } from "react";
import "./StyleSidebar.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useGetClassesByEducatorQuery } from "../../redux/classesApi";

const Dropdown = () => {
  const profesorId = useSelector((state) => state.user.id);
  const { data, error, isLoading } = useGetClassesByEducatorQuery(profesorId);
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState("Select a class");

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
    navigate(`/dashboard`);
    // navigate(`/dashboard/${id}`)
  };

  return (
    <div className="sidebar__dropdown">
      <select id="dropdown" value={selectedOption} onChange={handleChange}>
        <option value="Select a class" disabled>
          Select a class
        </option>
        {data.map((data) => (
          <option value={data.id}>{data.nombre} </option>
        ))}
      </select>
    </div>
  );
};
export default Dropdown;
