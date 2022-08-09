import React from 'react'

export const Header = ({props}) => {
  return (
    <div className='header'>
      <h1>World Countries Data</h1>
      <h2>Currently, we have {props.length} countries</h2>
    </div>
  )
}