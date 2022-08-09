import React from 'react'

const preprocessingData = ({
  name, 
  capital, 
  languages, 
  population, 
  currencies, 
  flags
}) => 
{
  console.log(capital, currencies)
  return {
    'processedName': name.common,
    'processedCapital': capital !== undefined ? capital[0]: '',
    'processedLanguages': languages !== undefined ? 
      Object.values(languages).join(', '): '',
    'processedPopulation': population.toLocaleString(),
    'processedCurencies': currencies !== undefined ? 
      Object.values(currencies)[0].name:'',
    'processedFlagsURL': flags.svg
  }
}

const Country = ({props}) => {
  const {
    name, 
    capital, 
    languages, 
    population, 
    currencies, 
    flags 
  } = props
  const processedData = preprocessingData({
    name, 
    capital, 
    languages, 
    population, 
    currencies, 
    flags 
  })
  
  return (
    <div className='country-box'>
      <div>
        <img src={processedData.processedFlagsURL} alt='processedData.processedName'/>
        <p>{processedData.processedName}</p>
      </div>
      <div>
        <p>Captial: {processedData.processedCapital}</p>
        <p>Languages: {processedData.processedLanguages}</p>
        <p>Population: {processedData.processedPopulation}</p>
        <p>Currency: {processedData.processedCurencies}</p>
      </div>
    </div>

  )
}

export const Countries = ({props}) => {
  console.log(props)
  if(props.length !==0){
    const listOfCountries = props.map(country => <Country props={country} key={country.name.common}/>)
    return (
      <div className='country-container'>
        {listOfCountries}
      </div>
    )
  }

}