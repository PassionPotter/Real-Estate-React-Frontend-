import React, { Component } from "react"
import { Form, Input, Layout, Radio, Select, Checkbox, Notification } from "element-react"

import Fade from "react-reveal/Fade"
import { Table as TableBs, Button } from 'react-bootstrap';
import { PayPalButton } from 'react-paypal-button-v2';
import { connect } from 'react-redux'
import countryList from 'react-select-country-list';
import './Checkout.css';

import { actionPropertyGet } from '../../redux/actions/property';
import { actionOrderCreate } from '../../redux/actions/order';

import CoinbaseCommerceButton from 'react-coinbase-commerce';
import { axiosPost, callGet, callPost } from "../../services/axios";
import HelloSign from 'hellosign-embedded';
import { getPurchasePrice, getTotalWithFee, getTotalWithPurchasePrice } from "../../services/calc";
import { relativeTimeThreshold } from "moment";
import { withTranslation } from "react-i18next";


const CRYPTO_MODE = '1', PAYPAL_MODE = '2';
const fee = 0; // same added in carts section.
var BILING_DETAILS = {
	id: null,
	firstName: '',
	lastName: '',
	email: '',
	phone: '',
	country: '',
	streetAddress: '',
	city: '',
	zipCode: '',
	userId: null,

	isGift: '',
	description: '',
	payCard: CRYPTO_MODE,
	cardNumber: '',
	expiration: '',
	securityCode: '',
	isAgree: '',

	walletAddress: '',
};

const mapStateToProps = state => {
	const { credentialData } = state.credential
	return {
		credentialData
	}
}

const mapDispatchToProps = { actionPropertyGet, actionOrderCreate }

