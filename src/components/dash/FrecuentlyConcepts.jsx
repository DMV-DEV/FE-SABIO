import React from 'react'
import '../../components/dash/frecuentlyConcepts.css'
import frecuentIcon from '../../components/dash/dashFrecuent.png'

const concepts = [
    { topic: 'Topic 1', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...', id: 1 },
    { topic: 'Topic 2', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...', id: 2 },
    { topic: 'Topic 3', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...', id: 3 },
    { topic: 'Topic 4', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...', id: 4 },
    { topic: 'Topic 5', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...', id: 5 },
    { topic: 'Topic 6', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...', id: 6 },
  ];

const FrecuentlyConcepts = () => {
  return (
    <div className="frequently-misunderstood-concepts-container">
      <div className="frequently-misunderstood-concepts-header">
        <h3>Frequently Misunderstood Concepts</h3>
      </div>
      <div className="frequently-misunderstood-concepts-list">
        {concepts.map(concept => (
          <div key={concept.id} className="frequently-misunderstood-concept-item">
            
            <img src={frecuentIcon} alt="frecIcon" className="concept-icon"/>
            
            <div className="concept-details">
              <div className="concept-topic">
                {concept.topic}
              </div>
              <div className="concept-description">
                {concept.description}
              </div>
            </div>
            <div className="concept-options">
              <button className="options-button">⋮</button>
            </div> 
          </div>
        ))}
      </div>
    </div>
  )
}

export default FrecuentlyConcepts