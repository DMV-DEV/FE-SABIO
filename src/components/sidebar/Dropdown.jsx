import React, { useState } from 'react';
import './StyleSidebar.css';
import { useNavigate } from 'react-router-dom';

const Dropdown = () => {

    const navigate = useNavigate();

    const data = [
        {
            title: 'Class 1',
            instructor: 'Marti',
            subject: 'biology',
            section: '10',
            id: 1,
        },
        {
            title: 'Class 2',
            instructor: 'Delfi',
            subject: 'biol',
            section: '1',
            id: 2,
        },
        {
            title: 'Class 3',
            instructor: 'Vicky',
            subject: 'biol',
            section: '1',
            id: 3,
        },]

    // logica dropdown elijo clase
    const [selectedOption, setSelectedOption] = useState('Select a class');

    const handleChange = (event) => {
        setSelectedOption(event.target.value);
        navigate(`/dashboard`)
        // navigate(`/dashboard/${id}`)
    };


    return (

        <div className="sidebar__dropdown">

            <select id="dropdown" value={selectedOption} onChange={handleChange}>
            <option value="Select a class" disabled>Select a class</option>
                {data.map(data => (

                    <option
                        value={data.title}
                    >{data.title} </option>
                ))}
            </select>

        </div>


    );
};
export default Dropdown;