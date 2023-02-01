import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Button, Row, Col, Form } from 'react-bootstrap'
import Fade from 'react-reveal/Fade'
import BecomeInvestor from './BecomeInvestor'
import './home.css'
import Home3 from "./Home3"
import { callPost } from '../../services/axios'
import { Notification } from 'element-react'
import { withTranslation } from 'react-i18next';
import AccordianComp from './AccordianComp'
import FaqComp from './FaqComp'
import { connect } from 'react-redux'

//IMAGES
import Home1 from '../../assets/imgs/home1.png';
import Home1LIGHT from '../../assets/imgs/home1_light.png';

import Home8 from  '../../assets/imgs/home8.png';
import Home8LIGHT from  '../../assets/imgs/home8_light.png';


class Home extends Component {
  // eslint-disable-next-line
  constructor(props) {
    super(props)
    this.formDataSet = {
      name: null,
      email: null,
      phone: null,
      description: null,
      status: 'pending'
    }
    this.state = {
      email: null,
      firstName:null,

      isModalVisible: false,
      formData: {
        name: null,
        email: null,
        phone: null,
        description: null,
        status: 'pending'
      },
      isEmailValid: true,
      isNameValid: true,
      isPhoneValid: true
    }
  }


  componentDidMount() {
    window.scrollTo(0, 0)
    const urlParams = new URLSearchParams(this.props.location.search);
    const myParam = urlParams.get('ask_question');
    // console.log('hhhhhhhhhhhhhhhhh',urlParams,myParam)
    if(myParam){
      var element = document.querySelector("#schedule_call");

      // console.log('hhhhhhhhhhhhhhhhh',element)
      // scroll to element
      // element.scrollIntoView();
      setTimeout(()=>{
        // window.scrollTo(0,document.body.scrollHeight);
        element.scrollIntoView();
      },100)
      
      
    }
  }
  onChange = (e) => {
    this.setState({email:e.target.value});
  }
  onModalClose = () => {
    this.setState({...this.state, ...{isModalVisible: false},formData: this.formDataSet })
  }

  onSubmit = () =>{
    // console.log('token', token);
    let token = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user'))['accessToken'] : null;
    console.log('token',token);
    callPost('/api/admin/savenewsletter', {email:this.state.email}, token)
      .then((response) => {
        if(response.data){
          Notification.success({
            title: 'Success',
            message: response.data?.message,
            type: 'success',
          })
        }
      }).catch(err => {
        console.log(err);
        Notification.error({
          title: 'Failed',
          message: 'Please try again.',
          type: 'Warning',
        })
      }
      )
  }
  validateEmail = (email) => {
    var mail_format = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if(mail_format.test(String(email).toLowerCase()))

    {
      return true;    
    }

    return false;

  }
  isFormDataValid = () => {
    let invalidData = {};
    let validData = {};
    let data = {...this.state.formData}
    let returnTrue = true;
    if(!this.validateEmail(data.email)){
      invalidData.isEmailValid = returnTrue = false;
    }
    else {
      validData.isEmailValid = true;
    }
    if(!data.phone){
      invalidData.isPhoneValid = returnTrue = false;
    }
    else {
      validData.isPhoneValid = true;
    }
    if(!data.name){
      invalidData.isNameValid = returnTrue = false;
    }
    else {
      validData.isNameValid = true;
    }

    this.setState({
      ...this.state,
      ...invalidData,
      ...validData
    })
    if(!returnTrue){
      return false;
    }

    return true;
  }
  submitCallRequest = (e) =>{
    e.preventDefault();
    if(!this.isFormDataValid()){
      return false;
    }

    let token = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user'))['accessToken'] : null;
    console.log('token',token);
    callPost('/api/admin/saveCallRequest', this.state.formData, token)
      .then((response) => {
        Notification.success({
          title: 'Success',
          message: response.data.message,
          type: 'success',
        })
        this.onModalClose()
      }).catch(err => {
        console.log(err);
        Notification.error({
          title: 'Failed',
          message: 'Please try again.',
          type: 'Warning',
        })
      }
      )
  }

