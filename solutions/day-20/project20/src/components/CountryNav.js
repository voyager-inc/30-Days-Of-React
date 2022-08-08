import React from 'react'

const Country = ({ country: { name, numBreeds } }) => {
  return (
    <div className='country-nav-item'>
      <p><strong>{name.toUpperCase()}</strong>({numBreeds})</p>
    </div>
  )
}

// countries component
export const CountryNav = ({countries}) => {
  console.log(countries)
  if (countries !== 'undefined'){
    console.log(countries)
    const countryList = countries.map((country) => <Country key={country.name+'navigation'} country={country} />)
    return <div className='country-nav-container'>{countryList}</div>
  } else {
    return <div>Empty Coutries</div>
  }
}