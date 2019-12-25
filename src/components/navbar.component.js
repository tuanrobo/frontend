import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { MdBatteryChargingFull } from 'react-icons/md';

export default class Navbar extends Component {
	render() {
		return (
			<nav className="navbar  navbar-dark bg-dark navbar-expand-lg mb-5 p-0 col-12">
				<Link to="/" className="navbar-brand btn rounded-0 d-block bg-light px-5"><MdBatteryChargingFull className="text-primary"/></Link>
				<div className="collapse navbar-collapse">
					<ul className="nav nav-pills mr-auto">					
						
					</ul>
					<ul className="nav justify-content-end">
						<li className="navbar-item">
							<Link to="/report" className="nav-link">Báo cáo</Link>
						</li>												
						<li className="nav-item">
							<Link to="/import" className="nav-link">Nhập hàng</Link>
						</li>
					</ul>
				</div>
			</nav>
		)
	}
}