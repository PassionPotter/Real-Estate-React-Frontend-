import React from 'react'
import Table from 'react-bootstrap/Table';
import TooltipIcon from "../Tooltip_i_icon"
import dateFormat from 'dateformat'
import {  typeOptions, currentStatusOptions, section8Options } from '../../config/constants'
const Investment = (props) => {
    const t=props.t;
    const productData = props.productData;
    const projectIRR = Number(productData.projectIRR).toFixed(2).toLocaleString();
    let tokenPrice = Number(productData.tokenValue).toFixed(2).toLocaleString()
    let rentPerToken = Number(productData.yearlyRentPerToken).toFixed(2).toLocaleString()
    let totalTokens = Number(productData.generatedToken).toLocaleString("en-US");


    let expectedROI = Number(productData.expectedYield).toFixed(2).toLocaleString()
    let rentStartsDate = dateFormat(productData.rentStartsDate, 'mmmm dd yyyy')
    let propertyType = typeOptions.find(t => t.key === productData.propertyType)?.label;
    let currentStatusOfProperty = currentStatusOptions.find(t => t.key === productData.currentStatusOfProperty)?.label;
    let section8 = section8Options.find(item => item.key === productData.section8)?.label;
    return (
        <>
        <div className="d-text-72 mt-10 w-50" style={{borderBottom:"3px solid #dba87e"}}>
            {t("detail.Investment")}
        </div>
        <div className="d-text-32">
            Investment summary
        </div>
        <div style={{marginTop:40, marginLeft:10}} className="w-50 d-text-32">
                <Table responsive borderless="true" style={{color:"#786E64"}}>
                <tbody>
                <tr>
                    <td className="d-flex">
                        <div>{t("detail.Expected Income / ROI")}</div>
                        <TooltipIcon
                            width={15}
                            content={<><strong>Expected yield</strong> is expressed as the <a
                                href="https://www.investopedia.com/terms/c/capitalizationrate.asp">Cap
                                Rate</a> (capitalization rate), the ratio of net operating income to the current
                                value or sale price of a property. It determines the potential return on an
                                investment.</>}
                            img={'/imgs/home/3/i_icon.png'}
                        />
                    </td>
                    <td>{expectedROI + '%'}</td>
                </tr>
                <tr>
                    <td className="d-flex">
                        <div>{t("detail.Projected IRR")}</div>
                        <TooltipIcon
                            width={15}
                            content={<><strong>Expected yield</strong> is expressed as the <a
                                href="https://www.investopedia.com/terms/c/capitalizationrate.asp">Cap
                                Rate</a> (capitalization rate), the ratio of net operating income to the current
                                value or sale price of a property. It determines the potential return on an
                                investment.</>}
                            img={'/imgs/home/3/i_icon.png'}
                        />    
                    </td>
                    <td>{projectIRR + '%'}</td>
                </tr>
                <tr>
                    <td className="d-flex">
                        <div>{t("detail.Rent Start Date")}</div>
                        <TooltipIcon
                            width={15}
                            content={<><strong>Expected yield</strong> is expressed as the <a
                                href="https://www.investopedia.com/terms/c/capitalizationrate.asp">Cap
                                Rate</a> (capitalization rate), the ratio of net operating income to the current
                                value or sale price of a property. It determines the potential return on an
                                investment.</>}
                            img={'/imgs/home/3/i_icon.png'}
                        />  
                    </td>
                    <td>{rentStartsDate}</td>
                </tr>
                <tr>
                    <td>{t("detail.Token Price")}</td>
                    <td>{'$' + tokenPrice}</td>
                </tr>
                <tr>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td className="d-flex">
                        <div>{t("detail.Rent Per Token")}</div>
                        <TooltipIcon
                            width={15}
                            content={<><strong>Expected yield</strong> is expressed as the <a
                                href="https://www.investopedia.com/terms/c/capitalizationrate.asp">Cap
                                Rate</a> (capitalization rate), the ratio of net operating income to the current
                                value or sale price of a property. It determines the potential return on an
                                investment.</>}
                            img={'/imgs/home/3/i_icon.png'}
                        />        
                    </td>
                    <td>{'$' + rentPerToken +'/year'}</td>
                </tr>
                <tr>
                    <td>{t("detail.Total Tokens")}</td>
                    <td>{totalTokens}</td>
                </tr>
                <tr>
                    <td>{t("detail.Property Type")}</td>
                    <td>{propertyType}</td>
                </tr>
                <tr>
                    <td>{t("detail.Rental Type")}</td>
                    <td>Long-Term</td>
                </tr>
                <tr>
                    <td className="d-flex">
                        <div>{t("detail.Rented?")}</div>
                        <TooltipIcon
                            width={15}
                            content={<><strong>Expected yield</strong> is expressed as the <a
                                href="https://www.investopedia.com/terms/c/capitalizationrate.asp">Cap
                                Rate</a> (capitalization rate), the ratio of net operating income to the current
                                value or sale price of a property. It determines the potential return on an
                                investment.</>}
                            img={'/imgs/home/3/i_icon.png'}
                        />   
                        </td>
                    <td>{currentStatusOfProperty}</td>
                </tr>
                <tr>
                    <td className="d-flex">
                        <div>{t("detail.Section 8?")}</div>
                        <TooltipIcon
                            width={15}
                            content={<><strong>Expected yield</strong> is expressed as the <a
                                href="https://www.investopedia.com/terms/c/capitalizationrate.asp">Cap
                                Rate</a> (capitalization rate), the ratio of net operating income to the current
                                value or sale price of a property. It determines the potential return on an
                                investment.</>}
                            img={'/imgs/home/3/i_icon.png'}
                        />   
                        </td>
                    <td>{section8}</td>
                </tr>
                
                </tbody>
            </Table>
                		
        </div>
        <div style={{width:"60%", color:"#786E64"}} className="d-text-24">
        {t("All details displayer here are best estimates based on current market")}
        </div>
        </>
    )
}

export default Investment
