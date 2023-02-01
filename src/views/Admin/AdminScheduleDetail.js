import React, { useRef, useState, useEffect } from "react"
import { useHistory } from 'react-router-dom';
import { Button, Form, Input, Layout, Select } from "element-react"
import Fade from "react-reveal/Fade"
import { useDispatch, useSelector } from 'react-redux';
import { actionUserUpdate } from "../../redux/actions/user";

const AdminSheduleDetail = props => {
    const schedule = useSelector(state => state.schedules.currentSchedule);

    useEffect(() => {
        console.log(schedule);
        setForm({
            username: schedule.name,
            phone: schedule.phone,
            email: schedule.email,
            description: schedule.description
        });
    }, [schedule]);

    const [form, setForm] = useState({
        
    });

    return (
        <div className="d-flex flex-column justify-content-center align-items-center overflow-hidden">
            <div style={{ width: '80%' }}>
                <Fade bottom delay={200}>
                    <Form model={form} labelWidth="100" className="login-ruleForm d-font-bold" labelPosition={"top"} style={{ border: "2px solid #03ffa4", margin: 20, borderRadius: 10 }}>
                        <div className="container-fluid">
                            <h3 className="my-3 text-white">Schedule Detail</h3>
                            <div className="row">
                                <div className="col-md-12 mt-12">
                                    <Form.Item label="User name" prop="username">
                                        <Input type="text" value={form.username} />
                                    </Form.Item>
                                </div>
                                <div className="col-md-6 mt-6">
                                    <Form.Item label="Phone" prop="phone">
                                        <Input type="text" value={form.phone} />
                                    </Form.Item>
                                </div>

                                <div className="col-md-6 mt-6">
                                    <Form.Item label="email" prop="email">
                                        <Input type="email" value={form.email} />
                                    </Form.Item>
                                </div>
                                <div className="col-md-12 mt-12">
                                    <Form.Item label="description" prop="description">
                                        <Input type="textarea" value={form.description}/>
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

export default AdminSheduleDetail;