import React, { useState, useRef, useEffect } from "react"
import { Button, Form, Input, Layout } from "element-react"
import Fade from "react-reveal/Fade"
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { actionHowworksUpdate } from "../../redux/actions/howworks";

const rules = {
  title: [{ required: true, message: 'This field is required', trigger: 'blur' }],
  description: [{ required: true, message: 'This field is required', trigger: 'blur' }],
};

const AdminHowWorksUpdate = props => {

  const dispatch = useDispatch();
  const history = useHistory();
  const formRef = useRef();
  const user = useSelector(state => state.auth.user);

  const [form, setForm] = useState({
    title: '',
    description: '',
  });

  const howworks = useSelector(state => state.howworks.currenthowworks);

    useEffect(() => {
        setForm({
            title:howworks.title,
            description:howworks.description
        });
    }, [howworks]);


  const onFormChange = (key, value) => {
    setForm({ ...form, [key]: value });
  }

  const onSubmit = () => {
    formRef.current.validate(valid => {
      if(!valid) return;
      let payload = {
        title: form.title,
        description: form.description,
        id:howworks.id,
      }

      dispatch(actionHowworksUpdate(payload));
      history.push('/admin/howworks');
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
                  <div className="ms-3">How Work New</div>
                  <div className="ms-auto me-3 d-flex align-items-center">
                    <img src="imgs/logo3.png" alt='logo' style={{ height: "35px" }} />
                  </div>
                </div>
              </Layout.Col>
            </Layout.Row>

            <div className="container-fluid">
              <div className="row">
                <div className="col-md-12">
                  <Form.Item label="Title" prop="title">
                    <Input value={form.title} onChange={val => onFormChange('title', val)} />
                  </Form.Item>
                </div>
                <div className="col-md-12">
                  <Form.Item label="Description" prop="description">
                    <Input type="description" value={form.description} onChange={val => onFormChange('description', val)} autoComplete="off" />
                  </Form.Item>
                </div>
               
                <div className="col-md-12">
                  <Form.Item style={{ textAlign: "center" }}>
                    <Button type="success" onClick={onSubmit}>Update</Button>
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

export default AdminHowWorksUpdate;