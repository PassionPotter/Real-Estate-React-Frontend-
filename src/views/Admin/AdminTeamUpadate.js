import React, { useRef, useState, useEffect } from "react"
import { useHistory } from 'react-router-dom';
import { Button, Form, Input, Layout, Select } from "element-react"
import Fade from "react-reveal/Fade"
import { useDispatch, useSelector } from 'react-redux';
import { actionTeamUpdate, actionTeamDelete } from "../../redux/actions/team";
import { callPost } from "../../services/axios";

const rules = {
    citizen: [{ required: true, message: 'This field is required', trigger: 'blur' }],
    walletAddress: [{ required: true, message: 'This field is required', trigger: 'blur' }],
    email: [{ required: true, message: 'This field is required', trigger: 'blur' }],
    username: [{ required: true, message: 'This field is required', trigger: 'blur' }],
    phone: [{ required: true, message: 'This field is required', trigger: 'blur' }],
};

const AdminUserUpdate = props => {
    const team = useSelector(state => state.team.currentTeam);

    useEffect(() => {
        setImgFile(team.avatar);
        setForm({
            name: team.name,
            job: team.job,
            content: team.content,
        });
    }, [team]);

    const [form, setForm] = useState({});

    const dispatch = useDispatch();
    const history = useHistory();

    const formRef = useRef();
    const [imgFile, setImgFile] = useState(team.avatar);
    const [file, setFileData] = useState(null);
    const [imgUrl, setUrl] = useState("");
    const setFile = e => {
        if(e.target.files.length !== 0) {
        setFileData(e.target?.files[0]);
        setUrl(URL.createObjectURL(e?.target?.files[0]));
        } else {
            setFileData(null);
            setUrl("");
        }
    }

    const onFormChange = (key, value) => {
        let formClone = Object.assign({}, form);
        formClone[key] = value;
        // console.log('onformchange', value);
        setForm(formClone);
    }

    const onSubmit = (e) => {
        e.preventDefault();
        formRef.current.validate(valid => {
            if (!valid || !file) return false;
            const formData = new FormData();
            formData.append("img", file, file.name);
            callPost('/api/admin/image/upload', formData)
            .then(res => {
                console.log('[Image Uploaded]', res);
                let payload = Object.assign({}, form);
                payload.id = team.id;
                payload.avatar = res.data.imgPaths[0];
                dispatch(actionTeamUpdate(payload));
                history.push('/admin/teams');
            }).catch(err => {
                console.log('[Image Upload Fail]', err);
            })
            
        });
    }

    const onSubmitDelete = (e) => {
        e.preventDefault();
        dispatch(actionTeamDelete(team.id));
        history.push('/admin/teams');
    }

    return (
        <div className="d-flex flex-column justify-content-center align-items-center overflow-hidden">
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
                            <h3 className="my-3 text-white">User Highlights</h3>
                            <div className="row">
                                <div className="col-md-6 mt-4">
                                    <div className=" zoom-image bg-white d-flex rounded justify-content-center align-items-center position-relative overflow-hidden d-inline-block w-100 bg-image hover-zoom" style={{ height: '100%', zIndex:"5" }}>
                                        <label for="img" style={{cursor:'pointer', height:'100%', width:'100%'}}>
                                        {
                                            !file ?
                                                imgFile ? <img src={`${process.env.REACT_APP_API_ENDPOINT}/public/${imgFile}`} className="w-100 h-100 img-thumbnail" alt="img"  /> : <img src="imgs/empty.png" className="w-100 h-100 img-thumbnail" alt="img" /> :
                                                <img src={`${imgUrl}`} />
                                        }
                                        </label>
                                    </div>
                                    <input type="file" id="img" onChange={setFile} hidden/>
                                </div>
                                <div className="col-md-6 mt-4">
                                    <Form.Item label="Name" prop="name">
                                        <Input type="text" value={form.name} onChange={val => onFormChange('name', val)} />
                                    </Form.Item>
                                    <Form.Item label="Job" prop="job">
                                        <Input type="text" value={form.job} onChange={val => onFormChange('job', val)} />
                                    </Form.Item>
                                    <Form.Item label="Content" prop="content">
                                        <Input type="text" value={form.content} onChange={val => onFormChange('content', val)} />
                                    </Form.Item>
                                </div>
                            </div>
                        </div>

                        <Form.Item style={{ textAlign: "center" }}>
                            <Button type="primary" nativeType="submit" onClick={onSubmit}>Update</Button>
                            <Button type="primary" nativeType="submit" onClick={onSubmitDelete}>Delete</Button>
                        </Form.Item>
                    </Form>
                </Fade>
            </div>
        </div>
    )
}

export default AdminUserUpdate;