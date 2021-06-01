import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Header from './Header';

async function loginUser(credentials) {
 return fetch('http://localhost:8082/login', {
   method: 'POST',
   headers: {
     'Content-Type': 'application/json'
   },
   body: JSON.stringify(credentials)
 })
 .then(data => data.json())

}

function Login(props) {
	const history = useHistory();
	const [username, setUserName] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async e => {
    e.preventDefault();

	//response got from the server
   const res= await loginUser({
      username,
      password
    });
	console.log("login->",res)
	if (res['token'] === 'success'){
		props.user.username = res['username'];
		props.user.fname = res['fname'];
		props.user.lname = res['lname'];
		props.user.role = res['role'];
		props.user.userid = res['userid'];
		localStorage.setItem("user", JSON.stringify(props));
		history.push("/dashboard");
	}
	else{
		alert("Login Failed..!");
		history.push("/login");
	}
  }


  return (
  <div>
  <Header />
  <div style={{width:"400px", margin:'auto', marginTop:'100px'}}>
	<form onSubmit={handleSubmit}>

		<h3>Log in</h3><br />

		<div className="form-group">
			<label>Username</label>
			<input type="text" onChange={e => setUserName(e.target.value)} className="form-control" placeholder="Enter Username" />
		</div><br />

		<div className="form-group">
			<label>Password</label>
			<input type="password" onChange={e => setPassword(e.target.value)}  className="form-control" placeholder="Enter password" />
		</div><br />

		<div className="form-group">
			<div className="custom-control custom-checkbox">
				<input type="checkbox" className="custom-control-input" id="customCheck1" />
				<label className="custom-control-label" htmlFor="customCheck1" style={{paddingLeft:'20px'}}>Remember me</label>
			</div>
		</div>
		<button type="submit" className="btn btn-dark btn-lg btn-block" >Sign in</button>
		<p className="forgot-password text-right" style={{paddingTop:'10px'}}>
			<a href="/"> Forgot password?</a>
		</p>
	</form>
</div>

  </div>
  );
}
/*
Login.propTypes = {
	setToken : PropTypes.func.isRequired
}*/

export default Login;
