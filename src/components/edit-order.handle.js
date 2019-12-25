import React from "react";
import { Formik } from "formik";
import axios from 'axios';
import OrderForm from "./edit-order.form";
import * as Yup from 'yup';
// import { DisplayFormikState } from './order.helper';
import { withRouter } from "react-router-dom";

import Swal from 'sweetalert2';

const orderValidateSchema = Yup.object().shape({
	customername: Yup.string().required("Bạn chưa chọn khách hàng!"),
	order_items: Yup.array()
		.of(Yup.object().shape({
			product: Yup.string().required("Chưa chọn sản phẩm"),
			quantity: Yup.number()
				.min(1, '0 không hợp lệ')
				.required("Chưa nhập số lượng"),
			// price: Yup.number()
		})
		)
})


const serverURL =  'https://localhost:5000/'

class OrderHandle extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			customerdata: [],
			productdata: [],
		}
	}


	componentDidMount() {
		let orderID = this.props.match.params.id
			axios.get(serverURL + 'orders/' + orderID)
				.then(response => {
					this.setState({
						customername: response.data.customername,
						order_items: response.data.order_items,
						description: response.data.description,
					})
					console.log("- Khách hàng hiện tại: ", response.data.customername)
					console.log("- Mặt hàng hiện tại: ", response.data.order_items)
					console.log("- Description hiện tại: ", response.data.description || null)
				})
				.catch(function (error) {
					console.log(error);
				})

			axios.get(serverURL + 'customers/')
				.then(response => {
					if (response.data.length > 0) {
						this.setState({
							customers: response.data.map(customer => customer.customername),
							customerdata: response.data
						})
					}
				});

			axios.get(serverURL + 'products/')
				.then(response => {
					if (response.data.length > 0) {
						this.setState({
							products: response.data.map(product => product.product),
							productdata: response.data
						})
					}
				})
		}



		// SUBMIT
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
			const url = 'https://localhost:5000/orders/update/' + this.props.match.params.id

			var success = true

			if (!success) {
				console.log('thua roi')
			}


			await axios.post(url, order)
				.then(res => Swal.fire({
					position: 'center',
					icon: 'success',
					title: 'Cập nhật đơn hàng thành công!',
					showConfirmButton: false,
					timer: 1000,
					onClose: window.location = '/',
					// title: res.data			
				}))
		}
		// END SUBMIT

		render() {
			let { customers, products, price, customerdata, productdata, customername, order_items, description } = this.state

			return (
				<Formik
					enableReinitialize
					validateOnChange
					initialValues={{
						customerdata,
						productdata,
						customers,
						products,
						price,
						customername,
						description,
						paid_status: false,
						order_items,
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

	export default withRouter(OrderHandle);