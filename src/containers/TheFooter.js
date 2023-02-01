import React, {Component, useState} from 'react'
import {Row, Col, Button} from 'react-bootstrap'
import ExternalLinks from "../views/ExternalLinks"
import {Link} from "react-router-dom"
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Form, Modal } from 'react-bootstrap'
import { callPost } from '../services/axios'
import { Notification } from 'element-react'
export default function TheFooter(){
    const { t } = useTranslation();
    const sitesettings = useSelector(state => state.sitesettings.sitesettingsData);
    const backMode = useSelector(state => state.auth.backMode);
    const onClickedAffiliate = () => {
        window.location.href = "#affiliate";
    }
    const [isModalVisible, setModalVisible] = useState(false);
    const [formData, setFormData] = useState({
        name: null,
        email: null,
        phone: null,
        description: null,
        status: 'pending'
    })
    const [isValid, setValid] = useState({
        isEmailValid: true,
        isNameValid: true,
        isPhoneValid: true
    })
    const onModalClose = () => {
        setModalVisible(false);
      }
    const validateEmail = (email) => {
        var mail_format = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
        if(mail_format.test(String(email).toLowerCase()))
    
        {
          return true;    
        }
    
        return false;
    
      }
    const  isFormDataValid = () => {
        let invalidData = {};
        let validData = {};
        let returnTrue = true;
        if(!validateEmail(formData.email)){
          invalidData.isEmailValid = returnTrue = false;
        }
        else {
          validData.isEmailValid = true;
        }
        if(!formData.phone){
          invalidData.isPhoneValid = returnTrue = false;
        }
        else {
          validData.isPhoneValid = true;
        }
        if(!formData.name){
          invalidData.isNameValid = returnTrue = false;
        }
        else {
          validData.isNameValid = true;
        }
    
        setValid({
            ...invalidData,
            ...validData
        });
        if(!returnTrue){
          return false;
        }
    
        return true;
      }
    const submitCallRequest = (e) =>{
        e.preventDefault();
        if(!isFormDataValid()){
          return false;
        }
        let token = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user'))['accessToken'] : null;

        callPost('/api/admin/saveCallRequest', formData, token)
          .then((response) => {
            Notification.success({
              title: 'Success',
              message: response.data.message,
              type: 'success',
            })
            onModalClose()
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
    const onFormDataChange = (e, type) => {

        let field = e.target.value;
        setFormData({...formData, [type]:field}, () => {
            if(type==='email'){
                if(validateEmail(field)){
                   setValid({
                       ...validateEmail,
                       isEmailValid:true
                   })
                }
                else
                {
                    setValid({
                        ...validateEmail,
                        isEmailValid:false
                    })
                }
            }
        })
    }
    const setting = sitesettings?.[0];
        return (
            <div style={{margin: "8% 12% 2% 12%"}}>
                <div style={{margin: "6% 3% 3% 3%"}}>
                    <Row style={{marginLeft:"8%"}}>
                    <Col md="6" className="d-flex justify-content-between flex-column">
                            <div className="mt-3 d-text-32">
                                
                                <Link to={'/home'} className="text-decoration-none d-white">
                                    {t("HOME")}
                                </Link>
                                <br/>
                                <Link to={'/marketplace'} className="text-decoration-none d-white">
                                    {t("footer.MARKETPLACE")}
                                </Link>
                                <br/>
                                <Link to={'/team'} className="text-decoration-none d-white">
                                    {t("footer.TEAM")}
                                </Link>
                                <br/>
                                <Link to={'/learn'} className="text-decoration-none d-white">
                                    {t("footer.LEARN")}
                                </Link>
                                <br/>
                                <Link to={'/blog'} className="text-decoration-none d-white">
                                    {t("footer.BLOG")}
                                </Link>
                                <br/>
                                <Link to={'/faqs'} className="text-decoration-none d-white">
                                    {t("footer.FAQs")}
                                </Link>
                                <br/>
                                <Link to={'/sell-my-property'} className="text-decoration-none d-white">
                                    {t("footer.SELL MY PROPERTY")}
                                </Link>
                                <br/>
                                <Link to={'/sell-tokens'} className="text-decoration-none d-white">
                                    {t("footer.SELL TOKENS")}
                                </Link>
                                <br/>
                                <Link to={'/general-information'} className="text-decoration-none d-white">
                                    {t("footer.Terms of Service")}
                                </Link>
                                <br/>
                                <Link to={'/privacy-policy'} className="text-decoration-none d-white">
                                    {t("footer.Privacy Policy")}
                                </Link>
                                <br/>
                                <Link to={'/how-it-works'} className="text-decoration-none d-white">
                                    {t("footer.Website Disclosures")}
                                </Link>
                                <br/>
                                <Link to={'/cookies-policy'} className="text-decoration-none d-white">
                                    {t("footer.Accessibility Statement")}
                                </Link>
                                <br/>
                                
                                
                            </div>
                            <Button className="d-font-bold d-text-30 mt-3 mb-3 home-footer" style={{ width: "15vw", height:48 }}
                                    onClick={() => onClickedAffiliate()}>{t("header.Affiliate Program")}</Button>
                        </Col>
                        <Col md="6" span={3} style={{ backgroundColor:"#898178", fontFamily:"Montserrat-Bold"}} className="d-flex flex-column justify-content-between">
                            <div style={{padding:"5% 10%"}}>

                                <div className="text-white d-text-32 mb-3">
                                    <div className="text-white d-text-32 mb-3" style={{borderBottom:"2px solid #dba87e"}}>
                                        ADDRESS
                                    </div>
                                    <div className="address-custom ms-5" style={{fontFamily:"Montserrat-Regular"}} dangerouslySetInnerHTML={{__html:setting?.address || '14935 Shady Bend Dr, Houston, TX 77070'}}></div>
                                    
                                </div>
                                <div className="text-white d-text-32 mb-3">
                                    <div className="text-white d-text-32 mb-3" style={{borderBottom:"2px solid #dba87e"}}>
                                        PHONE
                                    </div>
                                    <span className="ms-5"  style={{fontFamily:"Montserrat-Regular"}}>{setting?.telephone || '(888)445-9675'}</span>
                                    
                                </div>
                                <div className="text-white d-text-32 mb-3">
                                    <div className="text-white d-text-32 mb-3" style={{borderBottom:"2px solid #dba87e"}}>
                                        EMAIl
                                    </div>
                                    <span className="ms-5"  style={{fontFamily:"Montserrat-Regular"}}>{setting?.twitch || 'TEST@gmail.com'}</span>
                                    
                                </div>
                            </div>
                            <div className="d-white d-font-bold d-text-32 text-center mb-3">
                                <Button className="d-font-bold d-text-30 mt-3 home-footer" style={{ width: "19vw", height:48 }}
                                        onClick={()=>setModalVisible(true)}>Contact us</Button>
                            </div>
                        </Col>
                        <Modal show={isModalVisible} onHide={onModalClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>{t("home.SCHEDULE A CALL")}</Modal.Title>
                            </Modal.Header>

                            <Modal.Body>
                                    <Form style={{ margin: "0 5% 0 5%" }}>
                                    <Form.Group as={Row} style={{ alignItems: 'left' }}>
                                        <Form.Label column sm={3} style={{ marginTop: 24 }}>
                                        <div className="d-content-left d-black d-font-black d-text-24">
                                            {t("home.Your Full Name")}:<sup style={{color:'red'}}>*</sup>
                                        </div>
                                        </Form.Label>
                                        <Col sm={9} style={{ marginTop: 24 }}> 
                                        <Form.Control type="text" isInvalid={!isValid.isNameValid} value={formData.name} placeholder="Full Name" style={{ height: 40 }} onChange={(e)=>onFormDataChange(e, 'name')}/>
                                        <Form.Control.Feedback type="invalid">{t("home.This field is required")}</Form.Control.Feedback>
                                        </Col>
                                        
                                    </Form.Group>
                                    <Form.Group as={Row} style={{ alignItems: 'left' }}>
                                        <Form.Label column sm={3} style={{ marginTop: 24 }}>
                                        <div className="d-content-left d-black d-font-black d-text-24">
                                            {t("home.Your Email Address")}:<sup style={{color:'red'}}>*</sup>
                                        </div>
                                        </Form.Label>
                                        <Col sm={9} style={{ marginTop: 24 }}> 
                                        <Form.Control type="email" value={formData.email} isValid={formData.email && isValid.isEmailValid} isInvalid={!isValid.isEmailValid} placeholder={t("home.Email Address")} style={{ height: 40 }} onChange={(e)=>onFormDataChange(e, 'email')}/>
                                        <Form.Control.Feedback type="invalid">{t("home.Please enter a valid email address")}</Form.Control.Feedback>
                                        </Col>
                                        
                                    </Form.Group>
                                    <Form.Group as={Row} style={{ alignItems: 'left' }}>
                                        <Form.Label column sm={3} style={{ marginTop: 24 }}>
                                        <div className="d-content-left d-black d-font-black d-text-24">
                                            {t("home.Your Contact Number")}:<sup style={{color:'red'}}>*</sup>
                                        </div>
                                        </Form.Label>
                                        <Col sm={9} style={{ marginTop: 24 }}> 
                                        <Form.Control type="text" placeholder="Phone Number" isInvalid={!isValid.isPhoneValid} value={formData.phone} style={{ height: 40 }} onChange={(e)=>onFormDataChange(e, 'phone')}/>
                                        <Form.Control.Feedback type="invalid">{t("home.This field is required")}</Form.Control.Feedback>
                                        </Col>
                                        
                                    </Form.Group>
                                    <Form.Group as={Row} style={{ alignItems: 'left' }}>
                                        <Form.Label column sm={3} style={{ marginTop: 24 }}>
                                        <div className="d-content-left d-black d-font-black d-text-24">
                                            {t("home.Your Comments")}: {t("home.(optional)")}
                                        </div>
                                        </Form.Label>
                                        <Col sm={9} style={{ marginTop: 24 }}> 
                                        <Form.Control as="textarea" placeholder={t("home.You can write your comments here") }style={{ height: 100 }} onChange={(e)=>onFormDataChange(e, 'description')}/>
                                        </Col>
                                        
                                    </Form.Group>
                                    </Form>
                            </Modal.Body>

                            <Modal.Footer>
                                <Button variant="secondary" onClick={onModalClose}>{t("home.Cancel")}</Button>
                                <Button variant="primary" onClick={submitCallRequest}>{t("home.Submit Request")}</Button>
                            </Modal.Footer>
                            </Modal>
                    </Row>
                </div>
                <div className="d-white d-font-book d-text-10" style={{textAlign: "justify"}}>
                    {t("footer.content1")}
                    <br/>
                    <br/>
                    {t("footer.content2")}
                </div>
                <div className="" style={{margin: "6% 0% 6% 0%"}}>
                    <Row>
                        <Col md="4">
                            <Link to={'/home'}><img style={{width:"12vw"}} className="img-mobile" src={backMode=="light"?"/imgs/logo2_light.png":"/imgs/logo2.png"} alt="Logo"/></Link>
                        </Col>
                        <Col md="8" style={{ paddingRight:0,}}>
                            <div className="mt-1"/>
                            <ExternalLinks/>
                            <div style={{marginBottom: "20px"}} className='d-white mt-3 d-flex justify-content-end align-items-end'>
                                <span className="me-3">&copy;2022 TOKIZED</span>
                                <span className="tokized_start"><a href={setting?.trustpilot|| "#"}><img className="img-mobile" src={backMode=="light"?"/imgs/footer/8_light.png":"/imgs/footer/8.png"}></img></a></span>
                            </div>
                        </Col>
                    </Row>
                    
                </div>
                
                
            </div>
        )
}
