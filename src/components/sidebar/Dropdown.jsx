import React, { useState, useEffect } from 'react';
import './StyleSidebar.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useGetClassesByEducatorQuery } from '../../redux/classesApi';
import { addClasses } from '../../redux/classesSlice';

const Dropdown = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const profesorId= 7;
//   const profesorId = useSelector((state) => state.user.id)
  const { data: classes = [], error, isLoading } = useGetClassesByEducatorQuery(profesorId);
  const [selectedOption, setSelectedOption] = useState('Select a class');

  const handleChange = (event) => {
    const selectedClassId = event.target.value;
    const selectedClass = classes.find(cls => cls.id === selectedClassId);

    if (selectedClass) {
      setSelectedOption(selectedClass.nombre);
      dispatch(addClasses({ nombre: selectedClass.nombre, id: selectedClass.id }));

      if (location.pathname === '/') {
        navigate(`/dashboard`);
      }
    }
  };

  useEffect(() => {
    if (error) {
      console.error('Error fetching classes:', error);
    }
  }, [error]);

  return (
    <div className="sidebar__dropdown">
      <select id="dropdown" value={selectedOption} onChange={handleChange}>
        <option value="Select a class" disabled>Select a class</option>
        {isLoading ? (
          <option value="loading">Loading...</option>
        ) : (
          classes.map(cls => (
            <option key={cls.id} value={cls.id}>
              {cls.nombre}
            </option>
          ))
        )}
      </select>
    </div>
  );
};

export default Dropdown;
