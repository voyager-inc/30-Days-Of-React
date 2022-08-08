import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'


const Country = ({ country: { name, numBreeds } }) => {
  return (
    <div>
      <p><strong>{name}</strong>: {numBreeds}</p>
    </div>
  )
}

// countries component
const Countries = ({ countries }) => {
  const countryList = countries.map((country) => <Country country={country} />)
  return <div>{countryList}</div>
}


class Cat extends Component {

  state = {
    imgURL: '',
    width: '',
    height: ''
  }

  fetchCatImage = async (breedId) => {
    const urlId = `https://api.thecatapi.com/v1/images/search?breed_id=${breedId}`
    try {
      const response = await axios.get(urlId)
      const data = await response.data[0]
      console.log(data)
      this.setState({imgURL: data.url, width: data.width, height: data.height})
    } catch (error) { 
      console.log(error)
    }
  }

  componentDidUpdate(){
    if(!this.state.imgURL)
      this.fetchCatImage(this.props.data.id)
  }

  componentDidMount(){
    console.log('componentDidMount in Cat')
  }
  render(){
    const {
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
          <img src={this.state.imgURL} alt={origin} loading='lazy' className='cat-card-img'/>
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

class Cats extends Component {
  state = {
    data: []
  }

  componentDidMount() {
    console.log(this.props.data, this.state.data, 'componentDidMount in Cats')
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
    console.log(listOfCats, 'list of cats')
    return (
      <div> 
        {listOfCats}
      </div>
    )
  }
}
    
class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      data: [],
      countries: [],
      averageWeight: 0,
      averageLifeSpan: 0,
      numberOfCountries: 0,
      countriesHasHighestBreeds: '',
    }
  }

  getAverageNumber(weightString){
    const weightArray = weightString.split('-').map(Number)
    return weightArray.reduce((a,b)=>(a+b)/2)
  }

  getAverageNumberAllCats(typeOfData){
    const averageNumberArray = []
    let averageNumber = 0

    if (typeOfData !== 'weight' && typeOfData !== 'lifespan'){
      return 0;
    }

    if (typeOfData === 'weight'){
      this.state.data.forEach(
        x => averageNumberArray.push(this.getAverageNumber(x.weight.metric))
      )
    } else if (typeOfData === 'lifespan'){
      this.state.data.forEach(
        x => averageNumberArray.push(this.getAverageNumber(x.life_span))
      )
    }
    averageNumber = averageNumberArray.reduce((a, b) => a + b)
    return averageNumber/averageNumberArray.length
  }

  getCountries(){
    const allCountries = this.state.data.map(cat => cat.origin);
    const allId = this.state.data.map(cat => cat.id)
    let uniqueId = [...new Set(allId)];
    console.log(uniqueId, 'uniqueID')
    let uniqueCountries = [...new Set(allCountries)];
    const countriesWithBreedsNum = []
    for (let item of uniqueCountries){
      countriesWithBreedsNum.push({
        'name': item,
        'numBreeds': allCountries.filter(country => (country === item)).length,
      })
    }
    countriesWithBreedsNum.sort((a,b) => b.numBreeds-a.numBreeds)
    
    return countriesWithBreedsNum
  }

  componentDidMount() {
    console.log("componentDidMount in App ")
    this.fetchCountryData()
  }

  fetchCountryData = async () => {
    const url = 'https://api.thecatapi.com/v1/breeds'
    try {
      const response = await axios.get(url)
      const data = await response.data
      this.setState({
        data,
      })
      const averageWeight = this.getAverageNumberAllCats('weight').toFixed(2)
      const averageLifeSpan = this.getAverageNumberAllCats('lifespan').toFixed(2)
      const countriesObject = this.getCountries();
      const numberOfCountries = countriesObject.length;
      const countriesHasHighestBreeds = countriesObject[0].name

      this.setState({
        countries: countriesObject,
        averageWeight: averageWeight, 
        averageLifeSpan: averageLifeSpan,
        numberOfCountries: numberOfCountries,
        countriesHasHighestBreeds: countriesHasHighestBreeds
      })

    } catch (error) {
      console.log(error)
    }
  }

  render() {
    console.log('render in App')
    return (
      <div id='App'>
        <h1>30 Days of React (Day 19)</h1>
        <div className='cat-paradise'>
          <h1>Cat Paradise</h1>
          <div>
            <p>There are {this.state.data.length} cat breeds</p>
            <p>On average a cat can weigh about <strong className='special'>{this.state.averageWeight}</strong> Kg and live <strong className='special'>{this.state.averageLifeSpan}</strong> years</p>
            <p>There are <strong className='special'>{this.state.numberOfCountries}</strong> countries that have cat breeds</p>
            <p><strong className='special'>{this.state.countriesHasHighestBreeds}</strong> has the highest number of cat breeds</p>
          </div>
          <div className='cat-cards'>
            <Cats data={this.state.data}/>
          </div>
        </div>
      </div>
    )
  }
}

const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)