import React, {Component} from 'react'
import { Input, Layout, Select} from "element-react"
import {Table as TableBs} from 'react-bootstrap'
import { withTranslation } from 'react-i18next'
import {Button} from 'react-bootstrap';

import './Calculator.css'

class Calculator extends Component {
    constructor(props) {
        super(props)
        this.state = ({
            key: "dashboard",
            options: [{
                value: 'Option1',
                label: 'Calculate total capital'
            },
                {
                    value: 'Option1',
                    label: 'Calculate total capital'
                },
                {
                    value: 'Option1',
                    label: 'Calculate total capital'
                },
            ],
            options1: [{
                value: 'Option1',
                label: 'chaque mois'
            },
                {
                    value: 'Option1',
                    label: 'chaque mois'
                },
                {
                    value: 'Option1',
                    label: 'chaque mois'
                },
            ],
            value: ''
        })
        this.handleSelect = this.handleSelect.bind(this)
    }

    handleSelect(key) {
        this.setState({
            key: key
        })
    }

    componentDidMount() {
        window.scrollTo(0, 0)
    }

    render() {
        const { t } = this.props
        return (<>
                <div className="img-box img-box-calculator">
                    <div className="d-white d-font-black d-text-90" style={{marginBottom: "25%"}}>
                    </div>
                </div>
                

                <div style={{padding: "6% 22% 5% 22%",backgroundColor:"#fff"}} >
                    <TableBs hovers className={'calculator-table d-font-book'}>
                        <thead style={{backgroundColor: "#DBA87E", margin: "5% 2% 0% 5%"}}>
                        <tr>
                            <th colSpan={2}><img src='imgs/calculator/calculator.png' alt='calculator'
                                                 style={{marginLeft: "1%"}}/>
                                <Select className={'d-font-book d-text-18'} value={this.state.value}
                                        style={{width: "85%", margin: "1% 0% 1% 2%"}}>
                                    {
                                        this.state.options.map(el => {
                                            return <Select.Option key={el.value} label={el.label}
                                                                  value={el.value}/>
                                        })
                                    }
                                </Select>
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td style={{
                                backgroundColor: "#786e64",
                                textAlign: "right",
                                paddingTop: "2%",
                                width: "50%",
                                borderRight:"4px solid #dba87e"
                            }} className={'text-white'}>{t("Calculator.Starting placement")}:
                            </td>
                            <td style={{width: "50%", backgroundColor:"#252730"}}>
                                <Input style={{width: "50%"}}/>
                                <span className="icon-euro d-highlight d-font-book"> €</span></td>
                        </tr>

                        <tr>
                            <td style={{
                                backgroundColor: "#786e64",
                                textAlign: "right",
                                paddingTop: "2%",
                                borderRight:"4px solid #dba87e"
                            }} className={'text-white'}>{t("Calculator.Periodic savings")}:
                            </td>
                            <td style={{backgroundColor:"#252730"}}>
                                <Input style={{width: "50%"}}/><span
                                className="icon-euro d-highlight d-font-book"> €
                                        <Select className={'d-font-book ml-3'} value={this.state.value}
                                                style={{width: "40%"}}>
                                                {
                                                    this.state.options1.map(el => {
                                                        return <Select.Option key={el.value} label={el.label}
                                                                              value={el.value}/>
                                                    })
                                                }
                                        </Select>
                                    </span>
                            </td>
                        </tr>

                        {/*-------------------------------------------------*/}
                        <tr>
                            <td style={{
                                backgroundColor: "#786e64",
                                textAlign: "right",
                                paddingTop: "2%",
                                borderRight:"4px solid #dba87e"
                            }} className={'text-white'}>{t("Calculator.Duration of placement")}:
                            </td>
                            <td style={{backgroundColor:"#252730"}}>
                                <Input style={{width: "50%"}}/><span
                                className="icon-euro d-highlight d-font-book"> années</span>
                            </td>
                        </tr>
                        {/*    -------------------------------*/}


                        {/*-------------------------------------------------*/}
                        <tr>
                            <td style={{
                                backgroundColor: "#786e64",
                                textAlign: "right",
                                paddingTop: "2%",
                                borderRight:"4px solid #dba87e"
                            }} className={'text-white'}>{t("Calculator.Expected annual rate of return")}:
                            </td>
                            <td style={{backgroundColor:"#252730"}}>
                                <Input style={{width: "50%"}}/><span
                                className="icon-euro d-highlight d-font-book"> %</span>
                            </td>
                        </tr>
                        {/*    -------------------------------*/}


                        {/*-------------------------------------------------*/}
                        <tr>
                            <td style={{
                                backgroundColor: "#786e64",
                                textAlign: "right",
                                paddingTop: "2%",
                                borderRight:"4px solid #dba87e"
                            }} className={'text-white'}>{t("Calculator.Total capital")}:
                            </td>
                            <td style={{backgroundColor:"#252730"}}>
                                <Input style={{width: "50%"}}/><span
                                className="icon-euro d-highlight d-font-book"> €</span>
                            </td>
                        </tr>
                        {/*    -------------------------------*/}


                        {/*-------------------------------------------------*/}
                        <tr style={{backgroundColor:"white"}}>
                            <td colSpan={2} className={'text-center'}>
                                <Button className={'d-font-book d-content-highlight text-white mr-3'}
                                        style={{marginLeft: "6%", color: '#000000', padding:"5px 20px"}}
                                        >{t("Calculator.Calculate")}</Button>
                                <Button className={'d-font-book text-white ml-2'}
                                        style={{backgroundColor:"#252730", padding:"5px 20px"}} variant="default">{t("Calculator.New Calculation")}</Button>
                            </td>
                        </tr>
                        {/*-------------------------------------------------*/}
                        
                        {/*    -------------------------------*/}
                        </tbody>
                    </TableBs>
                    <div style={{border:"none", marginTop:50}}>
                            <td colSpan={2}>
                            <span
                                className="d-highlight d-font-bold d-text-48">{t("Calculator.Three possible options")}</span>

                                <span className={' d-font-book d-text-28'}>
                                            <br/><br/>{t("Calculator.You can")}<br/>
                                            <br/>
                                            {t("Calculator.calculate the capital at term that you will have at the end of your savings plan (click on “calculate total capital”.")}<br/>
                                            &ensp;{t("Calculator.But if you know how much capital you will need in X years, you can, knowing how much you can save per month")}<br/>
                                            &ensp;{t("Calculator.or year,")}<br/>
                                            <br/>
                                            {t("Calculator.calculate the initial capital you need, (click on “calculate the initial")}<br/>
                                            
                                            &ensp;{t("Calculator.save today,")}<br/>
                                            <br/>
                                            {t("Calculator.calculate the amount of periodic savings you can build.")}<br/>
                                            <br/></span>
                                <span className={'d-highlight d-font-book text-decoration-underline'}>{t("Calculator.The main savings products [complete file]")}<br/></span>

                            </td>
                        </div>
                </div>
                {/*======================================================*/}
            </>
        )
    }
}

export default withTranslation() (Calculator);
