import React, { useState } from 'react';
import CardComponent from '../../components/cards/CardComponent';
import './StyleClasses.css';
import { useNavigate } from 'react-router-dom';
import { useGetClassesByEducatorQuery, useAddClassMutation } from '../../redux/classesApi.jsx';
import { useSelector } from 'react-redux';

const Classes = () => {
  const [classSelected, setClassSelected] = useState('');
  const navigate = useNavigate();
  // const profesorId = useSelector((state) => state.user.id);
  const profesorId = 7

  // Verificar si profesorId está definido
  // if (!profesorId) {
  //   console.error('El ID del profesor no está definido');
  //   return <div>Error: El ID del profesor no está definido</div>;
  // }

  const { data: classes, error, isLoading } = useGetClassesByEducatorQuery(profesorId);
  const [addClass, { isLoading: isAdding }] = useAddClassMutation();
// console.log(classes);
  const handleClick = (id) => {
    setClassSelected(id);
    navigate(`/dashboard`);
  };

  // Mostrar mensajes de carga y error
  if (isLoading) return <div>Cargando clases...</div>;
  if (error){
    console.log(error)
    return <div>Error al cargar las clases</div>; } 


  return (
    <div className='classes'>
      <div className='classes__header'>
        <h1>My classes</h1>
        <button>+ Add new class</button>
      </div>
      <div className='classes__body'>
        {classes && classes.map((data) => (
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
