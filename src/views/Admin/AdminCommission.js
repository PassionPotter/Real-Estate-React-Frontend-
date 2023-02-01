import React, { useState, useEffect } from "react"
import { Button, Layout } from "element-react"
import { callGet, callPost } from "../../services/axios";
import { Table as TableBs } from 'react-bootstrap';
import Fade from "react-reveal/Fade"

const AdminCommission = props => {

    const [talData, setTbl] = useState([]);

    useEffect(() => {
		callGet('/api/admin/commission').then(res => {
            if(res.data)
                setTbl(res.data)
        });
	}, []);

    const delCommission = (id) => {
        const data = {
            id: id,
        }
        callPost('/api/admin/commission/del', data).then(res => {
            if(res.data)
                setTbl(res.data)
        })
    } 
    return (
        <div className="d-flex flex-column justify-content-center align-items-center overflow-hidden">
            <div style={{ width: '80%' }}>
                <Fade bottom delay={200}>
                <h1 style={{ textAlign: "center" }} className='d-font-bold d-text-90 d-white'>Commission</h1>
                <div className="d-flex">

                </div>
                <div className="login-ruleForm mt-4" labelposition={"top"} style={{ border: "2px solid #03ffa4", borderRadius: "10px 10px 0 0" }}>
                    <Layout.Row style={{ fontSize: 25, margin: "-1px 0px 0 0px" }}>
                    <Layout.Col span="24">
                        <div className="grid-content d-content-highlight d-flex" style={{ borderRadius: "10px 10px 1px 1px" }}>
                        <div className="ms-3">List</div>
                        <div className="ms-auto me-3 d-flex align-items-center">
                            <img src="imgs/logo3.png" alt='logo' style={{ height: "35px" }} />
                        </div>
                        </div>
                    </Layout.Col>
                    </Layout.Row>
                    <div className="w-150 overflow-auto">
                        <TableBs striped hover variant="dark" style={{ margin: 0, overflow: "scroll" }} className="text-center">
                            <thead>
                                <tr>
                                    <th className="bg-secondary">#</th>
                                    <th className="bg-secondary" style={{ minWidth: 50 }}>Username</th>
                                    <th className="bg-secondary" style={{ minWidth: 50 }}>Amount</th>
                                    <th className="bg-secondary" style={{ minWidth: 100 }}></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    talData.map((row, i) =>
                                        <tr>
                                            <td>{i + 1}</td>
                                            <td>{row.username}</td>
                                            <td>{row.amount}</td>
                                            <td><Button onClick={() => delCommission(row.id)} style={{marginTop:0}}>Approve it</Button></td>
                                        </tr>)
                                }
                            </tbody>
                        </TableBs>
                    </div>
                </div>
                </Fade>
            </div>
        </div>
    )

}

export default AdminCommission