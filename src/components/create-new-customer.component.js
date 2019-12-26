import React, { Component } from 'react';
import axiosInstance from "./API.config"



export default class CreateNewCustomer extends Component {
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
			address: '',
			phone_number: 0
		}
	}


	onSubmit(e) {
		e.preventDefault();

		const customer = {
			customername: this.state.customername,
			customer_info: [{
				address: this.state.address,
				phone_number: this.state.phone_number
			}]
		}

		console.log(customer);
		axiosInstance.post("add", customer)
			.then(res => console.log(res.data));

		this.setState({
			customername: '',
			customer_info: []
		})

		window.location = '/create';
	}

	render() {
		return (
			<div className="col-12">
				<div className="mb-5 text-center">
					<h3 className="mb-5">Tạo Khách Hàng Mới</h3>
				</div>
				<div className="col-6 mx-auto border rounded shadow p-5">
					<form onSubmit={this.onSubmit}>
						<div className='row border-bottom mb-4'>
							<div className='form-group col-12'>
								<label>Tên Khách Hàng: </label>
								<input type="text"
									required
									className="form-control form-control-lg"
									value={this.state.customername}
									onChange={this.handleChange('customername')}
									placeholder="Tên Khách Hàng"
								/>
							</div>
							<div className='form-group col-12'>
								<label>Địa chỉ </label>
								<input type="text"
									className="form-control form-control-lg"
									value={this.state.address}
									onChange={this.handleChange('address')}
									placeholder="Địa chỉ"
								/>
							</div>
							<div className='form-group col-12 '>
								<label>Số điện thoại </label>
								<input type="number"
									className="form-control form-control-lg"
									value={this.state.phone_number}
									onChange={this.handleChange('phone_number')}
									placeholder="Số điện thoại"
								/>
							</div>

						</div>
						<div className="form-group d-flex justify-content-between">
							<a href="/" className="btn btn-lg btn-secondary mr-5">Bỏ Qua</a>
							<input
								type="submit"
								value="Tạo"
								className="btn btn-primary btn-lg"
							/>
						</div>
					</form>
				</div>
			</div>

		)
	}
}