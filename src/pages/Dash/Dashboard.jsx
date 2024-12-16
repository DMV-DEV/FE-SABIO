import React from 'react'
import './dashboard.css'
import Question from '../../components/dash/QuestionTopic'
import Recent from '../../components/dash/RecentQuestion'
import Frecuently from '../../components/dash/FrecuentlyConcepts'
import AItips from '../../components/dash/AIGeneratedTips'

const Dashboard = () => {
  return (
    <div className="dashboard__container">
            <div className="dashboard__content"><Question/></div>
            <div className="dashboard__content"><Recent/></div>
            <div className="dashboard__content"><Frecuently/></div>
            <div className="dashboard__content"><AItips/></div>
        </div>
  )
}

export default Dashboard