import React, { Fragment, useEffect, useState } from "react"
import { Button, Layout, Notification, Select } from "element-react"
import Fade from "react-reveal/Fade"
import { Modal, Table as TableBs } from 'react-bootstrap';

import { useDispatch, useSelector } from "react-redux";
import { actionUserList } from "../../redux/actions/user";

import { transferToken } from "../../services/crypto";
import { actionGetWhiteList, actionOrderOwnerList } from "../../redux/actions/order";
import { callPost } from "../../services/axios";
import moment from "moment";

const AdminWhiteList = props => {

  const dispatch = useDispatch();
  const [transactions, setTransactions] = useState([]);
  const [userId, setUserId] = useState(0);
  const [modalIndex, setModalIndex] = useState(-1);
  const users = useSelector(state => state.user.userData);
  const orders = useSelector(state => state.order.orderWhiteList);
  const credentials = useSelector(state => state.credential.credentialData);

  useEffect(() => {
    dispatch(actionUserList());
    dispatch(actionGetWhiteList());
  }, []);

  useEffect(() => {
    if (!orders.length) return;
    setTransactions(orders);
    console.log(orders)
  }, [orders]);


  const updateData = (__data) => {
    const token = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user'))['accessToken'] : null
    callPost('/api/admin/orderAddWallet', __data, token)
      .then(res => {
        Notification.success({
          title: 'Success',
          message: `Updated successfully`,
          type: 'Success',
        })
        setModalIndex(-1)
        dispatch(actionGetWhiteList());
      }).catch(err => {
        console.log(err);
      })
  }

  const onApprove = (orderId, sellId) => {
    const d = new Date();
    const allsecond = d.getFullYear() * 365.25 * 60 * 60 * 24 + d.getMonth() * 60 * 60 * 24 * 30 + d.getDate() * 60 * 60 * 24 + d.getHours() * 60 * 60 + d.getMinutes() * 60 + d.getSeconds();
    updateData({ id: orderId, status: 'complete', times:allsecond })
    updateData({id: sellId, status:'complete', times:allsecond})
  }

  const onSubmit = (id) => {
    updateData({ id: id,status: 'complete'})
  }

  return (
    <div className="d-flex flex-column justify-content-center align-items-center overflow-hidden">
      <div style={{ width: '80%' }}>
        <Fade bottom delay={200}>
          <h1 style={{ textAlign: "center" }} className='d-font-bold d-text-90 d-white'>White List</h1>
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

            <div className="w-100 overflow-auto">
              <TableBs striped hover variant="dark" style={{ margin: 0 }} className="text-center">
                <thead>
                  <tr>
                    <th className="bg-secondary">#</th>
                    <th className="bg-secondary" style={{ minWidth: 130 }}>Status</th>
                    <th className="bg-secondary">User</th>
                    <th className="bg-secondary">From User</th>
                    <th className="bg-secondary" style={{ minWidth: 130 }}>Total Price</th>
                    <th className="bg-secondary">Count</th>
                    <th className="bg-secondary" style={{ minWidth: 130 }}>Transaction Date</th>
                    <th className="bg-secondary" style={{ minWidth: 130 }}>Token Address</th>
                    <th className="bg-secondary" style={{ minWidth: 130 }}>Target Wallet Address</th>
                    <th className="bg-secondary" style={{ minWidth: 130 }}>Token Quantity</th>
                    <th className="bg-secondary" style={{ minWidth: 130 }}>Transaction Hash</th>

                  </tr>
                </thead>
                <tbody>
                  {
                    transactions.map((transaction, key) =>
                      <Fragment key={key}>
                        {
                          transaction.details.map((detail, key1) =>
                            <tr key={key1} className="align-middle">
                              {
                                key1 === 0 &&
                                <>
                                  <td rowSpan={transaction.details.length}>{key + 1}</td>
                                  <td rowSpan={transaction.details.length}>
                                    {
                                      transaction.status === 'pending' ?
                                        <div className="badge bg-primary">{transaction.status}</div>
                                        :
                                        <div className="badge bg-secondary">{transaction.status}</div>
                                    }
                                    {
                                      detail.hash && transaction.ownerId && transaction.status !== 'complete' && (
                                        <Button onClick={() => onApprove(transaction.id, transaction.sellId)}>Approve it</Button>
                                      )
                                    }

                                  </td>
                                  <td rowSpan={transaction.details.length}>{users.find(user => user.id === transaction.userId)?.username}</td>
                                  <td rowSpan={transaction.details.length}>{users.find(user => user.id === transaction.ownerId)?.username}</td>
                                  <td rowSpan={transaction.details.length}>{transaction.totalPrice}</td>
                                  <td rowSpan={transaction.details.length}>{transaction.count}</td>
                                  <td rowSpan={transaction.details.length}>{moment(transaction?.createdAt).format('MM/DD/YYYY, h:mm a')}</td>
                                </>
                              }
                              <td>{detail.tokenAddress}</td>
                              <td>{detail.toAddress}</td>
                              <td>{detail.tokenQuantity}</td>
                              <td>{detail?.hash}</td>

                            </tr>)
                        }
                      </Fragment>
                    )
                  }
                </tbody>
              </TableBs>
            </div>
          </div>
        </Fade>
      </div>
      <Modal show={modalIndex >= 0} onHide={() => setModalIndex(-1)}>
        <Modal.Header>
          <Modal.Title>WhiteList</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-group">
            {/* <div><b>From:</b> {credentials[0]?.walletPublicKey}</div>
              <div><b>To:</b> {users[modalIndex]?.walletAddress}</div> */}
            {/* 
              <input name="fromAddress" value={credentials[0]?.walletPublicKey || ''} hidden readOnly />
              <input name="toAddress" value={users[modalIndex]?.walletAddress || ''} hidden readOnly /> */}
          </div>

          <div className="form-group mt-3">
            <div className="d-flex">
            <Select className="w-100 d-font-bold d-text-18" placeholder="Select older owner" onChange={val => setUserId( val)}>
                {
                    users.map(item => (<Select.Option value={item.id} label={item.username}>{item.username}</Select.Option>)) 
                }
            </Select>
              <button className="btn btn-secondary ms-2" onClick={() => onSubmit(modalIndex)}>Send</button>
            </div>
          </div>

        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setModalIndex(-1)}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default AdminWhiteList;