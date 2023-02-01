
import React, { Component, useEffect, useState } from 'react';
import { Row, Col, Tab, Nav } from 'react-bootstrap';
import Fade from 'react-reveal/Fade';
import ContentEditable from 'react-contenteditable'
import { Button, Notification } from 'element-react';
import { callGet, callPost } from "../../services/axios";
import { useTranslation } from 'react-i18next';


	


export default function Cookies () {
	const { t } = useTranslation();
	const [data, setData] = useState({});
	const userType = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user'))?.['roles']?.[0] : null
  

	useEffect(()=>{
		setData(t('Cookies.info', { returnObjects: true }));
	},[])

	useEffect(()=>{

		Object.entries(data).map(([key,value], i) => {
			if(userType==='ADMIN' && document.getElementById('contentId-'+i)){
				let text = document.getElementById('contentId-'+i);
				text.style.height = '20px'
				text.style.height = (text.scrollHeight) + 'px';
			}
		})

	},[data])
	const onChangeHandler = (e, key, field) => {
		setData({
			...data,
			[key]:{
				...data[key],
				[field]:e.target.value
			}
		})
		e.target.style.height = '20px'
		e.target.style.height = (e.target.scrollHeight) + 'px';
	}

	const onInnerChangeHandler = (e, key,innerKey, field) => {
		setData({
			...data,
			[key]:{
				...data[key],
				content:{
					...data[key].content,
					[innerKey]: {
						...data[key].content[innerKey],
						[field]: e.target.value
					}
				}
			}
		})
	}

	const saveChanges = () => {
		const token = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user'))['accessToken'] : null
		callPost('/api/admin/saveCookiesData', {cookiesJson: JSON.stringify(data)}, token)
		.then(res => {
			Notification.success({
				title: 'Success',
				message: 'Cookie policy save Success!',
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
					<div style={{ margin: "10% 12% 10% 12%" }}>
					<div className="col-md-6">
						<div className="d-highlight d-font-black d-text-82">
						{t("Cookies.Cookie Policy")}
						</div>
					</div>
					</div>
				</Fade>
				</div>
			</Fade>
			
			<div style={{ padding: "2% 12% 2% 12%",backgroundColor:"#fff" }} >
					{
						userType==='ADMIN'?<Button onClick={saveChanges} className="fixed top-28 right-10 w-40 h-10 text-gray-50 pt-2">{t("Cookies.Save changes")}</Button>:''
					}
                  {
                    Object.entries(data).map(([key,value], i) => {
						if(value.content?.dftt){
							return (
								<div className="mb-3">
									{
										userType==='ADMIN'?(
											<div className="d-content-highlight pt-2 pl-4 pr-4">
											<textarea
												id={`titleId-${i}`}
												className="d-content-highlight d-font-black h-5 d-text-24 uppercase w-full outline-none resize-none"
												value={value.title}
												onChange={e=>onChangeHandler(e, key, 'title')} 
											/>
											</div>
										):(
										<div className="d-content-highlight d-font-black d-text-24 h-auto pb-2 pt-2 pl-4 pr-4" style={{ whiteSpace:'pre-wrap'}}>
											{value.title}
										</div>
										)
									}
									<div className="grid grid-flow-col gap-4 grid-cols-8 justify-items-center p-3">
										<div className="d-highlight d-font-black d-text-30 col-start-1 col-end-3">
											{t("Cookies.NAME")}
										</div>
										<div className="d-highlight d-font-black d-text-30 col-start-3 col-end-5">
											{t("Cookies.LIFESPAN")}
										</div>
										<div className="d-highlight d-font-black d-text-30 col-start-5 col-end-9 self-center justify-center justify-items-center">
											{t("Cookies.PURPOSE")}
										</div>
									</div>
									{
										Object.entries(value.content).map(([key__,value__], i__) => {
											return (
												<div className="grid grid-flow-col gap-4 grid-cols-8 mt-4">
													<div className=" text-white d-text-30 col-start-1 col-end-3 d-content-dark w-full p-2 grid" style={{backgroundColor:"#898178"}}>
														{/* <p className="place-self-center p-5 break-words" contentEditable={true} onInput={(e)=>onInnerChangeHandler(e, key, key__,'name')}>
															{value__['name']}
														</p> */}
														<ContentEditable
															html={value__['name']} 
															className="place-self-center p-5 break-all"
															disabled={userType==='ADMIN'?false:true}
															onChange={(e)=>onInnerChangeHandler(e, key, key__,'name')} 
															tagName='p' 
															/>
													</div>
													<div className=" text-white d-text-30 col-start-3 col-end-5 d-content-dark w-full p-2 grid" style={{backgroundColor:"#898178"}}>
														<ContentEditable
															html={value__['lifespan']}
															className="place-self-center p-5 break-all"
															disabled={userType==='ADMIN'?false:true}
															onChange={(e)=>onInnerChangeHandler(e, key, key__,'lifespan')} 
															tagName='p' 
															/>
													</div>
													<ContentEditable
															html={value__['purpose']}
															className="text-white d-text-30 col-start-5 col-end-9 break-words justify-center d-content-dark w-full p-2" 
															disabled={userType==='ADMIN'?false:true}      
															style={{backgroundColor:"#898178"}}
															onChange={(e)=>onInnerChangeHandler(e, key, key__,'purpose')}  
															/>
												</div>
											)
										})
									}
									
								</div>
								
							)
						}
                      return <div className="nav-faq" style={{marginBottom:'20px'}} key={i}>
						{
							userType==='ADMIN'?(
								<div className="d-content-highlight pt-2 pl-4 pr-4">
								<textarea
									id={`titleId-${i}`}
									className="d-content-highlight d-font-black h-5 d-text-24 uppercase w-full outline-none resize-none"
									value={value.title}
									onChange={e=>onChangeHandler(e, key, 'title')} 
								/>
								</div>
							):(
							<div className="d-content-highlight d-font-black d-text-24 h-auto pb-2 pt-2 pl-4 pr-4" style={{ whiteSpace:'pre-wrap'}}>
								{value.title}
							</div>
							)
						}
						
						{
							userType==='ADMIN'?(
								<div className="d-content-dark pt-2 pl-2 pr-2" style={{backgroundColor:"#898178"}}>
									<textarea
										id={`contentId-${i}`}
										className="text-white d-text-24 d-content-dark h-5 w-full outline-none resize-none"
										
										value={value.content}
										style={{backgroundColor:"#898178"}}
										onChange={e=>onChangeHandler(e, key, 'content')} 
									/>
								</div>
							): (
								<div className="text-white d-text-24 d-content-dark pt-2 pl-4 pr-4" style={{ whiteSpace:'pre-wrap',backgroundColor:"#898178"}}>
									{value.content}
                          		</div>
							)
						}
                          
                        </div>
                    })
                  }
			</div>
      </div>
    )
  }

