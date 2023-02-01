import React, { Component } from 'react'

import { Navbar, Nav, NavDropdown, Button, Dropdown } from 'react-bootstrap'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import {
  actionAuthLogout,
  actionSetBackMode
} from '../redux/actions/auth'
import i18n from 'i18next'
import { withTranslation } from "react-i18next"

class TheHeader extends Component {
  constructor(props) {
    super(props)
    this.state = {
      logged: false,
      role: 'user',
      cartCount: 0,
      lang: 'English'
    }
    this.onClickedLogout = this.onClickedLogout.bind(this)
  }
  componentDidMount() {
    const user = JSON.parse(localStorage.getItem('user'));
    const cartProducts = JSON.parse(localStorage.getItem('cartProducts'));
    this.setState({
      logged: this.props.logged,
      role: user ? user.roles[0] : '',
      cartCount: cartProducts ? cartProducts.length : 0
    })
  }

  static getDerivedStateFromProps(props, state) {
    if (props.logged !== state.logged) {
      return {
        logged: props.logged,
      }
    }
    return null
  }
  onClickedLang(str, lang) {
    this.setState({lang:lang});
    i18n.changeLanguage(str);
  }
  onClickedAffiliate() {
    window.location.href = "#affiliate";
  }
  onClickedMarketPlace() {
    window.location.href = "#marketplace";
  }
  onClickedLogout(e) {
    e.preventDefault()
    this.props.actionAuthLogout();
    localStorage.removeItem('user');
    this.props.history.push('/home');
    window.location.reload();
  }
  onClickedMoon = () => {
    const mode = localStorage.getItem("backMode");
    localStorage.setItem("backMode", mode == "light"?"dark":"light");
    this.props.actionSetBackMode(localStorage.getItem("backMode"));
    let link = document.querySelector("link[rel~='icon']");
    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      document.getElementsByTagName('head')[0].appendChild(link);
    }
    let backItem = localStorage.getItem("backMode");
    backItem = backItem == null ? "dark":backItem;

