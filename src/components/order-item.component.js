import React, { Component, Fragment } from 'react';
import axios from 'axios';



export default class OrderItems extends Component {
	handleChange = key => e => {
		this.setState({
			[key]: e.target.value,
		})
		console.log(e.target.value)
	}
	constructor(props) {
		super(props);

		this.state = {
			product: '',
			quantity: '',
			price: '',
			date: new Date().toLocaleDateString('en-US'),
			products: [],
		}
	}

	componentDidMount() {
		axios.get('http://localhost:5000/products/')
			.then(response => {
				if (response.data.length > 0) {
					this.setState({
						products: response.data.map(product => product.product),
						product: response.data[0].product
					})
				}
			})
	}

	render() {
		return (
			<Fragment>
				{this.props.orderItem.map((orderItem, idx) =>					
					<>
						<div className="form-group col-4">
							<label className="text-muted">Mặt hàng:</label>
							<select ref="productInput"
								required
								className="form-control"
								value={this.props.product}
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
								value={this.props.quantity}
								onChange={this.handleChange('quantity')}
								placeholder="0"
							/>
						</div>

						<div className="form-group col-4">
							<label className="text-muted">Giá:</label>
							<input
								type="number"
								className="form-control"
								value={this.props.price}
								onChange={this.handleChange('price')}
								placeholder="0.00"
							/>
						</div>
					</>						
				)}
			</Fragment>
		)
	}
}