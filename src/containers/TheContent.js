
import React, { Component, Suspense } from 'react';
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import Helmet from 'react-helmet'

// routes config
import routes from '../routes'
import { actionCredentialList } from '../redux/actions/credential';
import { actionSitesettingsList } from '../redux/actions/sitesettings';

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

const mapStateToProps = state => {
	return {
    siteSettings: state?.sitesettings?.sitesettingsData,
    credentials: state?.credential?.credentialData
  }
}

const mapDispatchToProps = { actionCredentialList, actionSitesettingsList }

const TheContent = connect(mapStateToProps, mapDispatchToProps)(class extends Component {

  state = {
    updateBtn: false
  }
  componentDidMount() {
    this.props.actionCredentialList();
    this.props.actionSitesettingsList();
    


  }

  componentDidUpdate(pprop, prevState){
    if(prevState.updateBtn!==this.state.updateBtn && typeof TXTME_SELF_URL!=='undefined'){
      this.updateButton();
    }

    if(pprop.credentials!==this.props.credentials){
      const userType = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user'))?.['roles']?.[0] : null
    if(typeof TXTME_SELF_URL==='undefined' && userType!=='ADMIN' && this.props.credentials?.[0]?.chatLink){
      const script = document.createElement("script");

      script.src = this.props.credentials?.[0]?.chatLink;
      script.async = true;

      document.body.appendChild(script);
      let intervalId = setInterval(() =>{
        if(document.getElementById('txtmeLivechatTitle') && !this.state.updateBtn){
          clearInterval(intervalId);
          this.setState({
            updateBtn: true
          })
        }
      }, 100);
    }
    }
  }

  updateButton () {
      let el = document.getElementById('txtmeLivechatTitle');
      el.style.background = 'black';
      el.innerHTML = `
      <div id="txtmeLivechatTitleImg" style="display: block;-webkit-flex: 0 0 auto;flex: 0 0 auto;background: black;-webkit-align-self: center;align-self: center;max-width: 100%;width: 32px;height: 32px;margin: 0 6px 0 8px;padding: 0;color: #3579f3;background: black;">
        <img src="/imgs/chat.png" style="width:30px; height:30px"/>
   
        <svg id="txtmeLivechatTitleImgMsg" style="display: none;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" class="__web-inspector-hide-shortcut__"><path d="M8.46,24.5H7.27l.84-.85a2.84,2.84,0,0,0,.82-1.71A6.1,6.1,0,0,1,6,16.81C6,13.18,9.31,9.5,14.49,9.5c5.49,0,8.44,3.39,8.44,7s-3,7-8.44,7a11.63,11.63,0,0,1-2.84-.36A4.45,4.45,0,0,1,8.46,24.5Z" fill="#fff"></path><circle cx="22" cy="11.5" r="4" fill="#fff" stroke="currentColor" stroke-width="2"></circle></svg>
      </div>
      <div id="txtmeLivechatTitleText" style="display: none;flex-basis: 0;flex-grow: 1;-webkit-align-self: center;align-self: center;max-width: 100%;padding: 0 20px 0 0;font-family: 'Roboto', sans-serif;font-size: 14px;font-weight: 400;font-stretch: normal;font-style: normal;line-height: 1;letter-spacing: normal;text-align: left;color: #ffffff;background: #3579f3;white-space: nowrap;" class="__web-inspector-hide-shortcut__">We are online</div>`;
      
    
    
  }
  
  

  render() {
    const userType = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user'))?.['roles']?.[0] : null
    if(userType==='ADMIN' && typeof TXTME_SELF_URL!=='undefined' && document.getElementById('txtmeLivechatTitle')?.style){
      document.getElementById('txtmeLivechatTitle').style.display = 'none';
    }
    else if(typeof TXTME_SELF_URL!=='undefined' && userType!=='ADMIN' && document.getElementById('txtmeLivechatTitle')?.style){
      document.getElementById('txtmeLivechatTitle').style.display = 'block';
    }
    return (
      <HashRouter>
        <Suspense fallback={loading}>
          <Switch>
            {routes.map((route, idx) => {
              return route.component && (
                <Route
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  render={props => (
                    <route.component {...props} />
                  )} />
              )
            })}
            <Redirect from="/" to="/get-access" />
          </Switch>
        </Suspense>
        <Helmet>
          <title>{this.props.siteSettings?.[0]?.title?this.props.siteSettings?.[0]?.title:'tokized.immo'}</title>
          <meta name="description" content={this.props.siteSettings?.[0]?.description?this.props.siteSettings?.[0]?.description:'tokized.immo'} />
          <meta name="keywords" content={this.props.siteSettings?.[0]?.keywords?this.props.siteSettings?.[0]?.keywords:'tokized.immo'} />
        </Helmet>
      </HashRouter>
    )
  }
});

export default TheContent;