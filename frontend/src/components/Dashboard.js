import React from "react";
import { BrowserRouter as Router, Route,Switch } from 'react-router-dom';
import {Redirect} from 'react-router-dom';

import Header from './Header';
import Footer from './Footer';
import Event from './Event'
import ShowServiceList from './ShowServiceList.js';
import Property from './Property';
import Ledger from './Ledger';
import AddEntry from './AddEntry';
import Bills from './Bills';
import MyEvents from './MyEvents';
import {Complaints,PostComp,ResolveComp} from './Complaints.js';
import {Housekeeping,RequestHousekeeping} from './Housekeeping.js';

function Dashboard(props) {

	if (!props.user.username){
		return <Redirect
		to="/login"
		/>;
	}else{
		const role = props.user.role
		const id=props.user.userid
		return(
			<Router>
			<Switch>
				<Route exact path='/'><Redirect to="/" /></Route>
				<Route exact path='/dashboard'>
					<div>
						<Header />
						<div style = {{margin: '10%'}}>
							<h1>Welcome back {props.user.fname + " " + props.user.lname} !</h1>
							<br />
							<ShowServiceList role={role} />
						</div>
						<Footer />
					</div>
				</ Route>
				<Route exact path="/dashboard/event/myevents">
					<MyEvents user={props.user}/>
				</Route>

				<Route exact path='/dashboard/event'>
					<Event user={props.user}/>
				</ Route>

				<Route path='/dashboard/property'>
					<Property user={props.user}/>
				</ Route>

				<Route exact path='/dashboard/ledger/add'>
					<AddEntry user={props.user}/>
				</ Route>

				<Route exact path='/dashboard/ledger'>
					<Ledger user={props.user}/>
				</ Route>

				<Route path='/dashboard/bills'>
					<Bills user={props.user}/>
			  </ Route>

				<Route path='/dashboard/complaint'>
					<div className="complaintLedger" >
						<Header />
						<Complaints  role={role} id={id} />
						<PostComp userid={id}/>
					</div>
				</Route>

				<Route path='/complaint/resolve/:id' component={(props)=>(	<div  ><Header /><div style = {{marginTop: '100px'}}>
					<center><h1>Resolve Complaints!</h1></center></div>

					<ResolveComp {...props} className="resolvecomplaint"/><br/><br/></div>
				)}>
				</Route>

				<Route path='/dashboard/housekeeping'>
					<div className="complaintLedger" >
						<Header />
						<Housekeeping  role={role} id={id} /><br/><br/>
					</div>
				</Route>

				<Route path='/housekeeping/request/:uid/:sid' component={(props)=>(	<div  ><Header /><div style = {{margin: '100px'}}>
				</div>
					<RequestHousekeeping {...props} id={id} role={role} className="resolvecomplaint"/><br/></div>
				)}>
				</Route>

			</Switch>
			</Router>
		)
	}
}

export default Dashboard;
