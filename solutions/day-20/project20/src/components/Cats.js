import React, { Component } from 'react'
import {Cat} from './Cat'


export class Cats extends Component {
  state = {
    data: []
  }
  
  componentDidUpdate(){
    if(this.state.data.length === 0){
      this.setState({data: this.props.data})
    }
  }

  render(){
    const listOfCats = this.state.data.map(item => {
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