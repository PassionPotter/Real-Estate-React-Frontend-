import React, { Fragment, useEffect, useState } from "react"
import { Button, Layout } from "element-react"
import Fade from "react-reveal/Fade"
import { Pagination, Modal, Table as TableBs } from 'react-bootstrap';
import { BsFillArrowLeftSquareFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { actionUserList } from "../../redux/actions/user";

import { transferToken } from "../../services/crypto";
import { actionOrderList, actionOrderUpdate } from "../../redux/actions/order";
import moment from "moment";

const AdminTransaction = props => {

  const dispatch = useDispatch();
  const [modalIndex, setModalIndex] = useState(-1);
  const [transactions, setTransactions] = useState([]);
  const [processing, setProcessing] = useState(false);
  const [pagenation, setPagenation] = useState(false);
  const [active, setActive] = useState(0);
  const [number, setNumber] = useState(1);

  const users = useSelector(state => state.user.userData);
  const orders = useSelector(state => state.order.orderData);
  const credentials = useSelector(state => state.credential.credentialData);


  useEffect(() => {
    dispatch(actionUserList());
    dispatch(actionOrderList());
  }, []);
  useEffect(() => {
    if (!orders.length) return;

    let ordersClone = [];
    for (let order of orders) {
      if (!Array.isArray(order.details)) {
        order.details = JSON.parse(order.details);
      }

      ordersClone.push(order);
    }
    console.log(ordersClone, "useeffect");
    if (ordersClone.length < 10) {
      setPagenation(false);
      for (let l = 0; l < ordersClone.length; l++) {
        ordersClone[l].order = l + 1;
      }
      console.log(ordersClone, "data");
      setTransactions(ordersClone);
    }
    else {
      console.log(ordersClone, "maindata");
      setActive(ordersClone);
      setPagenation(true);
      let sectiondata = ordersClone.slice(0, 10);
      for (let l = 0; l < sectiondata.length; l++) {
        sectiondata[l].order = l + 1;
      }
      setTransactions(sectiondata);

    }

  }, [orders]);

  const onTransferSubmit = async () => {
    setProcessing(true);
    let newTransactions = [];
    for (let i = 0; i < transactions.length; i++) {
      const transaction = transactions[i];
      let transactionClone = Object.assign({}, transaction);

      if (transaction.status == 'complete' || transaction.orderType === 'sell') {
        newTransactions.push(transactionClone);
        continue;
      }

      let isError = false;
      for (let j = 0; j < transaction.details.length; j++) {
        const detail = transaction.details[j];
        console.log(detail);
        const payload = {
          Endpoint: credentials[0]?.infuraProjectEndpoint,
          fromAddress: credentials[0].walletPublicKey,
          toAddress: detail.toAddress,
          tokenAddress: detail.tokenAddress,
          tokenAmount: detail.tokenQuantity,
          chainId: credentials[0].blockchainId,
          platform: credentials[0].statusApi
        }
        if(credentials[0].statusApi == 'xDai')
        {
          payload.chainId = credentials[0].networkId;
          payload.Endpoint = credentials[0].xDaiEndpoint;
        }

        console.log('[payload]', payload);

        let transferResult = await transferToken(payload.Endpoint, credentials[0]?.walletPrivateKey, payload.fromAddress, payload.toAddress, payload.tokenAddress, payload.tokenAmount, payload.chainId, payload.platform)
        if (transferResult.success) {
          console.log(transferResult.data);
          transactionClone.details[j]['hash'] = transferResult.data.transactionHash;
        } else {
          isError = true;
          console.log(transferResult);
        }
      }

      if (!isError) {
        transactionClone.status = 'complete';
      }

      newTransactions.push(transactionClone);

      const payload = {
        id: transactionClone.id,
        userId: transactionClone.userId,
        status: transactionClone.status,
        totalPrice: transactionClone.totalPrice,
        count: transactionClone.count,
        paymentMethod: transactionClone.paymentMethod,
        details: JSON.stringify(transactionClone.details),
        orderType: 'buy'
      }

      dispatch(actionOrderUpdate(payload));
    }

    setTransactions(newTransactions);
    setProcessing(false);
  }
  const pagenationbtn = (data) => {
    if (data == "next") {
      let start = Number(number) * 10;
      let end = Number(start) + 10;
      console.log(start, end, "dddddd");
      let sectiondata = active.slice(start, end);
      if (sectiondata.length > 0) {
        console.log(sectiondata, "sections");
        for (let k = 0; k < sectiondata.length; k++) {
          sectiondata[k].order = k + 10 * number + 1;
        }
        setNumber(number + 1);
        setTransactions(sectiondata);
      }
    }
    else if (data == "before") {
      console.log(number, "before number");
      let start = Number(number - 2) * 10;
      let end = Number(start) + 10;
      if (start >= 0) {
        let sectiondata = active.slice(start, end);
        setNumber(number - 1);
        setTransactions(sectiondata);
      }
    }
  }

  return (
    <div className="d-flex flex-column justify-content-center align-items-center overflow-hidden">
      <div style={{ width: '80%' }}>
        <Fade bottom delay={200}>
          <h1 style={{ textAlign: "center" }} className='d-font-bold d-text-90 d-white'>Transaction</h1>
          <div className="d-flex">
            <Button type="outlined" className="ms-auto" onClick={onTransferSubmit} disabled={processing}>
              {
                processing ? "Processing" : "Complete Transactions"
              }
            </Button>
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
                    <th className="bg-secondary">Status</th>
                    <th className="bg-secondary">User</th>
                    <th className="bg-secondary" style={{ minWidth: 130 }}>Total Price</th>
                    <th className="bg-secondary">Count</th>
                    <th className="bg-secondary" style={{ minWidth: 130 }}>Payment Method</th>
                    <th className="bg-secondary" style={{ minWidth: 130 }}>Signature ID</th>
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
                                  <td rowSpan={transaction.details.length}>{transaction.order}</td>
                                  <td rowSpan={transaction.details.length}>
                                    {
                                      transaction.status === 'pending' ?
                                        <div className="badge bg-primary">{transaction.status}</div>
                                        :
                                        <div className="badge bg-secondary">{transaction.status}</div>
                                    }

                                  </td>
                                  <td rowSpan={transaction.details.length}>{users.find(user => user.id === transaction.userId)?.username}</td>
                                  <td rowSpan={transaction.details.length}>{transaction.totalPrice}</td>
                                  <td rowSpan={transaction.details.length}>{transaction.count}</td>
                                  <td rowSpan={transaction.details.length}>{transaction.paymentMethod}</td>
                                  <td rowSpan={transaction.details.length}>{transaction.signatureId}</td>
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
              {pagenation &&
                <div>
                  <Pagination>
                    <Pagination.Prev onClick={() => pagenationbtn("before")} />
                    <Pagination.Item>{number}</Pagination.Item>
                    <Pagination.Next onClick={() => pagenationbtn("next")} />
                  </Pagination>
                  <br />
                </div>

              }
            </div>
          </div>
        </Fade>
      </div>

      <Modal show={modalIndex >= 0} onHide={() => setModalIndex(-1)}>
        <Modal.Header>
          <Modal.Title>Transfer Token</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={onTransferSubmit}>
            <div className="form-group">
              <div><b>From:</b> {credentials[0]?.walletPublicKey}</div>
              <div><b>To:</b> {users[modalIndex]?.walletAddress}</div>

              <input name="fromAddress" value={credentials[0]?.walletPublicKey || ''} hidden readOnly />
              <input name="toAddress" value={users[modalIndex]?.walletAddress || ''} hidden readOnly />
            </div>
            <div className="form-group mt-2">
              <label>Token:</label>
              <select className="form-select" name="tokenAddress">
                {
                  // tokens?.map((token, key) => <option key={key} value={token.tokenAddress}>{token.tokenAddress}</option>)
                }
              </select>
            </div>
            <div className="form-group mt-3">
              <div className="d-flex">
                <input type="number" className="form-control" step="any" name="tokenAmount" required placeholder="Input the amount to transfer" />
                <button type="submit" className="btn btn-secondary ms-2" >Send</button>
              </div>
            </div>

          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setModalIndex(-1)}>Close</Button>
        </Modal.Footer>
      </Modal>

    </div>
  )
}

export default AdminTransaction;