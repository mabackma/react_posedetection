import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import SelectModelPage from './SelectModelPage.jsx'
import TextArea from './TextArea.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SelectModelPage/>
    <TextArea/>
  </React.StrictMode>,
)
