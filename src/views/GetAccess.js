import React, { Component, useEffect, useState } from "react";
import ColorLine from "./ColorLine";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Fade from "react-reveal/Fade";
import { useHistory } from "react-router-dom";
import Helmet from 'react-helmet'
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { actionCredentialList } from "../redux/actions/credential";
import { useTranslation } from "react-i18next";

export default function GetAccess() {

	const [code, setCode] = useState('');
	const [updateBtn, setUpdateBtn] = useState(false);
	const siteSettings = useSelector(state => state.sitesettings.sitesettingsData);
	const credentials = useSelector(state => state.credential.credentialData, shallowEqual);
	const backMode = useSelector(state => state.auth.backMode);
	const dispatch = useDispatch()
	const history = useHistory();
	const { t } = useTranslation();

	const onAccessClicked = () => {
		if (code === '1234321') {
			localStorage.setItem('passed', 'true');
			history.push('/home');
		}
	}

	const onEnterPress = (e) => {
		if (e.keyCode == 13) {
			onAccessClicked()
		}
	}

	useEffect(() => {
		dispatch(actionCredentialList())
	}, [])

	useEffect(() => {
		if (typeof TXTME_SELF_URL === 'undefined' && credentials?.[0]?.chatLink) {
			const script = document.createElement("GetAccess.script");

			script.src = credentials?.[0]?.chatLink;
			script.async = true;

			document.body.appendChild(script);

			let intervalId = setInterval(() => {
				if (document.getElementById('txtmeLivechatTitle') && !updateBtn) {
					clearInterval(intervalId);
					setUpdateBtn(true)

				}
			}, 100);
		}


	}, [credentials])

	useEffect(() => {
		if (updateBtn) {
			updateButton();
		}


	}, [updateBtn])


	const updateButton = () => {
		let el = document.getElementById('txtmeLivechatTitle');
		el.style.background = 'black';
		el.innerHTML = `
		  <div id="txtmeLivechatTitleImg" style="display: block;-webkit-flex: 0 0 auto;flex: 0 0 auto;background: black;-webkit-align-self: center;align-self: center;max-width: 100%;width: 32px;height: 32px;margin: 0 6px 0 8px;padding: 0;color: #3579f3;background: black;">
		  <img src="/imgs/chat.png" style="width:30px; height:30px"/>
	   
			  <svg id="txtmeLivechatTitleImgMsg" style="display: none;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" class="__web-inspector-hide-shortcut__"><path d="M8.46,24.5H7.27l.84-.85a2.84,2.84,0,0,0,.82-1.71A6.1,6.1,0,0,1,6,16.81C6,13.18,9.31,9.5,14.49,9.5c5.49,0,8.44,3.39,8.44,7s-3,7-8.44,7a11.63,11.63,0,0,1-2.84-.36A4.45,4.45,0,0,1,8.46,24.5Z" fill="#fff"></path><circle cx="22" cy="11.5" r="4" fill="#fff" stroke="currentColor" stroke-width="2"></circle></svg>
	   </div>
		  <div id="txtmeLivechatTitleText" style="display: none;flex-basis: 0;flex-grow: 1;-webkit-align-self: center;align-self: center;max-width: 100%;padding: 0 20px 0 0;font-family: 'Roboto', sans-serif;font-size: 14px;font-weight: 400;font-stretch: normal;font-style: normal;line-height: 1;letter-spacing: normal;text-align: left;color: #ffffff;background: #3579f3;white-space: nowrap;" class="__web-inspector-hide-shortcut__">We are online</div>`;



	}
	return (
		<Fade bottom delay={500}>
			<div className="get-access-div">
				<img className={'get-access-logo'} src="imgs/logo2.png" alt="Logo"/>
			</div>
			<div className="get-access-side">
				<div className="get-access-title">
					<span className="d-font-mont-bold d-white" dangerouslySetInnerHTML={{__html:t("GetAccess.Exclusive Real Estate Investment")}}></span><span
						className="d-font-mont-bold d-highlight">.</span>
				</div>
				<div className="get-access-content d-font-mont-regular d-white mt-3" >
					{t("GetAccess.Revolutionizing")} <span className="d-font-mont-regular d-highlight">{t("GetAccess.property ownership")}</span><br />
					{t("GetAccess.Powered by")} <span className="d-font-mont-regular d-highlight">{t("GetAccess.Blockchain")}</span><br />
					{t("GetAccess.Rental Income Up to")} <span className="d-font-mont-regular d-highlight">12% {t("GetAccess.Yield")}</span><br />
				</div>
				<div style={{ width: "8vw", marginTop: "25px" }}>
					<ColorLine color={backMode == "light" ?"#dba87e":"white"}/>
				</div>
				<div style={{ marginTop: 20, marginBottom: 30 }}>
					<input className="get-access-invitation d-font-book" 
						value={code} onKeyDown={onEnterPress} 
						onChange={val => setCode(val.target.value)} placeholder={t("GetAccess.Invitation code")} 
						style={{borderColor:backMode == "light" ?"#F0EEEB":"white",
								backgroundColor:backMode == "light" ?"#252730":"#786e64"}}
						/>
					<Button onClick={onAccessClicked} className="get-access-btn d-text-24" style={{fontFamily:"Montserrat-Regular"}}>
						{t("GetAccess.Get me access")}
					</Button>
				</div>
			</div>
			<Helmet>
				<title>{siteSettings?.[0]?.title || 'tokized.immo'}</title>
				<meta name="description" content={siteSettings?.[0]?.description || 'tokized.immo'} />
				<meta name="keywords" content={siteSettings?.[0]?.keywords || 'tokized.immo'} />
			</Helmet>
		</Fade>)

}
