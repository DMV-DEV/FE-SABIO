import React from 'react'
import '../../components/dash/aigeneratedtips.css'

const tips = [
    { tip: 'Tip 1', description: 'AI generated tips for the professor based on the questions asked. Back end will generate this data.', id: 1 },
    { tip: 'Tip 2', description: 'AI generated tips for the professor based on the questions asked. Back end will generate this data.', id: 2 },
    { tip: 'Tip 3', description: 'AI generated tips for the professor based on the questions asked. Back end will generate this data.', id: 3 },
    { tip: 'Tip 4', description: 'AI generated tips for the professor based on the questions asked. Back end will generate this data.', id: 4 },
    { tip: 'Tip 5', description: 'AI generated tips for the professor based on the questions asked. Back end will generate this data.', id: 5 },
    { tip: 'Tip 6', description: 'AI generated tips for the professor based on the questions asked. Back end will generate this data.', id: 6 },
  ];

const AIGeneratedTips = () => {
  return (
    <div className="ai-generated-tips-container">
    <div className="ai-generated-tips-header">
      <h3>AI Generated Tips</h3>
    </div>
    <div className="ai-generated-tips-list">
      {tips.map(tip => (
        <div key={tip.id} className="ai-generated-tip-item">
          <div className="tip-title">
            {tip.tip}
          </div>
          <div className="tip-details">
            <div className="tip-description">
              {tip.description}
            </div>
          </div>
          <div className="tip-options">
            <button className="options-button">⋮</button>
          </div>
        </div>
      ))}
    </div>
  </div>
  )
}

export default AIGeneratedTips