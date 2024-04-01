import React from 'react'
import ReactDOM from 'react-dom/client'
import './assets/index.css'
import App from './App'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AddCardForm from './components/cards/add_card_window/AddCardForm'
import StudySession from './components/study/card_study_menu/StudyCard'
import EditCardForm from './components/cards/edit_card_window/EditCardForm'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}></Route>
        <Route path="/addCard" element={<AddCardForm />}></Route>
        <Route path="/StudyCard" element={<StudySession />}></Route>
        <Route path="/editCard" element={<EditCardForm />}></Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
