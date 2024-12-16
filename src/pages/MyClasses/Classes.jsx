import React, { useState, useEffect } from 'react';
import CardComponent from '../../components/cards/CardComponent';
import './StyleClasses.css';
import { useNavigate } from 'react-router-dom';
import { useGetClassesByEducatorQuery, useAddClassMutation } from '../../redux/classesApi';
import { useSelector, useDispatch } from 'react-redux';
import { addClasses } from '../../redux/classesSlice';
import { message } from 'antd';

const Classes = () => {
  const navigate = useNavigate();
  const profesorId = useSelector((state)=>state.user.id)
  const token = localStorage.getItem('accessToken');
  const profesor = useSelector((state) => state.user.name)
  const dispatch = useDispatch();
  

  const { data, error, isLoading } = useGetClassesByEducatorQuery(profesorId);
  const [addClass, { isLoading: isAdding }] = useAddClassMutation();

  useEffect(() => {
    if (data) {
      console.log('Clases:', data);
    }
    if (error) {
      message.error('Error:', error);
    }
  }, [data, error]);

  const handleClick = (name, id) => {
    
    dispatch(addClasses({ nombre: name,  id: id }));
    navigate(`/dashboard`);
  };


 


  if (isLoading) return <div>Loading...</div>;
  if (error) {
    message.error('Error:', error);
    return <div>Error: {error.data?.error || 'An error occurred'}</div>;
  }

  return (
    <div className='classes'>
      <div className='classes__header'>
        <h1>My classes</h1>
      </div>
      <div className='classes__body'>
        {data.map(data => (
          <div key={data.id} onClick={() => handleClick(data.nombre, data.id)}>
            <CardComponent
              id={data.id}
              instructor={profesor}
              subject={data.nombre}
              
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Classes;
