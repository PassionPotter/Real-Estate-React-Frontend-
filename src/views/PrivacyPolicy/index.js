
import React, { Component, useEffect, useState } from 'react';
import { Row, Col, Tab, Nav } from 'react-bootstrap';
import Fade from 'react-reveal/Fade';
import ContentEditable from 'react-contenteditable'
import { Button, Notification } from 'element-react';
import { callGet, callPost } from "../../services/axios";
import { useTranslation } from "react-i18next";

export default function GeneralInformation () {

	const [data, setData] = useState({});
	const userType = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user'))?.['roles']?.[0] : null
	const { t } = useTranslation();
  

	useEffect(()=>{
		setData(t("Privacy.pol", {returnObjects:true}));
	},[])

	const onChangeHandler = (e, key) => {
		var htmlText = e.target.value; 

		let regex = /\<span style="color:#03ffa4 !important">(.*?)\<\/span>/g;
		//var matched = regex.exec(strToMatch);
		let newContent = htmlText;
		let matches = newContent.match(regex);
		if(matches){
			matches.forEach((val)=>{
				let newlyValue = `##${val.replace('<span style="color:#03ffa4 !important">','').replace('</span>','')}##`
				newContent = newContent.replaceAll(val, newlyValue)
			})
		}
		setData({
			...data,
			[key]:newContent
		})
	}

	const viewAsHighlighted = (content) => {
		let regex = /\##(.*?)\##/g;
		let newContent = content;
		let nLinesymbol = '_+_+_+_+';
		let nTabsymbol = '-+-+-+-+';
		let nextLine = '\n';
		let nextTab = '\t'
		let newStrToMatch = content.replace(/\n/g,nLinesymbol).replace(/\t/g,nTabsymbol);
		let matches = newStrToMatch.match(regex);
		if(matches){
			matches.forEach((val)=>{
				val = val.replaceAll(nLinesymbol,nextLine).replaceAll(nTabsymbol, nextTab)
				let newlyValue = `<span style="color:#dba87e !important">${val.replaceAll('##','')}</span>`
				newContent = newContent.replaceAll(val, newlyValue)
			})
		}
		return newContent;
	}

	const onInnerChangeHandler = (e, key,innerKey, field) => {
		setData({
			...data,
			[key]:{
				...data[key],
				[innerKey]: {
					...data[key][innerKey],
					[field]: e.target.value
				}
				
			}
		})
	}

	const saveChanges = () => {
		const token = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user'))['accessToken'] : null
		callPost('/api/admin/savePrivacyPolicyData', {privacyPolicyJson: JSON.stringify(data)}, token)
		.then(res => {
			Notification.success({
				title: t("Privacy.Success"),
				message: t("Privacy.Privacy Policy saved!"),
				type: 'success',
			  })
		}).catch(err => {
		  console.log('[Fail]', err);
		})
	}
    return (
      <div>

			<Fade>
				<div className="img-box img-box-sell-tokens">
				<Fade bottom delay={200}>
					<div style={{ margin: "6% 12% 6% 12%" }}>
					<div className="col-md-6">
						<div className="d-highlight d-font-black d-text-82">
						{t("Privacy.")}
						</div>
						<div className="grid grid-flow-col w-40">
							<span className="align-self-center justify-self-end w-8"><img src="./imgs/privacy/phone.png"/></span> <ContentEditable 
												html={data.phone} 
												className={`text-white d-content-dark d-text-30 h-auto p-2 bg-transparent place-self-start justify-self-start w-32`}
												disabled={userType==='ADMIN'?false:true}
												onChange={(e)=>onChangeHandler(e, 'phone')}  
											  />
						</div>
						<div className="grid grid-flow-col w-40">
							<span className="align-self-center justify-self-end w-8"><img src="./imgs/privacy/email.png"/></span> <ContentEditable 
												html={data.email} 
												className={`text-white d-content-dark d-text-30 h-auto p-2 bg-transparent place-self-start justify-self-start w-32`}
												disabled={userType==='ADMIN'?false:true}
												onChange={(e)=>onChangeHandler(e, 'email')}  
											  />
						</div>
					</div>
					</div>
				</Fade>
				</div>
			</Fade>
			
			<div style={{ padding: "2% 12% 2% 12%", backgroundColor:"#fff" }}>
					{
						userType==='ADMIN'?<Button onClick={saveChanges} className="fixed top-28 right-10 w-40 h-10 text-gray-50 pt-2">{t("Privacy.Save changes")}</Button>:''
					}
                {
                    Object.entries(data).map(([key,value], i) => {
						
						if(typeof value==='string' && (key==='phone' || key==='email')){
								return null;
						}
						if(typeof value==='string'){
							return	<ContentEditable
										key={i}
										html={viewAsHighlighted(value)} 
										className={`text-white d-text-30 h-auto pb-4 pt-4 pl-4 pr-4 whitespace-pre-wrap ${i===1?'':'mt-3'}`}
										style={{backgroundColor:"#898178"}}
										disabled={userType==='ADMIN'?false:true}
										onChange={(e)=>onChangeHandler(e, key)}  
									/>
						}


                    })
				}
                  
			</div>
      </div>
    )
  }

