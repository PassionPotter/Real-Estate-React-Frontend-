import React, { Component } from 'react'
import Zoom from 'react-reveal/Zoom'
import { Layout } from 'element-react'
import { Fade } from 'react-reveal'
import { Accordion, Card, Table as TableBs, Row, Col } from 'react-bootstrap'
import dateFormat from 'dateformat'
import './detail.css'
// import DetailTableRow from './DetailTableRow'
import SimpleMap from '../../GoogleMaps/SimpleMap'
import MyCarousel from '../MyCarousel'
import { connect } from 'react-redux'
import { actionPropertyGet } from '../../redux/actions/property'
import { Link } from 'react-router-dom'
import { currentStatusOptions, section8Options, typeOptions, utilityOptions } from '../../config/constants'
import property from '../../redux/reducers/property'
import { withTranslation } from 'react-i18next'

import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Investment from './Investment'
import Financial from './Financial'
import DetailTab from "./DetailTab"
import Market from './Market'
import Document from './Document'
import Blockchain from './Blockchain'
import PurchaseItem from './PurchaseItem'

const mapStateToProps = state => {
  const { currentHouse } = state.property
  const { user } = state.auth
  return {
    currentHouse,
    user
  }
}

const mapDispatchToProps = { actionPropertyGet }

const Detail = connect(mapStateToProps, mapDispatchToProps)(class extends Component {
  constructor(props) {
    super(props)
    this.state = {
      product: {},
    }
  }
  
  
  componentDidMount() {
    let productID = this.props.match.params.productID ? this.props.match.params.productID : ''
    window.scrollTo(0, 0);
    
    this.props.actionPropertyGet(productID).then(() => {
      console.log('[curr]', this.props.currentHouse);
      this.setState({ product: this.props.currentHouse })
    })
  }

  render() {
    const { t } = this.props
    const product = Object.keys(this.state.product).length == 0? {}:this.state.product;
    let address1 = product.address1
    let address2 = product.address2
    let pos_latitude = product.pos_latitude || 0
    let pos_longitude = product.pos_longitude || 0

    let imageData = product.imageData

    // let rentStartsDate = dateFormat(product.rentStartsDate, 'dd.mm.yyyy')
    // let yearlyRentPerToken = Number(product.yearlyRentPerToken).toLocaleString('en-US', {
    //   style: 'currency',
    //   currency: 'USD',
    // })
    // let tokenValue = Number(product.tokenValue).toLocaleString('en-US', { style: 'currency', currency: 'USD', })
    // let generatedToken = product.generatedToken
    // let availableToken = product.available
    // let propertyType = typeOptions.find(t => t.key === product.propertyType)?.label;
    // let neighborhood = product.neighborhood
    // let squareFeet = Number(product.squareFeet).toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
    // let lotSize = Number(product.lotSize).toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
    // let bedroomOrBath = product.bedroomOrBath
    // let constructionYear = product.constructionYear
    let currentStatusOfProperty = currentStatusOptions.find(t => t.key === product.currentStatusOfProperty)?.label;
    // let section8 = section8Options.find(item => item.key === product.section8)?.label;
    const totalTokens = product.generatedToken
		const tokensAvaliable = product.available
    const gImage = product.gMapImg;
		const available = tokensAvaliable > 0 ? tokensAvaliable : totalTokens + tokensAvaliable;

    let purchaseLimit;
    switch (this.props.user?.type) {
      case 1:
        purchaseLimit = product.basic;
        break;
      case 2:
        purchaseLimit = product.basic;
        break;
      case 3:
        purchaseLimit = product.basic;
        break;
      default:
        purchaseLimit = product.available ? product.available : 'N/A';
    }

    

    return <>
      <div style={{ backgroundColor:"#fff" }} className="d-font-book">
        <div style={{ paddingTop: 30 }}>
          <MyCarousel
            hasThumbnails={true}
            images={imageData}
          />
          <img src="/imgs/marketplace/mark.png" style={{position:"absolute", top:"60vh", left:"5vw"}}></img>
        </div>

        <div style={{margin:"2% 9%"}}>
              {
              available > 0 ?
              <img src="/imgs/marketplace/1.png" className="img-fluid" style={{width:"15%"}}></img>
                :
                <img src="/imgs/marketplace/2.png" className="img-fluid" style={{width:"15%"}}></img>
              }
              <div style={{
                padding: '6px 0px',
                display: 'flex',
                alignItems: 'center',
                position:"relative",
              }}>
                <img src="/imgs/home/3/address.png" alt="" />&nbsp;
                <span className="d-black d-font-book d-text-48">
                  {address1 + ","}
                </span> &nbsp; &nbsp;
                <span className="d-highlight d-font-book d-text-48">
                  {address2}
                </span>
                <PurchaseItem productData={product} purchaseLimit ={purchaseLimit} t={t} history={this.props.history}/>
              </div>
              
              <div style={{
                padding: '50px 0px',
              }} className="d-flex flex-wrap justify-content-between">
                      <div style={{border:"1px solid #DBA87E", width:"10vw", height:"10vw", padding:"2% 0%"}} 
                        className="mr-2 mt-2 text-center">
                          <img src="/imgs/marketplace/bed.png" style={{width:"5vw", height:"5vw"}}></img>
                          <div className="d-font-bold d-text-12 mt-1">{product.bedroomOrBath}&nbsp; Beds</div>
                      </div>
                      <div style={{border:"1px solid #DBA87E", width:"10vw", height:"10vw",padding:"2% 0%"}}
                      className="text-center mr-2  mt-2">
                          <img src="/imgs/marketplace/bath.png" style={{width:"5vw", height:"5vw"}}></img>
                          <div className="d-font-bold mt-1">{product.bedRoomBath}&nbsp; Bath</div></div>
                      <div style={{border:"1px solid #DBA87E", width:"10vw", height:"10vw",padding:"2% 0%"}}
                      className="text-center mr-2  mt-2">
                        <img src="/imgs/marketplace/sqft.png" style={{width:"5vw", height:"5vw"}}></img>
                          <div className="d-font-bold mt-1">{product.squareFeet}&nbsp; sqft</div></div>
                      <div style={{border:"1px solid #DBA87E", width:"10vw", height:"10vw",padding:"2% 0%"}}
                      className="text-center mr-2 mt-2">
                          <img src="/imgs/marketplace/type.png" style={{width:"5vw", height:"5vw"}}></img>
                          <div className="d-font-bold text-center mt-1">{product.propertyClass}</div></div>
                      <div style={{border:"1px solid #DBA87E", width:"10vw", height:"10vw",padding:"2% 0%"}}
                      className="text-center mr-2 mt-2">
                          <img src="/imgs/marketplace/occupied.png" style={{width:"5vw", height:"5vw"}}></img>
                          <div className="d-font-bold mt-1">{currentStatusOfProperty}</div></div>
                      <div style={{border:"1px solid #DBA87E", width:"10vw", height:"10vw", backgroundColor:"#323A45",padding:"2% 0%"}}
                      className="text-center mr-2 mt-2" onClick={() => window.open(product.etherScanLink, '_blank')}>
                          <img src="/imgs/marketplace/ether.png" style={{width:"5vw", height:"5vw"}}></img>
                          <div className="d-font-bold d-white mt-1">Ether Scan</div></div>
                      <div style={{border:"1px solid #DBA87E", width:"10vw", height:"10vw", backgroundColor:"#323A45",padding:"2% 0%"}}
                      className="text-center mr-2 mt-2" onClick={() => window.open(product.xDaiLink, '_blank')}>
                          <img src="/imgs/marketplace/xdai.png" style={{width:"5vw", height:"5vw"}}></img>
                          <div className="d-font-bold d-white mt-1">Xdai Scan</div>
                    </div>
              </div>
        </div>

        <div style={{margin:"2% 9%"}}>
        <Tabs
          defaultActiveKey="Investment"
          id="fill-tab-example"
          className="mb-3"
          fill
        >
          <Tab eventKey="Investment" title={t("detail.Investment")}>
            <Investment productData={product} t={t}/>
          </Tab>
          <Tab eventKey="Financials" title={t("detail.Financials")}>
            <Financial productData={product} t={t}/>
          </Tab>
          <Tab eventKey="Details-tab" title={t("detail.Details")}>
            <DetailTab productData={product} t={t}/>
          </Tab>
          <Tab eventKey="Market" title={t("detail.Market")}>
            <Market productData={product} t={t}/>
          </Tab>
          <Tab eventKey="Documents" title={t("detail.Documents")}>
            <Document productData={product} t={t}/>
          </Tab>
          <Tab eventKey="Blockchain" title={t("detail.Blockchain")}>
            <Blockchain productData={product} t={t}/>
          </Tab>
        </Tabs>
        </div>
        <div style={{height:30}}></div>
        <div style={{margin:"2% 9%"}}>
          <div className="d-text-60">About the Property</div>
          <div dangerouslySetInnerHTML={{__html:product.propertyDetail}}></div>
          
        </div>
        <div style={{margin:"2% 9%"}} >
            <div style={{color:"#dba87e"}} className="d-text-60">{t("detail.MAP")}</div>
            <Row>
              <Col md={6} style={{padding:0}}>
              <Zoom>
              <div style={{ marginTop: '40px', height: '600px' }} className="myMAP" dangerouslySetInnerHTML={{__html:product.mapCode}}>
                {/* <SimpleMap lat={pos_latitude} long={pos_longitude} title={this.state.product.address1}>{t("detail.Google Map")}</SimpleMap> */}
                
              </div>
            </Zoom>
              </Col>

              <Col md={6} style={{padding:0}}>
              <div style={{ marginTop: '40px'}}>
                <img src={`${process.env.REACT_APP_API_ENDPOINT}/public/${gImage}`} style={{height:600, objectFit:"cover"}}></img>
            </div>
              </Col>
            </Row>
            
            
        </div>
        <div style={{height:100}}></div>
       

        
      </div>
    </>
  }
})

export default withTranslation()(Detail)