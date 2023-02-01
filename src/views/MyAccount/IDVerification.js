
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Button } from 'react-bootstrap';
import { axiosGet, axiosPost } from "../../services/axios";
import { actionUserUpdateCard } from '../../redux/actions/user';
import { useHistory, useLocation } from 'react-router';
import { useTranslation } from "react-i18next";
import Persona from 'persona';
import { Notification } from 'element-react';
const axios = require("axios").default;
const fs = require('fs');

const IDVerification = props => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);
  const card = useSelector(state => state?.auth?.user?.card);
  const [imgFile, setImgFile] = useState("");
  const {search:__search} = useLocation();
  const __history = useHistory();
  const { t } = useTranslation();
  // console.log('imgfile',imgFile);
  const onFileChange = e => {
    setImgFile(e.target.files[0]);
  }

  useEffect(()=>{
    if(card){
      axiosPost('/api/user/img', {card:card}).then(res => {
        if(res.data){
          const base64 = window.btoa(new Uint8Array(res.data.img.data).reduce((data, byte) => data + String.fromCharCode(byte),'',),
          );
          console.log('base64', base64);
          let img64 = 'data:;base64,' + base64;

          setImgFile(img64)
        }
      })
      let userObj = JSON.parse(localStorage.getItem('user'));
      let newUserObj = {...userObj, card: card}

      localStorage.setItem('user', JSON.stringify(newUserObj));

      const urlParams = new URLSearchParams(__search);
      const myParam = urlParams.get('verify_identity');
      // const user = JSON.parse(localStorage.getItem('user'));
      if(myParam && card){
        __history.replace('detail/'+myParam)
      }
    }
    
  },[card])

  const _arrayBufferToBase64 = str => {
    return window.btoa(String.fromCharCode.apply(null, str.replace(/\r|\n/g, "").replace(/([\da-fA-F]{2}) ?/g, "0x$1 ").replace(/ +$/, "").split(" ")));
  };

  const approvedIDverification = (inquiryId, status, fields) => {
    if(status === 'completed') {
      console.log(fields);
      const data = {
        id: user.id,
        inquiryId: inquiryId,
      };
      console.log(user);
      if(user.firstName === fields['name-first'].value && 
          user.lastName === fields['name-last'].value)
      {
      }
      else {
        Notification.error({
          title: 'Failed',
          message: 'Your info is not correct',
          type: 'Warning',
        })
      }
      axiosPost('/api/user/approve', data)
      .then(res => {
        console.log(res.data)
        if(res.data){
          let payload = {};
          payload.card = res.data.card;
          payload.id = user.id;
          dispatch(actionUserUpdateCard(payload));
        }
      })
      .catch(err => console.error(err));
    }
    else {
      Notification.error({
        title: 'Failed',
        message: 'Verification is not completed',
        type: 'Warning',
      })
    }
  };

  const submitImage = e => {
    const token = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user'))['accessToken'] : null
    if (imgFile) {
      if(!imgFile?.name){
        return false;
      }
      const formData = new FormData();
      formData.append("img", imgFile, imgFile.name);
      console.log('token', token);
      axiosPost('/api/admin/image/upload', formData )
        .then(res => {
          console.log('[Image Uploaded]', res);
          let payload = {};
          
          payload.card = res.data?.imgPaths?.[0];
          payload.id = user.id;
          dispatch(actionUserUpdateCard(payload));

        }).catch(err => {
          console.log('[Image Upload Fail]', err);
        })
    }
  }
  return (
    <>
     <div className="d-content-highlight d-font-strong d-black d-text-30" style={{padding: '24px 4%', display: 'flex', alignItems: 'center', height:"40%"}}>
        {t("IDVerification.")}
        
      </div>
      <div className="bg-white d-flex rounded justify-content-center align-items-center position-relative overflow-hidden d-inline-block w-100" style={{ height: '100%' }}>
        { 
          !card ?
          <Persona.Inquiry
              templateId='itmpl_8WA88tmM7D9XaxSjhWP6BwMe'
              environment='sandbox'
              onLoad={() => { console.log('Loaded inline'); }}
              onComplete={({ inquiryId, status, fields }) => {
                approvedIDverification(inquiryId, status, fields);
              }}  
          />
          :
            <img src={typeof imgFile==='object'?URL.createObjectURL(imgFile):imgFile} className="w-80 h-80 img-thumbnail" alt="img" />
        }
      </div>
      <div className="d-content-center" style={{ marginTop: 'auto' }}>
        {/* <Button className="d-font-bold d-text-24" style={{ paddingLeft: 36, paddingRight: 36 }} onClick={submitImage}>
          {t("IDVerification.SUBMIT DOCUMENTS HERE")}
          
        </Button> */}
      </div>
    </>
  )
}

export default IDVerification;
