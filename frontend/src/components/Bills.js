import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import axios from 'axios';
import Card from 'react-bootstrap/Card';

import Header from './Header';

class Bills extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bills: []
    };
  }

  componentDidMount() {
  	var data = {user: this.props.user.userid}
	axios({
	  method: 'post',
	  url: 'bills',
	  baseURL: 'http://localhost:8082/',
	  data: data
	}).then(res => {
		this.setState({
		  bills: res.data
		})
	  })
	  .catch(err =>{
		console.log('Error from Bills');
	  });
  };

  render() {
    const bills = this.state.bills;
    let billList;

    if(bills.length === 0) {
      billList = "No Bills to Display!";
    } else {
      billList = bills.map((bill, k) =>
        <BillCard user={this.props.user} bill={bill} key={k} />
      );
    }

    return (
    <Router>
    <Route exact path='/dashboard/bills'>
		<div>
	    	<Header />
	    	<div style = {{marginTop: '100px'}}>

		      <div className="ShowEventList" style={{margin: 'auto', width: 'fit-content'}}>

		      		<center><h1>Bill Management</h1></center>
		          <div className="list">
		                {billList}
		          </div>
			  	</div>
        </div>
		</div>
		</Route>

    </Router>
    );
  }
}

function BillCard(props){
  var wcost=0, gcost=0, ecost=0, maint=0, total;
  var water=props.bill.water;
  var gas=props.bill.gas;
  var electricity=props.bill.electricity;
  var area = props.bill.area;

  //water bill calculation
  if(water === 0)
    wcost=0;
  else if(water<=10)
    wcost = water*4;
  else if(water<=15)
    wcost = 10*4 + (water-10)*16;
  else if(water<=25)
    wcost = 10*4 + 5*16 + (water-15)*24;
  else{
    wcost = 10*4 + 5*16 + 10*24 + (water-25)*40;
  }

  //gas bill calculation
  var rate = 825
  gcost = gas * rate;

  //electricity bill calculation
  if(electricity <= 100)
      ecost=0;
  else if(electricity<=200)
      ecost = (electricity-100)*1.5;
  else if(electricity<=500)
      ecost = 100*2 + (electricity-200)*3;
  else
      ecost = 100*3.5 + 300*4.6 + (electricity-500)*6.6;

  maint = area * 3;
  total = wcost + gcost + ecost + maint;

	return (
	<Card style={{ width: '22rem', marginTop:'20px', fontSize:'130%', color:'black', padding:'15px', backgroundColor: '#f7e6ff'}}>

		<Card.Title style={{textAlign: 'center', fontSize:'120%', color:'black'}}>Flat {props.bill.flat_no}</Card.Title>
		<hr style={{height:'4px'}}/><br/>
		<Card.Text>
      <table>
        <tr >
          <th className='left'>Utility</th>
          <th>Units</th>
          <th>Cost</th>
        </tr>
        <tr >
          <td className='left'>Water(kL)</td>
          <td>{water}</td>
          <td>{wcost}</td>
        </tr>
        <tr >
          <td className='left'>Gas(cylinder)</td>
          <td>{gas}</td>
          <td>{gcost}</td>
        </tr>
        <tr >
          <td className='left'>Electricity</td>
          <td>{electricity}</td>
          <td>{ecost}</td>
        </tr><br />
        <tr>
          <td className='left'>Maintenance Charge</td>
          <td>{}</td>
          <td>{maint}</td>
        </tr><br />
        <tr >
          <td className='left'><b>Total Bill</b></td>
          <td>{}</td>
          <td>Rs. {total}</td>
        </tr>

      </table>
		</Card.Text>

	</Card>
	)
}
export default Bills;
