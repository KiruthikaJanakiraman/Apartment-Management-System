import React from "react";

function Body() {
  return (
	<div>
		<section className="py-0" id="home">
			<div className="bg-holder d-none d-md-block" style={{backgroundImage:"url(../images/illustrations/hero-section.png)",backgroundPosition:'right bottom',backgroundSize:'contain'}}>
			</div>

<div className="bg-holder d-block d-md-none" style={{backgroundImage:"url(../images/illustrations/hero-bg.png)",backgroundPosition:'right top',backgroundSize:'contain'}}>
			</div>

			<div className="container">
				<div className="row align-items-center min-vh-md-75">
					<div className="col-md-7 col-lg-6 py-6 text-sm-start text-center">
					<h1 className="mt-6 mb-sm-4 display-4 fw-semi-bold lh-sm fs-4 fs-lg-6 fs-xxl-7">A community friendly, <br className="d-block d-lg-none d-xl-block" />Apartment Management System</h1>
					<p className="mb-4 fs-1">A one stop portal for managing your society </p>
						<div className="pt-3">
						<form>
							<div className="input-group w-xl-75 w-xxl-50 d-flex flex-end-center">
								<input className="form-control rounded-pill border-0 font-base" id="formGroupExampleInput" type="text" placeholder="Search services, flats, keywords" /><img className="input-box-icon me-3" src="../images/illustrations/search.png" width="18" alt="" />
							</div>
						</form>
						</div>
					</div>
				</div>
			</div>
		</section>


		<div className="container">
		  <div className="row justify-content-center">
			<div className="col-auto mb-5 mb-md-7">
			  <h1 className="fw-semi-bold text-warning">Our <span className="text-1100">services</span></h1>
			</div>
		  </div>
		  <div className="row">
			<div className="col-sm-6 col-lg-3 mb-4 mb-lg-0 text-center">
			  <div className="px-0 px-lg-3"><img className="img-fluid mb-4" src='../images/gallery/Property Management.png' width="100" alt="..." />
				<h3 className="h5 mb-4 font-base">Property Management</h3>
				<p className="lh-lg">A portal for owners to advertise their flats for sale/rent and for residents to view/buy/rent apartments</p>
			  </div>
			</div>
			<div className="col-sm-6 col-lg-3 mb-4 mb-lg-0 text-center">
			  <div className="px-0 px-lg-3"><img className="img-fluid mb-4" src="../images/gallery/Complaint forum.png" width="100" alt="..." />
				<h3 className="h5 mb-4 font-base">Complaint Forum</h3>
				<p className="lh-lg">Easily raise complaints and issues that will be resolved by the association</p>
			  </div>
			</div>
			<div className="col-sm-6 col-lg-3 mb-4 mb-lg-0 text-center">
			  <div className="px-0 px-lg-3"><img className="img-fluid mb-4" src="../images/gallery/Bill Management.png" width="100" alt="..." />
				<h3 className="h5 mb-4 font-base">Bill Management</h3>
				<p className="lh-lg">Residents can view their utility bills and the status of payment</p>
			  </div>
			</div>
			<div className="col-sm-6 col-lg-3 mb-4 mb-lg-0 text-center">
			  <div className="px-0 px-lg-3"><img className="img-fluid mb-4" src="../images/gallery/Clubhouse Facilities.png" width="100" alt="..." />
				<h3 className="h5 mb-4 font-base">Clubhouse Facilities</h3>
				<p className="lh-lg">Ability to check availability of Clubhouse Facilities, including options to confirm booking</p>
			  </div>
			</div>
			<div className="col-sm-6 col-lg-3 mb-4 mb-lg-0 text-center">
			  <div className="px-0 px-lg-3"><img className="img-fluid mb-4" src="../images/gallery/Events.png" width="100" alt="..." />
				<h3 className="h5 mb-4 font-base">Events</h3>
				<p className="lh-lg">Do not miss out on any Events, Activities, Parties, Celebrations happening in the Community</p>
			  </div>
			</div>
			<div className="col-sm-6 col-lg-3 mb-4 mb-lg-0 text-center">
			  <div className="px-0 px-lg-3"><img className="img-fluid mb-4" src="../images/gallery/Housekeeping.png" width="100" alt="..." />
				<h3 className="h5 mb-4 font-base">Housekeeping</h3>
				<p className="lh-lg">Easily request for housekeeping services</p>
			  </div>
			</div>
			<div className="col-sm-6 col-lg-3 mb-4 mb-lg-0 text-center">
			  <div className="px-0 px-lg-3"><img className="img-fluid mb-4" src="../images/gallery/Security Ledger.png" width="100" alt="..." />
				<h3 className="h5 mb-4 font-base">Security Ledger</h3>
				<p className="lh-lg">Maintains a record of visitor details and vehicle details for safety purposes</p>
			  </div>
			</div>
		  </div>
		</div>

		 

		<div className="container">
		<div className="row justify-content-between pb-5 pt-8">
		<div className="col-12 col-lg-auto mb-5 mb-lg-0"><a className="d-flex align-items-center fw-semi-bold fs-3" href="/"> <img className="me-3" src="public/images/gallery/logo.png" alt="" />
			<div className="text-primary font-base">Housera</div>
		  </a></div>
		<div className="col-auto mb-3">
		  <h6 className="mb-5 font-base fs-1">About us </h6>
		  <ul className="list-unstyled mb-md-4 mb-lg-0">
			<li className="mb-3"><a className="text-700 text-decoration-none" href="#!">Vision</a></li>
			<li className="mb-3"><a className="text-700 text-decoration-none" href="#!">Careers</a></li>
			<li className="mb-3"><a className="text-700 text-decoration-none" href="#!">Blog</a></li>
			<li className="mb-3"><a className="text-700 text-decoration-none" href="#!">Terms of Service</a></li>
			<li className="mb-3"><a className="text-700 text-decoration-none" href="#!">Donate</a></li>
		  </ul>
		</div>
		<div className="col-auto mb-3">
		  <h6 className="mb-5 font-base fs-1">Discover </h6>
		  <ul className="list-unstyled mb-md-4 mb-lg-0">
			<li className="mb-3"><a className="text-700 text-decoration-none" href="#!">Home</a></li>
			<li className="mb-3"><a className="text-700 text-decoration-none" href="#!">Books</a></li>
			<li className="mb-3"><a className="text-700 text-decoration-none" href="#!">Authors</a></li>
			<li className="mb-3"><a className="text-700 text-decoration-none" href="#!">Subjects</a></li>
			<li className="mb-3"><a className="text-700 text-decoration-none" href="#!">Advanced Search</a></li>
		  </ul>
		</div>

		<div className="col-auto mb-3">
		  <h6 className="mb-5 font-base fs-1">Develop </h6>
		  <ul className="list-unstyled mb-md-4 mb-lg-0">
			<li className="mb-3"><a className="text-700 text-decoration-none" href="#!">Help Center</a></li>
			<li className="mb-3"><a className="text-700 text-decoration-none" href="#!">Report a Problem</a></li>
			<li className="mb-3"><a className="text-700 text-decoration-none" href="#!">Suggesting Edits</a></li>
			<li className="mb-3"><a className="text-700 text-decoration-none" href="#!">Contact Us</a></li>
		  </ul>
		</div>
		</div>
		</div>
	</div>
  );
}

export default Body;