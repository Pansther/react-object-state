import { StrictMode } from 'react'
import { render } from 'react-dom'

import App from './App.tsx'

render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById('root')
)
