import React, { Component} from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import './components/show.css'
import Home from './components/Home';
import Login from './components/Login';
import Contact from './components/Contact';
import Dashboard from './components/Dashboard';

class App extends Component {
	constructor(props){
    super(props);
    this.state = JSON.parse(localStorage.getItem("user")) || {
		user:{username:"",
	  fname:"",
	  lname:"",
	  role:"",
	  userid:""
	  }
    }
	if (!JSON.parse(localStorage.getItem("user"))){
		localStorage.setItem("user", JSON.stringify(this.state));
	}
  }

  render(){

    return (
      <Router>
        <div>
          <Route exact path='/' component={Home} />
		  <Route path='/login' render={props => <Login user={this.state.user} />} />
		  <Route path='/contact' component={Contact} />
		  <Route path='/dashboard' render={props => <Dashboard user={this.state.user}/>} />

        </div>
      </Router>
    );
	}

}
export default App;
