
import React, { Component, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, FormControl } from 'react-bootstrap';
import Fade from 'react-reveal/Fade';
import { actionPropertiesSellTokenList } from "../../redux/actions/property";
import { Input, Layout, Select, Checkbox, Notification } from "element-react"
import { callPost } from '../../services/axios';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { useTranslation } from "react-i18next";

export default function SellTokens() {

  const dispatch = useDispatch();

  // const [orderItems, setOrderItems] = useState([]);
  const orderItems = useSelector(state => state.property.sellTokenProperties);
  const { t } = useTranslation();
  const [newOrder, setNewOrder] = useState({
    selectedProperty: null,
    isChecked: null,
    tokenQuantity: null,
    tokenValue: null,
    salePrice: null,
    subTotal: null,
    dineliFee: null,
    processingFee: null,
    totalPrice: null,
    tokenAddress: null
  });
  const [isAgreed, setIsAgreed] = useState(false);
  const sitesettings = useSelector(state => state.sitesettings.sitesettingsData);
  const __history = useHistory();
  const user = JSON.parse(localStorage.getItem('user'));
  useEffect(() => {
    // window.scrollTo(0, 0);
    let period = sitesettings?.[0]?.tokenBuyBackPeriod
    const ID = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user'))?.['id'] : null
    if(period)
      dispatch(actionPropertiesSellTokenList({ period, ID }));
  }, [sitesettings]);

  const onSubmit = () => {

    const details = [
      {
        tokenQuantity: newOrder.tokenQuantity,
        productId: (JSON.parse(newOrder.selectedProperty)).productId,
				tokenValue: newOrder.tokenValue,
        tokenAddress:newOrder.tokenAddress
      }
    ]
    
    const payload = {
      userId: user.id,
      status: 'pending',
      totalPrice: newOrder.totalPrice,
      count: newOrder.tokenQuantity,
      paymentMethod: null,
      details: JSON.stringify(details),
      signatureId: null,
      orderType: 'sell',
      dineliFee: newOrder.dineliFee,
      processingFee: newOrder.processingFee
    }
    const token = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user'))['accessToken'] : null
    callPost('/api/saveSellTokenOrder', payload, token)
      .then(res => {
        Notification.success({
          title: t("SellTokens.Success"),
          message: t("SellTokens.Sell token request success"),
          type: 'Success',
        })
        setTimeout(() => {
          __history.push('my-account')
        }, 2000)
      }).catch(err => {
        console.log(err);
      })
  }

  const onFormChange = (key, value) => {
    let newData = { ...newOrder };
    if (key === 'selectedProperty') {

      if (typeof value === 'string') {
        let selectedProperty = JSON.parse(value);
        newData = { ...newData, ...selectedProperty }

      }
    }
    else if (key === 'tokenQuantity' && typeof newData.selectedProperty === 'string') {

      let selectedProperty = JSON.parse(newData.selectedProperty);
      value = parseInt(value);
      value = (value < 0 ? 0 : (value > selectedProperty.tokenQuantity ? selectedProperty.tokenQuantity : value))
      newData.salePrice = newData.subTotal = parseFloat(value * newData.tokenValue).toFixed(2);
      if (newData.subTotal > 0) {
        newData.dineliFee = parseFloat((newData.subTotal / 100) * 1.5).toFixed(2);
        newData.processingFee = parseFloat((newData.subTotal / 100) * 1.5).toFixed(2);
        newData.totalPrice = parseFloat(parseFloat(newData.subTotal) - (parseFloat(newData.dineliFee) + parseFloat(newData.processingFee))).toFixed(2);
      }
      else {
        newData.dineliFee = 0;
        newData.processingFee = 0;
        newData.totalPrice = 0;
      }
    }
    setNewOrder({ ...newData, [key]: value });

  }

  useEffect(() => {
    onFormChange('tokenQuantity', JSON.parse(newOrder?.selectedProperty)?.tokenQuantity);
  }, [newOrder.selectedProperty])

  return !user?.id ? (
    <div style={{backgroundColor:"#fff", paddingBottom:100}}>
      <Fade>
        <div className="img-box img-box-sell-tokens">
          <Fade bottom delay={200}>
            <div style={{ margin: "10% 12% 10% 12%" }}>
              <div className="col-md-6">
                <div className="d-highlight d-font-black d-text-82">
                  {t("SellTokens.Sell Tokens")}
                </div>
              </div>
            </div>
          </Fade>
        </div>
      </Fade>
      <div className="ml-20 mr-20 mt-5 mb-5 border-2 p-14 text-center" style={{borderColor:"#DBA87E", color:"#DBA87E"}}>

        <span className="text-2xl">{t("SellTokens.Sign in to sell your tokens!")}</span>
        <br />
        <Link to="/my-account" className="no-underline " style={{ color:"#DBA87E"}}>
          <button className="text-center mt-4 border-4 p-3 pt-1 pb-1 rounded-full ">
            {t("SellTokens.SIGN IN")}
          </button>
        </Link>
      </div>

    </div>
  ) : (
    <div style={{backgroundColor:"#fff"}}>
      <Fade>
        <div className="img-box img-box-team">
          <Fade bottom delay={200}>
            <div style={{ margin: "10% 12% 10% 12%" }}>
              <div className="col-md-6">
                <div className="d-highlight d-font-black d-text-82">
                  {t("SellTokens.Sell Tokens")}
                </div>
              </div>
            </div>
          </Fade>
        </div>
      </Fade>
      <div style={{ margin: "6% 12% 2% 12%" }}>
        <div className="d-highlight d-font-black d-text-48">
          {t("SellTokens.Tokens")}
          <span style={{ padding: '2%' }} />
          <img className="img-mobile" src="imgs/tokens/token.png" alt="Token" />
        </div>
        <div style={{ height: 24 }} />
        <div className=" d-font-mont-regular d-text-32" dangerouslySetInnerHTML={{__html:t("SellTokens.desc-1")}}>
          
        </div>
      </div>
      <Fade>
        <div className="img-box img-box-token">
          <Fade bottom delay={200}>
            <div style={{ margin: "12% 16% 6% 16%" }}>
              <div className="text-white d-font-book d-text-36" dangerouslySetInnerHTML={{__html:t("SellTokens.desc-2")}}>
              </div>
              <div className="row">
                <div className="col-md-2" style={{ marginTop: 30 }}>
                  <Button className="d-font-mont-bold d-text-24 btn-second" style={{ width: '100%' }} >{t("SellTokens.SOLD OUT")}</Button>
                </div>
                <div className="col-md-5" style={{ marginTop: 30 }}>
                  <Button className="d-font-mont-bold d-text-24 btn-second" style={{ width: '100%' }}>{t("SellTokens.UNDER RENOVATION")}</Button>
                </div>
                <div className="col-md-4 ml-8" style={{ marginTop: 30 }}>
                  <Button className="d-font-mont-bold d-text-24 btn-second" style={{ width: '100%' }}>{t("SellTokens.OFFERING CLOSED")}</Button>
                </div>
              </div>
            </div>
          </Fade>
        </div>
      </Fade>
      <div style={{ margin: "6% 12% 0% 12%" }}>
        <div className="d-content-highlight text-white d-font-black d-text-36" style={{ padding: '10px 20px' }}>
          + {t("SellTokens.Sell Tokens From Property")}
        </div>
        <div className="" style={{ borderRadius: '0 0 8px 8px', padding: '4% 2%', marginBottom: 36, backgroundColor:"#786E64" }}>
          <div className="row">
            <div className="col-md-6" style={{ marginBottom: 12 }}>
              <div className="text-white d-font-bold d-text-24" style={{ marginBottom: 12 }}>
                {t("SellTokens.Property")}
              </div>

              <Select className="w-100 d-font-bold d-text-18" placeholder="Select a property" value={newOrder?.selectedProperty} onChange={val => onFormChange('selectedProperty', val)}>
                {
                  orderItems.map(item => (item.tokenQuantity > 0) && <Select.Option value={JSON.stringify(item)} label={`${item.title} (${item.tokenQuantity})`}>{`${item.title} (${item.tokenQuantity})`}</Select.Option>)
                }
              </Select>
            </div>
            <div className="col-md-1" style={{ marginBottom: 12 }}>
              <div className="text-white d-font-bold d-text-24" style={{ marginBottom: 12 }}>{t("SellTokens.Tokens")}</div>
              <Input className="d-font-bold d-text-18" placeholder="0" type="number" defaultValue={parseInt(newOrder.tokenQuantity)} step="any" value={parseInt(newOrder.tokenQuantity)} onChange={val => onFormChange('tokenQuantity', val)} />
            </div>
            <div className="col-md-2" style={{ marginBottom: 12 }}>
              <div className="text-white d-font-bold d-text-24" style={{ marginBottom: 12 }}>{t("SellTokens.Price-Token")}</div>

              <Input className="d-font-bold d-text-18" placeholder="$0.00" type="number" disabled={true} step="any" value={newOrder.tokenValue} />
            </div>
            <div className="col-md-3" style={{ marginBottom: 12 }}>
              <div className="text-white d-font-bold d-text-24" style={{ marginBottom: 12 }}>{t("SellTokens.Sale Price")}</div>
              <Input className="d-font-bold d-text-18" placeholder="$0.00" type="number" step="any" value={newOrder.salePrice} disabled={true} />
            </div>
          </div>

        </div>
        <div className="d-flex text-end align-items-center mb-3" style={{ marginRight: '5%' }}>
          <div className="d-highlight d-font-mont-bold d-text-24 ms-auto" style={{ marginRight: 24 }}>{t("SellTokens.SUBTOTAL")}</div>
          <Input className="wp-128" value={newOrder.subTotal} disabled={true} />
        </div>
        <div className="d-flex text-end align-items-center mb-3" style={{ marginRight: '5%' }}>
          <div className="d-highlight d-font-book d-text-18 ms-auto" style={{ marginRight: 24 }}>{t("SellTokens.DINELI FEE")} (1.5%)</div>
          <Input className="wp-128" value={newOrder.dineliFee} disabled={true} />
        </div>
        <div className="d-flex text-end align-items-center mb-4" style={{ marginRight: '5%' }}>
          <div className="d-highlight d-font-book d-text-18 ms-auto" style={{ marginRight: 24 }}>(t{"PROCESSOR FEE"}) (1.5%)</div>
          <Input className="wp-128" value={newOrder.processingFee} disabled={true} />
        </div>
        <div className="text-end align-items-center mb-4" style={{ height: 7 }}>
          <div className="d-content-highlight ms-auto" style={{ width: '40%', minWidth: 250, height: '100%' }} />
        </div>
        <div className="d-flex text-end align-items-center mb-5" style={{ marginRight: '5%' }}>
          <div className="d-highlight d-font-mont-bold d-text-24 ms-auto" style={{ marginRight: 24 }}>{t("SellTokens.TOTAL SALE")}</div>
          <Input className="wp-128" value={newOrder.totalPrice} disabled={true} />
        </div>
        <div className="d-flex" style={{ marginBottom: 24, marginRight: '5%' }}>
          <Checkbox checked={newOrder.isChecked} onChange={val => onFormChange('isChecked', val)} className="d-font-book d-text-18 ms-auto">{t("SellTokens.I verify that these values are correct.")}</Checkbox>
        </div>
        <div className="text-end" style={{ paddingBottom: 120 }}>
          <Button className="d-font-black d-text-24" style={{ width: '32%', maxWidth: 436, padding: '1% 0' }} disabled={!newOrder.isChecked} onClick={onSubmit}>{t("SellTokens.SELL TOKENS")}</Button>
        </div>
      </div>
    </div>
  )
}
