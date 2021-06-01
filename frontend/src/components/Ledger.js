import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Row, Col} from "react-bootstrap";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import dateFormat from 'dateformat';

import Header from './Header';

class Ledger extends Component{

  constructor(props){
    super(props)

    this.state={
      visitors : [],
      vehicles : []
    }
  }

  componentDidMount(){
    axios({
  	  method: 'get',
  	  url: 'visitor',
  	  baseURL: 'http://localhost:8082/',
  	}).then(res => {
  		this.setState({
  		  visitors: res.data
  		})
  	  })
  	  .catch(err =>{
  		console.log('Error from visitor');
  	  });

      axios({
    	  method: 'get',
    	  url: 'vehicle',
    	  baseURL: 'http://localhost:8082/',
    	}).then(res => {
    		this.setState({
    		  vehicles: res.data
    		})
    	  })
    	  .catch(err =>{
    		console.log('Error from vehicle');
    	  });
  }

  render(){
    //console.log(this.state.visitors);
    let visitors = this.state.visitors;
    let vehicles = this.state.vehicles;
    let visitorList ;
    let vehicleList ;
    let btn = <Link to= "/dashboard/ledger/add">
              <Button style={{display:'inline-block', float:'right', fontSize:'18px',marginRight : '10%'}} variant="warning"><b>+ Add Entries</b></Button>
              </Link>
    if (this.props.user.role === 'association'){
      btn = ""
    }
    if(visitors.length === 0)
      visitorList = <center><h2 style={{color:'gray'}}>There is no visitor record!</h2></center>
    else
      visitorList = visitors.map((v,i)=> <VisitorCard key={i} visitor={v} />)
    if(vehicles.length === 0)
      vehicleList = <center><h2 style={{color:'gray'}}>There is no vehicle record!</h2></center>
    else {
      vehicleList = vehicles.map((v,i)=> <VehicleCard key={i} vehicle={v} />)
    }
    return(
      <div>
        <Header />
        <div style = {{marginTop: '7%', color:'black'}}>
          <center><h1>Ledger</h1></center><br />
          <h2 style={{textAlign:'center', margin:'auto', marginLeft: '9%', display:'inline-block'}}>Visitors</h2>
          {btn}<br /><br />
          <div className="record" style={{margin:'auto', width:'85%', fontSize:'25px'}}>
          <Card className="w3-card-4" style={{backgroundColor:'#600970', color:'white'}} >
          <Row style={{padding:'15px 10px'}} >
          <Col>Visitor Name</Col>
          <Col>Mobile No.</Col>
          <Col>Temperature</Col>
          <Col>Date</Col>
          <Col>Time</Col>
          <Col>Visited</Col>
          </Row>
          </Card></div><br/>
          <div className="record" style={{margin:'auto', width:'85%', fontSize:'22px'}}>
          {visitorList}</div>
          <br />
          <br />
          <h2 style={{marginLeft : '7%'}}>Vehicles</h2><br />
          <div className="record" style={{margin:'auto', width:'85%', fontSize:'25px'}}>
          <Card className="w3-card-4" style={{backgroundColor:'#600970', color:'white'}} >
          <Row style={{padding:'15px 10px'}} >
          <Col>Driver Name</Col>
          <Col>Vehicle No.</Col>
          <Col>Driver no.</Col>
          <Col>Date</Col>
          <Col>Time</Col>
          <Col>Visited</Col>
          </Row>
          </Card></div><br/>
          <div className="record" style={{margin:'auto', width:'85%', fontSize:'22px'}}>
          {vehicleList}</div>
        </div>
        <br />
        <br />
      </div>
    )
  }
}

function VisitorCard(props){

  return(
    <Card className="w3-card-4" style={{marginBottom :'5px'}}>
    <Row style={{padding:'15px 10px'}} >
    <Col>{props.visitor.first_name + " "+props.visitor.last_name}</Col>
    <Col>{props.visitor.mobile}</Col>
    <Col>{props.visitor.temperature} °F</Col>
    <Col>{dateFormat(props.visitor.visit_date, "mmm dS, yyyy")}</Col>
    <Col>{props.visitor.visit_time}</Col>
    <Col>{props.visitor.fname + " "+props.visitor.lname}</Col>
    </Row>
    </Card>
);
}

function VehicleCard(props){

  return(
    <Card className="w3-card-4" style={{marginBottom :'5px'}}>
    <Row style={{padding:'15px 10px'}} >
    <Col>{props.vehicle.drivername}</Col>
    <Col>{props.vehicle.vehicleno}</Col>
    <Col>{props.vehicle.driverno}</Col>
    <Col>{dateFormat(props.vehicle.visit_date, "mmm dS, yyyy")}</Col>
    <Col>{props.vehicle.visit_time}</Col>
    <Col>{props.vehicle.first_name + " "+props.vehicle.last_name}</Col>
    </Row>
    </Card>
);
}
export default Ledger;
