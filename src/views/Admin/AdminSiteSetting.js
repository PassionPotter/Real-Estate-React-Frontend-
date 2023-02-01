import React, { useEffect, useState } from "react"
import { Button, Form, Input, Layout } from "element-react"
import Fade from "react-reveal/Fade"
import { useDispatch, useSelector } from "react-redux";
import { actionSitesettingsUpdate } from "../../redux/actions/sitesettings";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';


const rules = {
  websiteTitle: [{ required: true, message: 'Please input website title', trigger: 'blur' }],
  description: [{ required: true, message: 'Please input description', trigger: 'blur' }]
};

const AdminSiteSetting = props => {


  const sitesettings = useSelector(state => state.sitesettings.sitesettingsData);
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    id: null,
    title: '',
    description: '',
    keywords: '',
    address: '',
    telephone: '',
    language: '',
    tokenBuyBackPeriod: '',
    referralCommision: '',
    refferalorder: '',
    videoLink: null,
    youtube: null,
    twitter: null,
    linkedin: null,
    twitch: null,

    //englishtelegram: null,
    //spanishtelegram: null,
    //frenchtelegram: null,
    //germantelegram: null,
    //russiantelegram: null,
    discord: null,
    trustpilot: null,
    rarible: null,
    wechat: null,
    weibo: null,
    //kawasakiSocial: null,
    //languageSocial: null,
  });

  useEffect(() => {
    if (sitesettings.length) {
      const ss = sitesettings[0];
      console.log(ss);
      setForm({
      id: ss.id,
      title: ss.title,
      description: ss.description,
      keywords: ss.keywords,
      telephone: ss.telephone,
      address: ss.address,
      language: ss.language,
      tokenBuyBackPeriod: ss.tokenBuyBackPeriod,
      referralCommision: ss.referralCommision,
      refferalorder: ss.refferalorder,
      videoLink: ss.videoLink,
      youtube: ss.youtube,
      twitter: ss.twitter,
      linkedin: ss.linkedin,
      twitch: ss.twitch,
      //englishtelegram: ss.englishtelegram,
      //spanishtelegram: ss.spanishtelegram,
      //frenchtelegram: ss.frenchtelegram,
      //germantelegram: ss.germantelegram,
     // russiantelegram: ss.russiantelegram,
      discord: ss.discord,
      trustpilot: ss.trustpilot,
      rarible: ss.rarible,
      wechat: ss.wechat,
      weibo: ss.weibo,
      //kawasakiSocial: ss.kawasakiSocial,
      //languageSocial: ss.languageSocial,
        
      })
    }
  }, [sitesettings]);

  const onFormChange = (key, value) => {
    setForm({...form, [key]: value });
  }

  const OnEditorChange = (editor) => {
    let formClone = Object.assign({}, form);
    const data = editor.getData();
    formClone["address"] = data;
    setForm(formClone);
  }

  const onSubmit = () => {
    // formRef.current.validate(valid => {
      // if (!valid) return;
      let payload = {
      id: form.id,
      title: form.title,
      description: form.description,
      keywords: form.keywords,
      telephone: form.telephone,
      address: form.address,
      language: form.language,
      tokenBuyBackPeriod: form.tokenBuyBackPeriod,
      referralCommision: form.referralCommision,
      refferalorder: form.refferalorder,
      videoLink: form.videoLink,
      youtube: form.youtube,
      twitter: form.twitter,
      linkedin: form.linkedin,
      twitch: form.twitch,
      //englishtelegram: form.englishtelegram,
      //spanishtelegram: form.spanishtelegram,
      //frenchtelegram: form.frenchtelegram,
      //germantelegram: form.germantelegram,
      //russiantelegram: form.russiantelegram,
      discord: form.discord,
      trustpilot: form.trustpilot,
      rarible: form.rarible,
      wechat: form.wechat,
      weibo: form.weibo,
      //kawasakiSocial: form.kawasakiSocial,
      //languageSocial: form.languageSocial,
      }

      dispatch(actionSitesettingsUpdate(payload));
    // });
  }

  return (
    <div className="d-flex flex-column justify-content-center align-items-center overflow-hidden">
      <div style={{ width: '80%' }}>
        <Fade bottom delay={200}>
          <Form model={form} rules={rules} labelWidth="100" className="login-ruleForm d-font-bold" labelPosition={"top"} style={{ border: "2px solid #03ffa4", margin: 20, borderRadius: 10 }}>
            <Layout.Row style={{ fontSize: 25, margin: "-1px 0px 15px 0px" }}>
              <Layout.Col span="24">
                <div className="grid-content d-content-highlight d-flex" style={{ borderRadius: "10px 10px 1px 1px" }}>
                  <div className="ms-3">Site Settings</div>
                  <div className="ms-auto me-3 d-flex align-items-center">
                    <img src="imgs/logo3.png" alt='logo' style={{ height: "35px" }} />
                  </div>
                </div>
              </Layout.Col>
            </Layout.Row>

            <Form.Item label="Website Title" prop="title" className="m-3 mt-4">
              <Input value={form.title} onChange={val => onFormChange('title', val)} />
            </Form.Item>

            <Form.Item label="Description" prop="description" className="m-3 mt-4">
              <Input type="description" value={form.description} onChange={val => onFormChange('description', val)} autoComplete="off" />
            </Form.Item>

            <Form.Item label="Keywords" prop="keywords" className="m-3 mt-4">
              <Input value={form.keywords} onChange={val => onFormChange('keywords', val)} />
            </Form.Item>

            <Form.Item label="Website Phone" prop="telephone" className="m-3 mt-4">
              <Input value={form.telephone} onChange={val => onFormChange('telephone', val)} />
            </Form.Item>
            <Form.Item label="Address" prop="address" className="m-3 mt-4">
              {/* <Input value={form.address} onChange={val => onFormChange('address', val)} /> */}
              <CKEditor
                      editor={ ClassicEditor }
                      onReady={ editor => {
                        editor.setData(form.address?form.address:"")
                      }}
                      data={form.address?form.address:""}
                      onChange={ ( event, editor ) => OnEditorChange(editor)}
                    
                  />
            </Form.Item>
            
            <Form.Item label="Token Buy Back period(days)" prop="tokenBuyBackPeriod" className="m-3 mt-4">
              <Input value={form.tokenBuyBackPeriod} onChange={val => onFormChange('tokenBuyBackPeriod', val)} />
            </Form.Item>
            <Form.Item label="Referral Commission(%)" prop="referralCommision" className="m-3 mt-4">
              <Input value={form.referralCommision} type="number" onChange={val => onFormChange('referralCommision', val)} />
            </Form.Item>
            <Form.Item label="Referral Order(%)" prop="refferalorder" className="m-3 mt-4">
              <Input value={form.refferalorder} type="number" onChange={val => onFormChange('refferalorder', val)} />
            </Form.Item>

            <Form.Item label="Language" prop="language" className="m-3 mt-4">
              <Input value={form.language} onChange={val => onFormChange('language', val)} />
            </Form.Item>
            <Form.Item label="Video Link" prop="videoLink" className="m-3 mt-4">
              <Input value={form.videoLink} onChange={val => onFormChange('videoLink', val)} />
            </Form.Item>
            <Form.Item label="Email" prop="twitch" className="m-3 mt-4">
              <Input value={form.twitch} onChange={val => onFormChange('twitch', val)} />
            </Form.Item>
            <div class="el-form-item m-3 mt-4">
              <img class="el-form-item__label" src="/imgs/footer/1.png"/>
              <div class="el-form-item__content">
                <div class="el-input">
                  <input type="text" class="el-input__inner" autocomplete="off" value={form.twitter} onChange={e => onFormChange('twitter', e.target.value)}/>
                </div>
              </div>
            </div>
            <div class="el-form-item m-3 mt-4">
              <img class="el-form-item__label" src="/imgs/footer/2.png"/>
              <div class="el-form-item__content">
                <div class="el-input">
                  <input type="text" class="el-input__inner" autocomplete="off" value={form.linkedin} onChange={e => onFormChange('linkedin', e.target.value)}/>
                </div>
              </div>
            </div>
            <div class="el-form-item m-3 mt-4">
              <img class="el-form-item__label" src="/imgs/footer/3.png"/>
              <div class="el-form-item__content">
                <div class="el-input">
                  <input type="text" class="el-input__inner" autocomplete="off" value={form.youtube} onChange={e => onFormChange('youtube', e.target.value)}/>
                </div>
              </div>
            </div>
            <div class="el-form-item m-3 mt-4">
              <img class="el-form-item__label" src="/imgs/footer/4.png"/>
              <div class="el-form-item__content">
                <div class="el-input">
                  <input type="text" class="el-input__inner" autocomplete="off" value={form.wechat} onChange={e => onFormChange('wechat', e.target.value)}/>
                </div>
              </div>
            </div>
            <div class="el-form-item m-3 mt-4">
              <img class="el-form-item__label" src="/imgs/footer/5.png"/>
              <div class="el-form-item__content">
                <div class="el-input">
                  <input type="text" class="el-input__inner" autocomplete="off" value={form.rarible} onChange={e => onFormChange('rarible', e.target.value)}/>
                </div>
              </div>
            </div>
            <div class="el-form-item m-3 mt-4">
              <img class="el-form-item__label" src="/imgs/footer/6.png"/>
              <div class="el-form-item__content">
                <div class="el-input">
                  <input type="text" class="el-input__inner" autocomplete="off" value={form.weibo} onChange={e => onFormChange('weibo', e.target.value)}/>
                </div>
              </div>
            </div>
            <div class="el-form-item m-3 mt-4">
              <img class="el-form-item__label" src="/imgs/footer/7.png"/>
              <div class="el-form-item__content">
                <div class="el-input">
                  <input type="text" class="el-input__inner" autocomplete="off" value={form.discord} onChange={e => onFormChange('discord', e.target.value)}/>
                </div>
              </div>
            </div>
            

            <div class="el-form-item m-3 mt-4">
              <img class="el-form-item__label" src="/imgs/footer/11.png"/>
              <div class="el-form-item__content">
                <div class="el-input">
                  <input type="text" class="el-input__inner" autocomplete="off" value={form.trustpilot} onChange={e => onFormChange('trustpilot', e.target.value)}/>
                </div>
              </div>
            </div>
            


            <Form.Item style={{ textAlign: "center" }}>
              <Button type="success" onClick={onSubmit}>Save</Button>
            </Form.Item>
          </Form>
        </Fade>
      </div>
    </div>
  )
}

export default AdminSiteSetting;