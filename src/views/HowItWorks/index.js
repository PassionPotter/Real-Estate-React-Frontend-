
import React, { Component, useEffect, useState } from 'react';
import { Row, Col, Tab, Nav } from 'react-bootstrap';
import Fade from 'react-reveal/Fade';
import ContentEditable from 'react-contenteditable'
import { Button, Notification } from 'element-react';
import { callGet, callPost } from "../../services/axios";
import { useTranslation } from "react-i18next";


export default function GeneralInformation () {

	const [data, setData] = useState({
		
	});
	const userType = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user'))?.['roles']?.[0] : null
	const { t } = useTranslation();
	const stepData = [
		{
			title:"Step 1:",
			mainTitle:"Registration"
		},
		{
			title:"Step 2:",
			mainTitle:"Upload an ID card"
		},
		{
			title:"Step 3:",
			mainTitle:"Choose a<br/>property(s) to invest"
		},
		{
			title:"Step 4:",
			mainTitle:"Read the<br/>documentation carefully"
		},
		{
			title:"Step 5:",
			mainTitle:"Choose an<br/>investment amount"
		},
		{
			title:"Step 6:",
			mainTitle:"Read &<br/>accept the terms"
		},
		{
			title:"Step 7:",
			mainTitle:"Pay securely<br/>via Mollie"
		},
		{
			title:"Step 8:",
			mainTitle:"Success!"
		}
	]

	
	useEffect(()=>{
		setData(t("HowWorks.how", {returnObjects:true}));
	},[])

	const onChangeHandler = (e, key, field=false) => {
		var htmlText = e.target.value; 
		console.log(htmlText);
		if(field){
			setData({
				...data,
				[key]:{
					...data[key],
					[field]: htmlText
				}
			})
		}else{
			setData({
				...data,
				[key]:htmlText
			})
		}

	}


	const saveChanges = () => {
		const token = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user'))['accessToken'] : null
		callPost('/api/admin/saveHowItWorksData', {howItWorksJson: JSON.stringify(data)}, token)
		.then(res => {
			Notification.success({
				title: 'Success',
				message: 'How it works step saved!',
				type: 'success',
			  })
		}).catch(err => {
		  console.log('[Fail]', err);
		})
	}
    return (
      <div>

			<Fade>
				<div className="img-box img-box-how-it-works">
				<Fade bottom delay={200}>
					<div style={{ margin: "6% 12% 6% 12%" }}>
					<div className="text-center">
						<div className="text-white d-font-black d-text-90 grid grid-flow-col" dangerouslySetInnerHTML={{__html:t("HowWorks.Simple steps to become a real estate investor")}}>
							
						</div>
						<div className="text-center" style={{width:"60%", marginLeft:"20%"}}>
							<ContentEditable
								html={data.mainTitle} 
								className={`text-white d-content-dark d-text-36 h-auto p-2 bg-transparent`}
								disabled={userType==='ADMIN'?false:true}
								onChange={(e)=>onChangeHandler(e, 'mainTitle')}  
							/>
						</div>
						
					</div>
					</div>
				</Fade>
				</div>
			</Fade>
			
			<div style={{ padding: "2% 12% 2% 12%", backgroundColor:"#fff" }}>
					{
						userType==='ADMIN'?<Button onClick={saveChanges} className="fixed top-28 right-10 w-40 h-10 text-gray-50 pt-2">{t("HowWorks.Save changes")}</Button>:''
					}
                {
                    Object.entries(data).map(([key,value], i) => {
						
						if(typeof value==='string' && (key==='mainTitle')){
								return null;
						}
						const stepD = stepData[i - 1];
						console.log(stepD);
						if(typeof value==='object'){
							return	(
								<div className="grid grid-flow-row" key={key}>
									{
										(value.step % 2 == 0)?(
											<div className="grid grid-flow-col max-h-100 mt-5 gap-5 grid-cols-2">
												
												<div className="mt-10 text-right">
													<span className="d-font-bold d-text-90" style={{color:"#786E64"}}>{stepD.title}</span><br/>
													<span className="d-font-bold d-text-72" style={{color:"#DBA87E", lineHeight:1}} dangerouslySetInnerHTML={{__html:stepD.mainTitle}}></span>
													<ContentEditable
														key={i}
														html={value.description} 
														className={`d-text-30 h-auto pb-4 whitespace-pre-wrap pl-1`}
														disabled={userType==='ADMIN'?false:true}
														onChange={(e)=>onChangeHandler(e, key,'description')}  
													/>
												</div>
												<img src={`./imgs/howitworks/${value.step}.png`} className=" w-full"/>
												
											</div>
										) :(
											<div className="grid grid-flow-col max-h-100 mt-5 gap-5 grid-cols-2">
												<img src={`./imgs/howitworks/${value.step}.png`} className=" w-full"/>
												<div className="mt-10">
													<span className="d-font-bold d-text-90" style={{color:"#786E64"}}>{stepD.title}</span><br/>
													<span className="d-font-bold d-text-72" style={{color:"#DBA87E", lineHeight:1}} dangerouslySetInnerHTML={{__html:stepD.mainTitle}}></span>
													<ContentEditable
														key={i}
														html={value.description} 
														className={`d-text-30 h-auto pb-4 pl-1`}
														disabled={userType==='ADMIN'?false:true}
														onChange={(e)=>onChangeHandler(e, key,'description')}  
													/>
												</div>
												
											</div>
										)
									}
									
								</div>
							)
							
						}


                    })
				}
                  
			</div>
      </div>
    )
  }

