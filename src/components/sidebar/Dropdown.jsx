import React, { useState, useEffect } from 'react';
import './StyleSidebar.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useGetClassesByEducatorQuery } from '../../redux/classesApi';
import { addClasses } from '../../redux/classesSlice';
import { Select, Spin } from 'antd';

const { Option } = Select;

const Dropdown = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const profesorId = useSelector((state) => state.user.id);
  const { data: classes, error, isLoading } = useGetClassesByEducatorQuery(profesorId);
  const [selectedOption, setSelectedOption] = useState('');

  const handleChange = (value) => {
    if (value === undefined) {
      setSelectedOption('');
      dispatch(addClasses({ nombre: '', id: '' }));
      navigate('/');
    } else {
      const selectedClass = classes?.find(cls => cls.id === value);
  
      if (selectedClass) {
        setSelectedOption(value);
        dispatch(addClasses({ nombre: selectedClass.nombre, id: selectedClass.id }));
  
        if (location.pathname === '/') {
          navigate(`/dashboard`);
        }
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
      <Select
        placeholder="Select a class"
        value={selectedOption || undefined}
        onChange={handleChange}
        style={{ width: '100%' }}
        disabled={isLoading}
        allowClear
      >
        {isLoading ? (
          <Option value="loading">
            <Spin size="small" />
            Loading...
          </Option>
        ) : (
          (classes || []).map(cls => (
            <Option key={cls.id} value={cls.id}>
              {cls.nombre}
            </Option>
          ))
        )}
      </Select>
    </div>
  );
};

export default Dropdown;