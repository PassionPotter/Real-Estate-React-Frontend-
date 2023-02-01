import React, { Component } from 'react'
import { Button, Carousel, Dropdown } from 'react-bootstrap'
import Fade from 'react-reveal/Fade'
import { Layout } from 'element-react'
import { Link } from "react-router-dom"
import Timer from "../Timer"
import Product from "../Product"
import { connect } from "react-redux"
import { actionPropertyList } from "../../redux/actions/property"
import { withTranslation } from "react-i18next";

const mapStateToProps = state => {
  const { propertyData } = state.property
  return {
    propertyData
  }
}

const mapDispatchToProps = {
  actionPropertyList
}

const Marketplace = connect(mapStateToProps, mapDispatchToProps)(class extends Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef()

    this.state = {
      houseImageHeight: 0,
      marketCriticalWidth: 993,
      width: window.innerWidth,
      products: [],
      sortType: 'recent'
    }
  }

  // handleResize = (windowSize, event) => {
  //   this.setState({ width: window.innerWidth });
  //   if (window.innerWidth > this.state.marketCriticalWidth)
  //     this.setState({ houseImageHeight: this.myRef.current.offsetHeight })
  // }


  callAfterServerResults = () => {
    console.log('[res]', this.props.propertyData);
    let compensation = 0;
    this.setState({ products: this.props.propertyData })
    if (window.innerWidth > this.state.marketCriticalWidth) {
      let temp = (this.myRef.current && this.myRef.current.offsetHeight) ? this.myRef.current.offsetHeight : 0;
      this.setState({ houseImageHeight: temp + compensation })
    }
  }
  componentDidMount() {

    window.scrollTo(0, 0)
    this.setState({ width: window.innerWidth })
    //window.addEventListener('resize', this.handleResize)
    this.props.actionPropertyList(20, this.state.sortType).then(this.callAfterServerResults)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize)
  }

  onSortItemClick = (e) => {
    this.setState({
      ...this.state,
      sortType: e.target.dataset.value
    }, () => {
      this.props.actionPropertyList(20, this.state.sortType).then(this.callAfterServerResults)
    })

  }

  render() {
    let products = this.state.products
  
    const { t } = this.props;
    let sortTypeLabels = {
      'lowToHigh': t("MarketPlace.price-low2low"),
      'highToLow': t("MarketPlace.price-high2low"),
      'recent': t("MarketPlace.Default Sorting")
    }
    return (
      <>
      <div style={{ margin: "6% 12% 2% 12%" ,fontFamily:"Montserrat-Bold"}}>
        <Fade>
          <div>
            <div className="d-highlight d-text-87" style={{ marginBottom: 12,  }}>
              {t("MarketPlace.TOKIZED Marketplace")}
            </div>
            <div className="d-white d-text-24" style={{ marginBottom: 100 }} dangerouslySetInnerHTML={{__html:t("MarketPlace.Invest in US Real Estate")}}>
            </div>
            
          </div>
          
        </Fade>
      </div>
      <div style={{backgroundColor:"#fff", padding: "4% 12% 2% 12%",fontFamily:"Montserrat-Bold" }}>
        <div style={{ display: 'flex', alignItems: 'center'}}>
          <div className="d-black d-text-18" style={{ marginRight: 'auto' }}>
            {t("MarketPlace.Showing results", {count:products.length})}
        
          </div>
          <Dropdown>
            <Dropdown.Toggle id="dropdown-basic" className=" d-text-18 marketplace-dropdown"
              style={{ borderRadius: 8 }}>
              {sortTypeLabels[this.state.sortType]}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={this.onSortItemClick} data-value="recent">{t("MarketPlace.Default Sorting")}</Dropdown.Item>
              <Dropdown.Item onClick={this.onSortItemClick} data-value="lowToHigh">{t("MarketPlace.price-low2low")}</Dropdown.Item>
              <Dropdown.Item style={{ zIndex: '1000' }} onClick={this.onSortItemClick} data-value="highToLow">{t("MarketPlace.price-high2low")}</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          </div>
          {products && products.length > 0 && products.map((product) => (
            <div className={'marketplace-desktop'} style={{ marginTop: 5 }} key={product.id}>
   
                <Product productData={product} mode="wide"/>
              
            </div>
          ))}
        </div>
      </>
    )
  }
})

export default withTranslation()(Marketplace)
