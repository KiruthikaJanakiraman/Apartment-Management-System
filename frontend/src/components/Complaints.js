import React,{Component} from 'react'
import axios from 'axios';
import {ComplaintsCard} from './Cards.js'
import Header from './Header';
import Button from 'react-bootstrap/Button';

class Complaints extends Component {
  constructor(props) {
    super(props);
    this.state = {
      complaints: [],
      role:props.role
    };
  }
  componentDidMount() {
    axios({
      method: 'post',
      url: 'dashboard/complaint',
      baseURL: 'http://localhost:8082/',
      data:{
        role:this.props.role,
        id:this.props.id
      }
    }).then(res => {
      this.setState({
        complaints: res.data
      })
      })
      .catch(err =>{
      console.log('Error from Complaints.js');
      });
  }

  render() {
    const complaints = this.state.complaints;
    const role=this.state.role;
    let cList;
    if(complaints.length===0) {
      return(
      <div className="textz nothing-to-show" >  <center><img alt='image1' src="https://cdn.dribbble.com/users/45405/screenshots/2353058/gif-006-box.gif" height="500px" width="500px"/></center></div>
      )
    } else {
      cList = complaints.map((comp, k) =>
        <ComplaintsCard complaints={comp} role={role} key={k} />
      );
    }
    return (
      <div className="ShowServiceList complaintLedger label label-danger" style={{marginTop:'100px'}}>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h2 className="display-4 text-center" >Complaints Ledger</h2>
            </div>
          <div className="list " style={{margin :"auto"}}>
                {cList}
          </div>
        </div>
      </div>
     </div>
    );
  }
}
class PostComp extends Component{
  constructor(props){
    super(props);
  }

  submitHandler(event){
    event.preventDefault();
    let data = {
      complaint : document.getElementById('complaint').value,
      flatno : document.getElementById('flatno').value,
      userid : this.props.userid
    }
    axios({
      method: 'post',
      url: 'dashboard/postcomplaint',
      baseURL: 'http://localhost:8082/',
      data:data

    }).then(res => {
			if(res.data === "Success")
				alert("Complaint posted successfully!")
				window.location.reload();
		  })
  }
  render(){
    return(
      <div className="postcomplaint"><h4>Post your Complaint</h4><br/>
      <form onSubmit={this.submitHandler.bind(this)} name="postcomplaint">
      Complaint Details<br/><textarea rows="4" cols="30" name="complaint" id="complaint"/><br/><br/>
      <br/>
      Flat Number<br/><input type="text"  name="flatno" id="flatno"/><br/><br/>
      <center>  <input className="btn btn-dark btn-lg btn-block" type="submit" value="Post"/></center><br/>
      </form>
      </div>
    )
  }
}


class ResolveComp extends Component{
  constructor(props){
    super(props);
  }

  submitHandler(event){
    event.preventDefault();
    let data ={
      complaintid:this.props.match.params.id,
      action:document.getElementById('action').value
    }

    axios({
      method: 'post',
      url: 'complaint/resolve/action',
      baseURL: 'http://localhost:8082/',
      data:data
    }).then(res => {
			if(res.data === "Success"){
        alert("Update Action successfully!");
				//this.render();
        window.location.replace('/dashboard/complaint')
      }

		  })
  }

  render(){
    const backbtn = ()=>{
      window.location.replace('/dashboard/complaint')
    }
    return(
      <div >
      <Button style={{ float:'left', fontSize:'18px',marginLeft : '10%'}} variant="warning" onClick={backbtn}><b>&larr; Back</b></Button>
      <br/><br/><br/>
      <center><h4>Resolve the  Complaint</h4><br/>
      <form  className="resolvecomplaint" onSubmit={this.submitHandler.bind(this)} >
        Action Details<br/><textarea  rows='5' name="action" id="action"/><br/><br/>
        <br/>
      <center>  <input className="btn btn-dark btn-lg btn-block" type="submit" value="Done"/></center><br/>
        </form></center>
      </div>
    )
  }
}


export { Complaints, PostComp,ResolveComp};
