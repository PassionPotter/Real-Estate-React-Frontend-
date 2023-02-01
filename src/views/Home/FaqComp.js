import React, {useState, useEffect} from 'react'
import Collapse from 'react-bootstrap/Collapse';
import FAQ1Image from "../../assets/imgs/2.png";
import FAQ2Image from "../../assets/imgs/3.png";
import FAQ2LIGHT from  '../../assets/imgs/3_light.png';
import { useSelector, useDispatch } from 'react-redux';
import { actionFaqList } from "../../redux/actions/faq";

const items = [
    {
        "title":"Who is allowed to invest?",
        "description":"Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident."
    },
    {
        "title":"Who legally has ownership of these properties?",
        "description":"Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident."
    },
    {
        "title":"Do I have to submit my ID before I can participate?",
        "description":"Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident."
    },
    {
        "title":"Can I invest under an Entity like an LLC?",
        "description":"Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident."
    },
    {
        "title":"Am I liable if any lawsuits or accidents occur at the property?",
        "description":"Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident."
    },
    {
        "title":"What is the maximum number of tokens I can purchase in each property?",
        "description":"Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident."
    }
]   
const FaqComp = (props) => {
    const [open, setOpen] = useState(false);
    const [selectedNum, setSelectedNum] = useState(-1);
    const dispatch = useDispatch();

    const faqData = useSelector(state => state.faq.faqData);
    const backMode = props.backMode;
    useEffect(() => {
      dispatch(actionFaqList());
    }, []);
    

    const setOpenClicked = (number) => {
        if(selectedNum == number) {
            setOpen(!open);
            setSelectedNum(-1);
        } else{
            setOpen(true);
            setSelectedNum(number);
        }
        
    }
    return (
        <>
        {faqData.map((item,index) =>
        <div className="faq-item" key={index} style={index%2?{background:`url(${FAQ1Image}) no-repeat center`}:{background:backMode=="light"?`url(${FAQ2LIGHT}) no-repeat center`:`url(${FAQ2Image}) no-repeat center`}}>
            <div className="d-flex justify-content-between">
                <div className="d-white d-text-30 " style={{borderBottom:"3px solid #DBA87E"}}>
                {item.title}
                </div>
                <div className="d-content-center" style={{minWidth:32, minHeight:32, maxHeight:32, maxWidth:32}}>
                    <a  onClick={() => setOpenClicked(index)}>
                        <img className="img-mobile"  src={open & selectedNum == index ? "/imgs/home/7/minus.png":"/imgs/home/7/add.png"} alt="Logo"/>
                    </a>
                </div>
            </div>
            
            <Collapse in={open & selectedNum == index}>
                            <div id={index} className="d-text-24 d-white">
                                {item.description}
                            </div>
                        </Collapse>
        </div>)}
        </>
    )
}

export default FaqComp