const Checkout = connect(mapStateToProps, mapDispatchToProps)(class extends Component {
	// class Checkout extends Component {
	constructor(props) {
		super(props)

		this.state = {
			form: BILING_DETAILS,
			rules: {
				firstName: [{ required: true, message: 'Please input first name', trigger: 'blur' }],
				lastName: [{ required: true, message: 'Please input last name', trigger: 'blur' }],
				email: [
					{ required: true, message: 'Please input email', trigger: 'blur' },
					{ type: 'email', message: 'Please input correct email address', trigger: 'blur,change' }
				],
				phone: [{ required: true, message: 'Please input phone', trigger: 'blur' }],
				country: [{ required: true, message: 'Please input country', trigger: 'blur' }],
				streetAddress: [{ required: true, message: 'Please input street address', trigger: 'blur' }],
				city: [{ required: true, message: 'Please input Town/City', trigger: 'change' }],
				// walletAddress: [{ required: true, message: 'Please input wallet address', trigger: 'change' }],
				isAgree: [{ required: true, message: 'This field is required', trigger: 'change' }]
			},
			countryList: [],
			productItems: [],
			totalPrice: 0,
			coinbaseId: null,
			hellosignId: null
		};
		// this.setState({ form: { ...this.state.form, ...BILING_DETAILS } });
		// this.setState({
		// 	form: Object.assign({}, BILING_DETAILS)
		// });
		this.coinbaseRef = React.createRef();
		this.onPaypalSuccess.bind(this);
		this.onSaveOrder.bind(this);
	}
	saveFormData = () => {
		const token = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user'))['accessToken'] : null
		
		callPost('/api/saveCheckoutform', this.state.form, token)
		  .then(res => {
		  }).catch(err => {
			console.log(err);
		  })
	}

	getFormData = () => {
		callGet(`/api/getCheckoutform?ID=${this.state.form.userId}`)
		.then((response) => {
			if(response.data){
				this.setState({
				  ...this.state,
				  form: {
					  ...this.state.form,
					  ...response.data
				  }
			  })
			}

		})
		.catch((error) => {
		  console.log(error)
		})
	}
	componentDidMount() {
		// console.log('[checkout]', this.props.credentialData);
		// window.scrollTo(0, 0);
		
		// If there is not wallet address, show notification
		const user = JSON.parse(localStorage.getItem('user'));
		if (!user || !user.walletAddress) {
			Notification.error({
				title: 'Wallet Required',
				message: 'Please check wallet in account page!',
				type: 'Warning',
			});
		}
		if(user.id){
			this.setState({
				...this.state,
				form: {
					...this.state.form,
					userId: user.id
				}
			},()=>{
				this.getFormData();
			})
		}

		const cartProducts = JSON.parse(localStorage.getItem('cartProducts'));

		if (!cartProducts || !cartProducts.length) return;

		let items = [];
		let total = 0;
		for (let product of cartProducts) {
			items.push({
				"identifier": product.address1,
				"subtotal": getTotalWithPurchasePrice(getPurchasePrice(product.tokenValue, fee), Number(product.tokenQuantity)).toFixed(2)
			});
			total += getTotalWithPurchasePrice(getPurchasePrice(product.tokenValue, fee), Number(product.tokenQuantity));
		}
		total = total.toFixed(2)
		this.setState({ productItems: items, totalPrice: total });
		console.log(this.state.totalPrice, 'sdfsdf')
		// Create coinbase checkout with api
		const body = {
			"name": "Token Purchase - " + (new Date()),
			"description": "Token purchase with coinbase",
			"local_price": {
				"amount": total,
				"currency": "USD"
			},
			"pricing_type": "fixed_price",
			"requested_info": ["name", "email"]
		} 

		fetch(process.env.REACT_APP_COINBASE_API_ENDPOINT + '/checkouts', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'X-CC-Api-Key': this.props.credentialData[0]?.coinbaseApiKey,
				'X-CC-Version': '2018-03-22'
			},
			body: JSON.stringify(body)
		}).then(async res => {
			let result = await res.json();
			console.log('[cionbase data]', result);
			this.setState({ coinbaseId: result.data.id });
		}).catch(err => {
			console.log('[coinbase error]', err);
		});

		// Get country list
		// fetch('https://restcountries.eu/rest/v2/').then(async res => {
		// 	const resJson = await res.json();
		// 	const countryList = resJson.map(item => item.name);
		// 	this.setState({ countryList: countryList });

		// }).catch(err => { console.log('[country err]', err) });
		let countries = countryList().getData();
		countries = countries.map(country => country.label);
		// console.log('countries', countries);
		this.setState({ countryList: countries });
	}

	handleSubmit(e) {
		e.preventDefault()
		////////////	TEST
		// this.onSaveOrder('paypal');
		// return;
		this.refs.form.validate((valid) => {
			// if (!valid) return;
			// this.props.actionAuthRegister(this.state.form);
			if (this.state.form.payCard === CRYPTO_MODE) {
				this.coinbaseRef.handleButtonClick();

			}
		})
		if(this.state.totalPrice == 0)
			this.onSaveOrder('coupon');
		console.log(this.state.totalPrice, 'total')
	}

	handleReset(e) {
		e.preventDefault();
		this.refs.form.resetFields()
	}

	onChange(key, value) {
		this.setState({
			form: Object.assign({}, this.state.form, { [key]: value })
		})
	}

	onChangePaycard(value) {
		this.setState({
			form: Object.assign({}, this.state.form, { payCard: value })
		});
	}

	async onPaypalSuccess(details, data) {

		Notification.success({
			title: 'Payment Success by ' + details.payer.name.given_name,
			message: 'Order id: ' + data.orderID,
			type: 'success',
			duration: 5000
		});
		this.onSaveOrder('paypal');
	}

	onCryptoSuccess(data) {
		Notification.success({
			title: 'Payment Success by '+ data?.metadata?.customer_name,
			message: 'Order id'+ data?.code,
			type: 'success',
			duration: 5000
		});
		this.onSaveOrder('coinbase');
	}

	onSaveOrder(paymentMethod) {
		console.log('[saving order...]');
		const user = JSON.parse(localStorage.getItem('user'));
		console.log(user, user.walletAddress);
		const cartProducts = JSON.parse(localStorage.getItem('cartProducts'));
		let totalCount = 0;
		let total = 0;
		let details = [];
		for (let item of cartProducts) {
			if(item.address1 == 'coupon') continue;
			if(item.id == -1) continue;
			totalCount += parseFloat(item.tokenQuantity);
			total += getTotalWithPurchasePrice(getPurchasePrice(item.tokenValue, fee), Number(item.tokenQuantity));
			details.push({
				tokenAddress: item.tokenAddress,
				tokenQuantity: item.tokenQuantity,
				toAddress: user.walletAddress,
				productId: item.id,
				tokenValue: item.tokenValue
			})
		}
		const payload = {
			userId: user.id,
			status: 'pending',
			totalPrice: total,
			count: totalCount,
			paymentMethod: paymentMethod,
			details: JSON.stringify(details),
			signatureId: this.state.hellosignId,
			orderType: 'buy'
		}
		let coupon = cartProducts.find(p => p.address1 == 'coupon');
		console.log(coupon, 'coupon')
		if(coupon) {
			const data = {
				id: user.id,
				coupon: coupon.code,
				amount: -Number(coupon.tokenValue)
			}
			callPost('/api/pay/updateCoupon', data).then(res => {
				
			});
		}
		this.props.actionOrderCreate(payload);
		localStorage.removeItem("cartProducts");
		this.props.history.push('/marketplace');
	}

	async onHelloSign() {
		BILING_DETAILS = Object.assign({}, this.state.form);
		// here first we send request to save form data
		this.saveFormData()
		const user = JSON.parse(localStorage.getItem('user'));

		const hellosignClient = new HelloSign({ clientId: this.props.credentialData[0]?.hellosignClientId });
		

		// If there is no walletaddress, stop propogation
		if (!user || !user.walletAddress) {
			Notification.error({
				title: 'Wallet Required',
				message: 'Please add wallet in account page',
				type: 'Warning',
			});
		}

		axiosPost('/api/hellosign', {
			email: user.email,
			name: user.username,
			order: 1
		})
			.then(res => {
				console.log("[res]", res);
				if (res.data.success) {
					hellosignClient.open(res.data.signUrl,{skipDomainVerification:true});
					hellosignClient.once('sign', data => {
						console.log('[signed]', data.signatureId);

						this.setState({ hellosignId: data.signatureId });
					});
				}
			})
			.catch(err => {
				console.log(err);
			})
	}


	render() {
		const { t } = this.props
		return (
			<div style={{ padding: "4% 12% 4% 12%", backgroundColor:"#fff" }}>

				<Fade bottom delay={200}>

					<Form ref="form" model={this.state.form} rules={this.state.rules} labelWidth="100" labelPosition={"top"} >

						<Layout.Row>
							<Layout.Col sm="24" md={12}>
								<div className="grid-content">
									<div className="register-ruleForm d-font-bold" style={{margin: 20, borderRadius: 10 }}>
										<Layout.Row style={{ fontSize: 25, margin: "-1px 0px 15px 0px" }}>
											<Layout.Col span="24">
												<div className="grid-content d-content-highlight" style={{ borderRadius: "10px 10px 1px 1px" }}>
													<div className='d-font-bold d-black' style={{ display: "inline", marginLeft: 10 }}>{t("Checkout.Billing Details")}</div>
												</div>
											</Layout.Col>
										</Layout.Row>

										<Layout.Row>
											<Layout.Col span="12">
												<div className="grid-content bg-purple">
													<Form.Item label={t("Checkout.FIRST NAME")} prop="firstName" style={{ margin: 15 }}>
														<Input value={this.state.form.firstName} onChange={this.onChange.bind(this, 'firstName')} />
													</Form.Item>
												</div>
											</Layout.Col>
											<Layout.Col span="12">
												<div className="grid-content bg-purple-light">
													<Form.Item label={t("Checkout.LAST NAME")} prop="lastName" style={{ margin: 15 }}>
														<Input value={this.state.form.lastName} onChange={this.onChange.bind(this, 'lastName')} />
													</Form.Item></div>
											</Layout.Col>
										</Layout.Row>
										<Form.Item label={t("Checkout.EMAIL ADDRESS")} prop="email" style={{ margin: 15 }}>
											<Input value={this.state.form.email} onChange={this.onChange.bind(this, 'email')} />
										</Form.Item>
										<Form.Item label={t("Checkout.PHONE")} prop="phone" style={{ margin: 15 }}>
											<Input value={this.state.form.phone} onChange={this.onChange.bind(this, 'phone')} />
										</Form.Item>
										<Form.Item label={t("Checkout.Country")} prop="country" style={{ margin: 15 }}>
											<Select value={this.state.form.country} onChange={this.onChange.bind(this, 'country')} style={{ width: "100%" }}>
												{
													this.state.countryList.map((country, key) =>
														<Select.Option key={key} label={country} value={country} />
													)
												}
											</Select>
										</Form.Item>
										<Form.Item label={t("Checkout.STREET ADDRESS")} prop="streetAddress" style={{ margin: 15 }}>
											<Input value={this.state.form.streetAddress} onChange={this.onChange.bind(this, 'streetAddress')} />
										</Form.Item>

										<Form.Item label={t("Checkout.TOWN/CITY")} prop="city" style={{ margin: 15 }}>
											<Input value={this.state.form.city} onChange={this.onChange.bind(this, 'city')} />
										</Form.Item>

										<Form.Item label={t("Checkout.POST CODE/ZIP")} prop="zipCode" style={{ padding: 15 }}>
											<Input value={this.state.form.zipCode} onChange={this.onChange.bind(this, 'zipCode')} />
										</Form.Item>

										{/* <Form.Item label="Wallet Address" prop="walletAddress" style={{ margin: 15 }}>
											<Input value={this.state.form.walletAddress} onChange={this.onChange.bind(this, 'walletAddress')} />
										</Form.Item> */}
									</div>

								</div>
							</Layout.Col>

							<Layout.Col sm="24" md={12}>
								<div className="grid-content">
									<div className="register-ruleForm d-font-bold" style={{margin: 20, borderRadius: 10 }}>

										<Layout.Row style={{ fontSize: 25, margin: "-1px 0px 15px 0px" }}>
											<Layout.Col span="24">
												<div className="grid-content d-content-highlight" style={{ borderRadius: "10px 10px 1px 1px" }}>
													<div className='d-font-bold d-black' style={{ display: "inline", marginLeft: 10 }}>{t("Checkout.Additional Information")}</div>
												</div>
											</Layout.Col>
											<Layout.Col span="24">
												<div className="grid-content" style={{ borderRadius: "10px 10px 1px 1px", marginLeft: 20, marginTop: 20 }}>
													<div>
														<Checkbox.Group value={this.state.form.isGift} onChange={this.onChange.bind(this, 'isGift')}>
															<Checkbox label={"   "+ t("Checkout.THIS ORDER IS A GIFT")} name="isGift" />
														</Checkbox.Group>
													</div>
												</div>
											</Layout.Col>

											<Layout.Col span="24">
												<div className="grid-content" style={{ borderRadius: "10px 10px 1px 1px" }}>
													<div className='d-font-bold text-white d-text-14' style={{ display: "inline", marginLeft: 20 }}>{t("Checkout.ORDER NOTES (OPTIONAL)")}</div>
												</div>
											</Layout.Col>

											<Layout.Col span="24">
												<div className="grid-content" style={{ borderRadius: "10px 10px 1px 1px", paddingBottom:15, paddingRight:15 }}>
													<Input type="textarea" value={this.state.form.description} onChange={this.onChange.bind(this, 'description')} style={{ width: "95%", margin: "0px 20px 0px 20px" }} />
												</div>
											</Layout.Col>
										</Layout.Row>
									</div>

								</div>
								{/* <div style={{ padding: 20 }}>
									<Button onClick={this.onHelloSign.bind(this)}  className="d-font-bold d-text-28 w-100" style={{ color: "white", borderRadius: 10 }}>{t("Checkout.Hello Sign")}</Button>
								</div> */}
							</Layout.Col>

							<Layout.Col span={24}>
								<div className="grid-content">
									<div className="register-ruleForm d-font-bold" style={{ margin: 20, borderRadius: 10 }}>

										<Layout.Row style={{ fontSize: 25, margin: "-1px 0px 15px 0px" }}>
											<Layout.Col span="24">
											<div className="d-content-highlight d-font-strong d-black d-text-30" style={{padding: '24px 4%', display: 'flex', alignItems: 'center'}}>
												Your Orders
												<img className="img-mobile" src="imgs/account/orders/1.png" alt="" style={{marginLeft: 12, width:"30px"}} />
												</div>
											</Layout.Col>
											<TableBs style={{ margin: 0, fontSize: 15, color:"white" }} className="text-center d-content-center table-order">
												<thead>
													<tr style={{backgroundColor: 'white'}}>
														<th style={{backgroundColor:"#252730"}}>#</th>
														<th  style={{ minWidth: 130,backgroundColor:"#252730" }}>{t("Checkout.Product")}</th>
														<th  style={{ minWidth: 130 ,backgroundColor:"#252730"}}>{t("Checkout.Sub Total")}</th>
													</tr>
												</thead>
												<tbody>
													{
														this.state.productItems.map((item, key) =>
															<tr key={key} style={{backgroundColor: 'white', color:"black"}}>
																<td>{key + 1}</td>
																<td>{item.identifier}</td>
																<td>{item.subtotal}</td>
															</tr>
														)
													}
													<tr style={{backgroundColor: 'white', color:"black"}}>
														<td></td>
														<td>{t("Checkout.TOTAL")}</td>
														<td>$ {this.state.totalPrice}</td>
													</tr>

												</tbody>
											</TableBs>
										</Layout.Row>
									</div>
								</div>
							</Layout.Col>

							{
								

								////	TEST
								// (this.state.hellosignId || true) &&
								<Layout.Col span={24} style={{ zIndex: 100 }}>
									<div className="grid-content"
										style={{  margin: 20, borderRadius: 10 }}>
										<div style={{ margin: "2%" }}>
											<Radio value="1" checked={this.state.form.payCard === CRYPTO_MODE} onChange={this.onChangePaycard.bind(this)} className="d-font-bold d-text-28">&nbsp;&nbsp;{t("Checkout.PAY WITH CRYPTOCURRENCY")}</Radio>
											<div className='d-font-book d-text-28 ' style={{ fontWeight: 'bold'}}>{t("Checkout.Pay with cryptocurrency. If you pay in USDC or DAI, you must pay only on the ETHEREUM network!")}</div>
											{
												// this.state.form.payCard === CRYPTO_MODE && this.state.coinbaseId && this.state.hellosignId &&
												<div className="position-relative">
													<div className="position-absolute">
														<CoinbaseCommerceButton
															ref={elem => this.coinbaseRef = elem}
															checkoutId={this.state.coinbaseId}
															styled={true}
															onChargeSuccess={(result) => {this.onCryptoSuccess(result.data)}}
															onChargeFailure={() => console.log("Failure")} 
														/>
													</div>
													<div className="position-absolute w-100" style={{ height: 50, backgroundColor: 'white' }}>

													</div>
												</div>
											}
										</div>
										<div style={{ margin: "2%" }}>
											<Radio value="2" checked={this.state.form.payCard === PAYPAL_MODE} onChange={this.onChangePaycard.bind(this)} className="d-font-bold d-text-28">&nbsp; &nbsp;{t("Checkout.PAY WITH PAYPAL")}</Radio>
										</div>

										<div className="d-font-book d-text-30" style={{ margin: "2%" }}>
											<div>{t("Checkout.Your proposal data will be used to process your order, support your experience throughout this website, and for other purposes described in our")} &nbsp;</div>
											<button type="button" className="d-highlight">{t("Checkout.Privacy Policy")}</button>
										</div>
										<div className="d-flex">
											<Form.Item label="" prop="" className="ms-auto me-4">
												<Checkbox checked={this.state.form.isAgree} onChange={this.onChange.bind(this, 'isAgree')} label={ "   " + t("Checkout.I HAVE READ AND AGREE TO THE WEBSITE TEAMS AND CONDITIONS")} name="isAgree" className="d-font-bold" style={{ fontSize: "2em" }} />
											</Form.Item>
										</div>
										<div className="block" style={{ marginTop: 30 }}>
											<div className="wrapper position-relative" style={{ textAlign: "right", margin: "3% 3% 3% 0" }}>
												<Button onClick={this.handleSubmit.bind(this)} type="success" className={`d-font-bold d-text-28 w-50 text-white`} style={{ background: "#03ffa4", borderRadius: 10 }} disabled={!this.state.form.isAgree}>{t("Checkout.PLACE ORDER")}</Button>
												{
														this.state.form.payCard === PAYPAL_MODE && this.state.form.isAgree && this.state.totalPrice != 0 &&
														<div className="position-absolute top-0 end-0 w-50 opacity-0">
															<PayPalButton
																amount={this.state.totalPrice}
																onSuccess={(details, data) => { this.onPaypalSuccess(details, data) }}
																options={{
																	clientId: this.props.credentialData[0]?.paypalAppClientId
																}}
															/>
														</div>
												}


											</div>
										</div>
									</div>
								</Layout.Col>
							}



						</Layout.Row>
					</Form>
				</Fade>
			</div>
		)
	}
})

export default withTranslation() (Checkout)