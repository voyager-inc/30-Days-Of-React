import React from 'react'


const Country = ({props}) => {
  const {
    name, 
    capital, 
    languages, 
    population, 
    currencies, 
    flags 
  } = props

  
  return (
    <div className='country-box'>
      <div className='country-flag-image-container' >
        <img className='country-flag-image' src={flags} alt='processedData.processedName'/>
      </div> 
      <div className='country-info-box'>
        <p>{name}</p>
        <p>Captial: {capital}</p>
        <p>Languages: {languages}</p>
        <p>Population: {population}</p>
        <p>Currency: {currencies}</p>
      </div>
    </div>
  )
}

export const Countries = ({props}) => {
  if(props.length !==0){
    const listOfCountries = props.map(country => <Country props={country} key={country.name}/>)
    return (
      <div className='country-container'>
        {listOfCountries}
      </div>
    )
  }

}