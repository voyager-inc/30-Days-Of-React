import React, { Component } from 'react'
import {Cat} from './Cat'


export class Cats extends Component {

  render(){
    const listOfCats = this.props.data.map(item => {
      return (
        <div className='cat-card' key={item.name}> 
          <Cat data={item}></Cat>
        </div>
      )
    })
    return (
      <div className='cat-cards'> 
        {listOfCats}
      </div>
    )
  }
}