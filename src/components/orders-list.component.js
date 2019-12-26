//COMPONENTS
import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

// UI
import { AiFillFileAdd } from "react-icons/ai";
// import { FaWarehouse } from "react-icons/fa";
import { TiUser } from 'react-icons/ti';
import { MdEdit, MdAttachMoney, MdDelete, MdPrint, MdMoreVert, MdMoneyOff } from "react-icons/md";
import { FiPackage } from 'react-icons/fi';

import Inventory from "./inventory.component"



function Order(props) {
	// Dialog
	const deleteOrderModal = () => {
		Swal.fire({
			title: 'Xoá đơn hàng này?',
			text: props.order.customername,
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Xoá!'
		}).then((result) => {
			if (result.value) {
				Swal.getConfirmButton(props.deleteOrder(props.order._id))
				Swal.fire(
					'Đã xoá đơn!',
					'',
					'success',
				)
			} else {
				window.location = '/'
			}
		})
	}

	// End of Dialog

	const currencyFormat = new Intl.NumberFormat('en-US', {
		style: 'decimal',
		minimumFractionDigits: 3
	})

	const ShowTotalPrice = () => {
		let i =
			props.order.order_items.reduce(
				(showTotalPrice, order) => showTotalPrice + (order.quantity * order.price), 0
			)
		return currencyFormat.format(i)
	}

	const PaidStatus = () => {
		let indicator = props.order.paid_status;
		if (!indicator) {
			return (
				<>
					<button type="button" className="btn bg-light px-2 d-flex shadow-sm align-items-center border" data-toggle="tooltip" data-placement="top" title="Tooltip on top">
						<span className="badge badge-warning mr-1 " style={{ top: "0" }}><MdMoneyOff /> </span>
						<span className="badge badge-light text-muted ml-1 bg-transparent" style={{ top: "0" }}><MdAttachMoney /></span>
					</button>
				</>
			)
		} else {
			return <button type="button" className="btn bg-light px-2 shadow-sm d-flex align-items-center border">
				<span className="badge badge-light text-muted mr-1 bg-transparent" style={{ top: "0" }}><MdMoneyOff /></span>
				<span className="badge badge-success ml-1" style={{ top: "0" }}><MdAttachMoney /> </span>
			</button>
		}
	}

	return (
		<div className="list-group-item list-group-item-action col-12 py-1">
			<div className="row d-flex align-items-center">
				<div className="col-2 " key={props.order.customername}>
					<div className="d-flex w-100  align-items-center">
						<small className="text-muted mr-4">{props.index + 1}</small>
						<TiUser className="mr-2" /><h6 className="mb-0">{props.order.customername}</h6>
					</div>
				</div>
				<div className="col-4">
					<div className="row list-group">
						{props.order.order_items.map(({ product, quantity, price }, i) => (
							<Fragment key={product}>
								<div className="list-group-item list-group-item-action p-0">
									{/* <div className={"list-group-item list-group-item-action " + (i > 0 ? ` bg-primary ${i}` : '')}> */}
									<ul className="list-group list-group-horizontal">
										<li className="list-group-item col-5 rounded-0 border-bottom-0 border-top-0 border-left-0">

											<span>
												{product}
											</span>
										</li>
										<li className="list-group-item col-3 rounded-0 border-bottom-0 border-top-0">
											<span className="d-flex align-items-center">
												<FiPackage className="mr-2" />{quantity}
											</span>
										</li>
										<li className="list-group-item col-4 rounded-0 border-bottom-0 border-top-0 border-right-0">
											<span className="d-flex align-items-center justify-content-end">
												<MdAttachMoney />{currencyFormat.format(price)}
											</span>
										</li>
									</ul>
								</div>
							</Fragment>
						))}
					</div>
				</div>
				<div className="col-2 d-flex align-items-center justify-content-between p-1">
					<ShowTotalPrice />
					<PaidStatus />
				</div>
				<div className="col-1">
					<small className="text-muted">{props.order.date.substring(0, 10)}</small>
				</div>
				<div className="col-2" key={props.order.description}>
					<p className={"mb-0 text-center mb-0" + (props.order.description !== "" ? "" : " text-muted")}>
						<em>{props.order.description !== "" ? props.order.description : "..."}</em>
					</p>
				</div>
				<div className="controller text-right col-1">
					<div className="btn-group btn-group-lg" role="group" aria-label="Button group with nested dropdown">
						<button type="submit" className="btn btn-link btn-lg text-muted"><MdPrint /></button>

						<div className="dropdown" role="group">
							<Link
								className="btn btn-link btn-lg  text-muted"
								id={props.order._id}
								to="/#"
								role="button"
								data-toggle="dropdown"
								aria-haspopup="true"
								aria-expanded="false"
							><MdMoreVert />
							</Link>

							<div className="dropdown-menu dropdown-menu-right" aria-labelledby={props.order._id}>
								<Link
									to={"/edit/" + props.order._id}
									className="dropdown-item"
								>
									<MdEdit className="mr-2" />Sửa
								</Link>
								<Link to="/#"
									onClick={() => {
										deleteOrderModal();
									}}
									alt={props.order._id}
									className="dropdown-item"
								>
									<MdDelete className="mr-2" />Xoá
								</Link>
							</div>
						</div>

					</div>
				</div>
			</div>
		</div >
	);
}

