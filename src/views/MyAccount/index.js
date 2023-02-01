import React, { Component } from 'react'
import { Row, Col, Nav, Tab } from 'react-bootstrap'
import Fade from 'react-reveal/Fade'

import './myaccount.css'

import ImageLabel from '../ImageLabel.js'
import Dashboard from './Dashboard.js'
import Portfolio from './Portfolio.js'
import IDVerification from './IDVerification.js'
import Orders from './Orders.js'
import AccountDetails from './AccountDetails.js'
import AccountWhitelist from './AccountWhitelisting'
import { Layout } from "element-react"
import Login from "../Login"
import Register from "../Register"
import { connect } from "react-redux"

import {
  actionAuthLogout,
} from '../../redux/actions/auth'
import { withTranslation } from "react-i18next";

const mapStateToProps = state => {
  const { logged, user } = state.auth
  return {
    logged, user
  }
}
const mapDispatchToProps = {
  actionAuthLogout,
}
const MyAccount = connect(mapStateToProps, mapDispatchToProps)(class extends Component {
  constructor(props) {
    super(props)
    this.state = {
      key: "dashboard",
    }
  }

  handleSelect = (key) => {
    this.setState({
      key: key
    })
  }

  logout = () => {
    localStorage.removeItem('user')
    this.props.actionAuthLogout()
  }

  componentWillUpdate() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      if (user.roles[0] === 'ADMIN') {
        this.props.history.push('/admin/dashboard');
      }
    }
    // if(this.props.user) {
    //   if(this.props.user.roles[0] === 'ADMIN') {
    //     this.props.history.push('/admin/dashboard');
    //   }
    // }
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    let key = this.state.key;
    const { t } = this.props;
    return (
      <div>
        <Fade>
          <div className="img-box img-box-sell-tokens">
            <Fade bottom delay={200}>
              <div style={{ margin: "10% 12% 10% 12%" }}>
                <div className="d-highlight d-font-black d-text-90">
                  {t("MyAccount.MY ACCOUNT")}
                </div>
              </div>
            </Fade>
          </div>
        </Fade>

        {
          !this.props.logged && <div className="myaccount-login-register">
            <Fade bottom delay={200}>
              <Layout.Row>
                <Layout.Col sm="24" md={12}>
                  <div className="grid-content">
                    <Login />
                  </div>
                </Layout.Col>
                <Layout.Col sm="24" md={12}>
                  <div className="grid-content">
                    <Register />
                  </div>
                </Layout.Col>
              </Layout.Row>
            </Fade>
          </div>
        }

        {
          this.props.logged && <div style={{ padding: "6% 12% 12% 12%", backgroundColor:"#fff" }}>
            <Tab.Container id="left-tabs-example" defaultActiveKey="dashboard">
              <Row>
                <Col md="3" style={{ paddingLeft: 24, marginBottom: 12 }}>
                  <Nav variant="pills" className="flex-column" onSelect={this.handleSelect}>
                    <Nav.Item>
                      <Nav.Link className="nav-account d-flex align-items-center" eventKey="dashboard"
                        style={{ padding: 10, height:70 }}>
                        <ImageLabel
                          img={key === "dashboard" ? "imgs/account/1.png" : "imgs/account/1_c.png"}
                          color={key === "dashboard" ? "black" : "white"}
                          font="strong"
                          fontSize={28}
                          padding={12}
                          label={t("MyAccount.DASHBOARD")}
                        />
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link className="nav-account d-flex align-items-center" eventKey="portfolio"
                        style={{ padding: 10, height:70 }}>
                        <ImageLabel
                          img={key === "portfolio" ? "imgs/account/2.png" : "imgs/account/2_c.png"}
                          color={key === "portfolio" ? "black" : "white"}
                          font="strong"
                          fontSize={28}
                          padding={12}
                          label={t("MyAccount.PORTFOLIO")}
                        />
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link className="nav-account d-flex align-items-center" eventKey="id_verification"
                        style={{ padding: 10, height:70  }}>
                        <ImageLabel
                          img={key === "id_verification" ? "imgs/account/3.png" : "imgs/account/3_c.png"}
                          color={key === "id_verification" ? "black" : "white"}
                          font="strong"
                          fontSize={28}
                          padding={12}
                          label={t("MyAccount.ID VERIFICATION")}
                        />
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link className="nav-account d-flex align-items-center" eventKey="orders" style={{ padding: 10, height:70  }}>
                        <ImageLabel
                          img={key === "orders" ? "imgs/account/4.png" : "imgs/account/4_c.png"}
                          color={key === "orders" ? "black" : "white"}
                          font="strong"
                          fontSize={28}
                          padding={12}
                          label={t("MyAccount.ORDERS")}
                        />
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link className="nav-account d-flex align-items-center" eventKey="account_details"
                        style={{ padding: 10 , height:70 }}>
                        <ImageLabel
                          img={key === "account_details" ? "imgs/account/5.png" : "imgs/account/5_c.png"}
                          color={key === "account_details" ? "black" : "white"}
                          font="strong"
                          fontSize={28}
                          padding={12}
                          label={t("MyAccount.ACCOUNT DETAILS")}
                        />
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link className="nav-account d-flex align-items-center" eventKey="whitelist" style={{ padding: 10  , height:70}}>
                        <ImageLabel
                          img={key === "whitelist" ? "imgs/account/4.png" : "imgs/account/4_c.png"}
                          color={key === "whitelist" ? "black" : "white"}
                          font="strong"
                          fontSize={28}
                          padding={12}
                          label={t("MyAccount.WHITE LIST")}
                        />
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link className="nav-account d-flex align-items-center" style={{ padding: 10,   height:70}}>
                        <div onClick={this.logout}>
                          <ImageLabel
                            img="imgs/account/6_c.png"
                            color="white"
                            font="strong"
                            fontSize={28}
                            padding={12}
                            label={t("MyAccount.LOGOUT")}
                          />
                        </div>
                      </Nav.Link>
                    </Nav.Item>
                    
                  </Nav>
                </Col>
                <Col style={{ paddingLeft: 24, width: (key === 'orders' ? '75%' : 'inherit') }}>
                  {
                    key === 'dashboard' ? <Dashboard /> : ''
                  }
                  {
                    key === 'portfolio' ? <Portfolio /> : ''
                  }
                  {
                    key === 'id_verification' ?
                      <div style={{ height: '100%', display: 'grid', paddingBottom: 24 }}>
                        <IDVerification /></div> : ''
                  }
                  {
                    key === 'orders' ? <Orders /> : ''
                  }
                  {
                    key === 'account_details' ?
                      <div style={{ height: '100%', display: 'grid', paddingBottom: 24 }}>
                        <AccountDetails /></div> : ''
                  }
                  {
                    key === 'whitelist' ?
                      <div style={{display: 'grid', paddingBottom: 24 }}>
                        <AccountWhitelist/>
                      </div> : ''
                  }
                </Col>
              </Row>
            </Tab.Container>
          </div>
        }


      </div>
    )
  }
})

export default withTranslation()(MyAccount)
