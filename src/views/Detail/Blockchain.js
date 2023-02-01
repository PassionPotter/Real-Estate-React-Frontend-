import React from 'react'

const Blockchain = (props) => {

    const product = props.productData;
    const {t} = props;
    let generatedToken = Number(product.generatedToken).toLocaleString("en-US");
    const identifier = product.identifier;
    const etherDate = product.etherDate;
    const etherContractAddrress = product.etherContractAddrress;
    const etherOwnerWallet = product.etherOwnerWallet;
    const gNosisContractAddress = product.gNosisContractAddress;
    const gNosisOwnerWallet = product.gNosisOwnerWallet;
    const gNosisLevins = product.gNosisLevins;
    return (
        <div style={{width:"66%"}}>
            <div className="d-text-72 mt-10" style={{borderBottom:"3px solid #dba87e"}}>
                {t("detail.Blockchain")}
            </div>
            <div style={{margin:"5%"}}>
                <div className="d-flex justify-content-between">
                    <span className="d-text-48 ">{t("detail.Identifier")} :</span>
                    <span className="d-text-48 " style={{color:"#DBA87E"}}>{identifier}</span>
                </div>
                <div className="d-flex justify-content-between mt-5" style={{borderBottom:"3px solid #000"}}>
                    <span className="d-text-48 ">{t("detail.Total Tokens")}:</span>
                    <span className="d-text-48 " style={{color:"#DBA87E"}}>{generatedToken}</span>
                </div>
            </div>
            <div style={{ borderRadius:5, boxShadow:"4px 3px 22px #aaa"}}>
                <div className="d-flex justify-content-between" style={{borderBottom:"2px solid #dba87e", padding:"5% 5% 1%"}}>
                    <span className="d-text-48  ml-2">{t("detail.ETHEREUM Chain")}</span>
                </div>
                <div style={{padding:"2% 5%", color:"#786E64"}} className="d-text-32 pb-5">
                    <div className="d-flex justify-content-between mt-3" style={{padding:"0% 2%", borderBottom:"1px solid #EBEBEB"}}>
                        <span >{t("detail.Date:")}</span>
                        <span >{etherDate}</span>
                    </div>
                    <div className="d-flex justify-content-between mt-3" style={{padding:"0% 2%",borderBottom:"1px solid #EBEBEB"}}>
                        <span >{t("detail.Contract Address")}</span>
                        <span >{etherContractAddrress}</span>
                    </div>
                    <div className="d-flex justify-content-between mt-3" style={{padding:"0% 2%",borderBottom:"1px solid #EBEBEB"}}>
                        <span >{t("detail.Owner Wallet")}</span>
                        <span >{etherOwnerWallet}</span>
                    </div>
                </div>
                
            </div>
            <div style={{height:50}}></div>
            <div style={{ borderRadius:5, boxShadow:"4px 3px 22px #aaa"}}>
                <div className="d-flex justify-content-between" style={{borderBottom:"2px solid #dba87e", padding:"5% 5% 1%"}}>
                    <span className="d-text-48  ml-2">{t("detail.GNOSIS Chain")}</span>
                </div>
                <div style={{padding:"2% 5%", color:"#786E64"}} className="d-text-32 pb-5">
                    
                    <div className="d-flex justify-content-between mt-3" style={{padding:"0% 2%",borderBottom:"1px solid #EBEBEB"}}>
                        <span >{t("detail.Contract Address")}</span>
                        <span >{gNosisContractAddress}</span>
                    </div>
                    <div className="d-flex justify-content-between mt-3" style={{padding:"0% 2%",borderBottom:"1px solid #EBEBEB"}}>
                        <span >{t("detail.Owner Wallet")}</span>
                        <span >{gNosisOwnerWallet}</span>
                    </div>
                    <div className="d-flex justify-content-between mt-3" style={{padding:"0% 2%", borderBottom:"1px solid #EBEBEB"}}>
                        <span >{t("detail.Levinswap Pool")}</span>
                        <span >{gNosisLevins}</span>
                    </div>
                </div>
                
            </div>
        </div>
    )
}

export default Blockchain
