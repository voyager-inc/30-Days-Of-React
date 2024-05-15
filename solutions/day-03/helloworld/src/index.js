// index.js
import React from 'react'
import ReactDOM from 'react-dom/client'
import { useState } from "react";
import { UserData } from "./Data";


import daiImage from './frontend_technologies.png'
import profilePicture from './dai.jpeg'
import verifyPicture from './images.png'
import clockPic from './clock.png'
import LineChart from "./components/LineChart";

// JSX element, header
const Header = ({
  welcome, 
  title, 
  subtitle, 
  date, 
  author: {firstName, lastName}
}) => (
  <header>
    <div className='header-wrapper'>
      <h1>{welcome}</h1>
      <h2>{title}</h2>
      <h3>{subtitle}</h3>
      <p>Instructors: {firstName} {lastName}</p>
      <small>Date: {date}</small>
    </div>
  </header>
)

// JSX element, main
const Skills = ({skills}) => {
  const skillsFormatted = skills.map(skill => <li key={skill}>{skill}</li>)

  return <ul>{skillsFormatted}</ul>
}

const Main = ({skills}) => (
  <main>
    <div className='main-wrapper'>
      <p>
        Prerequisite to get started{' '}
        <strong>
          <em>react.js</em>
        </strong>
      </p>
      <ul><Skills skills={skills}/></ul>
    </div>
  </main>
)


//About author section
const AboutAuthor = (props) => {
  const authorsSkillsFormatted = props.data.skills.map(skill=><li key={skill}>{skill}</li>)

  return (
    <div>
      <img id="profilePicture" src={props.data.profilePicture} alt='The author'/>
      <h2> {props.data.firstName} {props.data.lastName}
        <img src={verifyPicture} id="verifyPicture" width="20px" alt='verify'/>
      </h2>
      <p>{props.data.title}, {props.data.location}</p>
      <h2>SKILLS</h2>
      <ul>{authorsSkillsFormatted}</ul>
      <small className="clockPicture">
        <img src={clockPic} alt="clock" width ="10px"/>
        <p>Joined on {props.data.dateJoin}</p>
      </small>
    </div>
  )
}



const User = () => (
  <div>
    <img id='pictureDai'src={daiImage} alt="Dai" />
  </div>
)


// JSX element, footer
const Footer = () => (
  <footer>
    <div className='footer-wrapper'>
      <h2>SUBSCRIBE</h2>
      <p>Sign up with your email address to receive news and updates</p>
      <input type="text" name="firstname" placeholder="First name" />
      <input type="text" name="lastname" placeholder="Last name" />
      <input type="text" name="email" placeholder="Email" />
      <button type="button">Subscribe</button>
    </div>
  </footer>
)

// Day 06 Exercise Level 02 - Number Generator.
function isPrime(n){
  if (n===1 || n===0){
    return false;
  }
  else if(n === 2){
    return true;
  }else{
    for(var x = 2; x < n; x++){
      if(n % x === 0){
        return false;
      }
    }
    return true;  
  }
}

function assignColor(n){
  if (isPrime(n)){
    return 'red'
  } else if (n%2===1) {
    return 'yellow'
  } else if (n%2===0) {
    return 'green'
  } else{
    return ''
  }
}

const NumberArrayWithColor = ({numbers}) => (
  numbers.map((number, index)=> <div key={index} className={assignColor(number)}> <h3>{number}</h3> </div>)
)

const NumberGenerator = ({numbers}) => (
  <div className='number-generator'>
    <h1>30 Days of React</h1>
    <h2>Number Generator</h2>
    <div className = 'container'><NumberArrayWithColor numbers={numbers}/></div>
  </div>
)
///////////////////////////Day 06 Exercise Level 02 - Number Generator.



// Day 06 Exercise Level 02 - Hexadecimal Colors.//////////////////////////
const HexaDecimalColor = ({hexaColor}) => {
  console.log(hexaColor)
  return <div className="hexa-box" style={{backgroundColor: hexaColor}}> {hexaColor} </div>
}

const HexaDecimalGenerator = ({hexaColors}) => {
  const hexaLists = hexaColors.map((hexaColor,index) => <HexaDecimalColor key={index} hexaColor={hexaColor}/>)
  
  return (
    <div className="hexacolor-exercise">
      <h2>Hexadecimal Color</h2>
      <div className="hexa-container">{hexaLists}</div>
    </div>
  )
}
///////////////////////////Day 06 Exercise Level 02 - Hexadecimal Colors.

// Day 06 Exercise Level 03 - Wolrd Population.//////////////////////////


///////////////////////////Day 06 Exercise Level 03 - Wolrd Population.



// JSX element, app
const App = () => {
  const welcome = 'Welcome to 30 Days Of React'
  const title = 'Getting Started React'
  const subtitle = 'Javascript Library'
  const date = 'July 29, 2022'
  const author = {
    firstName: 'Vuong',
    lastName: 'Dai',
    title: 'Fresher Frontend Developer',
    location: 'Vietnam', 
    profilePicture: profilePicture,
    skills: ['HTML', 'CSS', 'JS', 'React', 'Node', 'Python', 'Numpy', 'Pandas', 'Data Analysis', 'Git'],
    dateJoin: 'July 28, 2022'
  }
  const requiredSkills = ['HTML', 'CSS', 'JavaScript']
  const numbersArray = Array.from(Array(32).keys())

  //For hexadecimal generator
  const hexaDecimalArray = Array.from(Array(32).keys(), x => `#${Math.floor(Math.random()*16777215).toString(16)}`)

  const [userData, setUserData] = useState({
    labels: UserData.map((data) => data.year),
    datasets: [
      {
        label: "Users Gained",
        data: UserData.map((data) => data.userGain),
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#ecf0f1",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0",
        ],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  });




return(
  <div className='app'>
    <Header 
      welcome={welcome}
      title={title}
      subtitle={subtitle}
      date={date}
      author={author}
    />    
    <Main skills={requiredSkills}/>
    <AboutAuthor data={author}/>
    <NumberGenerator numbers={numbersArray}/>
    <HexaDecimalGenerator hexaColors={hexaDecimalArray}/>

    {/* <div style={{ width: 700 }}>
        <LineChart chartData={userData} />
    </div> */}
    <Footer/>

  </div>
)
}

const rootElement = ReactDOM.createRoot(
  document.getElementById('root')
);
// we render the JSX element using the ReactDOM package
rootElement.render(<App />)