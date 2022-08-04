// index.js
import React, { Component } from 'react'
import ReactDOM from 'react-dom'


const h1Styles = {
  backgroundColor: '#61dbfb',
  padding: 10,
  border: 'none',
  borderRadius: 5,
  margin: 3,
  cursor: 'pointer',
  fontSize: 18,
  color: 'white',
}

class UserInput  extends Component {
  // declaring state
  // initial state
  state = {
    firstName: '',
  }
  handleChange = (e) => {
    const value = e.target.value
    this.setState({ firstName: value })
  }

  render() {
    /*
     accessing the state value and 
     this value will injected to the input in the value attribute
     */

    const firstName = this.state.firstName
    return (
      <div className='App'>
        <label htmlFor='firstName'>First Name: </label>
        <input
          type='text'
          id='firstName'
          name='firstName'
          placeholder='First Name'
          value={firstName}
          onChange={this.handleChange}
        />
        <h1>{this.state.firstName}</h1>
      </div>
    )
  }
}

class App extends Component {
  state = {
    firstName: '',
    message: 'test',
    top: '',
    left: '',
  }
  handleClick = (e) => {
    // e gives an event object
    // check the value of e using console.log(e)
    this.setState({
      message: 'Welcome to the world of events',
    })
  }
  // triggered whenever the mouse moves
  handleMouseMove = (e) => {
    const newPosition = Math.floor(Math.random()*90+5)+'%';
    this.setState({ message: 'mouse is moving', top: newPosition, left: newPosition })
  }
  
  

  render(){
    return (
      <div>
            <h1 onMouseMove={this.handleMouseMove} style={{position: 'absolute', top: this.state.top, left: this.state.left}}>Welcome to the World of Events</h1>
            <h2>{this.state.message}</h2>
            <UserInput/>
      </div>
    )
  }
  // render() {
  //   return (
  //     <div>
  //       <h1>Welcome to the World of Events</h1>

  //       <button onClick={this.handleClick}>Click Me</button>
  //       <button onMouseMove={this.handleMouseMove}>Move mouse on me</button>
  //       <p onCopy={this.handleCopy}>
  //         Check copy right permission by copying this text
  //       </p>

  //       <p>{this.state.message}</p>
  //       <label htmlFor=''> Test for onKeyPress Event: </label>
  //       <input type='text' onKeyPress={this.handleKeyPress} />
  //       <br />

  //       <label htmlFor=''> Test for onBlur Event: </label>
  //       <input type='text' onBlur={this.handleBlur} />

  //       <form onSubmit={this.handleSubmit}>
  //         <div>
  //           <label htmlFor='firstName'>First Name: </label>
  //           <input
  //             onChange={this.handleChange}
  //             name='firstName'
  //             value={this.state.value}
  //           />
  //         </div>

  //         <div>
  //           <input type='submit' value='Submit' />
  //         </div>
  //       </form>
  //     </div>
  //   )
  //}
}



const rootElement = document.getElementById('root')
// we render the JSX element using the ReactDOM package
ReactDOM.render(<App />, rootElement)