    if(backItem == "dark") {
      link.href = '/Favicon3.jpg' ;
    }
    else {
      link.href = '/Favicon4.jpg' ;
    }
  }
  render() {

    const { t, backMode } = this.props
    return (
      <Navbar expand="md" style={{margin:"0% 12%"}}>
        <Navbar.Brand href="#home">
          <img className="img-mobile" src={backMode == "light" ? "/imgs/logo_light.png": "/imgs/logo.png"} alt="Logo" width="222" />
        </Navbar.Brand>
        <div className="phoneContent ms-auto">

          {
            this.state.logged && (
              <div className="ms-2">
                <div className="phoneContent align-items-center h-100">
                  <div className="d-white d-font-bold d-text-nav position-relative hover-bg-dark trans-2 p-2 cursor-pointer" id='navbar-my-account' style={{ zIndex: 1, marginRight:"20px" }}>
                    <div>{t("header.MY ACCOUNT")}</div>
                    <div className="position-absolute bg-dark d-none border border-1 border-secondary" style={{ minWidth: 220, right: 0, top: 30, height: 'fit-content' }} id="navbar-my-account-children">
                      {
                        this.state.role === 'ADMIN' ?
                          <Nav.Link href="#admin/dashboard">
                            <div className="d-highlight d-font-bold d-text-nav hover-bg-dark trans-2 px-1">{t("header.ADMIN")}</div>
                          </Nav.Link>
                          :
                          <Nav.Link href="#my-account">
                            <div className="d-highlight d-font-bold d-text-nav hover-bg-dark trans-2 px-1">{t("header.ACCOUNT")}</div>
                          </Nav.Link>
                      }

                      <Nav.Link href="#calculator">
                        <div className="d-highlight d-font-bold d-text-nav hover-bg-dark trans-2 px-1">{t("header.CALCULATOR")}</div>
                      </Nav.Link>
                      <Nav.Link href="#affiliate-dashboard">
                        <div className="d-highlight d-font-bold d-text-nav hover-bg-dark trans-2 px-1">{t("header.AFFILIATE DASHBOARD")}</div>
                      </Nav.Link>


                      <Nav.Link onClick={this.onClickedLogout}>
                        <div className="d-highlight d-font-bold d-text-nav hover-bg-dark trans-2 px-1">{t("header.LOGOUT")}</div>
                      </Nav.Link>
                    </div>
                  </div>
                </div>
              </div>
            )
          }
          {
            !this.state.logged && (
              <Nav.Link href="#my-account" className="phoneContent">
                <div className="d-white d-font-bold d-text-nav hover-bg-dark trans-2 px-1" id='navbar-my-account'
                  style={{ width: 'fit-content', marginRight:"20px"  }}>
                  {t("header.Sign In")}
                </div>
              </Nav.Link>
            )
          }
        </div>
        <Navbar.Toggle className="img-mobile" aria-controls="basic-navbar-nav"
          style={{ backgroundColor: "white" }} />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav style={{ marginLeft: 'auto', flexDirection: 'column' }}>
            <div className="deskContent ms-auto">
              <Button className="d-font-bold d-text-nav" style={{ width: 135, height:30, padding:0, color:"#2e2e2e" }}
                onClick={() => this.onClickedAffiliate()}>{t("header.Affiliate Program")}</Button>
              <div style={{ width: 12 }} />
              <Dropdown>
                <Dropdown.Toggle variant="secondary" id="dropdown-basic"
                  className="d-font-book d-text-nav language-dropdown"
                  style={{ width: 130, borderRadius: 8, textAlign:"left", height:30,padding:"0 20px", backgroundColor:"#786e64", borderColor:"#786e64" }}>
                  {this.state.lang}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => this.onClickedLang("en", "English")} >English</Dropdown.Item>
                  <Dropdown.Item onClick={() => this.onClickedLang("zh", "Chinese")}>Chinese</Dropdown.Item>
                  <Dropdown.Item onClick={() => this.onClickedLang("rus", "Russian")}>Russian</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>

              {
                this.state.logged && (
                  <div className="ms-2">
                    <div className="deskContent align-items-center h-100">
                      <div className="d-white d-font-bold d-text-nav position-relative hover-bg-dark trans-2 p-2 cursor-pointer" id='navbar-my-account' style={{ zIndex: 1 }}>
                        <div>MY ACCOUNT</div>
                        <div className="position-absolute bg-dark d-none border border-1 border-secondary" style={{ minWidth: 220, right: 0, top: 30, height: 'fit-content' }} id="navbar-my-account-children">
                          {
                            this.state.role === 'ADMIN' ?
                              <Nav.Link href="#admin/dashboard">
                                <div className="d-highlight d-font-bold d-text-nav hover-bg-dark trans-2 px-1">{t("header.ADMIN")}</div>
                              </Nav.Link>
                              :
                              <Nav.Link href="#my-account">
                                <div className="d-highlight d-font-bold d-text-nav hover-bg-dark trans-2 px-1">{t("header.ACCOUNT")}</div>
                              </Nav.Link>
                          }

                          <Nav.Link href="#calculator">
                            <div className="d-highlight d-font-bold d-text-nav hover-bg-dark trans-2 px-1">{t("header.CALCULATOR")}</div>
                          </Nav.Link>
                          <Nav.Link href="#affiliate-dashboard">
                            <div className="d-highlight d-font-bold d-text-nav hover-bg-dark trans-2 px-1">{t("header.AFFILIATE DASHBOARD")}</div>
                          </Nav.Link>


                          <Nav.Link onClick={this.onClickedLogout}>
                            <div className="d-highlight d-font-bold d-text-nav hover-bg-dark trans-2 px-1">{t("header.LOGOUT")}</div>
                          </Nav.Link>
                        </div>
                      </div>
                    </div>

                    <div className="phoneContent">
                      <div className="d-white d-font-book d-text-nav" style={{ background: "#212926" }}>{t("header.MY ACCOUNT")}
                        <Nav.Link href="#calculator">
                          <div className="d-highlight d-font-bold d-text-nav hover-bg-dark trans-2"
                            style={{
                              width: 'fit-content'
                            }}>{t("header.CALCULATOR")}
                          </div>
                        </Nav.Link>
                        <Nav.Link href="#affiliate-dashboard">
                          <div className="d-highlight d-font-bold d-text-nav hover-bg-dark trans-2"
                            style={{
                              width: 'fit-content'
                            }}>{t("header.AFFILIATE DASHBOARD")}
                          </div>
                        </Nav.Link>
                        <Nav.Link href="#admin/product/edit">
                          <div className="d-highlight d-font-bold d-text-nav hover-bg-dark trans-2"
                            style={{
                              width: 'fit-content'
                            }}>{t("header.PROPERTY Edit(ADMIN)")}
                          </div>
                        </Nav.Link>
                        <Nav.Link onClick={this.onClickedLogout}>
                          <div className="d-highlight d-font-bold d-text-nav hover-bg-dark trans-2"
                            style={{
                              width: 'fit-content'
                            }}>
                            {t("header.Log Out")}
                          </div>
                        </Nav.Link>
                      </div>
                    </div>
                  </div>
                )
              }
              {
                !this.state.logged && (
                  <Nav.Link href="#my-account" className="deskContent" style={{paddingRight:0}}>
                    <div className="d-white d-font-bold d-text-nav hover-bg-dark trans-2 px-1" id='navbar-my-account'
                      style={{ width: 'fit-content' }}>
                      {t("header.Sign In")}
                    </div>
                  </Nav.Link>
                )
              }
              {
                !this.props.logged && (
                  <Nav.Link href="#my-account" className="phoneContent" >
                    <div className="d-white d-font-book d-text- hover-bg-dark trans-2 px-1">{t("header.Sign In")}</div>
                  </Nav.Link>
                )
              }
              <Link to={`/cart/null`}>
                <div className="position-relative">
                  <img className="img-mobile ms-1" src="/imgs/header/myaccount.png" alt="cart" style={{width:"80%"}} />
                  <label className="d-text-28 d-font-bold d-white position-absolute" style={{ top: 0, left: 15 }}>{this.state.cartCount}</label>
                </div>
              </Link>
            </div>

            <div className="d-flex justify-content-end ms-auto flex-wrap mt-1">
              
              <Nav.Link href="#sell-my-property" style={{letterSpacing:".15rem"}}>
                <div className="d-white d-font-book d-text-nav hover-bg-dark trans-2">
                  {t("header.SELL MY PROPERTY")}
                </div>
              </Nav.Link>
              <Nav.Link href="#sell-tokens" style={{letterSpacing:".15rem"}}>
                <div className="d-white d-font-book d-text-nav hover-bg-dark trans-2">
                  {t("header.SELL TOKENS")}
                </div>
              </Nav.Link>
              <Nav.Link href="#how-it-works" style={{letterSpacing:".15rem"}}>
                <div className="d-white d-font-book d-text-nav hover-bg-dark trans-2">
                  {t("header.LEARN")}
                </div>
              </Nav.Link>
              <Nav.Link href="#faqs" style={{letterSpacing:".15rem"}}>
                <div className="d-white d-font-book d-text-nav hover-bg-dark trans-2">
                  {t("header.FAQ")}
                </div>
              </Nav.Link>
              <Nav.Link href="#blog" style={{letterSpacing:".15rem"}}>
                <div className="d-white d-font-book d-text-nav hover-bg-dark trans-2">
                  {t("header.BLOG")}
                </div>
              </Nav.Link>

              <Nav.Link href="#" style={{letterSpacing:".15rem"}}>
                <div className="d-white d-font-book d-text-nav trans-2" style={{marginTop:-8}} onClick={() => this.onClickedMoon()}>
                  <img className="img-mobile" src={ backMode == "light" ? "imgs/header/moon_light.png":"imgs/header/moon.png"}></img>
                </div>
              </Nav.Link>
              <Button className="d-font-bold d-text-nav ml-2" variant="default" 
                style={{ width: 225, height:35 , backgroundColor: backMode == "light"?"#2E2E2E":"#deff59", padding:0,color: backMode == "light"?"#fff":"#2E2E2E"  }}
                onClick={() => this.onClickedMarketPlace()}>{t("header.MARKETPLACE")}</Button>
            </div>


            <Nav.Link href="#affiliate" className="phoneContent">
              <div className="d-white d-font-book d-text-nav">{t("header.AFFILIATE PROGRAM")}</div>
            </Nav.Link>
            <NavDropdown title={<span className="d-white d-font-book d-text-nav">LANGUAGE: English</span>}
              className="phoneContent language">
              <NavDropdown.Item>English</NavDropdown.Item>
              <NavDropdown.Item>Chinese</NavDropdown.Item>
              <NavDropdown.Item>Russian</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}

const mapStateToProps = (state) => {
  const { logged, user, backMode } = state.auth
  return {
    logged, user, backMode
  }
}
const mapDispatchToProps = {
  actionAuthLogout,
  actionSetBackMode,
}

export default withTranslation()(connect(mapStateToProps, mapDispatchToProps)(withRouter(TheHeader)));