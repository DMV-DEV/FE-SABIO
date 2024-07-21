import React, { useState, useEffect } from 'react';
import CardComponent from '../../components/cards/CardComponent';
import './StyleClasses.css';
import { useNavigate } from 'react-router-dom';
import { useGetClassesByEducatorQuery, useAddClassMutation } from '../../redux/classesApi';
import { useSelector } from 'react-redux';

const Classes = () => {
  const [classSelected, setClassSelected] = useState('');
  const navigate = useNavigate();
  // const profesorId = useSelector((state) => state.user.id);
  const profesorId = 7
  const token = localStorage.getItem('accessToken');
  
  useEffect(() => {
    console.log('Access Token:', token);
  }, [token]);

  const { data: classes, error, isLoading } = useGetClassesByEducatorQuery(profesorId);
  const [addClass, { isLoading: isAdding }] = useAddClassMutation();

  const handleClick = (id) => {
    setClassSelected(id);
    navigate(`/dashboard`);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) {
    console.error('Error:', error);
    return <div>Error: {error.data?.error || 'An error occurred'}</div>;
  }

  return (
    <div className='classes'>
      <div className='classes__header'>
        <h1>My classes</h1>
        <button>+ Add new class</button>
      </div>
      <div className='classes__body'>
        {classes.map(data => (
          <div key={data.id} onClick={() => handleClick(data.id)}>
            <CardComponent
              title={data.name}
              instructor={data.name}
              subject={data.name}
              section={data.id}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Classes;
