// @ts-ignore

import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";


// eslint-disable-next-line
// import Popper from "popper.js"
import "bootstrap/dist/js/bootstrap.js";
// import "@types/jquery/dist/jquery.slim.d.ts";

import Navbar from "./components/navbar.component";
import OrdersList from "./components/orders-list.component";
import EditOrder from "./components/edit-order.component";
import Inventory from "./components/inventory.component";
import CreateNewOrder from "./components/create-new-order.component";
import CreateNewCustomer from "./components/create-new-customer.component";
import CreateNewProduct from "./components/create-new-product.component";
import createNewImport from "./components/create-new-import.component";


function App() {
	return (
		<div className="container-fluid bg-light h-100">
			<div className="row">
				<Router>
					<Navbar />
					<Route path="/" exact component={OrdersList} />
					<Route path="/inventory" exact component={Inventory} />
					<Route path="/edit/:id" exact component={EditOrder} />					
					<Route path="/create" exact component={CreateNewOrder} />
					<Route path="/customer" exact component={CreateNewCustomer} />
					<Route path="/product" exact component={CreateNewProduct} />
					<Route path="/import" exact component={createNewImport} />
					<Route path="/report" exact component={Inventory} />
				</Router>
			</div>
		</div>
	);
}

export default App;
