import React, { Component } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import dateFormat from 'dateformat';

import Header from './Header';


class Event extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: []
    };
  }

  componentDidMount() {
	axios({
	  method: 'get',
	  url: 'events',
	  baseURL: 'http://localhost:8082/',
	}).then(res => {
		this.setState({
		  events: res.data
		})
	  })
	  .catch(err =>{
		console.log('Error from Event');
	  });

  };


  render() {
    const events = this.state.events;
    let eventList;

    if(!events) {
      eventList = "there is no event record!";
    } else {
      eventList = events.map((event, k) =>
        <EventCard user={this.props.user} event={event} key={k} />
      );
    }

    return (
		<div>
	    	<Header />
	    	<div style = {{marginTop: '100px'}}>
	      	<div className="ShowEventList" style={{marginLeft: '5%', width: 'fit-content'}}>
	      		<h1 style={{textAlign:'center', margin:'auto', display:'inline-block'}}>Events</h1>
						<Button style={{display:'inline-block', float:'right', fontSize:'18px'}} onClick={() => window.location.replace("/dashboard/event/myevents")} variant="primary">
            My Events</Button>
	          	<div className="list">
	                {eventList}
	          	</div>
			  	</div>
			  		<PostEvent user={this.props.user}/>
			   </div>
		</div>
    );
  }
}


function EventCard(props){
	return (
	<Card style={{ width: '18rem', marginTop:'20px', fontSize:'130%', color:'black', padding:'15px', backgroundColor: '#f7e6ff'}}>

		<Card.Title style={{textAlign: 'center', fontSize:'120%', color:'black'}}>{props.event.event_name}</Card.Title>
		<hr style={{height:'4px'}}/>
		<Card.Text>
			Host: {props.event.host_fname+" "+props.event.host_lname}<br />
			Date: {dateFormat(props.event.event_date, "mmmm dS, yyyy")}<br />
			Time: {props.event.event_time}<br />
			Venue: {props.event.event_venue}<br />
		</Card.Text>

	</Card>
	)
}

function PostEvent(props){
	const handleSubmit = async e =>{
		e.preventDefault();

		var data = {
			event_name: document.getElementById("ename").value,
			event_date: document.getElementById("edate").value,
			event_time: document.getElementById("etime").value,
			event_venue: document.getElementById("evenue").value,
			user: props.user.userid
		}

		//console.log("Data: ",data)

		axios({
		  method: 'post',
		  url: 'postevent',
		  baseURL: 'http://localhost:8082/',
		  data: data
		}).then(res => {
			if(res.data === "Success")
				alert("Event posted successfully!")
				window.location.reload();

		  })
		  .catch(err =>{
			console.log('Error from Event');
		  });

		//const history = useHistory();
		//history.push("/dashboard/event")

   		var frm = document.getElementsByName('post-event')[0];
   		frm.reset();
	}

  var today = new Date();
  today.setDate(today.getDate() + 1)
  var mindate = today.getFullYear()+'-'+String(today.getMonth() + 1).padStart(2, '0')+'-'+String(today.getDate()).padStart(2, '0');
  console.log(mindate);
		return(
		<div className="postEvent">
			<h1 style={{color:'white'}}><center>Post Event</center></h1>
			<form name="post-event" onSubmit = {handleSubmit}>
				<label>Event name : </label><br /><input className="form-control" type="text" id="ename" name="ename" required/>
				<label>Date : </label><br /><input className="form-control" type="date" id="edate" min={mindate} name="edate" required/>
				<label>Time : </label><br /><input className="form-control" type="time" id="etime" name="etime" required/>
				<label>Venue : </label><br /><input className="form-control" type="text" id="evenue" name="evenue" required/>
				<center><input type="submit" className="btn btn-lg btn-primary bg-gradient font-base order-0" value="Post Event" style={{marginTop : '20px', backgroundColor: 'white', color:'purple'}} id="postSubmit"/></center>
			</form>
		</div>
		)
}

export default Event;
