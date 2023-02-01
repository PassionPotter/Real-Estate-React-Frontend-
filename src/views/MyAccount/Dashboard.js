
import { Button, Input, Notification } from 'element-react';
import React, { Component, useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router';
import { callGet, callPost } from '../../services/axios';
import { useTranslation } from "react-i18next";

export default function Dashboard (props) {

  const [verifyIdentity, setVerifyIdentity] = useState(false);
  const [walletInfo, setWalletInfo] = useState(false);
  const [hashValue, setHashValue] = useState(null);
  const {search} = useLocation()
  const user = JSON.parse(localStorage.getItem('user'));
  const { t } = useTranslation();

const getWallet = () => {
    callGet('/api/getSellTokenWalletAddress?id='+user.id)
    .then(res => {
      setWalletInfo(res.data)
    }).catch(err => {
    console.log(err);
    })
  }
  useEffect(()=>{
    getWallet()
  },[])

  useEffect(()=> {
    
    
    const urlParams = new URLSearchParams(search);
    const myParam = urlParams.get('verify_identity');
    
    if(myParam && !user?.card){

      setVerifyIdentity(true);

    }
  },[search])

  const onSubmit = () => {
    if(!hashValue)
    return;
  const token = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user'))['accessToken'] : null
  callPost('/api/admin/orderAddWallet', {id:walletInfo.orderId, hash: hashValue}, token)
  .then(res => {
    Notification.success({
      title: t("Dashboard.Success"),
      message: t("Dashboard.Wallet updated successfully"),
      type: 'Success',
    })
    setHashValue(null);
    getWallet()
  }).catch(err => {
  console.log(err);
  })
}

    return (
      <>
        <div className="d-content-highlight d-font-strong d-black d-text-30" style={{padding: '24px 4%', display: 'flex', alignItems: 'center'}}>
          {verifyIdentity && <div><p className=" text-red-600 font-bold text-2xl">{t("Dashboard.ALERT")}: </p><b className="text-xl">{t("Dashboard.Please click on \"ID verification\" tab and upload your ID to verify.")}</b></div>}
          {walletInfo?.orderId && (<div><p className=" text-red-600 font-bold text-2xl">{t("Dashboard.IMPORTANT ALERT")}: </p><b className="text-xl">{t("Dashboard.Please transfer")} {walletInfo.tokenQuantity} {t("Dashboard.tokens to the given wallet address")} <b className=" text-white bg-green-800 rounded-lg">{walletInfo.wallet}</b> {t("Dashboard.to complete order")} # {walletInfo.orderId}. {t("Dashboard.To view details against order")} # {walletInfo.orderId} {t("Dashboard.please click on 'ORDERS' tab")}.</b></div>)}
          {!verifyIdentity && !walletInfo?.orderId && t("Dashboard.Welcome to")}
         
        </div>
        <div className="d-font-book d-text-32" style={{padding: '24px 12px'}}>
          {
            walletInfo?.orderId && (
              <>
                <Input type="text" placeholder={t("Dashboard.Transaction hash")} value={hashValue} onChange={(val)=>setHashValue(val)}/>
                <Button className="mt-2 bg-blue-600 text-blue-900" onClick={onSubmit}>{t("Dashboard.Submit")}</Button>
              </>
            )
          }
          {!(walletInfo?.orderId) && <span dangerouslySetInnerHTML={{__html:t("Dashboard.desc-1")}}></span>}
          
        </div>
      </>
    )
  
}

// export default Dashboard;
