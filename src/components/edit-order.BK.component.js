import React, { Component } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

import { FaLongArrowAltLeft } from 'react-icons/fa';
import { GoCheck } from 'react-icons/go';

// import { AutoComplete } from 'antd';

export default class EditOrder extends Component {
	handleChange = key => e => {
		this.setState({
			[key]: e.target.value,
		})
		console.log(e.target.value)
	}

	constructor(props) {
		super(props);
		this.onSubmit = this.onSubmit.bind(this);
		this.state = {
			customername: '',
			product: '',
			quantity: '',
			price: '',
			date: new Date().toLocaleDateString(),
			customers: [],
			products: [],
			description: ''
		}
	}


	componentDidMount() {
		axios.get('http://localhost:5000/orders/' + this.props.match.params.id)
			.then(response => {
				this.setState({
					customername: response.data.customername,
					product: response.data.order_items[0].product,
					quantity: response.data.order_items[0].quantity,
					price: response.data.order_items[0].price,
					description: response.data.description
				})
				console.log("Khách hàng hiện tại: ", response.data.customername)
				console.log("Mặt hàng hiện tại: ", response.data.order_items[0].product)
				console.log("Số lượng hiện tại: ", response.data.order_items[0].quantity)
				console.log("Ghi chú hiện tại: ", response.data.description)
			})
			.catch(function (error) {
				console.log(error);
			})

		axios.get('http://localhost:5000/customers/')
			.then(response => {
				if (response.data.length > 0) {
					this.setState({
						customers: response.data.map(customer => customer.customername)
					})
				}
			});

		axios.get('http://localhost:5000/products/')
			.then(response => {
				if (response.data.length > 0) {
					this.setState({
						products: response.data.map(product => product.product)
					})
				}
			})
	}


	onSubmit(e) {
		e.preventDefault();
		const order = {
			customername: this.state.customername,
			order_items: [{
				product: this.state.product,
				quantity: this.state.quantity,
				price: this.state.price,				
			}],
			description: this.state.description
		}
		console.log("Order update: ", order);

		axios.post('http://localhost:5000/orders/update/' + this.props.match.params.id, order)
			.then(res => Swal.fire({
				position: 'center',
				icon: 'success',
				title: 'Cập nhật đơn hàng thành công!',
				showConfirmButton: false,
				timer: 1000,
				onClose: window.location = '/'
				// title: res.data			
			}))
		// window.location = '/';
	}

	render() {
		return (
			<div className="col-12">
				<div className="mb-5 text-center">
					<h3>Điều chỉnh đơn</h3>
				</div>
				<div className="col-6 mx-auto border rounded shadow bg-white">
					<form onSubmit={this.onSubmit}>
						<div className="row">
							<div className="col-12 p-0 border-bottom mb-4 bg-light">
								<small className="text-monospace text-muted text-uppercase ml-2">Ngày chỉnh: {this.state.date}</small>
							</div>
							<div className="col-12">
								<div className="form-group">
									<label className="text-muted">Khách mối </label>
									<select ref="customerInput"
										required
										className="form-control"
										value={this.state.customername}
										onChange={this.handleChange('customername')}>

										{
											this.state.customers.map(function (customer) {
												return <option key={customer} value={customer}> {customer} </option>
											})
										}
									</select>
								</div>
							</div>

							<div className="col-12">
								<div className="form-row row">
									<div className="form-group col-4">
										<label className="text-muted">Mặt hàng:</label>
										<select ref="productInput"
											required
											className="form-control"
											value={this.state.product}
											onChange={this.handleChange('product')}>
											{
												this.state.products.map(function (product) {
													return <option key={product} value={product}>{product}</option>
												})
											}
										</select>
									</div>


									<div className="form-group col-4">
										<label className="text-muted">Số lượng:</label>
										<input
											required
											type="number"
											className="form-control"
											value={this.state.quantity}
											onChange={this.handleChange('quantity')}
											placeholder="0"
										/>
									</div>

									<div className="form-group col-4">
										<label className="text-muted">Giá:</label>
										<input
											type="number"
											className="form-control"
											value={this.state.price}
											onChange={this.handleChange('price')}
											placeholder="0.00"
										/>
									</div>
								</div>
							</div>
							<div className="col-12">
								<div className="form-group">
									<label>Ghi chú</label>
									<input
										type="text"
										className="form-control"
										defaultValue={this.state.description}
										onChange={this.handleChange('description')}
									/>
								</div>
							</div>
							<div className="form-group d-flex justify-content-between align-items-center col-12 bg-light mb-0 p-4  border-top">
								<a href="/" className="btn btn-link mr-5 btn-sm"><FaLongArrowAltLeft /> Bỏ Qua</a>
								<button type="submit" className="btn btn-primary btn-lg"><GoCheck className="mr-2" />Điều Chỉnh</button>
							</div>
						</div>
					</form>
				</div>
			</div>
		)
	}
}