import React from 'react';
import axios from 'axios';
import {Row, Col} from "react-bootstrap";
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

import Header from './Header';

function AddEntry(){
  return(
    <div>
      <Header />
      <div style={{marginTop:'95px'}}>
        <center><h1>Add Entries</h1></center>
        <Link to= "/dashboard/ledger/">
        <Button style={{ float:'left', fontSize:'18px',marginLeft : '10%'}} variant="warning"><b>&larr; Back</b></Button>
        </Link><br /><br /><br />
        <div className='addEntry' style={{margin :'auto', width : '60%'}}>
          <Row>
            <Col style ={{marginRight: '15px'}}><AddVisitor /></Col>
            <Col style ={{marginLeft: '15px'}}><AddVehicle /></Col>
          </Row>
        </div>
      </div>
    </div>
  )
}
function AddVisitor(){
  const handleSubmit = async e =>{
    e.preventDefault();
    console.log("visitor submittedd..");

    var data = {
			fname: document.getElementById("visitfname").value,
      lname: document.getElementById("visitlname").value,
      mobile: document.getElementById("visitmobile").value,
      temp: document.getElementById("temp").value,
			visit_date: document.getElementById("visitdate").value,
			visit_time: document.getElementById("visittime").value,
			herefor: document.getElementById("herefor").value,
		}

		axios({
		  method: 'post',
		  url: 'addvisitor',
		  baseURL: 'http://localhost:8082/',
		  data: data
		}).then(res => {
			if(res.data === "Success")
				alert("Visitor added successfully!")
		  })
		  .catch(err =>{
			console.log('Error from add visitor');
		  });

   		var frm = document.getElementsByName('addVisitor')[0];
   		frm.reset();
  }
  var today = new Date();
  var maxdate = today.getFullYear()+'-'+String(today.getMonth() + 1).padStart(2, '0')+'-'+String(today.getDate()).padStart(2, '0');

  return(
    <div className="addVisitor">
			<h1 style={{color:'purple'}}><center>Add Visitor</center></h1>
			<form name="addVisitor" onSubmit = {handleSubmit}>
				<label>Firstname : </label><br /><input className="form-control" type="text" id="visitfname" required/>
        <label>Lastname : </label><br /><input className="form-control" type="text" id="visitlname" required/>
        <label>Mobile No. : </label><br /><input className="form-control" type="text" id="visitmobile" required/>

				<label>Date : </label><br /><input className="form-control" type="date" id="visitdate" max={maxdate} required/>
				<label>Time : </label><br /><input className="form-control" type="time" id="visittime"  required/>
        <Row><Col><label>Temperature : </label></Col><Col><label>Visiting : </label></Col></Row>
        <Row><Col><input className="form-control" type="number" step="0.01" id='temp'/></Col>
        <Col><input className="form-control" type="number" id="herefor" required/></Col></Row>
				<center><input type="submit" className="btn btn-lg btn-primary bg-gradient font-base order-0" value="Add Visitor" style={{marginTop : '20px', backgroundColor: 'white', color:'purple'}} id="Submit"/></center>
			</form>
		</div>
  )
}
function AddVehicle(){
  const handleSubmit = async e =>{
    e.preventDefault();
    console.log("vehicle submittedd..");

    var data = {
			dname: document.getElementById("dname").value,
      vno: document.getElementById("vno").value,
      mobile: document.getElementById("dmobile").value,
			visit_date: document.getElementById("visit_date").value,
			visit_time: document.getElementById("visit_time").value,
			herefor: document.getElementById("herefor1").value,
		}

		axios({
		  method: 'post',
		  url: 'addvehicle',
		  baseURL: 'http://localhost:8082/',
		  data: data
		}).then(res => {
			if(res.data === "Success")
				alert("Vehicle added successfully!")
		  })
		  .catch(err =>{
			console.log('Error from add visitor');
		  });

   		var frm = document.getElementsByName('addVehicle')[0];
   		frm.reset();
  }
  var today = new Date();
  var maxdate = today.getFullYear()+'-'+String(today.getMonth() + 1).padStart(2, '0')+'-'+String(today.getDate()).padStart(2, '0');

  return(
    <div className="addVehicle">
			<h1 style={{color:'purple'}}><center>Add Vehicle</center></h1>
			<form name="addVehicle" onSubmit = {handleSubmit}>
      <label>Driver Name : </label><br /><input className="form-control" type="text" id="dname" required/>
      <label>Vehicle No. : </label><br /><input className="form-control" type="text" id="vno" required/>
      <label>Mobile No. : </label><br /><input className="form-control" type="text" id="dmobile" required/>
      <label>Date : </label><br /><input className="form-control" type="date" id="visit_date" max={maxdate} required/>
      <label>Time : </label><br /><input className="form-control" type="time" id="visit_time"  required/>
      <label>Visiting : </label><br /><input className="form-control" type="number" id="herefor1" required/>
      <center><input type="submit" className="btn btn-lg btn-primary bg-gradient font-base order-0" value="Add Vehicle" style={{marginTop : '20px', backgroundColor: 'white', color:'purple'}} id="postSubmit"/></center>
			</form>
		</div>
  )
}
export default AddEntry;
