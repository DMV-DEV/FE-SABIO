import React, { useState } from "react";
import CardComponent from "../../../components/cards/CardComponent";
import "./StyleStudentClasses.css";
import { useNavigate } from "react-router-dom";

const ClassesStudents = () => {
  const [classSelected, setClassSelected] = useState("");
  const navigate = useNavigate();

  const handleClick = (id) => {
    setClassSelected(id);
    navigate(`/dashboard`);
    // navigate(`/dashboard/${id}`)
  };
  console.log(classSelected);
  const data = [
    {
      title: "Class 1",
      instructor: "Marti",
      subject: "biology",
      section: "10",
      id: 1,
    },
    {
      title: "Class 2",
      instructor: "Delfi",
      subject: "biol",
      section: "1",
      id: 2,
    },
    {
      title: "Class 3",
      instructor: "Vicky",
      subject: "biol",
      section: "1",
      id: 3,
    },
  ];

  return (
    <>
      <div className="classes__container">
        <div className="classes__header">
          <h1>Upcoming classes</h1>
        </div>
        <div className="classes__body">
          {data.map((data) => (
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
      <div className="classes__header">
        <h1>My classes</h1>
        <button>Sort</button> 
      </div>
      <div className="classes__body">
        {data.map((data) => (
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
    </>
  );
};

export default ClassesStudents;