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
    let uniqueCountries = [...new Set(allCountries)];
    const countriesWithBreedsNum = []
    for (let item of uniqueCountries){
      console.log(item)
      countriesWithBreedsNum.push({
        'name': item,
        'numBreeds': allCountries.filter(country => (country === item)).length,
      })
    }
    countriesWithBreedsNum.sort((a,b) => b.numBreeds-a.numBreeds)
    console.log(countriesWithBreedsNum)
    
    return countriesWithBreedsNum
  }

  componentDidMount() {
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
    return (
      <div className='App'>
        <h1>30 Days of React</h1>
        <div className='cat-paradise'>
          <h1>Cat Paradise</h1>
          <div>
            <p>There are {this.state.data.length} cat breeds</p>
            <p>On average a cat can weigh about <strong className='special'>{this.state.averageWeight}</strong> Kg and live <strong className='special'>{this.state.averageLifeSpan}</strong> years</p>
            <p>There are <strong className='special'>{this.state.numberOfCountries}</strong> countries that have cat breeds</p>
            <p><strong className='special'>{this.state.countriesHasHighestBreeds}</strong> has the highest number of cat breeds</p>
          </div>
          <div>
            <hr/>
            <Countries countries={this.state.countries}/>
          </div>
        </div>
      </div>
    )
  }
}

const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)