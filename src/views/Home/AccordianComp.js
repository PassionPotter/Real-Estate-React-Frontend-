import React, { useState , useEffect}  from 'react'
import Collapse from 'react-bootstrap/Collapse';
import { useSelector, useDispatch } from 'react-redux';
import { actionHowworksList } from "../../redux/actions/howworks";
const items = [
    {
        "title":"1. Tokized Immo purchase a property",
        "description":"Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident."
    },
    {
        "title":"2.The Property is fractionated and Tokenized",
        "description":"Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident."
    },
    {
        "title":"3. One Token costs $50",
        "description":"Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident."
    },
    {
        "title":"4. You can purchase one or more Token",
        "description":"Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident."
    },
    {
        "title":"5. Receive rental income",
        "description":"Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident."
    },
    {
        "title":"6. Resell your Token anytime",
        "description":"Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident."
    }
]
const AccordianComp = (props) => {
    const [open, setOpen] = useState(false);
    const [selectedNum, setSelectedNum] = useState(-1);
    const dispatch = useDispatch();
    const howworksData = useSelector(state => state.howworks.howworksData);
  
    useEffect(() => {
      dispatch(actionHowworksList());
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
            {howworksData.map((item,index) =>
                    <div className={selectedNum == index? "mb-3 accItem":"mb-3"} style={{padding:"5%", color:"#786E64"}} key={index} >
                        <div className="d-flex justify-content-between flowline">
                            <span className="pr-10 d-text-30">
                                {item.title}
                            </span>
                            <div className="d-content-center" style={{minWidth:32, minHeight:32, maxHeight:32, maxWidth:32}}>
                                <a aria-controls={index} onClick={() => setOpenClicked(index)}>
                                    <img className="img-mobile" src={open & selectedNum == index ? "/imgs/home/7/minus.png":"/imgs/home/7/add.png"} alt="Logo"/>
                                    </a>
                            </div>
                        </div>
                        <Collapse in={open & selectedNum == index}>
                            <div id={index} className="d-text-18 mt-1">
                                {item.description}
                            </div>
                        </Collapse>
                    </div>
                )} 
       </>
    )
}

export default AccordianComp
