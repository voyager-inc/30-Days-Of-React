// index.js
import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import {Header} from './components/Header.js'
import {Countries} from './components/Countries'

// JSX element, app
const App = () => {
  const [data, setData] = useState([])

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    const url = 'https://restcountries.com/v3.1/all'
    try {
      const response = await fetch(url)
      const data = await response.json()
      setData(data)
    } catch (error) {
      console.log(error)
    }
  }
  return(
    <div className='app'>
      <Header props={data}/>
      <Countries props={data} />
    </div>
  )
}

const rootElement = ReactDOM.createRoot(
  document.getElementById('root')
);
// we render the JSX element using the ReactDOM package
rootElement.render(<App />)
