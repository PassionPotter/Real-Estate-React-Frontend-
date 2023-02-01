import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom";
import { Layout, Notification } from "element-react"
import Fade from "react-reveal/Fade"
import { Table as TableBs, Form, Button, Grid } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import { callGet, callPost } from "../../services/axios";
import { CSVLink } from "react-csv";

// import { CONTRACT_ABI } from '../../config/abi';

const SheduleList = props => {
    const headers = [
        { label: "Username", key: "firstname" },
        { label: "Wallet Address", key: "WalletAddress" },
        { label: "Total Rent payable", key: "totalrentpayble" },
        { label: "Address", key: "address" },
        { label: "Rent/second", key: "rentscond" },
        { label: "", key: "space" },
        { label: "Total of Rent Earned", key: "Totalearned" },
        { label: "Username", key: "sameuser" },
        { label: "Wallet Address", key: "samewallet" },
        { label: "Total of Rent Earned", key: "eachtotalprice" },

    ];
    const data = []
    const dispatch = useDispatch();
    const schedules = useSelector(state => state.schedules.scheduleList);
    const history = useHistory();
    const [tablehead, setTablehead] = useState([]);
    const [tabledata, setTabledata] = useState([]);
    const [t_state, setTablestate] = useState(false);
    const [t_rentpayable, setT_rentpayble] = useState(false);
    const [each_total, setEach_total] = useState([]);
    let total_price = 0;
    total_price = Number(total_price);
    useEffect(() => {
        // callGet(`/api/admin/rent`)
        //     .then(res => {
        //         console.log(res.data, "the rest time");
        //         setTablehead(res.data);
        //         setT_rentpayble(true)
        //     });
        callGet(`/api/admin/rentcalculation`)
            .then(response => {
                console.log(response.data, "the res");
                setTabledata(response.data);
                setEach_total(response.data);
                setTablestate(true);
                console.log(each_total, " other data");
            });
}, []);
    if (t_state == true) {
        for (let j = 0; j < tabledata.length; j++) {
            tabledata[j].usernamestate = true;
            tabledata[j].repeat = false;
            tabledata[j].alleachprice = 0;
            let firstTotalPersRent = (((tabledata[j].monthlyGrossRent - tabledata[j].monthlyCosts) * 12) / (31557600 * tabledata[j].generatedToken)) * tabledata[j].count;
            if (tabledata[j].rentstate == 'Disable') {
                tabledata[j].totalprice = Number(tabledata[j].storeprice).toFixed(15);
                tabledata[j].sRent = 0;
            }
            else {
                tabledata[j].sRent = Number(((tabledata[j].monthlyGrossRent - tabledata[j].monthlyCosts) * 12) / (31557600 * tabledata[j].generatedToken)).toFixed(15);
                tabledata[j].totalprice = Number(Number(firstTotalPersRent * tabledata[j].seconds).toFixed(15)) + Number(Number(tabledata[j].storeprice).toFixed(15));
                console.log(firstTotalPersRent, tabledata[j].seconds, Number(Number(tabledata[j].storeprice).toFixed(15)))
            }
            total_price += Number(Number(tabledata[j].totalprice).toFixed(15));
        }
        for (let k = 0; k < tabledata.length; k++) {
            tabledata[k].alleachprice = Number(Number(tabledata[k].totalprice).toFixed(15))
            for (let n = (k + 1); n < tabledata.length; n++) {
                if ((tabledata[k].username == tabledata[n].username) && (tabledata[k].usernamestate == true)) {
                    console.log(tabledata[k].alleachprice, "tabledata[k].alleachprice")
                    tabledata[k].alleachprice += Number(Number(tabledata[n].totalprice).toFixed(15));
                    tabledata[n].usernamestate = false;
                }
            }
            if (tabledata[k].usernamestate == true) {
                data.push({ firstname: tabledata[k].username, WalletAddress: tabledata[k].walletAddress, totalrentpayble: tabledata[k].totalprice, address: tabledata[k].address1, rentscond: tabledata[k].sRent, sameuser: tabledata[k].username, eachtotalprice: tabledata[k].alleachprice, samewallet: tabledata[k].walletAddress });
            } else {
                data.push({ firstname: tabledata[k].username, WalletAddress: tabledata[k].walletAddress, totalrentpayble: tabledata[k].totalprice, address: tabledata[k].address1, rentscond: tabledata[k].sRent });

            }
            data[0].Totalearned = total_price;

        }
    }
    //payment
    const payment = () => {
        console.log(tabledata, "tabledatastata");
        let senddata = [];
        for (let p = 0; p < tabledata.length; p++) {
            let obj = {
                orderId: tabledata[p].orderId,
            }
            senddata.push(obj);
        }
        callPost(`/api/admin/reportdata`, senddata)
            .then(res => {
                if (res.data == "paymentok") {
                    window.location.reload();
                }
                Notification.success({
                    title: 'Success',
                    message: 'Payment  success',
                    type: 'success'
                })
            })
    }
    return (
        <div className="d-flex flex-column justify-content-center align-items-center overflow-hidden">
            <div style={{ width: '93%' }}>
                <Fade bottom delay={200}>
                    <h1 style={{ textAlign: "center" }} className='d-font-bold d-text-90 d-white'>Rent Calculation</h1>
                    <div className="login-ruleForm mt-4" labelposition={"top"} style={{ border: "2px solid #03ffa4", borderRadius: "10px 10px 0 0" }}>
                        <Layout.Row style={{ fontSize: 25, margin: "-1px 0px 0 0px" }}>
                            <Layout.Col span="24">
                                <div className="grid-content d-content-highlight d-flex" style={{ borderRadius: "10px 10px 1px 1px" }}>
                                    <div className="ms-4">List</div>
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
                                        <th className="bg-secondary" style={{ minWidth: 50 }}>Username</th>
                                        <th className="bg-secondary" style={{ minWidth: 50 }}>Wallet address</th>
                                        <th className="bg-secondary" style={{ minWidth: 100 }}>Total Rent payable</th>
                                        <th className="bg-secondary" style={{ minWidth: 100 }}>Address</th>
                                        <th className="bg-secondary" style={{ minWidth: 100 }}>Rent/second</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {t_state &&
                                        tabledata.map((row, i) =>
                                            <tr key={i} >
                                                <td>{row.username}</td>
                                                <td>{row.walletAddress}</td>
                                                <td>${row.totalprice}</td>
                                                <td>{row.address1}</td>
                                                <td>{row.sRent}</td>
                                            </tr>)
                                    }
                                </tbody>
                            </TableBs>
                        </div>
                    </div>
                </Fade>
            </div>
            <div className="login-ruleForm mt-4" labelposition={"top"} style={{ border: "2px solid #03FFA4", borderRadius: "10px 10px 0 0" }}>
                <Layout.Row style={{ fontSize: 25, margin: "-1px 0px 0 0px" }}>
                    <Layout.Col span="24">
                        <div className="grid-content d-content-highlight d-flex" style={{ borderRadius: "10px 10px 1px 1px" }}>
                            <div className="ms-3" style={{ color: "white", fontSize: "20px" }}>Total of Rent Earned:</div>
                            <div className="ms-3" style={{ color: "#00030cf2", fontSize: "20px", color: "white" }}>{total_price}$</div>
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
                                <th className="bg-secondary" style={{ minWidth: 50 }}>Number</th>
                                <th className="bg-secondary" style={{ minWidth: 50 }}>Username</th>
                                <th className="bg-secondary" style={{ minWidth: 100 }}>Total of Rent Earned</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                t_state &&
                                tabledata.map((row, i) => (
                                    (row.usernamestate == true) ? (<tr key={i} >
                                        <td>{i + 1}</td>
                                        <td>{row.username}</td>
                                        <td>{row.alleachprice}</td>
                                    </tr>) : <></>
                                ))
                            }
                        </tbody>
                    </TableBs>
                </div>
                <CSVLink data={data} headers={headers}>
                    <Button variant="outline-light" style={{ color: "white", margin: "10px" }} onClick={payment}>Payment</Button>
                </CSVLink>;
            </div>
        </div>
    )
}

export default SheduleList;