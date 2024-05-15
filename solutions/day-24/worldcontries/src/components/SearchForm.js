import React from 'react'

export const SearchForm = ({props, handleChange}) => {
  return (
    <div className="search-input">
      <input
          type="search"
          id='searchBox'
          placeholder='Search countries by name, city, languages'
          defaultValue={props}
          onChange={handleChange}
        />
      <p>{props}</p>
    </div>
  )
}