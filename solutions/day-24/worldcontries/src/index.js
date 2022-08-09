// index.js
import React from 'react'
import ReactDOM from 'react-dom/client'


// JSX element, app
const App = () => {

return(
  <div className='app'>
    Hello World
  </div>
)
}

const rootElement = ReactDOM.createRoot(
  document.getElementById('root')
);
// we render the JSX element using the ReactDOM package
rootElement.render(<App />)