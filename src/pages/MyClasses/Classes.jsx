import React from 'react';
import CardComponent from '../../components/cards/CardComponent';
import './StyleClasses.css';

 
const Classes = () => {
    
    const data = [
        {
          title: 'Class 1',
          instructor: 'Marti',
          subject: 'biology',
          section: '10',
        },
        {
            title: 'Class 2',
            instructor: 'Delfi',
            subject: 'biol',
            section: '1',
          },
          {
            title: 'Class 3',
            instructor: 'Vicky',
            subject: 'biol',
            section: '1',
          },
      
      ];

  return (
    
      <div className='body__classes'>
        <h1>My classes</h1>
        <div className='body__cards'>
        {data.map(data => (
          <CardComponent title={data.title} instructor={data.instructor} subject={data.subject} section={data.section} />
        ))}
        </div>
      </div>
     
  )
};

export default Classes;