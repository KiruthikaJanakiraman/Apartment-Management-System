import React, { Component } from 'react';
import axios from 'axios';
import ServiceCard from './Cards';

class ShowServiceList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      services: []
    };
  }

  componentDidMount() {
	axios({
	  method: 'post',
	  url: 'services',
	  baseURL: 'http://localhost:8082/',
	  data: {
		role : this.props.role
	  }
	}).then(res => {
		this.setState({
		  services: res.data
		})
	  })
	  .catch(err =>{
		console.log('Error from ShowServiceList');
	  });

  };


  render() {
    const services = this.state.services;
    let serviceList;

    if(!services) {
      serviceList = "there is no service record!";
    } else {
      serviceList = services.map((service, k) =>
        <ServiceCard service={service} key={k} />
      );
    }

    return (
      <div className="ShowServiceList">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <br />
              <h2 className="display-4 text-center">Services List</h2>
            </div>
          <div className="list " style={{margin :"auto"}}>
                {serviceList}
          </div>
        </div>
      </div>
	   </div>
    );
  }
}

export default ShowServiceList;
