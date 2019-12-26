import React, { Component } from 'react';
import axiosInstance from "./API.config"


export default class CreateNewProduct extends Component {
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
			product: '',
			model: '',
		}
	}

	onSubmit(e) {
		e.preventDefault();

		const product = {
			product: this.state.product,
			model: this.state.model,
		}

		axiosInstance.post('product/add', product)
			.then(res => console.log(res.data));

		this.setState({
			product: ''
		})

		window.location = '/';
	}

	render() {
		return (
			<div className="col-7 mx-auto">
				<h3 className="mb-5">Tạo Sản Phẩm Mới</h3>
				<form onSubmit={this.onSubmit} className="form-inline">
					<div className="form-group mr-sm-3">
						<label className="d-none">Tên Sản Phẩm: </label>
						<input type="text"
							required
							className="form-control form-control-lg"
							value={this.state.product}							
							onChange={this.handleChange('product')}
							placeholder="Tên Sản Phẩm"
						/>
					</div>

					<div className="form-group mr-sm-3">
						<label className="d-none">Mã hàng </label>
						<input type="text"
							className="form-control form-control-lg"
							value={this.state.model}
							onChange={this.handleChange('model')}
							placeholder="Mã Sản Phẩm"
						/>
					</div>
					<div className="form-group">
						<input type="submit" value="Tạo" className="btn btn-primary btn-lg" />
					</div>
				</form>
			</div>
		)
	}
}