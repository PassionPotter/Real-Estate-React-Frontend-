import React, { useState, useRef, useEffect } from "react"
import { Button, Form, Input, Layout, Select } from "element-react"
import Fade from "react-reveal/Fade"
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { actionQuizCreate, actionQuizList, actionQuizRemove } from "../../redux/actions/quiz";
import { TagsInput } from "react-tag-input-component";


const rules = {
  title: [{ required: true, message: 'This field is required', trigger: 'blur' }],
  description: [{ required: true, message: 'This field is required', trigger: 'blur' }],
};

const AdminQuizNew = props => {

  const dispatch = useDispatch();
  const formRef = useRef();
  const quizs = useSelector(state => state.quiz.quizData);
  useEffect(() => {
    dispatch(actionQuizList());
  }, [])
  const [form, setForm] = useState({
    title: '',
    type:'TEXT',
  });

  const [panswer, setPAnswer] = useState([]);

  const onFormChange = (key, value) => {
      
    setForm({ ...form, [key]: value });
  }


  const onSubmit = () => {
    formRef.current.validate(valid => {
      if(!valid) return;
      console.log(form);
      let payload = {
        title: form.title,
        panswer: JSON.stringify(panswer),
        type:form.type
      }
      dispatch(actionQuizCreate(payload));
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
                  <div className="ms-3">Quiz NEW</div>
                  <div className="ms-auto me-3 d-flex align-items-center">
                    <img src="imgs/logo3.png" alt='logo' style={{ height: "35px" }} />
                  </div>
                </div>
              </Layout.Col>
            </Layout.Row>

            <div className="container-fluid">
              <div className="row">
                <div className="col-md-4">
                  <Form.Item label="Title" prop="title">
                    <Input value={form.title} onChange={val => onFormChange('title', val)} />
                  </Form.Item>
                </div>
                <div className="col-md-4">
                  <Form.Item label="Possible Answers" prop="panswers">
                  <TagsInput
                        value={panswer}
                        onChange={setPAnswer}
                        name="panswers"
                    />
                  </Form.Item>
                </div>
                <div className="col-md-2">
                  <Form.Item label="Type" prop="type">
                    <Select className="w-100" value={form.type} onChange={val => onFormChange('type', val)}>
                        <Select.Option value="TEXT" selected>TEXT</Select.Option>
                        <Select.Option value="SINGLE" >SINGLE</Select.Option>
                        <Select.Option value="MULTIPLE" >MULTIPLE</Select.Option>
                    </Select>
                  </Form.Item>
                </div>
               
                <div className="col-md-1">
                  <Form.Item style={{ textAlign: "center", marginTop:10 }}>
                    <Button type="success" onClick={onSubmit}>Create</Button>
                  </Form.Item>
                </div>
              </div>
            </div>
          </Form>

          <div className="login-ruleForm d-font-bold" style={{ border: "2px solid #03ffa4", margin: 20,  marginTop:100,borderRadius: 10 }}>
            <Layout.Row style={{ fontSize: 25, margin: "-1px 0px 15px 0px" }}>
              <Layout.Col span="24">
                <div className="grid-content d-content-highlight d-flex" style={{ borderRadius: "10px 10px 1px 1px" }}>
                  <div className="ms-3">Quiz List</div>
                  <div className="ms-auto me-3 d-flex align-items-center">
                    <img src="imgs/logo3.png" alt='logo' style={{ height: "35px" }} />
                  </div>
                </div>
              </Layout.Col>
            </Layout.Row>

            <div className="container-fluid text-white">
                { quizs && quizs.map((item, index) => (
                    <div className="row">
                        <h4 className="text-white">Quiz {index + 1}:</h4>
                        <div className="col-md-12 text-white">
                            Title:{item.title}
                        </div>
                        <div className="col-md-12 text-white">
                        Possible Answers:{item.panswer}
                        </div>
                        <div className="col-md-12 text-white">
                        Type:{item.type}
                        </div>
                        <div className="col-md-4 text-white">
                        <Button type="success" onClick={() => dispatch(actionQuizRemove(item.id))}>Remove</Button>
                        </div>
                        <hr/>
                    </div>
                    
                ))}
              </div>
          </div>
        </Fade>
      </div>
    </div>
  )
}

export default AdminQuizNew;