// index.js
import React from 'react'
import ReactDOM from 'react-dom'
import daiImage from './images/dai.jpeg'
import {countriesData} from './data/countries.js' 

// Fuction to show month date year

const showDate = (time) => {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]

  const month = months[time.getMonth()].slice(0, 3)
  const year = time.getFullYear()
  const date = time.getDate()
  return ` ${month} ${date}, ${year}`
}

// User Card Component
const UserCard = ({ user: { firstName, lastName, image } }) => (
  <div className='user-card'>
    <img src={image} alt={firstName} />
    <h2>
      {firstName}
      {lastName}
    </h2>
  </div>
)

// A button component
const Button = ({ text, onClick, style }) => (
  <button style={style} onClick={onClick}>
    {text}
  </button>
)

// CSS styles in JavaScript Object
const buttonStyles = {
  backgroundColor: '#61dbfb',
  padding: 10,
  border: 'none',
  borderRadius: 5,
  margin: 3,
  cursor: 'pointer',
  fontSize: 18,
  color: 'white',
}

// class based component
class Header extends React.Component {
  constructor(props) {
    super(props)
    // the code inside the constructor run before any other code
  }
  render() {
    console.log(this.props.data)
    const {
      welcome,
      title,
      subtitle,
      author: { firstName, lastName },
      date,
    } = this.props.data

    return (
      <header style={this.props.styles}>
        <div className='header-wrapper'>
          <h1>{welcome}</h1>
          <h2>{title}</h2>
          <h3>{subtitle}</h3>
          <p>
            {firstName} {lastName}
          </p>
          <small>{date}</small>
        </div>
      </header>
    )
  }
}

const Count = ({ count, addOne, minusOne }) => (
  <div>
    <h1>{count} </h1>
    <div>
      <Button text='+1' onClick={addOne} style={buttonStyles} />
      <Button text='-1' onClick={minusOne} style={buttonStyles} />
    </div>
  </div>
)

// TechList Component
// class base component
class TechList extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    const { techs } = this.props
    const techsFormatted = techs.map((tech) => <li key={tech}>{tech}</li>)
    return techsFormatted
  }
}

// Main Component
// Class Component
class Main extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    const {
      techs,
      user,
      greetPeople,
      handleTime,
      changeBackground,
      count,
      addOne,
      minusOne,
    } = this.props
    return (
      <main>
        <div className='main-wrapper'>
          <p>Prerequisite to get started react.js:</p>
          <ul>
            <TechList techs={techs} />
          </ul>
          <UserCard user={user} />
          <Button
            text='Greet People'
            onClick={greetPeople}
            style={buttonStyles}
          />
          <Button text='Show Time' onClick={handleTime} style={buttonStyles} />
          <Button
            text='Change Background'
            onClick={changeBackground}
            style={buttonStyles}
          />
          <Count count={count} addOne={addOne} minusOne={minusOne} />
        </div>
      </main>
    )
  }
}

class RandomTravelling extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      country:{
        name: '',
        capital: '',
        languages: [],
        population: 0,
        flag: '',
        currency: '',
      }
    }
    this.state.country = countriesData[1];

    this.state.country.population = countriesData[1].population.toLocaleString('en-US')
    this.state.country.languages = countriesData[1].languages.join(', ')
    console.log(this.state)
  }

  processPopulation(num){

    
  }

  changeCountry = () => {
    const newCountryIndex = Math.floor(Math.random()*countriesData.length);
    const newCountry = countriesData[newCountryIndex];
    newCountry.population = newCountry.population.toLocaleString('en-US')
    newCountry.languages = newCountry.languages.join(', ')
    this.setState({country: newCountry}) 
  }



  render(){
    
    
    return (
      <div className='random-travelling'>
        <div className='country-information'>
          <div >
            <h1>
              {this.state.country.name}
            </h1>
          </div>
          <div>
            <p> <strong>Capital: </strong> {this.state.country.capital}</p>
            <p> <strong>Languages: </strong> {this.state.country.languages}</p>
            <p> <strong>Population: </strong> {this.state.country.population}</p>
            <p> <strong>Currency: </strong> {this.state.country.currency}</p>
          </div>
        </div>
        <div className='button-select-country'>
          <Button text='Select Country' onClick={this.changeCountry} style={buttonStyles}></Button>
        </div>
      </div>
    );

  }
}

// Footer Component
// Class component
class Footer extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <footer>
        <div className='footer-wrapper'>
          <p>Copyright {this.props.date.getFullYear()}</p>
        </div>
      </footer>
    )
  }
}

class App extends React.Component {
  constructor(props){
    super(props)
    this.state ={
        count: 0,
        styles: {
          backgroundColor: 'white',
          color: 'black',
        }
    }
    this.changeBackground = this.changeBackground.bind(this);

  }

  showDate = (time) => {
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ]

    const month = months[time.getMonth()].slice(0, 3)
    const year = time.getFullYear()
    const date = time.getDate()
    return ` ${month} ${date}, ${year}`
  }
  addOne = () => {
    this.setState({ count: this.state.count + 1 })
  }

  // method which subtract one to the state
  minusOne = () => {
    this.setState({ count: this.state.count - 1 })
  }
  handleTime = () => {
    alert(this.showDate(new Date()))
  }
  greetPeople = () => {
    alert('Welcome to 30 Days Of React Challenge, 2020')
  }
  changeBackground = () => {
    const newBackground = this.state.styles.backgroundColor === 'white' ? 'black':'white';
    const newColor = this.state.styles.color === 'black' ? 'white':'black';
    this.setState({styles: {
      backgroundColor: newBackground,
      color: newColor
    }})
    console.log(this.state)

  }
  render() {
    const data = {
      welcome: 'Welcome to 30 Days Of React',
      title: 'Getting Started React',
      subtitle: 'JavaScript Library',
      author: {
        firstName: 'Dai',
        lastName: 'Vuong',
      },
      date: 'Aug 2, 2022',
    }
    const techs = ['HTML', 'CSS', 'JavaScript']
    const date = new Date()
    // copying the author from data object to user variable using spread operator
    const user = { ...data.author, image: daiImage }

    return (
      <div className='app' 
        style={{backgroundColor: this.state.styles.backgroundColor, color: this.state.styles.color}}>
        <Header data={data} />
        <Main
          user={user}
          techs={techs}
          handleTime={this.handleTime}
          greetPeople={this.greetPeople}
          changeBackground={this.changeBackground}
          addOne={this.addOne}
          minusOne={this.minusOne}
          count={this.state.count}
        />
        <RandomTravelling />
        <Footer date={new Date()} />
      </div>
    )
  }
}

const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)