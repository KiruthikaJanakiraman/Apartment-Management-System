import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const service ={
	"Events" :{
		link : "/dashboard/event",
		btn : "Events"
	},
	"Property Management" :{
		link : "/dashboard/property",
		btn : "Events"
	},
	"Complaint forum" :{
		link : "/dashboard/complaint",
		btn : "Events"
	},
	"Bill Management" :{
		link : "/dashboard/bills",
		btn : "Events"
	},
	"Clubhouse Facilities" :{
		link : "/dashboard/",
		btn : "Events"
	},
	"Housekeeping" :{
		link : "/dashboard/housekeeping",
		btn : "Events"
	},
	"Security Ledger" :{
		link : "/dashboard/ledger",
		btn : "Events"
	}
}
function ServiceCard(props){
	return (
		<Card style={{ width: '18rem', textAlign:'center', marginTop:'20px'}}>
		  <Card.Img variant="top" style={{width:"100px",margin:"auto",marginTop:'10px'}}src={"images/gallery/"+ props.service.service_name+".png"}/>
		  <Card.Body>
			<Card.Title>{props.service.service_name}</Card.Title>
			<Card.Text> {props.service.service_desc}
			</Card.Text>
			<Link to= {service[props.service.service_name].link}>
				<Button variant="primary">Click Here</Button>
			</Link>
		  </Card.Body>
		</Card>
	)
}

function ComplaintsCard(props){
	const id=String(props.complaints.complaintid);
	var path='/complaint/resolve/'+id;

	if(props.role==='association' && props.complaints.action){
		return (
			<Card className="special-card" style={{ width: '18rem', textAlign:'left', marginTop:'20px'}}>
			  <Card.Body>
				<div className="card-header" ><Card.Title>{props.complaints.complaint}</Card.Title></div><br/>
				<Card.Text>  ComplaintID: {props.complaints.complaintid}
				</Card.Text>
				<Card.Text>  Complainee: {props.complaints.username}
				</Card.Text>
				<Card.Text>  Flat NO.: {props.complaints.flatno}</Card.Text>
				<Card.Text>  Action: {props.complaints.action}
				</Card.Text>
			  </Card.Body>
			</Card>
		)
	}
	else if(props.role==='association' ){
		return (
			<Card  style={{ width: '18rem', textAlign:'left', marginTop:'20px'}}>
				<Card.Body>
				<div className="card-header" ><Card.Title>{props.complaints.complaint}</Card.Title></div><br/>
				<Card.Text>  ComplaintID : {props.complaints.complaintid}	</Card.Text>
				<Card.Text>  Complainee : {props.complaints.username}</Card.Text>
				<Card.Text>  Flat No.: {props.complaints.flatno} </Card.Text>
				<Card.Text>  Status : Pending</Card.Text>
				<center><Link to={path}><Button variant="primary">Resolve</Button></Link></center>
				</Card.Body>
			</Card>
		)
	}
	return (
	<Card style={{ width: '18rem', textAlign:'center', marginTop:'20px'}}>
		<Card.Body>
		<Card.Title>{props.complaints.complaint}</Card.Title>
		<Card.Text>  {props.complaints.complaintid}
		</Card.Text>
		</Card.Body>
	</Card>
	)
}


function HousekeepingCard(props){
	const sid=String(props.servants.servantid);
	const uid=String(props.id);
	var path='/housekeeping/request/'+uid+"/"+sid;

	if( props.servants.status ==='available' && props.role!=='housekeeping'){
		return (
		<Card  style={{ width: '18rem', textAlign:'left', marginTop:'20px'}}>
		  <Card.Body>
			<div className="card-header" ><Card.Title>{props.servants.work}</Card.Title></div><br/>
			<Card.Text>  Name: {props.servants.first_name}
			</Card.Text>
	   	<center><Link to={path}><Button variant="primary">Request</Button></Link></center>
			{console.log(props.servants.servantid)}
		  </Card.Body>
		</Card>
		)
	}
	return (
	<Card  style={{ width: '18rem', textAlign:'left', marginTop:'20px'}}>
		<Card.Body>
		<div className="card-header " ><Card.Title>{props.servants.work}</Card.Title></div><br/>
		<Card.Text>  Name: {props.servants.first_name}
		</Card.Text>
		</Card.Body>
	</Card>
	)
}

export default ServiceCard;
export {ComplaintsCard,HousekeepingCard};
