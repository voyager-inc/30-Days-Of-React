import React from 'react'

const Country = ({ country: { name, numBreeds } }) => {
  return (
    <div>
      <p><strong>{name}</strong>: {numBreeds}</p>
    </div>
  )
}

// countries component
export const Countries = ({ countries }) => {
  const countryList = countries.map((country) => <Country country={country} />)
  return <div>{countryList}</div>
}