  onFormDataChange = (e, type) => {

    let field = e.target.value;
    this.setState({
      ...this.state,
      formData:{
        ...this.state.formData,
        [type]:field
      }
    },()=>{
      if(type==='email'){
      

        if(this.validateEmail(field)){
          this.setState({
            ...this.state,
            isEmailValid:true
          })
        }
        else
        {
            this.setState({
              ...this.state,
              isEmailValid:false
            })
        }
      }
    })

  }
  renderHome1() {
    const { t, backMode } = this.props
    return <Fade>
      <div className="img-box img-box-home1" style={{backgroundImage:backMode=="light"?"url(" + Home1LIGHT +")" :"url(" + Home1 +")"}}>
        <Row style={{ margin: "4% 12% 0% 12%" }}>
          <Col md="6" style={{ marginBottom: 20,}}>
            <Fade bottom delay={200}>
              <div className=" d-text-85" style={{color:"#DBA87E", marginTop:50}}>
              {t("home.Tokized Revolutionize")}
              </div>
              <div className=" d-text-85 d-white">
              {t("home.Real Estate Investment")}
              </div>
              <div style={{ height: 30 }} />
              <div className="d-white d-font-book d-text-36" dangerouslySetInnerHTML={{__html:t("home.Build your wealth starting $50 and receive monthly rent with our Technology developed on the ETHEREUM Blockchain")}}>
              
              </div>
            </Fade>
          </Col>
        </Row>


        <div style={{ margin: "50px 13% 0% 13%",  paddingBottom: "3%"}}>
            
          <div className="mb-12 d-flex">
              <Link to='/marketplace'>
                <Button className=" d-text-24 home2-btn">{t("home.VIEW MARKETPLACE")}</Button>
              </Link>
              <div className="ms-2 mt-2"></div>
              <Link to='/how-it-works'>
                <Button className=" d-text-24 home3-btn secondary-btn" variant="default" >{t("home.HOW IT WORKS")}</Button>
              </Link>
          </div>
          <div className="pt-10">
            <img src="/imgs/home/1/1.png" alt="" style={{ width: '103%' }}/>
          </div>
        </div>
        
      </div>
    </Fade>
  }

  renderHome2() {
    const {  backMode } = this.props
    return <Fade>
      <div>
        <div style={{ margin: "8% 18% 8% 18%" }}  className="text-center">
          <Fade bottom delay={200}>
            <div>
              <img src={backMode=="light"?"/imgs/home/2/2.png":"/imgs/home/2/1.png"}></img>
            </div>
          </Fade>
        </div>
      </div>
    </Fade>
  }

  renderHome4() {
    const { t } = this.props
    return <Fade>
      <div className="img-box img-box-home4">
        <div  style={{ margin: "10% 18%"}}>
          <Fade bottom delay={200}>
          <div style={{marginLeft:"38%", paddingTop:"3%"}}>
            <div className=" d-text-85" style={{color:"#786E64"}} dangerouslySetInnerHTML={{__html:t("home.A savings Investment")}}>
                {/* {t("home.A savings Investment")} */}
            </div>
            <div className=" d-text-56" style={{color:"#786E64"}} dangerouslySetInnerHTML={{__html:t("home.with ALL the ADVANTAGES of real estate without the unpleasant surprises")}}>
            </div>
          </div>
          </Fade>
        </div>
      </div>
    </Fade>
  }

  renderHome5() {
    const { t, backMode} = this.props
    return <Fade>
      <div className="img-box img-box-home5" >
          <Fade bottom delay={200}>
            <div className="img-box" style={{ padding: "8% 16% 8% 16%", backgroundColor:backMode=="light"?"#D5C1B0":"#2e2e2e" ,position:"relative"}}>
              <div className="d-content-center d-white d-text-85" dangerouslySetInnerHTML={{__html:t("home.HOW to Invest in Real Estate with TOKIZED.immo ?")}}>
              </div>
               <img src={backMode=="light"?"/imgs/home/5/5_light.png":"/imgs/home/5/5.png"} style={{position:"absolute", bottom:0, right:0, width:"22%"}}></img>
            </div>
            
            <div className="img-box img-box-home5-2" style={{ padding: "0% 16%", position:"relative", zIndex:"1001" }}>
              <img src="/imgs/home/5/6.png" style={{margin:"-7% 19%", width:"60%"}}/>
            </div>
            <div className="img-box" style={{backgroundColor:backMode=="light"?"#E4E4E4":"rgb(120, 110, 100)"}} >
              <img src={backMode=="light"?"/imgs/home/5/8_light.png":"/imgs/home/5/8.png"} style={{width:"75%", paddingBottom:"8%"}}/>
            </div>
          </Fade>
      </div>
    </Fade>
  }

