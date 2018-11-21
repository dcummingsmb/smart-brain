import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import Particles from 'react-particles-js';
//import Clarifai from 'clarifai'; //moved to backend
import './App.css';

/*
//moved to backend, so as not to expose api key
const app = new Clarifai.App({
  apiKey: '01bffb3e4b7c4597b9ede672c2261f56'
 });
*/

const particlesOptions = {
  particles: {
    number: {
      value: 75,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
}

const initialState = {
  input: '',
  imageURL: '',
  box: {},
  route: 'signin',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
      }
    })
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = image.width;
    const height = image.height;
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }
  
  displayFaceBox = (box) => {
    console.log(box);
    this.setState({box: box})
  }

  onInputChange = (event) => {
    console.log(event.target.value);
    this.setState({input: event.target.value})
  }

  onButtonSubmit = () => {
    this.setState({imageURL: this.state.input})
    console.log('click');
    //If we use this.state.imageURL here, it errors
    //this is because of the way setState works, it's frustrating but it is what it is
    //just remember, don't set state, and then try to use that state.property in the same function
    fetch('https://face-det-api.herokuapp.com/imageurl', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        input: this.state.input
      })
    })
    .then(response => response.json())
    .then(response => {
        if (response) {
          fetch('https://face-det-api.herokuapp.com/image', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
            .then(response => response.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, { entries: count}))
            })
        }
        this.displayFaceBox(this.calculateFaceLocation(response))
      })
      .catch(err => console.log('Oops. There was an error.', err));
  }

  onRouteChange = (route) => {
    if(route==='signout'){
      this.setState(initialState)
    } else if (route==='home'){
      this.setState({isSignedIn: true})
    }
    this.setState({route: route})
  }

  getPage = (route) => {
    const { box, imageURL } = this.state;
    switch(route) {      
      case 'home':
        return(
        <div>
          <Logo />
          <Rank name={this.state.user.name} entries={this.state.user.entries}/>
          <ImageLinkForm 
            onInputChange={this.onInputChange} 
            onButtonSubmit={this.onButtonSubmit}
          />
          <FaceRecognition box={box} imageURL={imageURL}/>
        </div>)
      case 'signin':
        return(<SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange} />)
      case 'register':
        return(<Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />)
      default:
        return(<SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange} />)
    }  
  }

  render() {
    const { isSignedIn, route } = this.state;
    return (
      <div className="App">
        <Particles className='particles'
          params={particlesOptions}          
        />
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />        
        {
          this.getPage(route)
        }
      </div>
    );
  }
}

export default App;
