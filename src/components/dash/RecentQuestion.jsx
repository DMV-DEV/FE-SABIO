import React from 'react'
import '../../components/dash/recentQuestion.css'


const questions = [
    { date: '2/8/24', time: '11:00 AM', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...', id: 1 },
    { date: '2/8/24', time: '11:00 AM', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...', id: 2 },
    { date: '2/8/24', time: '11:00 AM', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...', id: 3 },
    { date: '2/8/24', time: '11:00 AM', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...', id: 4 },
    { date: '2/8/24', time: '11:00 AM', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...', id: 5 },
    { date: '2/8/24', time: '11:00 AM', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...', id: 6 },
  ];

const RecentQuestion = () => {
  return (
     <div className="recent-questions-container">
      <div className="recent-questions-header">
        <h3>Recent Questions Asked</h3>
        {/* <button className="recent-questions-button">Weekly (2024)</button> */}
      </div>
      <div className="recent-questions-list">
        {questions.map(question => (
          <div key={question.id} className="recent-question-item">
            <div className="question-date-time">
              {question.date} — {question.time}
            </div>
            <div className="question-text">
              <span className="blue-dot">•</span> {question.text}
            </div>
            <button className='button__underlined'>View</button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default RecentQuestion