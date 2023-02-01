import React, {Component, FC, Suspense} from 'react'
import './assets/App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import {HashRouter, Switch, Route} from "react-router-dom"
import GetAccess from "./views/GetAccess"
import SellMyProperty from "./views/SellMyProperty"
import {i18n} from 'element-react'
import locale from 'element-react/src/locale/lang/en'
import {Provider} from "react-redux"
import {Store} from "./redux/store"
import './views/i18n'
// Containers
const TheLayout = React.lazy(() => import('./containers/TheLayout'))
const TheAdminLayout = React.lazy(() => import('./containers/TheAdminLayout'))

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"/>
  </div>
)

class App extends Component {

  componentDidMount(){
    

    if(window.location.href?.indexOf('ref')>-1){
      let split = window.location.href.split('ref')[1]
      sessionStorage.setItem('referredBy', split.replaceAll('/',''))
      console.log(this.props.location, split, ' test it')
    }
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
    let backItem = localStorage.getItem("backMode");
    backItem = backItem == null ? "dark":backItem;
    if(backItem == "dark") {
      document.documentElement.style.setProperty("--back-color", "#252730");
      document.documentElement.style.setProperty("--text-color", "#fff");
      document.documentElement.style.setProperty("--secondary-color", "#786e64");
    }
    if(backItem == "light") {
      document.documentElement.style.setProperty("--back-color", "#F0EEEB");
      document.documentElement.style.setProperty("--text-color", "#252730");
      document.documentElement.style.setProperty("--secondary-color", "#F0EEEB");
    }
    Store.dispatch({
      type:"CHANGE_BACKMODE",
      payload:backItem
    })
    return (
      <Provider store={Store}>
        <Suspense fallback={null}>
          <HashRouter>
            <Switch>
              <Route path="/get-access" component={GetAccess}/>
              <Route path="/admin">
                <TheAdminLayout/>
              </Route>
              <Route path="/sell-my-property" component={SellMyProperty} exact={true}/>
              <Route>
                <TheLayout/>
              </Route>
            </Switch>
          </HashRouter>
        </Suspense>
      </Provider>
    )
  }
}
export default App;