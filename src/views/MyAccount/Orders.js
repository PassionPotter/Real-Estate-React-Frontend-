
import moment from 'moment';
import React, { Component, Fragment, useEffect, useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { actionOrderList } from '../../redux/actions/order';
import { actionPropertyList } from '../../redux/actions/property';
import { useTranslation } from "react-i18next";

 function Orders() {


  const properties = useSelector(state => state.property.propertyData);
  const orders = useSelector(state => state.order.orderData);
  const dispatch = useDispatch();
  const [transactions, setTransactions] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(actionPropertyList());
    dispatch(actionOrderList(undefined, false, user?.id));
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

    setTransactions(ordersClone);
  }, [orders]);

  
  
    return (
      <>
        <div className="d-content-highlight d-font-strong d-black d-text-30" style={{padding: '24px 4%', display: 'flex', alignItems: 'center'}}>
          {t("Orders.Orders")}
          <img className="img-mobile" src="imgs/account/orders/1.png" alt="" style={{marginLeft: 12, width:"30px"}} />
        </div>
        <div className="overflow-auto">
              <Table striped hover  style={{ margin: 0 }} className="text-center d-content-center table-order">
                <thead>
                  <tr className="text-white d-text-24" style={{backgroundColor: 'white'}}>
                    <th style={{backgroundColor:"#252730"}}>{t("Orders.Orders")}</th>
                    <th style={{ minWidth: 100,backgroundColor:"#252730" }}>{t("Orders.Dates")}</th>
                    <th style={{ minWidth: 100,backgroundColor:"#252730" }}>{t("Orders.Status")}</th>
                    <th style={{ minWidth: 100,backgroundColor:"#252730" }}>{t("Orders.Total")}</th>
                    <th style={{ minWidth: 200,backgroundColor:"#252730" }} colSpan={2}>{t("Orders.Actions")}</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    transactions.map((transaction, key) =>
                      <Fragment key={key}>
                        {
                          transaction.details.map((detail, key1) =>
                            <tr key={key1} className="align-middle d-black d-text-24 bg-white" style={{backgroundColor: 'white'}}> 
                              {
                                key1 === 0 &&
                                <>
                                  <td className="bg-white" rowSpan={transaction.details.length}>{transaction.id}</td>
                                  <td rowSpan={transaction.details.length}>{moment(transaction?.createdAt).format('MMMM, DD YYYY')}</td>
                                  <td rowSpan={transaction.details.length}>
                                    {
                                      transaction.status === 'pending' ? 
                                      <div className="badge bg-primary">{transaction.status}</div>
                                      :
                                      <div className="badge bg-secondary">{transaction.status}</div>
                                    }
                                    
                                  </td>
                                  <td rowSpan={transaction.details.length}>${transaction.totalPrice} for {transaction.count} items</td>
                                  
                                </>
                              }
                              <td>View</td>
                              <td>Invoice</td>
                            </tr>)
                        }
                      </Fragment>
                    )
                  }
                </tbody>
              </Table>
            </div>
        {/* <div className="d-content-center" style={{marginTop: 36}}>
          <Button className="d-font-bold d-text-24" style={{paddingLeft: 36, paddingRight: 36}}>
            SUBMIT DOCUMENTS HERE
          </Button>
        </div> */}
      </>
    )
  
}

export default Orders;
