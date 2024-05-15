// index.js
import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import {Header} from './components/Header.js'
import {Countries} from './components/Countries'
import {SearchForm} from './components/SearchForm'

// JSX element, app
const App = () => {
  const [data, setData] = useState([])
  const [processedData, setProcessedData] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResult, setSearchResult] = useState('')


  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    const result = processedData.filter(country => {
      return (
        country.name.toLowerCase().includes(searchTerm) ||
        country.capital.toLowerCase().includes(searchTerm) || 
        country.languages.toLowerCase().includes(searchTerm)
      )
    })
    setSearchResult(result)
  }, [processedData, searchTerm])

  const handleChange = (event) => {
    console.log(event.target.value)
    setSearchTerm(event.target.value)
  }

  const fetchData = async () => {
    const url = 'https://restcountries.com/v3.1/all'
    try {
      const response = await fetch(url)
      const data = await response.json()
      setData(data)
      console.log("fetched data", data)
      preprocessingData(data)
      
      //set initial search result
      setSearchResult(processedData)
    } catch (error) {
      console.log(error)
    }
  }

  const preprocessingData = (data) => {
    if (data.length !== 0){
      console.log('in preprocessing')
      const newData = data.map(country => {
        return preprocessEachData(country)
      })
      setProcessedData(newData)
    }
  }

  const preprocessEachData = (dataItem) => {
    const {
      name, 
      capital, 
      languages, 
      population, 
      currencies, 
      flags 
    } = dataItem
    return {
      'name': name.common,
      'capital': capital !== undefined ? capital[0]: '',
      'languages': languages !== undefined ? 
        Object.values(languages).join(', '): '',
      'population': population.toLocaleString(),
      'currencies': currencies !== undefined ? 
        Object.values(currencies).map(item => item.name).join(', '):'',
      'flags': flags.svg
    }
  }

  return(
    <div className='app'>
      <Header props={data}/>
      <SearchForm props={searchTerm} handleChange={handleChange}/>
      <Countries props={searchResult}  />
    </div>
  )
}

const rootElement = ReactDOM.createRoot(
  document.getElementById('root')
);
// we render the JSX element using the ReactDOM package
rootElement.render(<App />)