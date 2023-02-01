import React from 'react'
import {GiPositionMarker,HiOutlineHome, BsCalendarDate,BsArrowCounterclockwise, TiInfoLargeOutline,
    RiHotelBedLine,ImOffice,BsSnow2,HiOutlineUserGroup,FiUser,IoHammerOutline,BsLayoutThreeColumns, RiParkingBoxLine
} from 'react-icons/all'
const DetailTab = (props) => {

    const product = props.productData;
    const t= props.t;

    
    let neighborhood = product.neighborhood
    let squareFeet = Number(product.squareFeet).toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
    let lotSize = Number(product.lotSize).toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
    let bedroomOrBath = product.bedroomOrBath
    let bedRoomBath = product.bedRoomBath
    let constructionYear = product.constructionYear
   
    const stories = product.stories;
    const totalUnits = product.totalUnits;
    const office = product.office;
    const heating = product.heating;
    const cooling = product.cooling;
    const buildingClass = product.buildingClass;
    const foundation = product.foundation;
    const exteriorWall = product.exteriorWall;
    const parking = product.parking;
    const renovated = product.renovated;
    const propertyManager = product.propertyManager;
    const roofType = product.roofType;
    const totalAdress =  product.address1 +"," + product.address2;
    const detailData = [
        {
            icon:<GiPositionMarker color="#dba87e"/>,
            title:t("detail.Full Address"),
            content:totalAdress
        },
        {
            icon:<img src='imgs/detail/neighbour.png' style={{width:"20px"}}/>,
            title:t("detail.Neighborhood"),
            content:neighborhood
        },
        {
            icon:<BsCalendarDate color="#dba87e"/>,
            title:t("detail.Construction Year"),
            content:constructionYear
        },
        {
            icon:<BsArrowCounterclockwise color="#dba87e"/>,
            title:t("detail.Stories"),
            content:stories+ " Stories"
        },
        {
            icon:<TiInfoLargeOutline color="#dba87e"/>,
            title:t("detail.Total Units"),
            content:totalUnits
        },
        {
            icon:<RiHotelBedLine color="#dba87e"/>,
            title:t("detail.Bedroom/ Bath"),
            content:`${bedroomOrBath} beds/ ${bedRoomBath} bath`
        },
        {
            icon:<img src='imgs/detail/office.png' style={{width:"20px"}}/>,
            title:t("detail.Office"),
            content:office + " Offices"
        },
        {
            icon:<img src='imgs/detail/lot.png' style={{width:"20px"}}/>,
            title:t("detail.Lot Size (Sqft)"),
            content:lotSize,
        },
        {
            icon:<img src='imgs/detail/interior.png' style={{width:"20px"}}/>,
            title:t("detail.Interior Size (Sqft)"),
            content:squareFeet,
        },
        {
            icon:<BsLayoutThreeColumns color="#dba87e"/>,
            title:t("detail.Heating"),
            content:heating,
        },
        {
            icon:<BsSnow2 color="#dba87e"/>,
            title:t("detail.Cooling"),
            content:cooling,
        },
        {
            icon:<HiOutlineHome color="#dba87e"/>,
            title:t("detail.Building Class"),
            content:buildingClass,
        },
        {
            icon:<HiOutlineUserGroup color="#dba87e"/>,
            title:t("detail.Foundation"),
            content:foundation,
        },
        {
            icon:<img src='imgs/detail/wall.png' style={{width:"20px"}}/>,
            title:t("detail.Exterior Walls"),
            content:exteriorWall,
        },
        {
            icon:<img src='imgs/detail/roof.png' style={{width:"20px"}}/>,
            title:t("detail.Roof Type"),
            content:roofType,
        },
        {
            icon:<img src='imgs/detail/park.png' style={{width:"20px"}}/>,
            title:t("detail.Parking"),
            content:parking,
        },
        {
            icon:<IoHammerOutline color="#dba87e"/>,
            title:t("detail.Renovated"),
            content:renovated,
        },
        {
            icon:<FiUser color="#dba87e"/>,
            title:t("detail.Property Manager"),
            content:propertyManager,
        }
    ]
    return (
        <div style={{width:"90%"}}>
            <div className="d-text-72 mt-10" style={{borderBottom:"3px solid #dba87e"}}>
                DETAILS
            </div>
            <div className="d-text-32">
                PROPERTY DETAILS
            </div>
            <div style={{padding:"2% 0%", color:"#786E64"}} className="d-text-32">
                {detailData.map((detail, index) => 
                    <div key={index} className="d-flex justify-content-between mt-3" style={{ borderBottom:"1px solid #EBEBEB"}}>
                        
                        <span>
                            {detail.icon}
                            <span className="ml-3">{detail.title}</span>
                        </span>
                        <span>{detail.content}</span>
                    </div>)}
                </div>
        </div>
    )
}

export default DetailTab
