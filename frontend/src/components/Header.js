import React from "react";
import { useHistory} from 'react-router-dom';

function Header() {
	const history = useHistory();
	const user = JSON.parse(localStorage.getItem("user"));
	var log = "Login";
	var home = "Home";
	var opLink ="/";
	//console.log(!user,!user || user.username.length === 0)
	if(user && user.user.username !== ""){
		log = "Logout";
		home = "Dashboard";
		opLink ="/dashboard";
	}

	var profile = "";
	if(log === 'Logout')
	{
		profile = <span id="profile" style={{margin:'20px', fontFamily:"Segoe UI", fontSize:'120%', fontWeight:'bold'	, color:'indigo'}}>{user.user.fname}</span>
	}

	function logHandler(){
		if(log === 'Login'){
			history.push("/login");
		}else{
			localStorage.removeItem('user');
			alert("Logout Successful");
			//history.push("/");
			window.location.replace("/");
		}
	}
  return (
  <div>
    <nav className="navbar navbar-expand-lg navbar-light fixed-top py-3 backdrop" data-navbar-on-scroll="data-navbar-on-scroll">
        <div className="container"><a className="navbar-brand d-flex align-items-center fw-semi-bold fs-3" href="/"> <img className="me-3" src="images/gallery/logo.png" alt="" />
            <div className="text-primary font-base">Housera</div>
          </a>
          <button className="navbar-toggler collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button>
          <div className="collapse navbar-collapse border-top border-lg-0 mt-4 mt-lg-0" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto pt-2 pt-lg-0 font-base" >
              <li className="nav-item" style={{marginRight:'15px', fontSize:'120%'}}><a className="nav-link fw-medium active" aria-current="page" href={opLink}>{home}</a></li>
              <li className="nav-item" style={{marginRight:'25px', fontSize:'120%'}}><a className="nav-link"  href="/contact">Contact Us</a></li>

            </ul>
            <button className="btn btn-lg btn-primary rounded-pill bg-gradient font-base order-0" onClick ={logHandler} type="submit">{log}</button>
						{profile}
          </div>
        </div>
    </nav>
	</div>
  );
}

export default Header;
