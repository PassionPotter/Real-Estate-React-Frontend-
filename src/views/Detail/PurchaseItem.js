import React from 'react'
import { withTranslation } from "react-i18next";
import ImageLabel from '../ImageLabel'
import { Link } from 'react-router-dom'
import TooltipIcon from "../Tooltip_i_icon"
import {Button} from "react-bootstrap";
const PurchaseItem = (props) => {
    const { t } = props;
    //let img = `${productData.imageData[0]}`
    const productData = props.productData;
    const projectIRR = Number(productData.projectIRR).toFixed(2).toLocaleString();
    let minInvestment = Number(productData.tokenValue).toFixed(2).toLocaleString()
    let rentPerToken = Number(productData.yearlyRentPerToken).toFixed(2).toLocaleString()
    let totalTokens = productData.generatedToken
    let tokensAvaliable = productData.available
    let available = tokensAvaliable > 0 ? tokensAvaliable : totalTokens + tokensAvaliable;

    let totalPrice = Number(productData.totalInvestment).toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',});
    let expectedROI = Number(productData.expectedYield).toFixed(2).toLocaleString()

    return (
        <div style={{
            borderRadius: 4,
            position:"absolute",
            right:0,
            top:"-450px",
            boxShadow:"4px 3px 22px #aaa",
            backgroundColor:"#fff"
            
        }}>

            <div style={{
                backgroundColor: '#15182B',
                padding: '20px 50px',
                textAlign:"center"
                
            }}>
                <img src="/imgs/logo.png" style={{width:"50%"}}></img>
            </div>
            <div style={{
                backgroundColor: '#15182B',
                padding: '7px 24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent:"space-between",
                borderBottom:"2px solid #DBA87E"
            }}>
                <ImageLabel
                        img="/imgs/home/3/minInvestment.png"
                        font="Circular Std Bold"
                        fontSize={15}
                        padding={6}
                        label={t("detail.MINIMUM INVESTMENT")}
                        color="white"
                    />
                <div className="d-highlight d-font-book d-text-48">
                        {'$' + minInvestment}
                    </div>
            </div>
            <div style={{
                backgroundColor: '#DBA87E',
                padding: '7px 24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent:"space-between",
                borderBottom:"2px solid #DBA87E"
            }}>
                <ImageLabel
                        img="/imgs/detail/expectedROI.png"
                        font="Circular Std Bold"
                        fontSize={15}
                        padding={6}
                        label={t("detail.EXPECTED INCOME / ROI")}
                        color="white"
                    >
                        <TooltipIcon
                            width={15}
                            content={<><strong>Expected yield</strong> is expressed as the <a
                                href="https://www.investopedia.com/terms/c/capitalizationrate.asp">Cap
                                Rate</a> (capitalization rate), the ratio of net operating income to the current
                                value or sale price of a property. It determines the potential return on an
                                investment.</>}
                            img={'/imgs/detail/tooltip.png'}
                        />
                        </ImageLabel>
                        
                <div className="d-black d-font-book d-text-48">
                        {expectedROI + '%'}
                        
                    </div>
            </div>


            <div style={{
                backgroundColor: '#fff',
                padding: '7px 24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent:"space-between",
                borderBottom:"2px solid #E6E6E6"
            }}>
                <ImageLabel
                        img="/imgs/detail/iir.png"
                        font="Circular Std Bold"
                        fontSize={15}
                        padding={6}
                        label={t("detail.PROJECT IRR")}
                        color="#DBA87E" 	
                    >
                        <TooltipIcon
                        width={15}
                        content={<><strong>Expected yield</strong> is expressed as the <a
                            href="https://www.investopedia.com/terms/c/capitalizationrate.asp">Cap
                            Rate</a> (capitalization rate), the ratio of net operating income to the current
                            value or sale price of a property. It determines the potential return on an
                            investment.</>}
                        img={'/imgs/detail/tooltip.png'}
                    />
                    </ImageLabel>
                    
                <div className="d-black d-font-book d-text-48">
                        {projectIRR + '%'}
                        
                    </div>
            </div>

            <div style={{
                backgroundColor: '#fff',
                padding: '7px 24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent:"space-between",
                borderBottom:"2px solid #E6E6E6"
            }}>
                <ImageLabel
                        img="/imgs/detail/rent.png"
                        font="Circular Std Bold"
                        fontSize={15}
                        padding={6}
                        label={t("detail.RENT PER TOKEN")}
                        color="#DBA87E" 	
                    >
                        <TooltipIcon
                        width={15}
                        content={<><strong>Expected yield</strong> is expressed as the <a
                            href="https://www.investopedia.com/terms/c/capitalizationrate.asp">Cap
                            Rate</a> (capitalization rate), the ratio of net operating income to the current
                            value or sale price of a property. It determines the potential return on an
                            investment.</>}
                        img={'/imgs/detail/tooltip.png'}
                    />
                    </ImageLabel>
                    
                <div className="d-black d-font-book d-text-48">
                        {'$' + rentPerToken}
                        <span className="d-text-24">/Year</span>
                        
                    </div>
            </div>
            <div style={{
                backgroundColor: '#fff',
                padding: '7px 24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent:"space-between",
                borderBottom:"2px solid #E6E6E6"
            }}>
                <ImageLabel
                        img="/imgs/detail/total.png"
                        font="Circular Std Bold"
                        fontSize={15}
                        padding={6}
                        label={t("detail.TOTAL PRICE")}
                        color="#DBA87E" 	
                    />
                <div className="d-black d-font-book d-text-48">
                        { totalPrice}
                        
                    </div>
            </div>
            <div style={{
                backgroundColor: '#fff',
                padding: '7px 24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent:"space-between",
                borderBottom:"2px solid #E6E6E6"
            }}>
                <ImageLabel
                        img="/imgs/detail/available.png"
                        font="Circular Std Bold"
                        fontSize={15}
                        padding={6}
                        label={t("detail.AVAILABLE STOCK")}
                        color="#DBA87E" 	
                    />
                <div className="d-black d-font-book d-text-48">
                        {available}
                        
                    </div>
            </div>
            <div style={{margin:"5% 12% 10% 12%"}}>
                <Button className="d-font-black d-text-32 btn purchase-btn w-100"
                    onClick={() => {
                    const user = JSON.parse(localStorage.getItem('user'));
                    if (user.id && !user.card && user?.roles?.[0] !== 'ADMIN') {
                      props.history.push('/my-account?verify_identity=' + productData.id);
                      return false;
                    }
                     props.history.push(productData.timerToShow ? '/home' : ('/cart/' + productData.id));
                    }}
                  >
                    {t("detail.PURCHASE TOKEN")}   
                </Button>
                
                <div style={{marginTop:10, textAlign:"center"}}>
                    <span style={{color:"#DBA87E"}}>{t("detail.Minimum Purchase")}</span> {props.purchaseLimit}
                </div>
            </div>
        </div>
    )
}

export default PurchaseItem
