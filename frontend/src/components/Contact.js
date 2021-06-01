import React from "react";
import axios from "axios";
import Header from './Header';


class Contact extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          name: '',
          email: '',
          subject:'',
		message: ''
		}
	}
	
	onNameChange(event) {
        this.setState({name: event.target.value})
    }

    onEmailChange(event) {
        this.setState({email: event.target.value})
    }

    onSubjectChange(event) {
        this.setState({subject: event.target.value})
    }

    onMsgChange(event) {
        this.setState({message: event.target.value})
    }
	
	 submitEmail(e){
        e.preventDefault();
        axios({
          method: "POST", 
          url:"/send", 
          data:  this.state
        }).then((response)=>{
          if (response.data.status === 'success'){
              alert("Message Sent."); 
              this.resetForm()
          }else if(response.data.status === 'fail'){
              alert("Message failed to send.")
          }
        })
}

	resetForm(){
			this.setState({name: '', email: '',subject:'', message: ''})
	}
		
  render() {
        return (
		<div>
		<Header />
            <div className="section" style={{margin:'auto',marginTop:"100px", width:"650px"}}>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="section-title">
                                <h2 className="title">Contact Us</h2>
                                <p>Let us know what you think! In order to provide better service,
                                     please do not hesitate to give us your feedback. Thank you.</p><hr/>
                                <form id="contact-form" onSubmit={this.submitEmail.bind(this)} 
                                    method="POST">
                                <div className="form-group">
                                <div className="row">
                                <div className="col-md-6">
                                    <input placeholder = "Name"  id="name" type="text" 
                                       className="form-control" required value={this.state.name} 
                                       onChange={this.onNameChange.bind(this)}/>
                                </div>
                                <div className="col-md-6">
                                    <input placeholder = "Email"  id="email" type="email"
                                      className="form-control" aria-describedby="emailHelp"
                                      required value={this.state.email} onChange=
                                      {this.onEmailChange.bind(this)}/>
                                </div>
                                </div>
                                </div><br />
                                <div className="form-group">
                                    <input placeholder = "Subject"  id="subject" type="text"
                                      className="form-control" required value={this.state.subject}
                                      onChange={this.onSubjectChange.bind(this)}/>
                                </div><br />
                                <div className="form-group">
                                    <textarea placeholder = "Message"  id="message" 
                                       className="form-control" rows="4" 
                                       required value={this.state.message}
                                       onChange= {this.onMsgChange.bind(this)}/>
                                </div><br />
                                <button type="submit" className="btn btn-dark btn-lg btn-block">Submit</button>
                                </form>
                            </div>
                        </div>

                    </div>

                </div>
            </div></div>
        );
    }
}

export default Contact;