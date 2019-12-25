import React, { Component } from 'react';
import axios from "axios";

import { FiPackage } from 'react-icons/fi';

export default class Inventory extends Component {
	constructor(props) {
		super(props);
		this.state = {
			inStocks: []
		};
	}


	componentDidMount() {
		const serverURL = 'http://localhost:5000/'
		axios.get(serverURL + 'inventories/')
			.then(res => {
				const inStocks = res.data
				this.setState({ inStocks })
			}
			)
			.catch(error => {
				console.log(error);
			});

	}

	render() {
		return <>
			<ul className={"list-group list-group-horizontal " + this.props.className}>
				{this.state.inStocks.map((stock, i) =>
					<li className="list-group-item" key={i}>
						<div key={stock.product} className="mb-2">
							<span className="text-muted">{stock.product}</span>
						</div>
						<div key={stock.in_stock} className="d-flex align-items-center">
							<FiPackage className="mr-2" /><strong className="text-info">{stock.in_stock}</strong>
						</div>
					</li>
				)}
			</ul>
		</>


	}
}