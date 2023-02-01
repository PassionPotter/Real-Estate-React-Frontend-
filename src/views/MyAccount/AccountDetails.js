import React, { useState, useRef } from "react"
import { useDispatch, useSelector } from "react-redux";
import Login from "../Login"
import Fade from "react-reveal/Fade"
import { Form, Input, Layout, Notification } from "element-react"
import { actionAuthResetNewPassword } from "../../redux/actions/auth";
import {Button } from 'react-bootstrap'
import { useTranslation } from "react-i18next";

const AdminDashboard = props => {

  const dispatch = useDispatch();
  const formRef = useRef();
  const user = useSelector(state => state.auth.user);
  const { t } = useTranslation();

  const rules = {
    password: [{ required: true, message: t("AccountDetail.This field is required"), trigger: 'blur' }],
    confirm: [{ required: true, message: t("AccountDetail.This field is required"), trigger: 'blur' }],
    currentPassword: [{ required: true, message: t("AccountDetail.This field is required"), trigger: 'blur' }],
  };
  
  const [form, setForm] = useState({
    currentPassword: null,
    password: null,
    confirm: null,
  });

  const onFormChange = (key, value) => {
    setForm({...form, [key]: value});
  }
  const onSubmit = () => {
    formRef.current.validate(valid => {
      if(!valid) return;

      if(form.password != form.confirm) {
        Notification.error({
          title: t("AccountDetail.Failed"),
          message: t("AccountDetail.Password does not match"),
          type: 'Warning',
        });
        return;
      }
      
      let payload = {
        username: user.email,
        password: form.password,
        currentPassword: form.currentPassword
      }

      dispatch(actionAuthResetNewPassword(payload));
    });
  }

  return (
    <div className="d-flex flex-column justify-content-center align-items-center overflow-hidden">
      <div style={{ width: '80%' }}>
        <Fade bottom delay={200}>
          <h1 style={{ textAlign: "center" }} className='d-font-bold d-text-90 d-white'>{t("AccountDetail.Account Details")}</h1>
          <Layout.Row>
            <Layout.Col >
              <div className="grid-content">
                <Form ref={formRef} model={form} rules={rules} labelWidth="100" className="login-ruleForm d-font-bold" labelPosition={"top"} style={{ margin: 20, borderRadius: 10 }}>
                  <Layout.Row style={{ fontSize: 25, margin: "-1px 0px 15px 0px" }}>
                    <Layout.Col span="24">
                      <div className="grid-content d-content-highlight d-flex" style={{ borderRadius: "10px 10px 1px 1px" }}>
                        <div className="ms-3">{t("AccountDetail.Reset Password")}</div>
                        
                      </div>
                    </Layout.Col>
                  </Layout.Row>
                  <Form.Item label={t("AccountDetail.First Name")} prop="firstName" className="m-3 mt-4">
                    <Input type="text" disabled={true} defaultValue={user.firstName} onChange={val => onFormChange('password', val)} />
                  </Form.Item>
                  <Form.Item label={t("AccountDetail.Last Name")} prop="lastName" className="m-3 mt-4">
                    <Input type="text" disabled={true} defaultValue={user.lastName} />
                  </Form.Item>
                  <Form.Item label={t("AccountDetail.Username")} prop="username" className="m-3 mt-4">
                    <Input type="text" disabled={true} defaultValue={user.username}  />
                  </Form.Item>

                  <Form.Item label={t("AccountDetail.Email")} prop="email" className="m-3 mt-4">
                    <Input type="text" disabled={true} defaultValue={user.email}  />
                  </Form.Item>   
                  <Form.Item label={t("AccountDetail.Current Password")} prop="currentPassoword" className="m-3 mt-4">
                    <Input type="password" value={form.currentPassword} onChange={val => onFormChange('currentPassword', val)}  />
                  </Form.Item>                                 
                  <Form.Item label={t("AccountDetail.Password")} prop="password" className="m-3 mt-4">
                    <Input type="password" value={form.password} onChange={val => onFormChange('password', val)} />
                  </Form.Item>

                  <Form.Item label={t("AccountDetail.Confirm")} prop="confirm" className="m-3 mt-4">
                    <Input type="password" value={form.confirm} onChange={val => onFormChange('confirm', val)} autoComplete="off" />
                  </Form.Item>

                  <Form.Item style={{ textAlign: "center"}}>
                    <Button className="btn btn-primary mb-3" style={{padding:"5px 30px"}} onClick={onSubmit}>{t("AccountDetail.Save")}</Button>
                  </Form.Item>
                </Form>
              </div>
            </Layout.Col>
          </Layout.Row>
        </Fade>
      </div>
    </div>
  )
}

export default AdminDashboard