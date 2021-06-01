import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import Header from './Header';

class MyProps extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myprops: [],
      myads: []
    };
  }

  componentDidMount() {
  	var data = {user: this.props.user.userid}
	axios({
	  method: 'post',
	  url: 'myprops',
	  baseURL: 'http://localhost:8082/',
	  data: data
	}).then(res => {
		this.setState({
		  myprops: res.data[0],
      myads: res.data[1]
		})
	  })
	  .catch(err =>{
		console.log('Error from MyProps');
	  });
  };



  render() {
    const backbtn = ()=>{
      window.location.replace('/dashboard/property')
    }

    var myprops = this.state.myprops;
    var myads = this.state.myads;
    let mypropsList, myadsList;
    if(myprops.length === 0) {
      mypropsList = <h1>"No property to display!";</h1>
    } else {
      mypropsList = myprops.map((myprop, k) =>
        <MyPropCard user={this.props.user} myprop={myprop} key={k} />
      );
    }

    if(myads.length === 0) {
      myadsList = <center><h2>No advertisement to display!</h2></center>
    } else {
      myadsList = myads.map((myad, k) =>
        <MyAdCard user={this.props.user} myad={myad} key={k} />
      );
    }

    return (
    	<Router>
    	<Route exact path='/dashboard/property/myprops'>
  		<div>
  	    	<Header />
  	    	<div style = {{marginTop: '100px'}}>
          <Button style={{ float:'left', fontSize:'18px',marginLeft : '10%'}} variant="warning" onClick={backbtn}><b>&larr; Back</b></Button>
          <br />
  		      <div className="ShowEventList" style={{margin: 'auto', width: 'fit-content'}}>
                <center><h1>My Advertisements</h1></center>
                  <div className="list">
  		                {myadsList}
  		          	</div>
                  <br /><hr style={{height:'3px', backgroundColor:'black'}}/><br />
                <center><h1>My Properties</h1></center>
  		          	<div className="list">
  		                {mypropsList}
  		          	</div>
  			  	 </div>
          </div><br/><br/>
  		</div>
		</Route>

		</Router>
    );
  }
}

function MyAdCard(props){
  var stat;
    if(props.myad.status === "sale")
    	stat = "For Sale";
    else if(props.myad.status === "rent")
    	stat = "For Rent";
    else
      stat = "Not for Sale/Rent"

    let trash;
    trash = <button className = "trash" style={{border :'0', float : 'right'}} onClick={()=>{handleDelete(props.myad)}}>
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                  <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                </svg>
              </button>

    function handleDelete(myad) {
      console.log("deleted",myad)
      const option = window.confirm("Are you sure you wanna delete ad for flat "+props.myad.flatno+" ?")

      if(option){
        axios({
    		  method: 'post',
    		  url: 'myads/delete',
    		  baseURL: 'http://localhost:8082/',
    		  data: {
            flatid : props.myad.flatid
          }
    		}).then(res => {
    			if(res.data === "Success")
    				alert("Ad Removed successfully!")
    				window.location.reload();
    		  })
    		  .catch(err =>{
    			console.log('Error from myad delete');
    		  });
      }
    }

	return (
    <Card style={{ width: '18rem', marginTop:'20px', fontSize:'130%', color:'black', padding:'15px', backgroundColor: '#f7e6ff'}}>

  		<Card.Title style={{textAlign: 'center', fontSize:'120%', color:'black'}}>{stat}</Card.Title>
  		<hr style={{height:'4px'}}/>
  		<Card.Text>
  			Flat: {props.myad.flatno}<br />
  			Block: {props.myad.blockno}<br />
  			Owner: {props.myad.owner_fname+" "+props.myad.owner_lname}<br />
        Description: {props.myad.bhk+"BHK "+props.myad.sqft+"sqft"}<br />
        {trash}
  		</Card.Text>
  	</Card>
	)
}

function MyPropCard(props){
  var stat;
    if(props.myprop.status === "sale")
    	stat = "For Sale";
    else if(props.myprop.status === "rent")
    	stat = "For Rent";
    else
      stat = "Not for Sale/Rent"

  let sell;
  let rent;
  if(!(props.myprop.status === "sale" || props.myprop.status === "rent"))
  {
    sell = <button className="btn btn-lg btn-primary bg-gradient font-base order-0" onClick={()=>{handleSell(props.myad)}}>Sell</button>;
    rent = <button className="btn btn-lg btn-primary bg-gradient font-base order-0" onClick={()=>{handleRent(props.myad)}} style={{float:'right'}}>Rent</button>;
  }

  else
  {
    sell = "";
    rent = "";
  }
  function handleSell(myprop) {
    console.log("posted for sale",myprop)
    const option = window.confirm("Post flat "+props.myprop.flatno+" for sale?")

    if(option){
      axios({
        method: 'post',
        url: 'myprops/sell',
        baseURL: 'http://localhost:8082/',
        data: {
          flatid : props.myprop.flatid
        }
      }).then(res => {
        if(res.data === "Success")
          alert("Flat posted for sale!")
          window.location.reload();
        })
        .catch(err =>{
        console.log('Error from myprops sell');
        });
    }
  }

  function handleRent(myprop) {
    console.log("posted for rent",myprop)
    const option = window.confirm("Post flat "+props.myprop.flatno+" for rent?")

    if(option){
      axios({
        method: 'post',
        url: 'myprops/rent',
        baseURL: 'http://localhost:8082/',
        data: {
          flatid : props.myprop.flatid
        }
      }).then(res => {
        if(res.data === "Success")
          alert("Flat Posted for Rent!")
          window.location.reload();
        })
        .catch(err =>{
        console.log('Error from myprops rent!');
        });
    }
  }

	return (
    <Card style={{ width: '18rem', marginTop:'20px', fontSize:'130%', color:'black', padding:'15px', backgroundColor: '#f7e6ff'}}>

  		<Card.Title style={{textAlign: 'center', fontSize:'120%', color:'black'}}>{stat}</Card.Title>
  		<hr style={{height:'4px'}}/>
  		<Card.Text>
  			Flat: {props.myprop.flatno}<br />
  			Block: {props.myprop.blockno}<br />
  			Owner: {props.myprop.owner_fname+" "+props.myprop.owner_lname}<br />
        Description: {props.myprop.bhk+"BHK "+props.myprop.sqft+"sqft"}<br />
        <br />
        {sell}
        {rent}
  		</Card.Text>

  	</Card>
	)
}
export default MyProps;
