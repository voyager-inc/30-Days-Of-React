import React, { Component } from 'react'
import { createRoot } from 'react-dom/client';
import ReactDOM from 'react-dom'
import axios from 'axios'
import {Cats} from './components/Cats'
import {Header} from './components/Header'
import {CountryNav} from './components/CountryNav'


class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      data: [],
      catData: [],
      filteredCatData: [],
      countryInfo:{
        countries: [],
        averageWeight: 0,
        averageLifeSpan: 0,
        numberOfCountries: 0,
        countriesHasHighestBreeds: ''
      },
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
      countriesWithBreedsNum.push({
        'name': item,
        'numBreeds': allCountries.filter(country => (country === item)).length,
      })
    }
    if (countriesWithBreedsNum.length !== 0){
      countriesWithBreedsNum.push({
        'name': 'All',
        'numBreeds': 67
      })
    }
    countriesWithBreedsNum.sort((a,b) => a.numBreeds-b.numBreeds)
    
    return countriesWithBreedsNum
  }

  componentDidMount() {
    this.fetchCountryData()
  }

  fetchCatImage = async (breedId) => {
    const urlId = `https://api.thecatapi.com/v1/images/search?breed_id=${breedId}`
    try {
      const response = await axios.get(urlId)
      const data = await response.data[0].url
      return data
    } catch (error) { 
      console.log(error)
    }
  }

  processCatData(){
    const catData = this.state.data.map(
      item => {
        return {
          id: item.id, 
          name: item.name,
          origin: item.origin,
          temperament: item.temperament, 
          life_span: item.life_span, 
          weight: item.weight, 
          description: item.description,
          imgURL: this.fetchCatImage(item.id)
        }
      }
    )
    this.setState({catData,})
  }

  fetchCountryData = async () => {
    const url = 'https://api.thecatapi.com/v1/breeds'
    try {
      const response = await axios.get(url)
      const data = await response.data
      this.setState({data: data})
      const averageWeight = this.getAverageNumberAllCats('weight').toFixed(2)
      const averageLifeSpan = this.getAverageNumberAllCats('lifespan').toFixed(2)
      const countriesObject = this.getCountries();
      const numberOfCountries = countriesObject.length;
      const countriesHasHighestBreeds = countriesObject[0].name

      this.setState({
        countryInfo:{
          countries: countriesObject,
          averageWeight: averageWeight, 
          averageLifeSpan: averageLifeSpan,
          numberOfCountries: numberOfCountries,
          countriesHasHighestBreeds: countriesHasHighestBreeds
        },
      })

      if (this.state.data.length !== 0){
        this.processCatData();
      }
    } catch (error) {
      console.log(error)
    }
  }

  handleClick = (event) => {
    console.log(event.currentTarget.id)
  }

  render() {
    return (
      <div id='App'>
        <Header data={this.state.countryInfo}/>
        <div onClick={this.handleClick}> Test</div>
        <CountryNav countryInfo={this.state.countryInfo} handleClick={this.handleClick}/>
        <Cats data={this.state.data}/>
      </div>
    )
  }
}

const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)

// const rootElement = document.getElementById('root');
// const root = createRoot(rootElement); // createRoot(container!) if you use TypeScript
// root.render(<App />);