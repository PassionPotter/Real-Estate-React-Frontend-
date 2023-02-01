import React, {Component, Fragment, useEffect, useState} from "react";
import {Layout, Input, Button, Notification} from 'element-react';
import {AiFillUpCircle, AiFillDownCircle} from "react-icons/ai";
import { callGet, callPost } from "../../services/axios";
import { actionUserList } from "../../redux/actions/user";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";



function AffiliateURLs () {

        const { t } = useTranslation();
        const user = JSON.parse(localStorage.getItem('user'));
        const [pageURL, setpageUrl] = useState('https://tokized.immo/#/')
        const [referralURL, setReferralURL] = useState('https://tokized.immo/#/ref/'+user.username)
        const [referralLink, setReferralLink] = useState(false)
        const [referralsData, setReferralsData] = useState([])
        const [coupon, setCoupon] = useState([])
        const dispatch = useDispatch();
        const users = useSelector(state => state.user.userData);
        let amount = 0;
    
    const handleReferralLink = () => {
        setReferralLink(!referralLink)

    }

    const handleGenerateURL = () => {
        setReferralURL(`${pageURL}/ref/${user.username}`)
    }

    const urlChangeHandler = (val) => {
        setpageUrl(val)
    }

    const requestPay = () => {
        if(!amount) return;
        const data = {
            id: user.id,
            amount: amount
        }
        callPost('/api/pay/request', data)
		.then(res => {

			if(res.data){
				setCoupon(res.data);
			}

		}).catch(err => {
		  console.log('[Fail]', err);
		})
    }

    const requestCash = () => {
        if(!amount) return;
        const data = {
            id: user.id,
            amount: amount
        }
        callPost('/api/pay/requestCash', data)
		.then(res => {
            Notification.success({
                title: 'Success',
                message: 'Your request submit success',
                type: 'success',
                duration: 5000
            });
            if(res.data) {
                setCoupon(res.data);
            }
		}).catch(err => {
		  console.log('[Fail]', err);
		})
    }

    useEffect(() => {
        callGet('/api/getReferralsData?ID='+user.id)
		.then(res => {

			if(res.data){
				// set state
				setReferralsData(res.data)
			}

		}).catch(err => {
		  console.log('[Fail]', err);
		})
        dispatch(actionUserList(100));
        callGet('/api/pay/getCoupon?id='+user.id)
        .then(res => {
            if(res.data) {
                setCoupon(res.data);
            }
        })
    },[])

    
        return (<>
            <Layout.Row style={{border: "1px solid #03ffa4"}}>
                <Layout.Col className="d-font-bold d-text-36" span="24"
                            style={{background: "#03ffa4", padding: "15px 0 15px 20px"}}>
                    <div className="grid-content bg-purple-dark">{t("affiliateDashboard.affiliateUrl.Affiliate URLs")}</div>
                </Layout.Col>
                <div style={{margin: "90px 20px 20px 20px"}}>
                    <span className="d-font-book d-white">{t("affiliateDashboard.affiliateUrl.Your affiliate username is")}: {user.username}</span>
                    <span className="d-font-bold d-highlight"></span>
                </div>
                <div style={{margin: "0px 20px 10px 20px"}}>
                    <span className="d-font-book d-white">{t("affiliateDashboard.affiliateUrl.Your referral URL is")}: </span>
                    <span className="d-font-bold d-highlight">{referralURL}</span>
                </div>

                <div style={{margin: "0px 20px 10px 20px", border: "1px solid #03ffa4", padding: 20}}>
                    <div onClick={handleReferralLink} className="d-highlight d-text-28 d-font-bold"
                         style={{margin: "0.5% 0"}}>{t("affiliateDashboard.affiliateUrl.How Do Referral Links Work?")} &nbsp;
                        {
                            referralLink ? <AiFillUpCircle/> : <AiFillDownCircle/>
                        }
                    </div>
                    {
                        referralLink && <>
                            <div>
                                    <span className="d-font-book d-white">{t("affiliateDashboard.affiliateUrl.When you share an affiliate link to RealT, we track the visit and purchases of any user who clicks that link.")}</span>
                            </div>
                            <div className="d-white">
                                <span>{t("affiliateDashboard.affiliateUrl.If that user buys in the same browser session after following your link, they are counted as your referral, and you earn a")} </span><span
                                className="d-font-bold">{t("affiliateDashboard.affiliateUrl.2% commission")} </span><span>{t("affiliateDashboard.affiliateUrl.on their purchases... and all their purchases going forward!")}
                                </span>
                            </div>
                            <div>
                                <span className="d-font-book d-white">({t("affiliateDashboard.affiliateUrl.For more information about how long you earn commission on a referred user's purchases, please see Lifetime Customers.")})</span>
                            </div>
                            <div className="d-white">
                                <span>{t("affiliateDashboard.affiliateUrl.The links above point to our homepage, but you can also create links to any page on RealT.co in")}</span><span
                                className="d-font-bold">{t("affiliateDashboard.affiliateUrl.one of two ways")}: </span>
                            </div>
                            <ul className="d-white">
                                <li>{t("affiliateDashboard.affiliateUrl.Copy the Dineli URL you want to link to, and simply replace")} <span
                                    className="d-font-bold">tokized.immo</span> {t("affiliateDashboard.affiliateUrl.with the new URL in your affiliate link. Make sure to keep the")} <span
                                        className="d-font-bold">/ref/etc</span> {t("affiliateDashboard.affiliateUrl.part — that's how we know the referral is yours!")}
                                </li>
                                <li>{t("affiliateDashboard.affiliateUrl.Copy the Dineli URL you want to link to into our Referral URL Generator below, click 'Generate URL'.")}
                                </li>
                            </ul>
                            <div>
                                <span
                                    className="d-font-book d-white">{t("affiliateDashboard.affiliateUrl.(For more about Custom Slugs, check out Settings.)")}</span>
                            </div>
                            <div>
                                <span className="d-font-book d-white">{t("affiliateDashboard.affiliateUrl.And if you're linking from your own website and don't want to bother with affiliate links at all, you should check out Direct Links!")}
                                </span>
                            </div>
                        </>
                    }
                </div>

                <div style={{margin: "0px 20px 10px 20px"}}>
                    <span className="d-font-bold d-highlight">{t("affiliateDashboard.affiliateUrl.Referral URL Generator")}</span>
                </div>

                <div style={{margin: "0px 20px 10px 20px"}}>
                    <span className="d-font-bold d-white">{t("affiliateDashboard.affiliateUrl.Enter any URL from this website in the form below to generate a referral link!")}                    </span>
                </div>

                <Layout.Row style={{margin: "0px 20px 10px 20px"}}>
                    <Layout.Col span="24">
                        <div className="grid-content">
                            <div className="d-font-book d-white d-text-24">{t("affiliateDashboard.affiliateUrl.Page URL")}</div>
                            <Input value={pageURL} style={{width: "95%"}} onChange={urlChangeHandler}/>
                        </div>
                    </Layout.Col>
                    {/* <Layout.Col span="12">
                        <div className="grid-content">
                            <div className="d-font-book d-white d-text-24">Campaign Name (optional)</div>
                            <Input style={{width: "95%"}}/>
                        </div>
                    </Layout.Col> */}
                </Layout.Row>

                {/* {generateReferralURL && <Layout.Row style={{margin: "0px 20px 10px 20px"}}>
                    <Layout.Col span="12">
                        <div className="grid-content">
                            <div className="d-font-book d-white d-text-24">Referral URL</div>
                            <Input type="text" value={referralURL} style={{width: "95%"}} onChange={(e)=>(e)}/>
                            <div className="d-font-book d-white d-text-20">(now copy this referral link and share it
                                anywhere)
                            </div>
                        </div>
                    </Layout.Col>
                </Layout.Row>} */}

                <Layout.Row>
                    <Layout.Col span="24" style={{textAlign: "center", marginBottom: 30}}>
                        <div className="grid-content">
                            <Button style={{background: "#03ffa4", color: "black"}} className="d-font-bold"
                                    type="success" onClick={handleGenerateURL}>{t("affiliateDashboard.affiliateUrl.GENERATE URL")}</Button>
                        </div>
                    </Layout.Col>
                </Layout.Row>
                {referralsData && (
                            <Layout.Row className="border-t-2 border-green-400 pt-3">
                                <Layout.Col span="12" style={{textAlign: "center", marginBottom: 30, color:'white'}}>
                                    {t("affiliateDashboard.affiliateUrl.Affiliate User")}
                                </Layout.Col>
                                <Layout.Col span="12" style={{textAlign: "center", marginBottom: 30, color:'white'}}>
                                    {t("affiliateDashboard.affiliateUrl.Affiliated Amount")}
                                </Layout.Col>
                            </Layout.Row>        
                        )}
                <Layout.Row>

                    {
                        referralsData.map((data, key)=>{
                            amount += data.amount;
                            return (
                                <Fragment key={key}>
                                    <Layout.Col span="12" style={{textAlign: "center", marginBottom: 30, color:'white'}}>
                                        {users.find(user => user.id === data.customer)?.username}
                                    </Layout.Col>
                                    <Layout.Col span="12" style={{textAlign: "center", marginBottom: 30, color:'white'}}>
                                        ${data.amount}    
                                    </Layout.Col>
                                </Fragment>
                            )
                        })
                    }
                </Layout.Row>
                {referralsData && (
                <Layout.Row >
                    <Layout.Col span="24" className="text-white text-center pl-28 pr-28 pt-10 pb-10 border-green-400 border-t-2 border-b-0" style={{textAlign: "center", marginBottom: 30}}>
                        
                        <h2>{t("affiliateDashboard.affiliateUrl.Requesting a Payout")}</h2>
                        <br/>
                        {t("affiliateDashboard.affiliateUrl.To request a payout of your accumulated Affiliate earnings, just email us at info@tokized.immo! A Dineli representative will respond shortly to finalize your request.")}
                        <br/>
                        <br/>
                        <Button style={{background: "#03ffa4", color: "black"}} className="d-font-bold"
                                    type="success" onClick={requestPay}>REQUEST COUPON</Button>
                        <Button style={{background: "#03ffa4", color: "black"}} className="d-font-bold"
                                    type="success" onClick={requestCash}>{t("affiliateDashboard.affiliateUrl.REQUEST PAYMENT")}</Button>
                        <br/>
                        {
                            coupon.map((data, key)=>{
                                if(data.coupon != 'cash') {
                                    return (
                                        <>
                                        <br/>
                                            {data.coupon} - ${data.amount}
                                        </>
                                    )
                                }
                                else if(data.coupon == 'cash') {
                                    return (
                                        <>
                                        <br/>
                                            Pay Reqeust pending - ${data.amount}
                                        </>
                                    )
                                }
                            })
                        }
                    </Layout.Col>
                </Layout.Row>
                )}

            </Layout.Row>
        </>)
    
}

export default AffiliateURLs;