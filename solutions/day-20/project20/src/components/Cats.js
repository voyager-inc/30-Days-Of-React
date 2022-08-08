import React, { Component } from 'react'
import {Cat} from './Cat'


export class Cats extends Component {
  state = {
    data: []
  }
  
  componentDidUpdate(){
    if(this.state.data.length === 0){
      console.log(this.props.data, 'componentDidUpdate in Cats')
      this.setState({data: this.props.data})
    }
    console.log(this.state.data, 'componentDidUpdate in Cats')

    //this.updateImagesToCats()
  }

  render(){
    const listOfCats = this.state.data.map(item => {
      return (
        <div className='cat-card'> 
          <Cat data={item} key={item.name}></Cat>
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