import React, { useEffect } from "react"
import { useHistory } from "react-router-dom";
import { Layout, Notification } from "element-react"
import Fade from "react-reveal/Fade"
import { Table as TableBs } from 'react-bootstrap';

import { useDispatch, useSelector } from "react-redux";
import { actionScheduleList, actionScheduleSetCurrent } from "../../redux/actions/schedule";

// import { CONTRACT_ABI } from '../../config/abi';

const SheduleList = props => {
  const dispatch = useDispatch();

  const schedules = useSelector(state => state.schedules.scheduleList);
  const history = useHistory();

  useEffect(()=>{
    // if(!users)
    dispatch(actionScheduleList());
  },[]);

  // const successMsg = (msg) => {
  //   Notification.success({
  //     title: 'Success',
  //     message: 'Transaction Success!',
  //     type: 'success',
  //   });
  // }

  // const errorMsg = () => {
  //   Notification.error({
  //     title: 'Failed',
  //     message: 'Transaction failed. Please try again!',
  //     type: 'Warning',
  //   });
  // }

  const onScheduleClick = (e, key) => {
    console.log('user click', schedules[key]);
    dispatch(actionScheduleSetCurrent(schedules[key]));
    history.push('/admin/schedules/detail');
  }

  return (
    <div className="d-flex flex-column justify-content-center align-items-center overflow-hidden">
      <div style={{ width: '80%' }}>
        <Fade bottom delay={200}>
          <h1 style={{ textAlign: "center" }} className='d-font-bold d-text-90 d-white'>Schedule</h1>
          {/* <div className="d-flex">
            <Link to="/admin/users/new" className="ms-auto">
              <Button type="outlined">New User</Button>
            </Link>
          </div> */}
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
                    <th className="bg-secondary" style={{ minWidth: 130 }}>Name</th>
                    <th className="bg-secondary" style={{ minWidth: 130 }}>Email</th>
                    <th className="bg-secondary" style={{ minWidth: 130 }}>phone</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    schedules.map((schedule, key) =>
                      <tr key={key} onClick={(e) => onScheduleClick(e, key)} style={{ cursor: 'pointer' }}>
                        <td>{key + 1}</td>
                        <td>{schedule.name}</td>
                        <td>{schedule.email}</td>
                        <td>{schedule.phone}</td>
                      </tr>
                    )
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

export default SheduleList;