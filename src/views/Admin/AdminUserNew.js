import React, { useRef, useState } from "react"
import { Button, Form, Input, Layout, Select } from "element-react"
import Fade from "react-reveal/Fade"
import { useDispatch } from "react-redux";
import { actionUserCreate } from "../../redux/actions/user";
import { useHistory } from "react-router-dom";

const rules = {
  email: [{ required: true, message: 'This field is required', trigger: 'blur' }],
  walletAddress: [{ required: true, message: 'This field is required', trigger: 'blur' }],
  role: [{ required: true, message: 'This field is required', trigger: 'blur' }],
};

const roles = {
  "user": "User",
  "moderator": "Moderator",
  "admin": "Admin"
}

const AdminUserNew = props => {

  const formRef = useRef();
  const dispatch = useDispatch();
  const history = useHistory();

  const [form, setForm] = useState({
    email: '',
    walletAddress: '',
    role: '',
  });

  console.log(form.role);

  const onFormChange = (key, value) => {
    setForm({ ...form, [key]: value });
  }

  const onSubmit = () => {
    formRef.current.validate(valid => {
      if(!valid) return;
      let payload = Object.assign({}, form);
      payload.role = Object.keys(roles).find(r => roles[r] === payload.role);
      console.log('payload', payload)
      dispatch(actionUserCreate(payload));
      history.push('/admin/users');
    });
  }

  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <div style={{ width: '80%' }}>
        <Fade bottom delay={200}>
          <Form ref={formRef} model={form} rules={rules} labelWidth="100" className="login-ruleForm d-font-bold" labelPosition={"top"} style={{ border: "2px solid #03ffa4", margin: 20, borderRadius: 10 }}>
            <Layout.Row style={{ fontSize: 25, margin: "-1px 0px 15px 0px" }}>
              <Layout.Col span="24">
                <div className="grid-content d-content-highlight d-flex" style={{ borderRadius: "10px 10px 1px 1px" }}>
                  <div className="ms-3">User Detail</div>
                  <div className="ms-auto me-3 d-flex align-items-center">
                    <img src="imgs/logo3.png" alt='logo' style={{ height: "35px" }} />
                  </div>
                </div>
              </Layout.Col>
            </Layout.Row>

            <div className="container-fluid">
              <div className="row">
                <div className="col-md-12">
                  <Form.Item label="Email" prop="email">
                    <Input type="email" value={form.email} onChange={val => onFormChange('email', val)} />
                  </Form.Item>
                </div>
                <div className="col-md-12">
                  <Form.Item label="Wallet Address" prop="walletAddress">
                    <Input type="text" value={form.walletAddress} onChange={val => onFormChange('walletAddress', val)} autoComplete="off" />
                  </Form.Item>
                </div>
                <div className="col-md-12">
                  <Form.Item label="Role" prop="role">
                    <Select className="w-100" value={form.role} onChange={val => onFormChange('role', val)}>
                      {
                        Object.keys(roles).map(item => <Select.Option value={roles[item]}>{roles[item]}</Select.Option>)
                      }
                    </Select>
                  </Form.Item>
                </div><div className="col-md-12">
                  <Form.Item style={{ textAlign: "center" }}>
                    <Button type="success" onClick={onSubmit}>Create</Button>
                  </Form.Item>
                </div>
              </div>
            </div>


          </Form>
        </Fade>
      </div>
    </div>
  )
}

export default AdminUserNew;