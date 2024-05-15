import React, { Component } from 'react'

export class Header extends Component {

  render(){
    const {
      numBreeds,
      averageWeight,
      averageLifeSpan, 
      numberOfCountries,
      countriesHasHighestBreeds
    } = this.props.data

    return (
      <div>
        <h1>30 Days of React (Day 19)</h1>
        <div className='cat-paradise'>
          <h1>Cat Paradise</h1>
          <div>
            <p>There are {numBreeds} cat breeds</p>
            <p>On average a cat can weigh about <strong className='special'>{averageWeight}</strong> Kg and live <strong className='special'>{averageLifeSpan}</strong> years</p>
            <p>There are <strong className='special'>{numberOfCountries}</strong> countries that have cat breeds</p>
            <p><strong className='special'>{countriesHasHighestBreeds}</strong> has the highest number of cat breeds</p>
          </div>
          <hr/>
        </div>
      </div>
    )
  }
}