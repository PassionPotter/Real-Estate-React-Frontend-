import React, { useEffect, useState } from "react";
import { Layout, Icon, Notification, Input, Checkbox } from 'element-react';
import { Link, useHistory, useParams } from "react-router-dom";
import { Table as TableBs, Button, Row, Col, Form, Modal } from 'react-bootstrap';
import './Cart.css';
import { useDispatch, useSelector } from "react-redux";
import { actionPropertyGet } from "../../redux/actions/property";
import { actionUserOrderGet } from "../../redux/actions/order";
import { getPurchasePrice, getTotalWithPurchasePrice } from "../../services/calc";
import { useTranslation } from "react-i18next";
import { callGet, callPost } from "../../services/axios";

const TYPES = ['', 'basic', 'gold', 'premium'];

const Cart = props => {
	const { t } = useTranslation();
	const [learnMore, setLearnMore] = useState(true);
	const history = useHistory();
	const { productID } = useParams();
	const dispatch = useDispatch();
	const [couponStatus, setCoupon] = useState(false);
	const product = useSelector(state => state.property.currentHouse);
	const user = useSelector(state => state.auth.user);
	const userOrder = useSelector(state => state.order.userOrder);
	const [isModalVisible, setModalVisible] = useState(false);
	// console.log('product', product);
	// console.log('user', user);
	const [products, setProducts] = useState([]);
	const [quantityValues, setQuantityValues] = useState({});
	const fee = 0; // for now it's hardcoded but need to use in code.
	let code = "";

	useEffect(() => {
		const user = localStorage.getItem('user');
		if (!user) {
			localStorage.removeItem('cartProducts');
			history.goBack();
		}
		window.scrollTo(0, 0);
	}, []);

	useEffect(() => {
		// console.log('user', user);
		dispatch(actionPropertyGet(productID));
		dispatch(actionUserOrderGet(user.id));
	}, [productID]);

	useEffect(() => {
		let carts = [];
		let cartProducts = JSON.parse(localStorage.getItem('cartProducts'));
		cartProducts = cartProducts && cartProducts.length ? cartProducts : [];
		carts = cartProducts.slice();
		const productIndex = carts.findIndex(item => item.address1 == 'coupon');
		console.log(productIndex);
		if(productIndex > 0 ) { 
			carts.splice(productIndex, 1);
			setCoupon(true);
		}
		const dicountIndex = carts.findIndex(item => item.id == -1);
		if(dicountIndex > 0) {
			carts.splice(dicountIndex, 1);
		}
		if (productID === 'null') {
			console.log(carts)
			setProducts(carts);
		} else {

			if (!product || Object.keys(product).length === 0) return;

			if (!carts.find(p => p.id === product.id)) {
				carts.push(product);
				cartProducts.push(product);
			}
			setProducts(carts);
			if (carts.length > 0) localStorage.setItem('cartProducts', JSON.stringify(cartProducts));
		}

		console.log(JSON.parse(localStorage.getItem('cartProducts')), 'tttttttttttttttttttttttttttttt');

		// Set quantity state
		let quantityArray = {}
		for (let product of cartProducts) {
			quantityArray[product.id.toString()] = product.tokenQuantity ? Number(product.tokenQuantity) : 0;
		}
		setQuantityValues(quantityArray);


	}, [product]);

	const handleLearnMore = () => {
		setLearnMore(!learnMore);
	}

	const changeCode = (value) => {
		code = value;
	}

	const onInputChange = (key, val) => {
		let quantityClone = Object.assign({}, quantityValues);
		quantityClone[key] = val;
		setQuantityValues(quantityClone);
		let carts = JSON.parse(localStorage.getItem('cartProducts'));
		let productsClone = [...carts];
		let ind = productsClone.findIndex(product => product.id === Number(key));
		productsClone[ind].tokenQuantity = val;
		localStorage.setItem('cartProducts', JSON.stringify(productsClone));

	}

	const onItemRemove = (productId) => {
		console.log('[enter]', productId);
		let storageItems = JSON.parse(localStorage.getItem('cartProducts'));
		let productIndex = storageItems.findIndex(item => item.id === productId);
		console.log(storageItems, productIndex);
		storageItems.splice(productIndex, 1);
		localStorage.setItem('cartProducts', JSON.stringify(storageItems));
		productIndex = storageItems.findIndex(item => item.address1 == 'coupon');
		if(productIndex > 0) storageItems.splice(productIndex, 1);
		setProducts(storageItems);

		let quantityClone = quantityValues;
		delete quantityClone[productId.toString()];
		setQuantityValues(quantityClone);

		history.push('/cart/null');
	}

	const onModalClose = () => {
		setModalVisible(false);
		setCoupon(false);
	}

	const submitCouponRequest = () => {
		setModalVisible(false);
		const data = {
			id:user.id,
			coupon: code,
		}
		callPost('/api/pay/checkCoupon', data).then(res => {
			if(!res.data[0]) {
				Notification.error({
					title: 'Coupon code Error',
					message: `Your coupon code is in correct!`,
					type: 'Warning',
				})
				return;
			}
			let amount = -(res.data[0].amount);
			const coupon = {
				id: 0,
				address1: 'coupon',
				fee: '0',
				tokenValue: amount,
				tokenQuantity: 1,
				code: res.data[0].coupon,
				original: amount
			}
			let cartProducts = JSON.parse(localStorage.getItem('cartProducts'));
			if(!cartProducts.find(p => p.address1 === 'coupon'))
				cartProducts.push(coupon);
			localStorage.setItem('cartProducts', JSON.stringify(cartProducts));
			console.log(JSON.parse(localStorage.getItem('cartProducts')))
			setCoupon(true);
		})
	}

	const onProceed = () => {
		// console.log('user', user);
		// console.log('userOrder', userOrder);
		// console.log('cartproducts', products);
		// console.log('quantityValues', quantityValues);
		let keys = Object.keys(quantityValues);
		if(keys.length === 0){
			Notification.error({
				title: 'Quantity Error',
				message: `Your cart is empty!`,
				type: 'Warning',
			})
			return;
		}
		for(let i=0; i<keys.length; i++){
			if (quantityValues[keys[i]] < 1) {								
				Notification.error({
					title: 'Quantity Error',
					message: `You should input Quantity more than 1 or remove from cart.`,
					type: 'Warning',
				})
				return;
			}
		}
		let tokenCount = 0;
		let userType = TYPES[user.type || 0];
		// console.log('usertype',user.type);
		if (products.length && userType) {
			for (let i = 0; i < products.length; i++) {
				tokenCount = 0;
				if (userOrder.length > 0) {
					for (let j = 0; j < userOrder.length; j++) {
						if (products[i].tokenAddress === userOrder[j].details[0].tokenAddress) {
							tokenCount += Number(userOrder[j].details[0].tokenQuantity);
						}
					}
				}
				
				console.log('total',tokenCount,Number(quantityValues[products[i].id]),tokenCount + Number(quantityValues[products[i].id]), products[i][userType]);
				if (tokenCount + Number(quantityValues[products[i].id]) > products[i][userType]) {
					
					Notification.error({
						title: 'Proceed to checkout failed',
						message: `You can buy up to ${products[i][userType]} ${products[i].tokenSymbol} Token`,
						type: 'Warning',
					})
					return;
				}
			}
		}

		let cartProducts = JSON.parse(localStorage.getItem('cartProducts'));
		let total = 0; let coupon = 0;
		cartProducts.forEach(cart => {
			if(cart.address1 != 'coupon')
				total += getTotalWithPurchasePrice(getPurchasePrice(cart.tokenValue, fee), Number(cart.tokenQuantity));
			else 
				 coupon = cart.original;
		})
		console.log(coupon, 'coupon', total)
		callPost('/api/order/checkDiscount', {id: user.id})
		.then(res => {
			if(res.data) {
				let com = parseFloat((total / 100) * parseFloat(res.data.referral)).toFixed(2);
				total = Number(total) - Number(com);
				console.log(com, 'discount');
				const discount = {
					id: -1,
					address1: 'Discount First Order ' + res.data.referral + '%',
					fee: '0',
					tokenValue: -com,
					tokenQuantity: 1,
				}
				let cartProducts = JSON.parse(localStorage.getItem('cartProducts'));
				if(!cartProducts.find(p => p.id == -1))
					cartProducts.push(discount);
				localStorage.setItem('cartProducts', JSON.stringify(cartProducts));
			}
		})
		if(total < -Number(coupon))
		{
			let ind = cartProducts.findIndex(product => product.address1 == 'coupon');
			cartProducts[ind].tokenValue = -total;
			console.log(coupon, 'coupon', total, cartProducts[ind].tokenValue, ind)
			localStorage.setItem('cartProducts', JSON.stringify(cartProducts));
			cartProducts = JSON.parse(localStorage.getItem('cartProducts'));
			console.log(cartProducts)
		}
		history.push('/checkout');
	}

	return (
		<div style={{ padding: "3% 12%", border: "none", backgroundColor:"#fff"}}>
			<Layout.Row>
				<Layout.Col span="24">
					<div className="grid-content">
						<div className="block">
							<span className="wrapper">
								<Link to='/marketplace'>
									<Button type="success" className="d-font-bold d-text-28"
										style={{ background: "#03ffa4", color: "white", borderRadius: 10 }}>{t("Cart.CONTINUE SHOPPING")}</Button>
								</Link>
							</span>
						</div>
					</div>
				</Layout.Col>
			</Layout.Row>

			<TableBs striped hover style={{ margin: 0, backgroundColor:"#dba87e", color:"white" }} className="text-center mt-4" >
				<thead>
					<tr>
						<th style={{backgroundColor:"#252730"}}></th>
						<th style={{backgroundColor:"#252730"}}>{t("Cart.Asset")}</th>
						<th  style={{ minWidth: 100 ,backgroundColor:"#252730"}}>{t("Cart.Token Price")}</th>
						<th  style={{ minWidth: 100 ,backgroundColor:"#252730"}}>{t("Cart.Total Fees")}</th>
						<th  style={{ minWidth: 100 ,backgroundColor:"#252730"}}>{t("Cart.Purchase Price")}</th>
						<th  style={{ minWidth: 200 ,backgroundColor:"#252730"}}>{t("Cart.Quantity")}</th>
						<th  style={{ minWidth: 110,backgroundColor:"#252730" }}>{t("Cart.Subtotal")}</th>
					</tr>
				</thead>
				<tbody>
					{
						products.map((item, key) =>
							<tr key={key}>
								<td>
									<div onClick={() => onItemRemove(item.id)} >
										<Icon className="product-cart-delete" name="circle-cross" style={{ color: "white", cursor: "pointer" }} />
									</div>
								</td>
								<td>
									<img src={`${process.env.REACT_APP_API_ENDPOINT}/public/${item.imageData[0]}`} alt="img" width="100" />
								</td>
								<td>${item?.tokenValue}</td>
								<td>${fee}</td>
								<td>${getPurchasePrice(item?.tokenValue, fee).toFixed(2)}</td>
								<td><Input type="number" value={quantityValues[item.id.toString()]} onChange={val => onInputChange(item.id.toString(), val)} /></td>
								<td>${getTotalWithPurchasePrice(getPurchasePrice(item?.tokenValue, fee), quantityValues[item.id.toString()]).toFixed(2)}</td>
							</tr>
						)
					}

				</tbody>
			</TableBs>

			<Layout.Row>
				<Layout.Col span="24" style={{ marginTop: 30, textAlign: "right" }}>
					<div className="grid-content">
						<div className="block">
							<span className="wrapper">
								{/* <Button type="success" className="d-font-bold d-text-28" style={{ background: "#03ffa4", color: "black", borderRadius: 10 }}>UPDATE CART</Button> */}
							</span>
						</div>

					</div>
				</Layout.Col>
			</Layout.Row>

			<Layout.Row>
				<Layout.Col md="14" style={{ marginTop: 20 }}>
					<div className="grid-content">
					</div>
				</Layout.Col>

				<Layout.Col md="10" style={{ marginTop: 20 }}>
					<div className="grid-content">
						<div className="block">
							<label className="d-font-bold d-text-48">{t("Cart.Cart Totals")}</label>
						</div>
						<Layout.Row style={{ marginTop: 30 }}>
							<Layout.Col span="12">
								<div className="grid-content d-font-bold d-text-28">{t("Cart.Total")}</div>
							</Layout.Col>
							<Layout.Col span="12">
								<div className="grid-content d-font-bold d-text-28"
									style={{ textAlign: "right" }}>
									${products.reduce((a, b) => a + getTotalWithPurchasePrice(getPurchasePrice(b?.tokenValue,fee) , quantityValues[b.id.toString()]), 0)}
								</div>
							</Layout.Col>
						</Layout.Row>
						<div className="block" style={{ marginTop: 30 }}>
							<span className="wrapper">
								{/* <Link to={'/checkout'}> */}
								<Button type="success" className="d-font-bold d-text-28"
									style={{
										width: "100%",
										background: "#03ffa4",
										color: "white",
										borderRadius: 10
									}}
									onClick={onProceed}
								>{t("Cart.PROCEED TO CHECKOUT")}
								</Button>
								{/* </Link> */}
							</span>
						</div>
						<br/>
						<Checkbox label={"I will use coupon code..."} onChange={() => setModalVisible(true)} checked={couponStatus} disabled={couponStatus} />	
						<Modal show={isModalVisible} onHide={() => onModalClose()}>
							<Modal.Header closeButton>
							<Modal.Title>{t("Cart.Coupon Discount")}</Modal.Title>
							</Modal.Header>

							<Modal.Body>
								{t("Cart.If you have a coupon code, please use coupon code... you can discount token prices.")}
								<Input onChange={(val)=>changeCode(val)}/>
							</Modal.Body>

							<Modal.Footer>
							<Button variant="secondary" onClick={() => onModalClose()}>{t("home.Cancel")}</Button>
							<Button variant="primary" onClick={() => submitCouponRequest()}>{t("home.Submit Request")}</Button>
							</Modal.Footer>
						</Modal>
						<div style={{ border: "1px solid #dba87e", marginTop: 20 }}>
							<div className="block" style={{ textAlign: "center", margin: 10 }}>
								<label className="d-font-bold d-text-24">{t("Cart.IS THIS ORDER A GIFT?")}</label>
							</div>
							<div className="block" style={{ textAlign: "center" }}>
								<label onClick={handleLearnMore} className="d-font-bold d-text-24"
									style={{ textDecoration: "underline" }}>{t("Cart.Learn More")} </label>
							</div>
							{learnMore &&
								<div className="block" style={{ textAlign: "justify", margin: 20 }}>
									<p className="d-font-book d-text-20">{t("Cart.To make your order a gift, just check 'This order is a gift' at checkout, then enter the recipient's name, email, and your preferred delivery date. We'll email you a printable certificate to give in person, and we'll email that certificate to the gift recipient on the delivery date, too.")} </p>

									<p className="d-font-book d-text-20">{t("Cart.The recipient can follow a simple link or QR code to register and complete ID verification, including registering an Ethereum wallet. When they're done, we'll dispense their gift tokens!")}</p>

									<p className="d-font-book d-text-20"><strong>{t("Cart.Note")}:</strong> {t("Cart.Tokens may not yet be gifted to minors.")}</p>

									<p className="d-font-book d-text-20"><strong>{t("Cart.Important")}: </strong>{t("Cart.Gift recipients who are U.S. citizens or residents must be verified as Accredited Investors before we can dispense their gifts.")}
									</p>
								</div>}
						</div>
					</div>
				</Layout.Col>
			</Layout.Row>

		</div>
	)
}

export default Cart;