import React, { Component } from 'react';
import OrderHandle from './edit-order.handle';


export default class CreateNewOrder extends Component {
	render() {
		return (
			<div className="col-12">
				<div className="mb-5 text-center">
					<h3>Điều chỉnh đơn</h3>
				</div>
				<div className="col-7 mx-auto border rounded shadow card mb-5">
					<OrderHandle/>					
				</div>
			</div>
		)
	}
}