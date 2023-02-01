import React, {Component} from 'react';
import {Row, Col, Button} from 'react-bootstrap';
import Fade from 'react-reveal/Fade';
import Zoom from 'react-reveal/Zoom';
import {Layout} from 'element-react';
import Login from "../Login";
import Register from "../Register";
import {connect} from "react-redux";
import { withTranslation } from 'react-i18next'

const mapStateToProps = state => {
    const {logged, user} = state.auth;
    return {
        logged, user
    }
}

const Affiliate = connect(mapStateToProps)(class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // logged: props.logged,
        }
    }

    componentDidMount() {
        window.scrollTo(0, 0)
        console.log(this.props)
    }

    ridirectToAffiliateDasboard = () => {
    this.props.history.push('affiliate-dashboard')
    }

    componentWillUpdate() {
        const user = localStorage.getItem('user') && JSON.parse(localStorage.getItem('user'));
        window.scrollTo(0, 0);
        // if(this.props.user) {
        //   if(this.props.user.roles[0] === 'ADMIN') {
        //     this.props.history.push('/admin/dashboard');
        //   }
        // }
      }

    render() {
        const { t } = this.props
        return (
            <div style={{padding: "7% 12% 7% 12%", backgroundColor:"#fff"}}>
                <Row>
                    <Col sm="6">
                        <Fade bottom delay={200}>
                            <div>
                                <div className="d-font-bold d-text-24">
                                    {t('affiliate.INTRODUCING THE Tokized')}
                                    <br/>
                                    {t('affiliate.AFFILIATE PROGRAM!')}
                                </div>
                                <div className="d-highlight d-font-black d-text-header" style={{lineHeight:"60px"}}>
                                    {t('affiliate.Become a Real Estate Agent')}
                                </div>
                                <div style={{marginRight:"25%"}}>
                                <div className="d-font-bold d-text-24">
                                    {t('affiliate.When you invest in a Tokized property token, you are starting a tokenized real estate portfolio, the easiest way to invest in ownership of property in the United States. You also gain access to our Tokized Affiliate Program!')}
                                </div>
                                <div style={{height: 24}}/>
                                <div className="d-highlight d-font-bold d-text-30">
                                    {t('affiliate.Tokized Affiliate Program')}
                                </div>
                                <div className="d-font-bold d-text-24">
                                    {t('affiliate.Investors in any Tokized property on the market get special perks 2% cashback on all Tokized Tokens sold VIP access to events and special promotions Early notification of new property listings')}
                                </div>
                                <div style={{height: 48}}/>
                                <div className="d-font-bold d-text-24">
                                    {t('affiliate.Anyone who owns just one Tokized Token is invited to join the Affiliate Program. Begin you real estate investment portfolio, and start earning rental payments and referral rewards to your wallet on a daily basis.')}
                                </div>
                                <div style={{height: 24}}/>
                                <div className="d-highlight d-font-bold d-text-20">
                                    {t('affiliate.Join the first generation of tokenized real estate professionals today!')}
                                </div>
                                    </div>
                                
                            </div>
                        </Fade>
                    </Col>
                    <Col sm="6" style={{marginTop: 30}}>
                        <Zoom delay={600}>
                            <div>
                                <img width="100%"
                                     src={!this.props.logged ? `imgs/affiliate/affiliate.png` : `imgs/marketplace.png`}
                                     alt="Affiliate"/>
                                <div className="d-content-highlight d-content-center text-white d-font-black d-text-60"
                                     style={{padding: "3%"}}>
                                    {
                                        !this.props.logged ? t('affiliate.Become an Affiliate!') : t('affiliate.Congratulations!')
                                    }
                                </div>
                                {
                                    !this.props.logged ?
                                        <div className="d-font-book d-text-24 mt-3">
                                            {t('affiliate.Join the new generation of digital real estate agents and grow your income stream with Tokized referrals.To get started, just sign in or register below!')}
                                        </div>
                                        : <>
                                            <div className=" d-font-mont-regular d-text-40 mt-2">
                                                {t('affiliate.You are now a Tokized Affiliate!')}<br/>
                                                {t('affiliate.You are ready to start earning referral rewards.')}<br/>
                                                {t('affiliate.Head to your Affiliate Dashboard to get set up!')}
                                            </div>
                                            <div className="w-full text-center">
                                            <Button onClick={this.ridirectToAffiliateDasboard} className={'d-black d-font-mont-regular d-text-36 d-content-highlight mt-5'}
                                                    style={{
                                                        borderRadius: 4,
                                                        textAlign: "center",

                                                        padding:"10px 50px"
                                                    }}>{t("affiliate.AFFILIATE DASHBOARD")}
                                            </Button>
                                            </div>
                                        </>
                                }

                            </div>
                        </Zoom>
                    </Col>
                </Row>
                
                {
                    !this.props.logged && <Fade bottom delay={200} >
                        <Layout.Row style={{marginTop:50}}>
                            <Layout.Col sm="24" md={12}>
                                <div className="grid-content">
                                    <Login/>
                                </div>
                            </Layout.Col>
                            <Layout.Col sm="24" md={12}>
                                <div className="grid-content">
                                    <Register/>
                                </div>
                            </Layout.Col>
                        </Layout.Row>
                    </Fade>
                }

            </div>
        )
    }
})

export default withTranslation()(Affiliate);
