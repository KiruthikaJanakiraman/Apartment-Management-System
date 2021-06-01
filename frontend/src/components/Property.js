import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import './show.css';

import Header from './Header';
import MyProps from './MyProps';

class Property extends Component {
  constructor(props) {
    super(props);
    this.state = {
      properties: []
    };
  }

  componentDidMount() {
  	//var data = {user: this.props.user.userid}
	axios({
	  method: 'get',
	  url: 'property',
	  baseURL: 'http://localhost:8082/',
	  //data: data
	}).then(res => {
		this.setState({
		  properties: res.data
		})
	  })
	  .catch(err =>{
		console.log('Error from Properties');
	  });
  };

  render() {
    const properties = this.state.properties;
    let propertyList;

    if(!properties) {
      propertyList = "there is no property record!";
    } else {
      propertyList = properties.map((property, k) =>
        <PropertyCard user={this.props.user} property={property} key={k} />
      );
    }

    var mypropsbtn;
    if(this.props.user.role === "owner" || this.props.user.role === "association")
      mypropsbtn =<Link to= "/dashboard/property/myprops">
                        <Button style={{display:'inline-block', fontSize:'18px', margin:'5px'}} variant="primary">My Properties</Button>
                  </Link>;
    return (
    <Router>
    <Route exact path='/dashboard/property'>
		<div>
	    	<Header />
	    	<div style = {{marginTop: '100px'}}>

		      <div className="ShowEventList" style={{margin: 'auto', width: 'fit-content'}}>

		      		<center><h1>Property Management Portal</h1></center>
		      	  {mypropsbtn}
		          <div className="list">
		                {propertyList}
		          </div>
			  	</div>
        </div>
		</div>
		</Route>

    <Route exact path="/dashboard/property/myprops">
			<MyProps user={this.props.user}/>
		</Route>

    </Router>
    );
  }
}

function PropertyCard(props){
	var stat;
    if(props.property.status === "sale")
    	stat = "For Sale";
    else if(props.property.status === "rent")
    	stat = "For Rent";
	return (
	<Card style={{ width: '18rem', marginTop:'20px', fontSize:'130%', color:'black', padding:'15px', backgroundColor: '#f7e6ff'}}>

		<Card.Title style={{textAlign: 'center', fontSize:'120%', color:'black'}}>{stat}</Card.Title>
		<hr style={{height:'4px'}}/>
		<Card.Text>
			Flat: {props.property.flatno}<br />
			Block: {props.property.blockno}<br />
			Owner: {props.property.owner_fname+" "+props.property.owner_lname}<br />
      Description: {props.property.bhk+"BHK "+props.property.sqft+"sqft"}<br />
		</Card.Text>

	</Card>
	)
}
export default Property;
