import React from "react";
import { Formik } from "formik";
import axios from 'axios';
import OrderForm from "./order.new.form";
import * as Yup from 'yup';
// import { DisplayFormikState } from './order.helper';

import Swal from 'sweetalert2';

const orderValidateSchema = Yup.object().shape({
	customername: Yup.string().required("Bạn chưa chọn khách hàng!"),
	order_items: Yup.array()
		.of(Yup.object().shape({
			product: Yup.string().required("Chưa chọn sản phẩm"),
			quantity: Yup.number()
				.min(1, '0 không hợp lệ')
				.required("Chưa nhập số lượng"),
			price: Yup.number()
		})
		),
	description: Yup.string()
		.min(2, 'Quá ngắn!')		
})
  

export default class OrderHandle extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			customers: [],
			products: [],
			customerdata: [],
			productdata: [],			
		}
	}

	componentDidMount() {
		axios.get('http://localhost:5000/customers/')
			.then(response => {
				if (response.data.length > 0) {
					this.setState({
						customers: response.data.map(customer => customer.customername),
						customerdata: response.data
					})
				}
			});

		axios.get('http://localhost:5000/products/')
			.then(response => {
				if (response.data.length > 0) {
					this.setState({
						products: response.data.map(product => product.product),
						productdata: response.data
					})					
				}
			})

		axios.get('http://localhost:5000/inventories/')
			.then(response => {
				if (response.data.length > 0) {
					this.setState({
						in_stocks: response.data.map(in_stock => in_stock.in_stock),
						in_stock: response.data[0].in_stock,
						in_stock_products: response.data.map(in_stock_products => in_stock_products.product),
						in_stock_product: response.data[0].product
					})
				}
			})
	}



	// Submit
	handleSubmit = (values, { props = this.props, setSubmitting }) => {
		setTimeout(() => {
			this.addOrder(
				values.customername,
				values.order_items,
				values.description,
				values.paid_status,
				values.date,
			);
			setSubmitting(false);
		}, 800);
	};

	
	async addOrder(customername, order_items, description, paid_status, date) {
		const order = {
			customername,
			order_items,
			description,
			paid_status,
			date,
		};
		console.log("Orders submitted: ", order)
		const url = `http://localhost:5000/orders/add`;

		// const response = await axios.post(url, order);

		var success = true

		if (!success) {
			console.log('thua roi')
		}


		await axios.post(url, order)
			.then(res => Swal.fire({
				position: 'center',
				icon: 'success',
				title: 'Tạo đơn thành công rùi nha!',
				showConfirmButton: false,
				timer: 1000,
				onClose: window.location = '/',
				// title: res.data			
			}))

		// .then(res => Swal.fire({
		// 	position: 'center',
		// 	icon: 'success',
		// 	title: 'Tạo đơn thành công rùi nha!',
		// 	showConfirmButton: false,
		// 	timer: 1000,
		// 	onClose: window.location = '/',
		// 	// title: res.data			
		// }))
		// .catch(err => {
		// 	console.log("Lỗi gì đây: ",err)
		// });
	}


	render() {
		let { customers, products, customerdata, productdata } = this.state
		console.log(customerdata)
		return (
			<Formik
				enableReinitialize
				validateOnChange
				initialValues={{
					customerdata,
					productdata,
					customers,
					products,
					customername: '',
					description: '',
					paid_status: false,
					order_items:
						[{
							product: '',
							quantity: '',
							price: '',
						}],
					// date: new Date().toLocaleDateString(),
					// date: formatDate(new Date()),
					date: new Date().toDateString("dd-mm-yy"),
					isSubmitting: false
				}}

				validationSchema={orderValidateSchema}

				onSubmit={this.handleSubmit}
			>
				{props => (
					<>
						{/* <DisplayFormikState	{...props} /> */}

						<OrderForm {...props} />

					</>
				)}
			</Formik>
		);
	}
}
