import React, { Component } from "react";
import { Link } from "react-router-dom";

import axiosInstance from "./API.config"

import Swal from "sweetalert2";


export default class CreateNewImport extends Component {
	constructor(props) {
		super(props);

		this.onChangeProduct = this.onChangeProduct.bind(this);
		this.onChangeQuantity = this.onChangeQuantity.bind(this);
		this.onChangeDate = this.onChangeDate.bind(this);
		this.onSubmit = this.onSubmit.bind(this);

		this.state = {
			product: "",
			quantity: 0,
			date: new Date().toLocaleDateString(),
			products: []
		};
	}

	componentDidMount() {
		axiosInstance.get("products/").then(response => {
			if (response.data.length > 0) {
				this.setState({
					products: response.data.map(product => product.product),
					product: response.data[0].product
				});
			}
		});
	}

	onChangeProduct(e) {
		this.setState({
			product: e.target.value
		});
	}

	onChangeQuantity(e) {
		this.setState({
			quantity: e.target.value
		});
	}

	onChangeDate(date) {
		this.setState({
			date: date
		});
	}

	onSubmit(e) {
		e.preventDefault();

		// Create new import amount
		const imports = {
			items: [{ product: this.state.product, quantity: this.state.quantity }],
			date: this.state.date
		};
		console.log("Import added", imports);

		const headers = {
			"Content-Type": "application/json"
		};
		axiosInstance
			.post("import/add", imports, { headers })
			.then(res =>
				Swal.fire({
					position: "center",
					icon: "success",
					title: "Nhập hàng thành công",
					showConfirmButton: false,
					timer: 1000,
					onClose: window.location = '/'
					// title: res.data
				})
			);
		// window.location = '/';
	}

	render() {
		return (
			<div className="col-6 mx-auto border rounded p-5 shadow bg-white">
				<form onSubmit={this.onSubmit}>
					<div className="d-flex justify-content-between">
						<h3>Tạo nhập hàng mới</h3>
						<Link to="/product" className="btn btn-link">
							+ Thêm sản phẩm
            </Link>
					</div>
					<p className="text-muted mb-5">
						<small>
							Ngày nhập:{" "}
							<span className="text-monospace">{this.state.date}</span>
						</small>
					</p>

					<div className="row border-bottom mb-4">
						<div className="form-group col-6">
							<label>Mặt hàng: </label>
							<select
								ref="productInput"
								required
								className="form-control"
								value={this.state.product}
								onChange={this.onChangeProduct}
							>
								{this.state.products.map(function (product) {
									return (
										<option key={product} value={product}>
											{product}
										</option>
									);
								})}
							</select>
						</div>

						<div className="form-group col-6">
							<label>Số lượng:</label>
							<input
								type="text"
								className="form-control"
								value={this.state.quantity}
								onChange={this.onChangeQuantity}
							/>
						</div>
					</div>

					<div className="form-group d-flex justify-content-between">
						<a href="/" className="btn btn-secondary mr-5">Bỏ Qua</a>
						<input
							type="submit"
							value="Đồng ý nhập"
							className="btn btn-primary"
						/>
					</div>
				</form>
			</div>
		);
	}
}
