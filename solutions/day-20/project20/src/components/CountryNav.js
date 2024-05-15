import React from 'react'

const Country = ({ country: { name, numBreeds }, handleClick }) => {
  return (
    <div className='country-nav-item' onClick={handleClick} id={name}>
      <p><strong>{name.toUpperCase()}</strong>({numBreeds})</p>
    </div>
  )
}

// countries component
export const CountryNav = ({countryInfo, handleClick}) => {
  if (countryInfo.countries.length !== 0){
    const countries = countryInfo.countries
    const countryList = countries.map((country) => <Country key={country.name+'_navigation'} country={country} handleClick={handleClick}/>)
    return <div className='country-nav-container'>{countryList}</div>
  } else {
    return <div>Empty Coutries</div>
  }
}