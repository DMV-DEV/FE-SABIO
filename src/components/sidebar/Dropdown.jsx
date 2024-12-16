import React, { useState, useEffect } from 'react';
import './StyleSidebar.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useGetClassesByEducatorQuery } from '../../redux/classesApi';
import { addClasses } from '../../redux/classesSlice';
import { message, Select, Spin } from 'antd';

const { Option } = Select;

const Dropdown = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const profesorId = useSelector((state) => state.user.id);
  const selectedClassFromRedux = useSelector((state) => state.classes.id);
  const { data: classes, error, isLoading } = useGetClassesByEducatorQuery(profesorId);
  const [selectedOption, setSelectedOption] = useState('');


  useEffect(() => {
    if (selectedClassFromRedux) {
      setSelectedOption(selectedClassFromRedux);
    }
  }, [selectedClassFromRedux]);

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
      message.error('Error fetching classes:', error);
    } else {
      message.success('Classes fetched:', classes);
    }
  }, [error, classes]);

  return (
    <div className="sidebar__dropdown">
      <Select
        placeholder="Select a class"
        value={selectedOption || undefined}
        onChange={handleChange }
        style={{ width: '100%' }}
        disabled={isLoading || error}
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
      {error && <div className="error">Error loading classes. Please try again later.</div>}
    </div>
  );
};

export default Dropdown;