  renderHome6() {
    const { t,backMode } = this.props
    return <Fade>
      <div className="img-box" style={{backgroundColor:backMode=="light"?"#fff":"#2e2e2e"}}>
        <div className="home6-margin">
          <Fade bottom delay={200}>
            
            <div className="d-content-center">
              <div className="d-content-center d-white d-text-60" 
                dangerouslySetInnerHTML={{__html:t("home.The advantages without the downsides")}} style={{borderBottom:"5px solid #DBA87E"}}>
                  
              </div>
              <div className="d-content-center d-white d-text-32">
                  {t("home.Tokized.immo thanks to its revolutionary")}
              </div>
              
            <Row>
              <Col md={3} sm={6}>
                <BecomeInvestor
                  title={t("home.Profitability")}
                  description={t("home.UP to 12% * Earn rental Income Every week")}
                  delay={200}
                  backMode={backMode}
                />
              </Col>
              <Col md={3} sm={6}>
                <BecomeInvestor
                  title={t("home.Liquidity")}
                  description={t("home.Purchase and sale 100% online You buy and sell whenever you want")}
                  delay={200}
                  backMode={backMode}
                />
              </Col>
              <Col md={3} sm={6}>
                <BecomeInvestor
                  title={t("home.ZERO fees")}
                  description={t("home.Neither buying nor selling")}
                  delay={200}
                  backMode={backMode}
                />
              </Col>
              <Col md={3} sm={6}>
                <BecomeInvestor
                  title={t("home.NO Management")}
                  description={t("home.No Looking for property to buyNo tenant searchTokized.immo take care of everything")}
                  delay={200}
                  backMode={backMode}
                />
              </Col>
            </Row>
            </div>
          </Fade>
        </div>
      </div>
    </Fade>
  }

  renderHome7() {
    const { t } = this.props
    return <Fade>
      <div className="img-box img-box-home7">
        <div style={{ margin: "10% 12% 10% 12%" }}>
          <Fade bottom delay={200}>
              <div className="d-content-center d-black d-text-60 mb-10" dangerouslySetInnerHTML={{__html:t("home.How Tokized.immo work ?")}}>
              </div>
              
              <Row>
                <Col md={7} style={{paddingRight:0}}><img src="/imgs/home/7/1.png"></img></Col>
                <Col md={5} className="d-text-32">
                  <AccordianComp/>
                </Col>
              </Row>
          </Fade>
        </div>
      </div>
    </Fade>
  }
  renderHome10() {
    const { t, backMode } = this.props
    return <Fade>
      <div className="img-box" style={{backgroundColor:backMode=="light"?"#fff":"#2e2e2e"}}>
        <div style={{ margin: "5% 12% 5% 12%" }}>
          <Fade bottom delay={200}>
            <div>
              <div className="d-content-center">
              <Link to={'/home'}><img className="img-mobile" src="/imgs/logo.png" alt="Logo"/></Link>
              </div>
              <div className="d-content-center d-white d-font-bold d-text-60">
                {t("home.Interested in Updates?")}
              </div>
              <div className="d-content-center d-highlight d-font-bold d-text-30">
                {t("home.The Dineli Newsletter")}
              </div>
              <div className="d-content-center d-white d-font-bold d-text-18">
                {t("home.Fractional, liquid real estate investing.")}
              </div>
              <div style={{ height: 24 }} />
              <Form style={{ margin: "0 12% 0 12%" }}>
                <Form.Group as={Row} style={{ alignItems: 'center' }}>
                  <Form.Label column sm={4} style={{ marginTop: 24 }}>
                    <div className="d-content-center d-white d-font-black d-text-48">
                      {t("home.Stay in Touch With Us.")}
                    </div>
                  </Form.Label>
                  <Col sm={2} style={{ marginTop: 24 }}> 
                    <Form.Control type="firstname" placeholder={t("home.First Name")} style={{ height: 45 }} onChange={this.onChange}/>
                  </Col>
                  <Col sm={3} style={{ marginTop: 24 }}> 
                    <Form.Control type="email" placeholder={t("home.Email Address")} style={{ height: 45 }} onChange={this.onChange}/>
                  </Col>
                  <Col sm={3} style={{ marginTop: 24 }}>
                    <Button className="d-font-black d-back-highlight-button d-text-18 d-white" onClick={this.onSubmit}
                      style={{ height: 45, width: '100%', minWidth: 200 }}>{t("home.Newsletter SIGN UP")}
                    </Button>
                  </Col>
                </Form.Group>
              </Form>
            </div>
          </Fade>
        </div>
      </div>
    </Fade>
  }

