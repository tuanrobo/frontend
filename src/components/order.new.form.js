import React from "react";
import { Link } from 'react-router-dom';
import { Form, Field, FieldArray } from "formik";

import { FaLongArrowAltLeft } from 'react-icons/fa';
import { TiUserAdd, TiUser } from 'react-icons/ti';
import { GoCheck } from 'react-icons/go';
import { MdAdd, MdClose, MdInfoOutline } from 'react-icons/md';

import CustomSelectField from "./order.select-field.component";

import ErrorMessage from "./validation.component"


const OrderForm = ({ isValid, isSubmitting, handleChange, values, errors, touched }) => {




	function ShowTotalPrice() {
		const i = values.order_items.reduce(
			(i, friend) => i + (friend.quantity * friend.price),
			0
		)
		const currencyFormat = new Intl.NumberFormat('en-US', {
			style: 'decimal',
			minimumFractionDigits: 3
		})
		return currencyFormat.format(i)
	}

	const customerOptions = values.customerdata.map((phantu, i) => ({
		label: phantu.customername, value: phantu.customername, subLabel: phantu.customer_info[0].address
	})
	)


	const productOptions = values.productdata.map((val, index) => ({
		label: val.product, value: val.product, subLabel: val.model
	})
	)


	return (
		<Form autoComplete="off">
			<div className="row">
				<div className="col-12 mb-5 mt-3">
					<small className="text-monospace text-muted text-uppercase ml-2 bg-light p-1">Ngày tạo: {values.date}</small>
				</div>
				<div className="col-11 mx-auto mb-5">
					<div className="row">
						{/********** Customer Name ***********/}

						<div className="col-12">
							<div className=" input-group input-group-lg form-group">
								<div className="input-group-prepend">
									<span className="input-group-text bg-transparent border-right-0"><TiUser className="text-secondary" /></span>
								</div>
								<Field
									className="form-control  p-0 d-flex align-items-center  border-left-0 border-right-0"
									name="customername"
									options={customerOptions}
									component={CustomSelectField}
									isMulti={false}
									placeholder={<div className="text-muted">Nhập khách hàng</div>}
								/>
								<div className="input-group-append">
									<Link to="/customer" className="btn btn-link  btn-lg  border-right border-top border-bottom border-left-none"><TiUserAdd /></Link>
								</div>
							</div>
							<ErrorMessage className="ml-5" name="customername" />
						</div>


						{/********** Product ***********/}
						<div className="col-12">
							<div className="row">
								<FieldArray
									name="order_items"
									render={arrayHelpers => (
										<>
											{values.order_items &&
												values.order_items.map(
													(friend, index) => (
														<div className="col-12" key={index} >
															<div className="row">
																<div className="form-group col-5">
																	<div className="input-group input-group-lg">
																		<div className="input-group-prepend">
																			<small className="text-muted input-group-text border-right-0 bg-transparent">
																				<span className="badge bg-success text-white">
																					{index + 1}
																				</span>
																			</small>
																		</div>
																		<Field
																			className="form-control d-flex p-0 align-items-center border-left-0"
																			name={`order_items[${index}].product`}
																			options={productOptions}
																			component={CustomSelectField}
																			placeholder={<div className="text-muted">Chọn sản phẩm</div>}
																			isMulti={false}
																		/>
																	</div>
																	<ErrorMessage name={`order_items[${index}].product`} />
																</div>

																<div className="form-group col-7">
																	<div className="input-group input-group-lg" >

																		<Field
																			type="number"
																			className={"form-control " +
																				(errors.quantity && touched.quantity
																					? 'is-invalid' : ""
																				)}
																			placeholder="Số lượng"
																			name={`order_items[${index}].quantity`}
																		/>

																		<Field
																			type="number"
																			className="form-control border-right-0"
																			placeholder="0.000đ"
																			name={`order_items[${index}].price`}

																		/>

																		<div className="input-group-append">
																			<button
																				type="button"
																				className="btn btn-link btn-lg bg-transparent border-right border-top border-bottom border-left-none"
																				onClick={() =>
																					arrayHelpers.remove(
																						index
																					)
																				}
																			>
																				<MdClose />
																			</button>
																		</div>

																	</div>
																	<ErrorMessage name={`order_items[${index}].quantity`} />
																</div>
															</div>
														</div>

													)
												)}
											<div className="col-12">
												<div className="row mb-5">
													<div className="col-5">
														<button
															type="button"
															className="btn btn-link bg-light btn-block text-left d-flex align-items-center pl-3"
															onClick={() =>
																arrayHelpers.push({
																	product: "",
																	quantity: "",
																	price: ""
																})
															}
														>
															<span className="badge badge-dark mr-3"><MdAdd /> </span>
															Thêm sản phẩm
														</button>
													</div>
													{/********** Ghi chú ***********/}
													<div className="col-7">
														<div className="input-group">
															<div className="input-group-prepend">
																<label className="input-group-text bg-light border-right-0"><MdInfoOutline /></label>
															</div>
															<Field type="text"
																className="form-control border-left-0 bg-light"
																name="description" placeholder="Ghi chú (Không bắt buộc)"
															/>
															<ErrorMessage name="description" />
														</div>
													</div>

												</div>
											</div>

										</>
									)}
								/>
							</div>
						</div>

						<div className="col-12 d-flex align-items-center justify-content-between">
							<div className="form-group form-check mb-0">
								<Field
									component="input"
									className="form-check-input mr-5"
									type="checkbox"
									name="paid_status"
									id="paid_status"
									checked={values.paid_status}
									onChange={handleChange}
								/>
								<label className="form-check-label ml-3" htmlFor="paid_status" >Đã Thanh Toán</label>
							</div>
							<div className="form-group mb-0">
								<label className="text-right mb-0 mr-3">Tổng cộng: </label>
								<span className="text-monospace font-weight-bold">
									<ShowTotalPrice />đ
								</span>
							</div>

						</div>
					</div>
				</div>

				{/********** Submit ***********/}
				<div className="form-group d-flex justify-content-between align-items-center col-12 bg-light mb-0 p-4 border-top">
					<a href="/" className="btn btn-lg btn-link mr-5 btn-sm"><FaLongArrowAltLeft /> Bỏ Qua</a>
					<button
						type="submit"
						// disabled={isSubmitting}
						disabled={!isValid}
						className="btn btn-primary btn-lg"><GoCheck className="mr-2" />Tạo Hoá Đơn</button>
				</div>
			</div>
		</Form>

	);
};


export default OrderForm;
