
import React, { Component, useEffect, useState } from 'react';
import { Row, Col, Tab, Nav } from 'react-bootstrap';
import Fade from 'react-reveal/Fade';
import ContentEditable from 'react-contenteditable'
import { Button, Notification } from 'element-react';
import { callGet, callPost } from "../../services/axios";
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';


export default function FaqsNew () {
	const { t } = useTranslation();
	const [data, setData] = useState({});
	const userType = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user'))?.['roles']?.[0] : null
  

	useEffect(()=>{
		setData(t("faqsNew.New",{returnObjects:true}));
	},[])

	const onChangeHandler = (e, key) => {
		var htmlText = e.target.value; 

		setData({
			...data,
			[key]:htmlText
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

	const onInnerChangeHandler = (e, key,column_key,innerKey) => {

		var htmlText = e.target.value; 

		let regex = /\<span style="color:#dba87e !important">(.*?)\<\/span>/g;
		//var matched = regex.exec(strToMatch);
		let newContent = htmlText;
		let matches = newContent.match(regex);
		if(matches){
			matches.forEach((val)=>{
				let newlyValue = `##${val.replace('<span style="color:#dba87e !important">','').replace('</span>','')}##`
				newContent = newContent.replaceAll(val, newlyValue)
			})
		}
		setData({
			
			...data,
			[key]:{
				...data[key],
				[column_key]: {
					...data[key][column_key],
					[innerKey]: newContent
				}
				
				
			}
		})
	}

	const saveChanges = () => {
		const token = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user'))['accessToken'] : null
		callPost('/api/admin/saveFaqsNewData', {faqsNewJson: JSON.stringify(data)}, token)
		.then(res => {
			Notification.success({
				title: 'Success',
				message: 'FAQs saved!',
				type: 'success',
			  })
		}).catch(err => {
		  console.log('[Fail]', err);
		})
	}
    return (
      <div>

			<Fade>
				<div className="img-box img-box-faqs">
				<Fade bottom delay={200}>
					<div style={{ margin: "10% 12% 10% 12%" }}>
					<div className="col-md-8">
						<div className="d-highlight d-font-black d-text-82">
						{t("faqsNew.Frequently asked questions")}
						</div>
						<div style={{width:"80%"}}>
							<ContentEditable
								html={data.mainTitle} 
								className={`text-white d-content-dark d-text-30 h-auto p-2 bg-transparent place-self-start justify-self-start`}
								style={{backgroundColor:"#898178"}}
								disabled={userType==='ADMIN'?false:true}
								onChange={(e)=>onChangeHandler(e, 'mainTitle')}  
							/>
						</div>
					</div>
					</div>
				</Fade>
				</div>
			</Fade>
			
			<div style={{ padding: "2% 12% 2% 12%",backgroundColor:"#fff" }} >
					{
						userType==='ADMIN'?<Button onClick={saveChanges} className="fixed top-28 right-10 w-40 h-10 text-gray-50 pt-2">{t("faqsNew.Save changes")}</Button>:''
					}
                {
                    Object.entries(data).map(([key,value], i) => {
						if(typeof value==='string' && key!=='thirdHeadingSubTitle' && key!=='mainTitle'){
							let div = (
							<ContentEditable
								
								html={value} 
								className="d-content-highlight d-font-black d-text-24 h-auto pt-2 pl-4 pr-4 place-self-center outline-none"
								disabled={userType==='ADMIN'?false:true}
								onChange={(e)=>onChangeHandler(e, key)}  
							/>);
							if(key==='third_heading'){
								return (
									<div className="d-content-highlight d-font-black d-text-24 grid mt-1 mb-1" key={i}>
										{div}
										<ContentEditable
											
											html={data.thirdHeadingSubTitle} 
											className="d-content-highlight d-font-black d-text-24 h-auto pb-2 pl-4 pr-4 place-self-center outline-none"
											disabled={userType==='ADMIN'?false:true}
											onChange={(e)=>onChangeHandler(e, 'thirdHeadingSubTitle')}  
										/>
									</div>
								)
							}
							else if(key==='ask_a_question' && userType!=='ADMIN'){
								return <Link to={'/home?ask_question=true'} className="text-black no-underline mt-1 mb-1">
									<div className="d-content-highlight d-font-black d-text-24 grid pb-2" key={i}>
										{div}
									</div>
								</Link>
							}
							else
							{
								return (
									<div className="d-content-highlight d-font-black d-text-24 grid pb-2 mt-1 mb-1" key={i}>
										{div}
									</div>
								)
							}
						}

						if(typeof value==='object'){
							return (
								<div className="grid grid-flow-col gap-10 grid-cols-2">
									<div className="grid gap-8 mt-10">
								{
								Object.entries(value.column_1).map(([key__,value__], i__) => {
									
									return (
												<ContentEditable
													html={viewAsHighlighted(value__)} 
													key={i__}
													className="text-white d-text-30 col-start-1 col-end-2 d-content-dark w-full p-4 whitespace-pre-wrap"
													style={{backgroundColor:"#898178"}}
													disabled={userType==='ADMIN'?false:true}
													onChange={(e)=>onInnerChangeHandler(e, key, 'column_1',key__)} 
													tagName='p' 
													/>
											
									)
								})
								}
								</div>
								<div className="grid gap-8  mt-10">
								{
								Object.entries(value.column_2).map(([key__,value__], i__) => {
									
									return (
												<ContentEditable
													html={viewAsHighlighted(value__)} 
													key={i__}
													className="text-white d-text-30 col-start-1 col-end-2 d-content-dark w-full p-4 whitespace-pre-wrap"
													style={{backgroundColor:"#898178"}}
													disabled={userType==='ADMIN'?false:true}
													onChange={(e)=>onInnerChangeHandler(e, key, 'column_2', key__)} 
													tagName='p' 
													/>

									)
								})
								}
								</div>
								</div>
							);
						}


                    })
				}
                  
			</div>
      </div>
    )
  }

