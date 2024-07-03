import React, { useState } from 'react';
import CardComponent from '../../components/cards/CardComponent';
import './StyleClasses.css';
import { useNavigate } from 'react-router-dom';
import { useGetClassesByEducatorQuery, useAddClassMutation } from '../../redux/classesApi.jsx';
import { useDispatch, useSelector } from 'react-redux';

 
const Classes = () => {
  const [classSelected, setClassSelected] = useState('');
  const navigate = useNavigate();
  // const  profesorId =
  // useSelector((state) => state.user.id);
  // const { data: classes, error, isLoading } = useGetClassesByEducatorQuery(profesorId);
  // console.log(data);
  // const [addClass, { isLoading: isAdding }] = useAddClassMutation();

  // const handleAddClass = async () => {
  //   try {
  //     await addClass({ nombre: 'Nueva Clase', id: 10 }).unwrap();
  //   } catch (error) {
  //     console.error('Failed to add class:', error);
  //   }
  // };

  const handleClick = (id) => {
    setClassSelected(id);
    navigate(`/dashboard`)
    // navigate(`/dashboard/${id}`)
  
  };
  console.log(classSelected)
    const data = [
        {
          title: 'Class 1',
          instructor: 'Marti',
          subject: 'biology',
          section: '10',
          id:1,
        },
        {
            title: 'Class 2',
            instructor: 'Delfi',
            subject: 'biol',
            section: '1',
            id:2,
          },
          {
            title: 'Class 3',
            instructor: 'Vicky',
            subject: 'biol',
            section: '1',
            id:3,
          },
      
      ];

  return (
    
      <div className='classes'>
        <div className='classes__header'>
        <h1>My classes</h1>
        <button>+ Add new class</button>
        </div>
        <div className='classes__body'>
        {data.map(data => (
          <div onClick={() => handleClick(data.id)}> 
          <CardComponent 
          title={data.title} 
          instructor={data.instructor} 
          subject={data.subject} 
          section={data.section}
           
          />
          </div>
        ))}
        
        </div>
      </div>
     
  )
};

export default Classes;