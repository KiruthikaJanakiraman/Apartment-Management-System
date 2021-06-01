import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import dateFormat from 'dateformat';
import Button from 'react-bootstrap/Button';

import Header from './Header';

class MyEvents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myevents: []
    };
  }

  componentDidMount() {
  	var data = {user: this.props.user.userid}
	axios({
	  method: 'post',
	  url: 'myevents',
	  baseURL: 'http://localhost:8082/',
	  data: data
	}).then(res => {
		this.setState({
		  myevents: res.data
		})
	  })
	  .catch(err =>{
		console.log('Error from MyEvents');
	  });

  };


  render() {
    const myevents = this.state.myevents;

    let myeventList;
    let myActive=[], myCancelled=[], myCompleted=[];

    if(myevents.length === 0) {
      myeventList = <h1 style={{color : 'gray', width:'fit-content', marginTop:'20%'}}>There are no events to show..!</h1>;
    } else {

      myevents.forEach(function (event, index) {
          if(event.event_status === 'active')
            myActive.push(event)
          else if (event.event_status === 'cancelled') {
            myCancelled.push(event)
          }
          else{
            myCompleted.push(event)
          }
      });
      myeventList = <div><br /><br />
      <h3>Active Events</h3>
      <div className="list">
      {myActive.map((myevent, k) =>
          <MyEventCard user={this.props.user} myevent={myevent} key={k} />
      )}</div><br /><br />
        <h3>Completed Events</h3>
        <div className="list">
        {myCompleted.map((myevent, k) =>
          <MyEventCard user={this.props.user} myevent={myevent} key={k} />
        )}</div><br /><br />
        <h3>Cancelled Events</h3>
        <div className="list">
        {myCancelled.map((myevent, k) =>
          <MyEventCard user={this.props.user} myevent={myevent} key={k} />
        )}</div><br /><br />
      </div>


    }
    const backbtn = ()=>{
      window.location.replace('/dashboard/event')
    }
    return (
    	<Router>
    	<Route exact path='/dashboard/event/myevents'>
		<div>
	    	<Header />
	    	<div style = {{marginTop: '100px'}}>
        <center><h1>My Events</h1></center>
        <Button style={{ float:'left', fontSize:'18px',marginLeft : '10%'}} variant="warning" onClick={backbtn}><b>&larr; Back</b></Button>
        <br />
		      <div className="ShowEventList" style={{margin: 'auto', width: 'fit-content'}}>
		                {myeventList}
			  	</div>

			</div>
		</div>
		</Route>
		</Router>
    );
  }
}


function MyEventCard(props){
  let trash ;
  if(props.myevent.event_status === 'active')
    trash = <button className = "trash" style={{border :'0', float : 'right'}} onClick={()=>{handleDelete(props.myevent)}}>
              <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
              </svg>
            </button>
  else
    trash =""
  function handleDelete(myevent) {
    console.log("deleted",myevent)
    const option = window.confirm("Are you sure you wanna Cancel Event : "+props.myevent.event_name+" ?")

    if(option){
      axios({
  		  method: 'post',
  		  url: 'myevents/delete',
  		  baseURL: 'http://localhost:8082/',
  		  data: {
          event_id : props.myevent.event_id
        }
  		}).then(res => {
  			if(res.data === "Success")
  				alert("Event Cancelled successfully!")
  				window.location.reload();

  		  })
  		  .catch(err =>{
  			console.log('Error from Event');
  		  });
    }
  }


	return (
	<Card className="w3-card-4" style={{ width: '18rem', marginTop:'20px', fontSize:'130%', color:'black', padding:'15px', backgroundColor: '#f7e6ff'}}>

		<Card.Title style={{textAlign: 'center', fontSize:'120%', color:'black'}}>{props.myevent.event_name}</Card.Title>
		<hr style={{height:'4px'}}/>
		<Card.Text>
			Host : {props.myevent.host_fname+" "+props.myevent.host_lname}<br />
			Date : {dateFormat(props.myevent.event_date, "mmmm dS, yyyy")}<br />
			Time : {props.myevent.event_time}<br />
			Venue : {props.myevent.event_venue}<br />
      Status : {props.myevent.event_status}<br />
      {trash}

		</Card.Text>

	</Card>
	)
}
export default MyEvents;
