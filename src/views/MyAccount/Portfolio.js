import React, { Component } from 'react';
import { Button, Modal, Table as TableBs } from 'react-bootstrap';
import { Select, Layout, Notification } from "element-react";
import { actionUserUpdate } from '../../redux/actions/user';
import { connect } from 'react-redux'
import { withTranslation } from "react-i18next";
import { callPost } from "../../services/axios";

const mapStateToProps = state => {
    const { userData } = state.user
    return {
        userData
    }
}

const roleOptions = [
    { key: 1, label: "USER" },
    { key: 2, label: "MODERATOR" },
    { key: 3, label: "ADMIN" }
];

const mapDispatchToProps = { actionUserUpdate }
const Portfolio = connect(mapStateToProps, mapDispatchToProps)(class extends Component {
    constructor(props) {

        super(props);
        const { t } = props;
        this.state = {
            options: [{
                value: t("Portfolio.Option1"),
                label: t("Portfolio.Deposit xDai")
            },
            {
                value: t("Portfolio.Option1"),
                label: t("Portfolio.Deposit xDai")
            },
            {
                value: t("Portfolio.Option1"),
                label: t("Portfolio.Deposit xDai")
            },
            ],
            value: '',
            isModalShow: false,
            walletAddress: null,
            isWallet: '',
            xDaiWallet: null,
            product: {},
            datastate: false,
        }
    }
    componentDidMount() {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            this.setState({ walletAddress: user?.walletAddress });
            this.setState({xDaiWallet: user?.xDaiWallet});
        }
        callPost('/api/propertydata', user)
            .then(response => {
                if (response.data) {
                    // console.log(response.data[0].count, response.data[1].count, response.data[2].count, response.data[3].count, "===========dddd");
                    let result = response.data;
                    this.setState({ product: result });
                    this.setState({ datastate: true });
                }
                else {
                    console.log("Not found");
                }
                console.log(this.state.product);
            }).catch(err => {
                console.log('[Fail]', err);
            })
    }

    onModalToggle(flag) {
        this.setState({ isModalShow: flag });
    }

    onCheckWallet(info) {
        const userId = JSON.parse(localStorage.getItem('user')).id;
        const data = {
            id: userId,
            info: info
        };
        callPost('/api/admin/user/check', data)
        .then(res => {
            if(res.data.status) {
                this.state.isWallet = info;
                this.onModalToggle(true);
            }
            else {
                Notification.error({
                    title: ("Failed"),
                    message: ("You can not change your wallet address\n Contact chat support or write to support@tokized.immo"),
                    type: 'Warning',
                });
            }
        })
    }

    onTransferSubmit(e) {
        e.preventDefault();
        const data = {};
        if(this.state.isWallet != 'xDai')
            data['wallet'] = this.state.walletAddress
        else 
            data['xDaiWallet'] = this.state.xDaiWallet
        callPost('/api/admin/user/checkMulti', data)
        .then(res => {
            if(res.data.status) {
                let user = JSON.parse(localStorage.getItem('user'));
                user.role = roleOptions.find(role => role.label === user.roles[0]).key;
                if(this.state.isWallet != 'xDai')
                    user.walletAddress = this.state.walletAddress;
                else
                    user.xDaiWallet = this.state.xDaiWallet;
                this.props.actionUserUpdate(user);
                localStorage.setItem('user', JSON.stringify(user));
                this.onModalToggle(false);
            }
            else {
                if(this.state.isWallet != 'xDai')
                    this.setState({ walletAddress: '' });
                else this.setState({xDaiWallet:''});
                Notification.error({
                    title: ("Failed"),
                    message: ("This wallet address has already been registered with another user "),
                    type: 'Warning',
                });
            }
        })
    }

    onFieldChange(e) {
        if(this.state.isWallet != 'xDai')
            this.setState({ walletAddress: e.target.value });
        else 
            this.setState({xDaiWallet:e.target.value});
    }

    render() {

        const { t } = this.props;
        let {product} = this.state;
        let productMap = [];
        if (this.state.datastate == true) {
            for (let k = 0; k < product.length; k++) {
                product[k].yearlyRentPerToken = Number((product[k].monthlyGrossRent - product[k].monthlyCosts) / product[k].generatedToken * 12).toLocaleString('en-US', {
                    style: 'currency',
                    currency: 'USD',
                });
                product[k].totalInvestment = Number(product[k].generatedToken * product[k].tokenValue + product[k].initMaintainanceReserve + product[k].fee).toLocaleString('en-US', {
                    style: 'currency',
                    currency: 'USD',
                });
                product[k].GrossRent = product[k].monthlyGrossRent * 12 || '';
                product[k].yearlyNetRent = (product[k].monthlyGrossRent - product[k].monthlyCosts) * 12 || '';
                product[k].yearlyNetRent = (product[k].monthlyGrossRent - product[k].monthlyCosts) * 12 || '';
                product[k].expectedYield = (product[k].monthlyGrossRent - product[k].monthlyCosts) * 12 / parseFloat(product[k].totalInvestment) * 100;
                product[k].caprate = Number(product[k].expectedYield).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') || '';
                product[k].Fractionheld = (product[k].count / product[k].generatedToken) * 100;
                product[k].tokenVal = Number(product[k].tokenValue.toFixed(0)).toLocaleString('en-US', { style: 'currency', currency: 'USD', });
                product[k].valuehold = product[k].tokenValue * product[k].count;
                product[k].imageData = "" + product[k].imageData;
                product[k].propertyimage = product[k].imageData.split(',')[0];
                product[k].src = `${process.env.REACT_APP_API_ENDPOINT}/public/${product[k].propertyimage}`;
                let valuehold = product[k].tokenValue * product[k].count;
                for (let i = (k + 1); i < product.length; i++) {
                    if (product[i].address1 == product[k].address1) {
                        valuehold += product[i].tokenValue * product[i].count;
                        product[k].Fractionheld = ((product[k].count / product[k].generatedToken) + (product[i].count / product[i].generatedToken)) * 100;
                        product[i].repietestate = false;
                    }
                }
                product[k].valuehold = valuehold;
            }
            let count = 0;
            for (let j = 0; j < product.length; j++) {
                if (product[j].repietestate == false) {
                }
                else {
                    productMap[count] = product[j];
                    count ++;
                }
            }
        }

        return (
            <>
                {/*============================ Modal ===============================*/}
                <Modal show={this.state.isModalShow} onHide={this.onModalToggle.bind(this, false)}>
                    <Modal.Header>
                        <Modal.Title>{t("Portfolio.Change wallet")}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form onSubmit={this.onTransferSubmit.bind(this)}>
                            <div className="form-group">
                                <label htmlFor="fromAddress"></label>
                                <input name="fromAddress" className="form-control" onChange={this.onFieldChange.bind(this)} />
                            </div>
                            <div className="d-flex mt-2">
                                <div className="ms-auto">
                                    <button type="submit" className="btn btn-primary ms-2" >{t("Portfolio.Save")}</button>
                                    <Button variant="secondary" className="ms-2" onClick={this.onModalToggle.bind(this, false)}>{t("Portfolio.Close")}</Button>
                                </div>
                            </div>
                        </form>
                    </Modal.Body>
                </Modal>

                {/*==============================================================================*/}
                <Layout.Row style={{ backgroundColor: '#DBA87E', padding: "3% 0 1% 2%" }}>
                    <Layout.Col span="20">
                        <div className="grid-content bg-purple">
                            <h3 className={'d-font-bold d-highlight d-text-30'} style={{ color: "#02040c" }}>Token Delievery Wallet Address</h3>
                        </div>
                    </Layout.Col>
                </Layout.Row>
                <Layout.Row style={{ backgroundColor: '#252730' }}>
                    <Layout.Col span="22" offset={1} style={{ margin: "2% 3% 3% 3%" }}>
                        <div className="grid-content">
                            <div>
                                <span className={'d-font-book d-highlight d-text-24'}>{this.state.walletAddress}</span>
                                <button className={'d-font-bold d-black d-text-30 d-content-highlight'} onClick={this.onCheckWallet.bind(this, 'wallet')}
                                    style={{ padding: "4px 3%", borderRadius: 8, marginLeft: "18%" }}>{t("Portfolio.Change wallet")}
                                </button>
                            </div>
                            <div className={'d-font-bold d-text-24 text-white mt-2'}>Rent will be deposited directly to this wallet on the xDai network. Tokized.immo pays the fees for these transactions.
                            </div>
                        </div>
                        <hr/>
                        {/* <div className="grid-content">
                            <div>
                                <span className={'d-font-book d-highlight d-text-24'}>{this.state.xDaiWallet}</span>
                                <button className={'d-font-bold d-black d-text-30 d-content-highlight'} onClick={this.onCheckWallet.bind(this, 'xDai')}
                                    style={{ padding: "4px 3%", borderRadius: 8, marginLeft: "18%" }}>{t("xDai Change wallet")}
                                </button>
                            </div>
                            <div className={'d-font-bold d-text-24 d-white'} style={{ borderRight: "3px solid white" }}>Rent will be deposited directly to this wallet on xDai main network
                            </div>
                        </div> */}
                    </Layout.Col>
                </Layout.Row>
                {/*    ==========================================================================*/}
                <div>
                    {this.state.datastate &&
                        productMap.map((row) => (
                            <div>
                                <Layout.Row style={{ backgroundColor: '#252730', marginTop: "3%" }}>
                                    <Layout.Col md="8">
                                        <div className="grid-content bg-purple">
                                            <img src={row.src} alt='marketplace' style={{ width: "100%" }} />
                                        </div>
                                    </Layout.Col>
                                    <Layout.Col md="16" style={{ textAlign: "right" }}>
                                        <Layout.Row style={{ backgroundColor: '#DBA87E', padding: "3%", textAlign: "center" }}>
                                            <Layout.Col span="24">
                                                <div className="grid-content bg-purple">
                                                    <span className={'d-font-bold d-text-36'}>{row.address1},{row.address2}</span>
                                                </div>
                                            </Layout.Col>
                                        </Layout.Row>
                                        <Layout.Row style={{ backgroundColor: '#252730', textAlign: "left" }}>
                                            <Layout.Col span="24">
                                                <div className="grid-content bg-purple">
                                                    <TableBs className={'portfolio-table d-font-book'} style={{borderColor:"#212529"}}>
                                                        <tbody>
                                                            <tr className={'text-white'}>
                                                                <td>{t("Portfolio.Tokens Rent")}</td>
                                                                <td>{t("Portfolio.Total Price")}</td>
                                                                <td>{t("Portfolio.Value Held")}</td>
                                                                <td>{t("Portfolio.Fraction Held")}</td>
                                                            </tr>
                                                            <tr className={'d-highlight'}>
                                                                <td>{row.yearlyRentPerToken}/ {t("Portfolio.per year")}</td>
                                                                <td>{row.totalInvestment}</td>
                                                                <td>${row.valuehold}</td>
                                                                <td>{row.Fractionheld.toFixed(3)}%</td>
                                                            </tr>
                                                        </tbody>
                                                    </TableBs>
                                                </div>
                                            </Layout.Col>
                                        </Layout.Row>
                                    </Layout.Col>
                                </Layout.Row>
                                <Layout.Row style={{ backgroundColor: '#252730', marginTop: "3%" }}>
                                    <Layout.Col span="24">
                                        <div className="grid-content">
                                            <div className={'d-font-bold d-text-30 text-center'}>
                                                <Layout.Row>
                                                    <Layout.Col md="12">
                                                        <div className="grid-content" style={{ padding: 10 }}>
                                                            <TableBs className={'portfolio-table d-font-book'} style={{borderColor:"#DBA87E"}}>
                                                                <tbody style={{ backgroundColor: '#DBA87E' }}>
                                                                    <tr style={{ color: '#33454D' }}>
                                                                        <td>{t("Portfolio.Tokens issued")}</td>
                                                                        <td>{t("Portfolio.Price-Token")}</td>
                                                                        <td>{t("Portfolio.Rent Token")}</td>
                                                                    </tr>
                                                                    <tr className={'text-white'}>
                                                                        <td>{row.generatedToken}</td>
                                                                        <td>{row.tokenVal}</td>
                                                                        <td>{row.yearlyRentPerToken}/{t("Portfolio.year")}</td>
                                                                    </tr>
                                                                </tbody>
                                                            </TableBs>
                                                        </div>
                                                    </Layout.Col>
                                                    <Layout.Col md="12">
                                                        <div className="grid-content" style={{ padding: 10 }}>
                                                            <TableBs className={'portfolio-table d-font-book'} style={{borderColor:"#DBA87E"}}>
                                                                <tbody style={{ backgroundColor: '#DBA87E' }}>
                                                                    <tr style={{ color: '#33454d' }}>
                                                                        <td>{t("Portfolio.Gross Rent")}</td>
                                                                        <td>{t("Portfolio.Net Rent")}</td>
                                                                        <td>Cap Rate</td>
                                                                    </tr>
                                                                    <tr className={'text-white'}>
                                                                        <td>${row.GrossRent}/{t("Portfolio.year")}</td>
                                                                        <td>${row.yearlyNetRent}/{t("Portfolio.year")}</td>
                                                                        <td>{row.caprate}%</td>
                                                                    </tr>
                                                                </tbody>
                                                            </TableBs>
                                                        </div>
                                                    </Layout.Col>
                                                </Layout.Row>
                                            </div>
                                        </div>
                                    </Layout.Col>
                                </Layout.Row>
                            </div>
                        ))
                    }
                </div>
                {/*============================================================================*/}
            </>
        )
    }
});

export default withTranslation()(Portfolio);