  renderHome8() {
    const { t, backMode } = this.props
    return <Fade>
      <div style={{height:50, backgroundColor:backMode=="light"? "#F0EEEB":"rgb(120, 110, 100)"}}></div>
      <div className="img-box img-box-home8" style={{backgroundImage:backMode=="light"?"url(" + Home8LIGHT +")" :"url(" + Home8 +")"}}>
          <div style={{marginLeft:"48%"}}>
            <Fade bottom delay={200}>
              <div className="d-white  d-text-90 home8-tag" style={{paddingLeft:0, paddingBottom:"3%", paddingTop:"5%"}}dangerouslySetInnerHTML={{__html:t("home.Ready to start investing")}}>
                
              </div> 
              <Link to={'/marketplace'}>
                <Button className=" d-text-30 btn btn-primary home-footer" style={{width:"32%",marginLeft:0, color:"black", height:50, marginBottom:100, fontFamily:"Montserrat-Regular"}}>{t("home.Browse Properties")}</Button>
              </Link>
            </Fade>
          </div>
      </div>
    </Fade>
  }

  renderHome9() {

    const { t, backMode } = this.props
    return <Fade >
      <div className="img-box" id="schedule_call" style={{ backgroundColor:backMode=="light"?"#E2E0DE":"rgb(120, 110, 100)" }}>
        <div style={{ margin: "4% 20%", paddingLeft:"15%" }}>
          <Fade bottom delay={200}>
            <div className="d-white d-font-black d-text-72">
              {t("home.Why invest in real estate")}
            </div>
            <div className="d-white d-font-book d-text-20">
              <p>
              It's an asset class that offers steady income and low volatility<br/><br/>
              <span className="d-font-bold mt-10 d-text-32">Best Performing Asset Class through Time</span><br/>
              Real Estate has historically been the number 1 investment for wealth creation<br/><br/>
              <span className="d-font-bold mt-10 d-text-32">Passive Income</span><br/>
              Real Estate generates a recurring income stream from renting out the <br/>
              property<br/><br/>
              <span className="d-font-bold mt-10 d-text-32">Stability</span><br/>
              Real Estate prices tend to be less volatile than stocks and <br/>
              other financial assets over the long run<br/><br/>
              <span className="d-font-bold mt-10 d-text-32">Residential</span><br/>
              Covid-19 has made housing more relevant than ever before
              </p>
            </div>
            <div style={{ height: 12 }} />
            <div>
            <Link to={'/my-account'}>
                <Button className="d-text-24 home-footer" variant="default" style={{width:"12vw", color:"white", backgroundColor:"#dba87e", borderRadius:0,}}>{t("home.START NOW")}</Button>
            </Link>
            </div>
          </Fade>
        </div>
      </div>
      
    </Fade>
  }

  renderHome11() {

    const { t, backMode } = this.props
    return <Fade >
      <div style={{height:50, backgroundColor:"#fff"}}></div>
      <div style={{height:50, backgroundColor:"#DBA87E"}}></div>
      <div className="img-box" style={{backgroundColor:backMode=="light"?"#fff":"#2e2e2e"}}>
        <div style={{ margin: "5% 10% 5% 0%" }}>
          <Row>
            <Col md={4}>
              <div style={{marginLeft:"30%", marginBottom:55,}}>
                <div className="d-font-black d-text-72" style={{color:"#DBA87E"}}>
                  {t("home.FAQ")}
                </div>
                <div className="d-white d-font-black d-text-48" dangerouslySetInnerHTML={{__html:t("home.Your most frequently asked questions")}}>
          
                </div>
                <div className="d-font-black d-text-20" style={{color:"#DBA87E", marginTop:12, fontFamily:"Montserrat-Regular"}} dangerouslySetInnerHTML={{__html:t("home.we rely on")}}>
          
                </div>
              </div>
              
              <img src="/imgs/home/11/1.png"></img>
            </Col>
            <Col md={7}>
              <div style={{marginLeft:"5%", marginBottom:55, marginTop:"7%"}}>
                <FaqComp backMode={backMode}/>
              </div>
            </Col>
          </Row>
        </div>
      </div>
      
    </Fade>
  }

  render() {
    console.log(this.state.formData);
    return (
      <div style={{fontFamily:"Montserrat-Bold"}}>
        {this.renderHome1()}
        {this.renderHome2()}
        {this.renderHome4()}
        {<Home3 />}
        
        {this.renderHome5()}
        {this.renderHome6()}
        {this.renderHome7()}
        {this.renderHome8()}
        {this.renderHome9()}
        {this.renderHome10()}

        {this.renderHome11()}
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  const {  backMode } = state.auth
  return {
    backMode
  }
}
export default withTranslation()(connect(mapStateToProps, null)(Home));