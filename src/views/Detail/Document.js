import React from 'react'
import {Row, Col, Button} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import {AiOutlineDownload} from 'react-icons/ai';
const Document = (props) => {
    const {t} = props;
    const product = props.productData;
    const url = product.documentURL;
    return (
        <div>
            <div className="d-text-72 mt-10 w-50" style={{borderBottom:"3px solid #dba87e"}}>
                {t("detail.Documents")}
            </div>
            <Row style={{margin:"5%", color:"#786E64", alignItems:"center"}}>
             
                <Col md={5}>
                    <a href={url} target="_blank">
                        <Button className=" d-text-32 btn btn-primary" style={{padding:"2% 10%"}}>
                            {t("detail.View Documents")}
                            <AiOutlineDownload color="#000" style={{marginLeft:10}} size={32} />
                        </Button>
                    </a>
                </Col>
            </Row>
        </div>
    )
}

export default Document
