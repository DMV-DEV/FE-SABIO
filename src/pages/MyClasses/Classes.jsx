import React, { useState, useEffect } from 'react';
import CardComponent from '../../components/cards/CardComponent';
import './StyleClasses.css';
import { useNavigate } from 'react-router-dom';
import { useGetClassesByEducatorQuery, useAddClassMutation } from '../../redux/classesApi';
import { useSelector, useDispatch } from 'react-redux';
import { addClasses } from '../../redux/classesSlice';

const Classes = () => {
  const navigate = useNavigate();
  const profesorId = useSelector((state)=>state.user.id)
  const token = localStorage.getItem('accessToken');
  const profesor = useSelector((state) => state.user.name)
  const dispatch = useDispatch();
  

  const { data, error, isLoading } = useGetClassesByEducatorQuery(profesorId);
  console.log(data);
  const [addClass, { isLoading: isAdding }] = useAddClassMutation();

  useEffect(() => {
    if (data) {
      console.log('Clases:', data);
    }
    if (error) {
      console.error('Error:', error);
    }
  }, [data, error]);

  const handleClick = (name, id) => {
    
    dispatch(addClasses({ nombre: name,  id: id }));
    navigate(`/dashboard`);
  };

  const selectedClassId = useSelector((state) => state.classes.id);
  const selectedClassName = useSelector((state) => state.classes.nombre);

  useEffect(() => {
    console.log(`Selected Class ID in Redux: ${selectedClassId}`);
    console.log(`Selected Class Name in Redux: ${selectedClassName}`);
  }, [selectedClassId, selectedClassName]);
 


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
        {data.map(data => (
          <div key={data.id} onClick={() => handleClick(data.nombre, data.id)}>
            <CardComponent
              title={data.id}
              instructor={profesor}
              subject={data.nombre}
              section={data.id}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Classes;
