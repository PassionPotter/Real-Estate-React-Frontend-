import React, { useState, useRef,useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import Fade from "react-reveal/Fade"
import {  Form, Input, Layout, Notification,Select } from "element-react"
import {Row, Col, Table, Button} from 'react-bootstrap'
import { useTranslation } from "react-i18next";
import { actionPropertyList, actionPropertyGet } from "../../redux/actions/property";
import { callPost } from '../../services/axios';
import { actionUserList } from "../../redux/actions/user";
import { actionOrderWhitelist } from '../../redux/actions/order';
import { actionTokenList } from "../../redux/actions/token";

const AccountWhitelist = props => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const properties = useSelector(state => state.property.propertyData);
    const tokens = useSelector(state => state.token.tokenData);
    const users = useSelector(state => state.user.userData);
    const [propertyId, setProperty] = useState(0);
    const [quantity, setQuantity] = useState(0);
    const [wallet, setWallet] = useState('');
    const [hash, setHash] = useState('');
    let details = [];
    useEffect(() => {
        dispatch(actionTokenList());
        dispatch(actionPropertyList());
        dispatch(actionUserList());
    }, [])
    const user = JSON.parse(localStorage.getItem('user'));
    const onSubmit = () => {
        if(quantity == 0 || wallet == "" || propertyId == 0) return;
        if(!user.walletAddress) {
            Notification.error({
                title: t("Failed"),
                message: t("please insert your wallet address"),
                type: 'Warning',
            });
            return
        }
        let tokenAddress = '';
        let salePrice = 0;
        details = [];
        tokens.map((token, key) => {
            if(token.propertyId == propertyId)
            {
                tokenAddress = token.tokenAddress;
                salePrice = token.salePrice;
            }
        })
        details.push({
            tokenAddress: tokenAddress,
            tokenQuantity: quantity,
            toAddress: user.walletAddress,
            productId: propertyId,
            tokenValue: salePrice,
            hash:hash,
        })
        const data = {
            status: "pending",
            paymentMethod: "whitelist",
            details: JSON.stringify(details),
            userId: user.id,
            f_totalprice: 0,
            orderType: "buy",
            count:quantity,
            totalPrice: quantity * salePrice
        }
        details = [];
        details.push({
            tokenAddress: tokenAddress,
            tokenQuantity: quantity,
            toAddress: user.walletAddress,
            productId: propertyId,
            tokenValue: salePrice,
            hash:hash
        })
        const selldata = {
            status: 'pending',
            paymentMethod: "whitelist",
            orderType: "sell",
            count:quantity,
            details: JSON.stringify(details),
            totalPrice: quantity * salePrice
        }
        users.forEach(user => {
            if(user.walletAddress == wallet)
                selldata['userId'] = user.id
        })
        if(!selldata['userId']) {
            Notification.error({
                title: t("Failed"),
                message: t("wallet is not correct\n please insert your wallet address exactly"),
                type: 'Warning',
            });
            return
        }
        dispatch(actionOrderWhitelist(selldata))
        dispatch(actionOrderWhitelist(data))
    }

    return (
        <>
            <div className="d-content-highlight d-font-strong d-black d-text-30" style={{padding: '24px 4%', display: 'flex', alignItems: 'center'}}>
                Whitelist
                <img className="img-mobile" src="imgs/account/orders/1.png" alt="" style={{marginLeft: 12, width:"30px"}} />
                <br/>
            </div>
            <div className="overflow-auto">
              <Table striped hover  style={{ margin: 0 }} className="text-center d-content-center table-order">
                <thead>
                  <tr className="text-white d-text-24" style={{backgroundColor: 'white'}}>
                    <th style={{ minWidth: 130,backgroundColor:"#252730" }}>Wallet Address</th>
                    <th style={{ minWidth: 130,backgroundColor:"#252730" }}>Token Quantity</th>
                    <th style={{ minWidth: 130,backgroundColor:"#252730" }}>Transaction Hash</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                        <Input className="d-font-bold d-text-18" type="text" placeholder="wallet address" onChange={val => setWallet(val)} />
                    </td>
                    <td>
                        <Input className="d-font-bold d-text-18" type="number" onChange={val => setQuantity(val)} />
                    </td>
                    <td>
                        <Input className="d-font-bold d-text-18" type="text" placeholder="transaction hash" onChange={val => setHash(val)}/>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </div>
            <br/>
            <Row className="mt-3">
                <Col md="3">
                    <Select className="w-100 d-font-bold d-text-18" placeholder="Select a property" onChange={val => setProperty( val)}>
                        {
                            properties.map(item => (<Select.Option value={item.id} label={item.address1}>{item.address1}</Select.Option>)) 
                        }
                    </Select>
                </Col>
                <Col>
                    <Button className="d-font-bold d-black d-text-30 d-content-highlight" onClick={onSubmit} style={{ width:"86px", height:'36px' }}>Submit</Button>
                </Col>
            </Row>
        </>
    )
}

export default AccountWhitelist