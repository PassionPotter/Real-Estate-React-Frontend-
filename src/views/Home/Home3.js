import React, {Component} from "react"
import Fade from "react-reveal/Fade"
import {Button, Carousel} from "react-bootstrap"
import {BsChevronCompactLeft, BsChevronCompactRight} from "react-icons/bs"
import {Layout} from "element-react"
import Product from "../Product"
import {actionPropertyList} from "../../redux/actions/property"
import {connect} from "react-redux"
import { withTranslation } from "react-i18next";

const mapStateToProps = state => {
  const {propertyData} = state.property;
  return {
    propertyData
  }
}

const mapDispatchToProps = {
  actionPropertyList
}

const Home3 = connect(mapStateToProps, mapDispatchToProps)(class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      products3: [],
      home3CriticalWidth: 993,
      width: window.innerWidth,
    }
  }

  productGroup = [];

  handleResize = (windowSize, event) => {
    this.setState({width: window.innerWidth})
  }

  componentDidMount() {
    this.setState({width: window.innerWidth})

    this.props.actionPropertyList(21).then(() => {
      this.setState({products: this.props.propertyData})
    }).then(() => {
      let products = this.state.products ? this.state.products : []

      let repeat = (this.state.products && this.state.products.length > 0) ? ((3 - this.state.products.length % 3) % 3) : 0
      if (repeat === 1) {
        products = [...products, products[0]]
      } else if (repeat === 2) {
        products = [...products, products[0], products[0]]
      }

      var productGroup = []
      for (var i = 0; i < products.length; i++) {
        if (i % 3 === 0) {
          productGroup.push([]);
        }
        productGroup[productGroup.length - 1].push(products[i])
      }
      this.setState({products3: productGroup})
    })

    window.addEventListener('resize', this.handleResize)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize)
  }

  render() {

    // console.log(this.state.products);

    let products = this.state.products;
    let width = this.state.width;
    let products3 = this.state.products3;
    const { t } = this.props;

    return <Fade>
      <div className="img-box img-box-home3">
        <div style={{margin: "4% 9% 4% 9%"}}>
          <Fade bottom delay={200}>
            <div>
              <div className="d-content-center d-white d-text-85">
                {t("Home3.TOKIZED PROPERTIES")}
              </div>
              <div className="d-content-center d-text-20 d-white">
                {t("Home3.Build your real estate investment portfolio today")} <br/>
                {t("Home3.you will receive rents and a potential real estate capital appreciation")}
              </div>
              <Carousel 
                prevIcon={<img src="imgs/home/left.png" style={{width:20}}/>}
                nextIcon={<img src="imgs/home/right.png" style={{width:20}}/>}>
              
                {
                  (!products || products.length === 0) ? <div className="text-center d-text-60 d-white"><h1>{t("Home3.There is no house.")}</h1></div>
                    : width < this.state.home3CriticalWidth ?
                    products.map(product => (
                      <Carousel.Item key={product.id} interval={100000}>
                        <Layout.Row gutter="20">
                          <Layout.Col className='col-12'>
                              <div className="grid-content bg-purple">
                                <Product
                                  productData={product}
                                />
                              </div>
                          </Layout.Col>
                        </Layout.Row>
                      </Carousel.Item>
                    ))
                    :
                    products3.map((productGroup) => (
                      <Carousel.Item interval={100000}>
                        <Layout.Row gutter="20">
                          {
                            productGroup.map((product) => (
                              <Layout.Col md={8}>
                                <div className="grid-content bg-purple" style={{marginTop:(product.timerToShow?'7px':'')}}>
                                  <Product
                                    productData={product}
                                  />
                                </div>
                              </Layout.Col>
                            ))
                          }
                        </Layout.Row>
                      </Carousel.Item>
                    ))
                }
              </Carousel>

              <div className="d-content-center">
                <Button className=" d-highlight-black-button d-text-36"
                  style={{margin: '0 24%', width:"42%" }} onClick={() => {window.location.href = "#marketplace";}}>
                  {t("Home3.VIEW ALL PROPERTIES")}
                </Button>
              </div>
            </div>
          </Fade>
        </div>
      </div>
    </Fade>
  }
})

export default withTranslation()(Home3)
