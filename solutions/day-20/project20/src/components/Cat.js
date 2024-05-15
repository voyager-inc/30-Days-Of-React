import React, { Component } from 'react'
import axios from 'axios'

export class Cat extends Component {
  // state = {
  //   imgURL: '',
  //   width: '',
  //   height: ''
  // }

  // fetchCatImage = async (breedId) => {
  //   const urlId = `https://api.thecatapi.com/v1/images/search?breed_id=${breedId}`
  //   try {
  //     const response = await axios.get(urlId)
  //     const data = await response.data[0]
  //     this.setState({imgURL: data.url, width: data.width, height: data.height})
  //   } catch (error) { 
  //     console.log(error)
  //   }
  // }

  // componentDidUpdate(){
  //   if(!this.state.imgURL)
  //     this.fetchCatImage(this.props.data.id)
  // }

  render(){
    const {
      imgURL,
      name, 
      origin, 
      temperament, 
      life_span, 
      weight, 
      description, 
    } = this.props.data;
  
    return (
      <div>
        <div className='handle-overflow'>
          <img src={imgURL} alt={origin} loading='lazy' className='cat-card-img'/>
        </div>
        <div className='cat-card-body'>
          <p>{name}</p>
          <p><strong>{origin}</strong></p>
          <p>Temperament: {temperament}</p>
          <p>Life Span: {life_span} years</p>
          <p>Weight: {weight.metric} Kg</p>
          <p>Description</p>
          <p>{description}</p>
        </div>
      </div>
    )
  }

}