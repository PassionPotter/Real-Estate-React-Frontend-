import React, { Component } from 'react'
import { Button, Row, Col } from 'react-bootstrap'
import { Layout } from 'element-react'
import ImageLabel from './ImageLabel'
import ColorLine from './ColorLine'
import { CircularProgressbarWithChildren } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import '../assets/Product.css'
import { Link } from "react-router-dom"
import TooltipIcon from "./Tooltip_i_icon"
import Timer from "./Timer"
import { withTranslation } from "react-i18next";

class Product extends Component {

	constructor(props) {
		super(props)
		this.state = {
			tooltipOpen: false
		}
	}

	toggle = () => this.setState({ tooltipOpen: !this.state.tooltipOpen })

	render() {
		const img = `${this.props.productData.imageData[0]}`
		const address1 = this.props.productData.address1
		const address2 = this.props.productData.address2
		const minInvestment = Number(this.props.productData.tokenValue).toFixed(2).toLocaleString()
		const projectIRR = Number(this.props.productData.projectIRR).toFixed(2).toLocaleString();
		// const tokenPrice = Number(this.props.productData.tokenValue).toFixed(2).toLocaleString()
		// const rentPerToken = Number(this.props.productData.yearlyRentPerToken).toFixed(2).toLocaleString()
		const totalTokens = this.props.productData.generatedToken
		const tokensAvaliable = this.props.productData.available
		const available = tokensAvaliable > 0 ? tokensAvaliable : totalTokens + tokensAvaliable;
		// const available = 0;
//		const invest = (this.props.productData.available) ? parseFloat(100 - (available * 100 / this.props.productData.generatedToken)).toFixed(2) : 0;

//		const totalPrice = this.props.productData.totalInvestment.toFixed(2).toLocaleString()
		const expectedROI = Number(this.props.productData.expectedYield).toFixed(2).toLocaleString()
		const { timerToShow } = this.props.productData;
		const days = false;
		const propertyClass = this.props.productData.propertyClass;
		const mode = this.props.mode;

		if (timerToShow) {
			let splitted_with_day = String(timerToShow).split('Product.__')
			if (parseInt(splitted_with_day[0]) > 0) {
				days = parseInt(splitted_with_day[0])
			}

			if (parseFloat(splitted_with_day[1]) > 0) {
				timerToShow = parseFloat(splitted_with_day[1]);
			}
			else {
				timerToShow = false;
			}
		}
		const { t } = this.props;

		return (
			<>
			{timerToShow ? (<Link to={`/detail/${this.props.productData.id}`}>
					<div style={{ width: "100%", textAlign: "center", marginBottom: -32 }}><Timer timerToShow={timerToShow} days={days} /></div>
				</Link>) :
					null
				}
			{mode == "wide"?
			<Layout.Row>
			<Layout.Col span="24">
				{
					available > 0 ?
					<img src="/imgs/marketplace/1.png" className="img-fluid" style={{width:"15%"}}></img>
						:
						<img src="/imgs/marketplace/2.png" className="img-fluid" style={{width:"15%"}}></img>
				}
				<div className="grid-content bg-purple" style={{position:"relative", display:"contents"}}>
					<div  style={{width:"100%", height:"100%"}}>
						<img id={'house-image-ref'} width={"100%"}
						style={{
							height:380,
							position:"absolute",
							left:0,
							objectFit:"cover",
						}}
						src={`${process.env.REACT_APP_API_ENDPOINT}/public/${img}`} alt=""
						onClick={() => {window.location.href = `#/detail/${this.props.productData.id}`;}}
						className="marketplace-img"
						/>
					</div>
					<div style={{
				backgroundColor: '#15182B',
				padding: '6px 27px',
				display: 'flex',
				alignItems: 'center',
				justifyContent:"center",
				position:"absolute",
				width:"100%"
			}}>
				<img src="/imgs/home/3/address.png" alt="" />&nbsp;
				<span className="d-font-book d-text-24" style={{color:"white"}}>
					&nbsp;{address1 + ","}
				</span> &nbsp; &nbsp;
				<span className="d-highlight d-font-book d-text-24">
					{address2}
				</span>
			</div>
			<div style={{marginTop:45, marginLeft:15, position:"absolute",backgroundColor:"#15182B", padding:"2px 0px", width:100, borderRadius:5}} >
				<img src="/imgs/marketplace/home.png" className="img-fluid ml-2"></img>
				<span className="d-text-24 ml-2" style={{color:"#DBA87E"}}>{propertyClass}</span>
			</div>
			<div style={{marginTop:220, marginLeft:20, position:"absolute"}} >
				<img src="/imgs/marketplace/mark.png"></img>
			</div>
				<div style={{
				width: '100%',
				borderRadius: 4,
				marginBottom: 30,
				
				}}>

			
			<Row style={{marginTop:380}}>
				<Col md={4}>
						<div style={{
						backgroundColor: '#fff',
						padding: '6px 0px',
						display: 'flex',
						alignItems: 'center',
						justifyContent:"space-between",
					}}>
						<ImageLabel
								img="/imgs/home/3/minInvestment.png"
								font="SourceSansPro-Bold"
								fontSize={14}
								padding={6}
								label={`${t("Product.Minimum Investment")}:`}
								color="black"
							/>
						<div className="d-highlight d-font-bold d-text-60">
								{'$' + minInvestment}
							</div>
					</div>
				</Col>
				<Col md={4}>
						<div style={{
						backgroundColor: '#fff',
						padding: '6px 0px',
						display: 'flex',
						alignItems: 'center',
						justifyContent:"space-between",
					}}>
						<ImageLabel
								img="/imgs/home/3/expectedROI.png"
								font="SourceSansPro-Bold"
								fontSize={14}
								padding={6}
								label={`${t("Product.EXPECTED INCOME / ROI")}:`}
								color="black"
							>
								<TooltipIcon
									width={15}
									content={<><strong>Expected yield</strong> is expressed as the <a
										href="https://www.investopedia.com/terms/c/capitalizationrate.asp">Cap
										Rate</a> (capitalization rate), the ratio of net operating income to the current
										value or sale price of a property. It determines the potential return on an
										investment.</>}
									img={'/imgs/home/3/i_icon.png'}
								/>
							</ImageLabel>

								
						<div className="d-black d-font-bold d-text-60">
								{expectedROI + '%'}
								
							</div>
					</div>
				</Col>
				<Col md={4}>
				<div style={{
				backgroundColor: '#fff',
				padding: '6px 0px',
				display: 'flex',
				alignItems: 'center',
				justifyContent:"space-between",
			}}>
				<ImageLabel
						img="/imgs/home/3/projectIRR.png"
						font="SourceSansPro-Bold"
						fontSize={14}
						padding={6}
						label={`${t("Product.Project IRR")}:`}
						color="black" 	
					>
						<TooltipIcon
						width={15}
						content={<><strong>Expected yield</strong> is expressed as the <a
							href="https://www.investopedia.com/terms/c/capitalizationrate.asp">Cap
							Rate</a> (capitalization rate), the ratio of net operating income to the current
							value or sale price of a property. It determines the potential return on an
							investment.</>}
						img={'/imgs/home/3/i_icon.png'}
					/>
					</ImageLabel>
					
				<div className="d-black d-font-bold d-text-60">
						{projectIRR + '%'}
						
					</div>
			</div>
				</Col>
			</Row>
			
			{available > 0?<div style={{
				backgroundColor: '#DBA87E',
				padding: '6px 24px',
				display: 'flex',
				alignItems: 'center',
				justifyContent:"center",
				flexWrap:"wrap",
			}}>
				<div className="d-black d-font-bold d-text-48 mr-10">
				{t("Product.AVAILABLE")}
				</div>
					
				<div className="d-black d-font-book d-text-48">
					<span style={{color:"white"}}>
						{`${t("Product.STOCK")}:`}
					</span>
					&nbsp;&nbsp;
					<span className="d-black">
						{available}
					</span>
					
						
				</div>
			</div>
			:<div style={{
				backgroundColor: '#15182B',
				padding: '6px 24px',
			}}>
				<div className="d-font-bold d-text-48 text-center" style={{color:"#DBA87E"}}>
					{t("Product.SOLD OUT")}
				</div>
					
				
			</div>
			}
			
			
		</div>
			  </div>
                </Layout.Col>
				
				
			</Layout.Row>:
			<div style={{
				width: '100%',
				borderRadius: 4,
				marginTop: 30,
				marginBottom: 30,
				
				position:"relative"
			}}>

				<div>
					
					<Link to={`/detail/${this.props.productData.id}`}>
						<img 
							style={{
								height:"30vh",
								width:"100%",
								position:"absolute",
								left:0,
								objectFit:"cover"
							}}
							src={`${process.env.REACT_APP_API_ENDPOINT}/public/${img}`} alt="" /></Link>
					<div style={{marginTop:25, marginLeft:15, 
						backgroundColor:"#15182B", width:80, borderRadius:5, position:"absolute", padding:"4px"}}
						className="d-flex justify-content-center align-items-center" >
						<img src="/imgs/marketplace/home.png" className="img-fluid" style={{width:"16px"}}></img>
						<span className="d-text-24 ml-2" style={{color:"#DBA87E"}}>{propertyClass}</span>
					</div>
				</div>
				
				<div style={{
					backgroundColor: '#15182B',
					padding: '6px 27px',
					display: 'flex',
					alignItems: 'center',
					paddingTop:"30vh"
				}}>
					<img src="/imgs/home/3/address.png" alt="" />&nbsp;
					<span className="d-font-book d-text-24" style={{color:"white"}}>
						&nbsp;{address1 + ","}
					</span> &nbsp; &nbsp;
					<span className="d-highlight d-font-book d-text-24">
						{address2}
					</span>
				</div>
				<div style={{
					backgroundColor: '#fff',
					padding: '6px 24px',
					display: 'flex',
					alignItems: 'center',
					justifyContent:"space-between",
					borderBottom:"2px solid #DBA87E"
				}}>
					<ImageLabel
							img="/imgs/home/3/minInvestment.png"
							font="SourceSansPro-Bold"
							fontSize={18}
							padding={6}
							label={`${t("Product.Minimum Investment")}:`}
							color="black"
						/>
					<div className="d-highlight d-font-book d-text-60">
							{'$' + minInvestment}
						</div>
				</div>
				<div style={{
					backgroundColor: '#fff',
					padding: '6px 24px',
					display: 'flex',
					alignItems: 'center',
					justifyContent:"space-between",
					borderBottom:"2px solid #DBA87E"
				}}>
					<ImageLabel
							img="/imgs/home/3/expectedROI.png"
							font="SourceSansPro-Bold"
							fontSize={18}
							padding={6}
							label={`${t("Product.EXPECTED INCOME / ROI")}:`}
							color="black"
						>
							<TooltipIcon
								width={15}
								content={<><strong>Expected yield</strong> is expressed as the <a
									href="https://www.investopedia.com/terms/c/capitalizationrate.asp">Cap
									Rate</a> (capitalization rate), the ratio of net operating income to the current
									value or sale price of a property. It determines the potential return on an
									investment.</>}
								img={'/imgs/home/3/i_icon.png'}
							/>
							</ImageLabel>
							
					<div className="d-black d-font-book d-text-60">
							{expectedROI + '%'}
							
						</div>
				</div>


				<div style={{
					backgroundColor: '#fff',
					padding: '6px 24px',
					display: 'flex',
					alignItems: 'center',
					justifyContent:"space-between",
					borderBottom:"2px solid #DBA87E"
				}}>
					<ImageLabel
							img="/imgs/home/3/projectIRR.png"
							font="SourceSansPro-Bold"
							fontSize={18}
							padding={6}
							label={`${t("Product.Project IRR")}:`}
							color="black" 	
						>
							<TooltipIcon
							width={15}
							content={<><strong>Expected yield</strong> is expressed as the <a
								href="https://www.investopedia.com/terms/c/capitalizationrate.asp">Cap
								Rate</a> (capitalization rate), the ratio of net operating income to the current
								value or sale price of a property. It determines the potential return on an
								investment.</>}
							img={'/imgs/home/3/i_icon.png'}
						/>
						</ImageLabel>
						
					<div className="d-black d-font-book d-text-60">
							{ projectIRR + "%"}
							
						</div>
				</div>
				{available > 0? 
				<div style={{
					backgroundColor: '#DBA87E',
					padding: '6px 24px',
					display: 'flex',
					alignItems: 'center',
					justifyContent:"space-around",
					borderBottom:"2px solid #DBA87E",
					flexWrap:"wrap",
					
				}}>
					<div className="d-black d-font-bold d-text-48">
						{t("Product.AVAILABLE")}
					</div>
						
					<div className="d-black d-font-bold d-text-48">
						<span style={{color:"white"}}>
							{`${t("Product.STOCK")}:`}
						</span>
						&nbsp;&nbsp;
						<span className="d-black d-font-bold">
							{available}
						</span>
						
							
					</div>
				</div>:
				<div style={{
					backgroundColor: '#15182B',
					padding: '6px 24px',
				}}>
					<div className="d-font-bold d-text-48 text-center" style={{color:"#DBA87E"}}>
						{t("Product.SOLD OUT")}
					</div>
						
					
				</div>}
				
			</div>}
				
				

				
			</>
		)
	}
}

export default withTranslation()(Product)
