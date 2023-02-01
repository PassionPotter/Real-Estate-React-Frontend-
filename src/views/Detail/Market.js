import React from 'react'

const Market = (props) => {
    const product = props.productData;
    const t= props.t;

    const marketEvaluation = product.marketEvaluation;
    const marketEvaluationTitle = product.marketEvaluationTitle;
    const evaluationImg= product.evaluationImg;
    const marketEvaluationImgTitle = product.marketEvaluationImgTitle;
    return (
        <>
        <div style={{width:"80%"}}>
            <div className="d-text-72 mt-10" style={{borderBottom:"3px solid #dba87e", width:"60%"}}>
            {marketEvaluationTitle}
            </div>
            <div style={{color:"#786E64", padding:"2%"}} className="d-text-32">
            {marketEvaluation}
            </div>
            <div className="d-text-72 mt-10" style={{borderBottom:"3px solid #dba87e", width:"60%"}}>
            {marketEvaluationImgTitle}
            </div>
            
        </div>
        <div className="mt-10">
                <img src={`${process.env.REACT_APP_API_ENDPOINT}/public/${evaluationImg}`} alt=""></img>
        </div>
        </>
    )
}

export default Market