const serverURL =  'http://quanvanbilling-backend.herokuapp.com/'

console.log("get port from", serverURL)

export default class OrdersList extends Component {
	constructor(props) {
		super(props);
		this.deleteOrder = this.deleteOrder.bind(this);
		this.state = {
			orders: []
		};
	}

	componentDidMount() {
		axios
			.get(serverURL + "orders/")
			.then(response => {
				this.setState({ orders: response.data });
			})
			.catch(error => {
				console.log(error);
			});
	}

	deleteOrder(id) {
		axios
			.delete(serverURL + "orders/" + id)
			.then(res => console.log("Một hoá đơn vừa được xoá: ", res.data));
		this.setState({
			orders: this.state.orders.filter(el => el._id !== id)
		});
	}

	OrderList() {
		let orders = this.state.orders;
		if (orders === null || orders.length === 0) {
			console.log('Chưa có dữ liệu')
			return <div className="alert alert-info text-center col-6 mx-auto my-5" role="alert">
				Chưa có đơn hàng nào được tạo!
		  </div>
		} else {
			console.log('Có dữ liệu')
			return [...this.state.orders].reverse().map((currentorder, i) => {
				return <Order
					index={i}
					order={currentorder}
					deleteOrder={this.deleteOrder}
					key={currentorder._id}
				/>

			});
		}
	}



	render() {
		return (
			<div className="col-12">
				<div className="row">
					<div className="col-12 d-lg-flex justify-content-end mb-5">
						<Inventory className="mr-5" />

						<Link
							to="/create"
							className="btn btn-lg btn-primary d-flex align-items-center"
						>
							<span className="mx-auto"><AiFillFileAdd /> <span className="ml-2">Tạo Đơn Hàng Mới</span></span>
						</Link>
					</div>

					<div className="col-12">
						<div className="row">
							<div className="col-12">
								<div className="list-group mb-5 shadow">
									<div className="list-group-item bg-light d-flex justify-content-between align-items-center p-2 text-uppercase text-monospace text-muted ">
										<div className="col-2"><small>Khách</small></div>
										<div className="col-4"><small>Sản phẩm</small></div>
										<div className="col-2"><small>Tổng tiền</small></div>
										<div className="col-1"><small>Ngày tạo</small></div>
										<div className="col-2"><small>Ghi chú</small></div>
										<div className="col-1"></div>
									</div>
									{this.OrderList()}
								</div>
							</div>
						</div>
					</div>
				</div>

			</div>
		);
	}
}
