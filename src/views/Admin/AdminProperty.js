import React, { useEffect } from "react"
import { Button, Layout } from "element-react"
import { useHistory } from "react-router-dom";
import Fade from "react-reveal/Fade"
import { Table as TableBs, Carousel } from 'react-bootstrap';
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { actionPropertyList, actionPropertyGet } from "../../redux/actions/property";

const AdminProperty = props => {
  let history = useHistory();
  const dispatch = useDispatch();
  const properties = useSelector(state => state.property.propertyData);

  useEffect(() => {
    // if(!properties)
    dispatch(actionPropertyList());
  }, [])
  const onNewClicked = () => {

  }

  const onPropertyClicked = (e, index) => {
    // console.log('index', index);
    dispatch(actionPropertyGet(index));
    history.push('/admin/properties/update');
  }

  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <div style={{ width: '80%' }}>
        <Fade bottom delay={200}>
          <h1 style={{ textAlign: "center" }} className='d-font-bold d-text-90 d-white'>Properties</h1>
          <div className="d-flex">
            <Link to="/admin/properties/new" className="ms-auto">
              <Button type="outlined" onClick={onNewClicked}>New Property</Button>
            </Link>
          </div>
          <div className="login-ruleForm mt-4" labelPosition={"top"} style={{ border: "2px solid #03ffa4", borderRadius: "10px 10px 0 0" }}>
            <Layout.Row style={{ fontSize: 25, margin: "-1px 0px 0 0px" }}>
              <Layout.Col span="24">
                <div className="grid-content d-content-highlight d-flex" style={{ borderRadius: "10px 10px 1px 1px" }}>
                  <div className="ms-3">List</div>
                  <div className="ms-auto me-3 d-flex align-items-center">
                    <img src="imgs/logo3.png" alt='logo' style={{ height: "35px" }} />
                  </div>
                </div>
              </Layout.Col>
            </Layout.Row>

            <div className="w-100 overflow-auto">
              <TableBs striped hover variant="dark" style={{ margin: 0 }} className="text-center">
                <thead>
                  <tr>
                    <th className="bg-secondary">#</th>
                    <th className="bg-secondary">Image</th>
                    <th className="bg-secondary" style={{ minWidth: 100 }}>Address 1</th>
                    <th className="bg-secondary" style={{ minWidth: 100 }}>Address 2</th>
                    <th className="bg-secondary" style={{ minWidth: 100 }}>Start Date</th>
                    <th className="bg-secondary" style={{ minWidth: 200 }}>Monthly Rent Per Token</th>
                    <th className="bg-secondary" style={{ minWidth: 110 }}>Token Value</th>
                    <th className="bg-secondary" style={{ minWidth: 150 }}>Generated Token</th>
                    <th className="bg-secondary" style={{ minWidth: 130 }}>Property Type</th>
                    <th className="bg-secondary" style={{ minWidth: 100 }}>Neighborhood</th>
                    <th className="bg-secondary" style={{ minWidth: 140 }}>Bed Room</th>
                    <th className="bg-secondary" style={{ minWidth: 140 }}>Bath</th>
                    <th className="bg-secondary" style={{ minWidth: 170 }}>Monthly Gross Rent</th>
                    <th className="bg-secondary" style={{ minWidth: 130 }}>Monthly Costs</th>
                    <th className="bg-secondary">Taxes</th>
                    <th className="bg-secondary">Basic</th>
                    <th className="bg-secondary">Gold</th>
                    <th className="bg-secondary">Premium</th>
                    <th className="bg-secondary" style={{ minWidth: 170 }}>Market Evaluation</th>
                    <th className="bg-secondary" style={{ minWidth: 250 }}>Long Term Asset Management</th>
                    <th className="bg-secondary" style={{ minWidth: 150 }}>Property Latitude</th>
                    <th className="bg-secondary" style={{ minWidth: 170 }}>Property Longitude</th>
                    <th className="bg-secondary" style={{ minWidth: 170 }}>Hours To Publish</th>
                    <th className="bg-secondary" style={{ minWidth: 170 }}>EtherScan Link</th>

                    <th className="bg-secondary" style={{ minWidth: 170 }}>projectIRR</th>
                    <th className="bg-secondary" style={{ minWidth: 170 }}>maintenanceExpenses</th>
                    <th className="bg-secondary" style={{ minWidth: 170 }}>renovationUpgrade</th>
                    <th className="bg-secondary" style={{ minWidth: 170 }}>operatingExpenseReimbursement</th>
                    <th className="bg-secondary" style={{ minWidth: 170 }}>vacancyReserve</th>
                    <th className="bg-secondary" style={{ minWidth: 170 }}>Initial Renovation Reserve</th>
                    <th className="bg-secondary" style={{ minWidth: 170 }}>administrativeFee</th>
                    <th className="bg-secondary" style={{ minWidth: 170 }}>projectedAppreciation</th>
                    <th className="bg-secondary" style={{ minWidth: 170 }}>stories</th>
                    <th className="bg-secondary" style={{ minWidth: 170 }}>totalUnits</th>
                    <th className="bg-secondary" style={{ minWidth: 170 }}>office</th>
                    <th className="bg-secondary" style={{ minWidth: 170 }}>heating</th>
                    <th className="bg-secondary" style={{ minWidth: 170 }}>cooling</th>
                    <th className="bg-secondary" style={{ minWidth: 170 }}>buildingClass</th>
                    <th className="bg-secondary" style={{ minWidth: 170 }}>foundation</th>
                    <th className="bg-secondary" style={{ minWidth: 170 }}>exteriorWall</th>
                    <th className="bg-secondary" style={{ minWidth: 170 }}>parking</th>
                    <th className="bg-secondary" style={{ minWidth: 170 }}>renovated</th>
                    <th className="bg-secondary" style={{ minWidth: 170 }}>propertyManager</th>
                    <th className="bg-secondary" style={{ minWidth: 170 }}>roofType</th>
                    <th className="bg-secondary" style={{ minWidth: 170 }}>propertyClass</th>
                    <th className="bg-secondary" style={{ minWidth: 170 }}>documentURL</th>
                    <th className="bg-secondary" style={{ minWidth: 170 }}>identifier</th>
                    <th className="bg-secondary" style={{ minWidth: 170 }}>etherDate</th>
                    <th className="bg-secondary" style={{ minWidth: 170 }}>etherContractAddrress</th>
                    <th className="bg-secondary" style={{ minWidth: 170 }}>etherOwnerWallet</th>
                    <th className="bg-secondary" style={{ minWidth: 170 }}>gNosisContractAddress</th>
                    <th className="bg-secondary" style={{ minWidth: 170 }}>gNosisOwnerWallet</th>
                    <th className="bg-secondary" style={{ minWidth: 170 }}>gNosisLevins</th>
                    <th className="bg-secondary" style={{ minWidth: 170 }}>marketEvaluationTitle</th>
                    <th className="bg-secondary" style={{ minWidth: 170 }}>evaluationImg</th>
                    <th className="bg-secondary" style={{ minWidth: 170 }}>marketEvaluationImgTitle</th>
                    <th className="bg-secondary" style={{ minWidth: 170 }}>GMapImage</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    properties.map((item, key) =>
                      <tr key={key} onClick={(e) => onPropertyClicked(e, item.id)}>
                        <td>{key + 1}</td>
                        <td>
                          <Carousel indicators={true} >
                            {item.imageData?.map((img) => (
                              <Carousel.Item interval={2000} key={img}>
                                <img src={`${process.env.REACT_APP_API_ENDPOINT}/public/${img}`} alt="img" width="100" height="100%" />
                              </Carousel.Item>
                            ))}
                          </Carousel>
                        </td>
                        <td>{item.address1}</td>
                        <td>{item.address2}</td>
                        <td>{new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date(item.rentStartsDate))}</td>
                        <td>${item.monthlyRentPerToken}</td>
                        <td>${item.tokenValue}</td>
                        <td>{item.generatedToken}</td>
                        <td>{item.propertyType}</td>
                        <td>{item.neighborhood}</td>
                        <td>{item.bedroomOrBath}</td>
                        <td>{item.bedRoomBath}</td>
                        <td>${item.monthlyGrossRent}</td>
                        <td>${item.monthlyCosts}</td>
                        <td>${item.tax}</td>
                        <td>{item.basic}</td>
                        <td>{item.gold}</td>
                        <td>{item.premium}</td>
                        <td>{item.marketEvaluation}</td>
                        <td>{item.longTermAssetManagement}</td>
                        <td>{item.pos_latitude}</td>
                        <td>{item.pos_longitude}</td>
                        <td>{item.hoursToPublish}</td>
                        <td>{item.etherScanLink}</td>
                        
                        <td>${item.projectIRR}</td>
                        <td>${item.maintenanceExpenses}</td>
                        <td>${item.renovationUpgrade}</td>
                        <td>${item.operatingExpenseReimbursement}</td>
                        <td>${item.vacancyReserve}</td>
                        <td>${item.initialRenovationReserve}</td>
                        <td>${item.administrativeFee}</td>
                        <td>{item.projectedAppreciation}%</td>
                        <td>{item.stories}</td>
                        <td>{item.totalUnits}</td>


                        <td>{item.office}</td>
                        <td>{item.heating}</td>
                        <td>{item.cooling}</td>

                        <td>{item.buildingClass}</td>
                        <td>{item.foundation}</td>
                        <td>{item.exteriorWall}</td>

                        <td>{item.parking}</td>
                        <td>{item.renovated}</td>
                        <td>{item.propertyManager}</td>

                        <td>{item.roofType}</td>
                        <td>{item.propertyClass}</td>
                        <td>{item.documentURL}</td>
                        
                        <td>{item.identifier}</td>
                        <td>{item.etherDate}</td>
                        <td>{item.etherContractAddrress}</td>

                        <td>{item.etherOwnerWallet}</td>
                        <td>{item.gNosisContractAddress}</td>
                        <td>{item.gNosisOwnerWallet}</td>
                        <td>{item.gNosisLevins}</td>
                        <td>{item.marketEvaluationTitle}</td>
                        <td>
                         <img src={`${process.env.REACT_APP_API_ENDPOINT}/public/${item.evaluationImg}`} alt="img" width="100" height="100%" />
   
                          </td>

                        <td>{item.marketEvaluationImgTitle}</td>
                        <td>
                         <img src={`${process.env.REACT_APP_API_ENDPOINT}/public/${item.gMapImg}`} alt="img" width="100" height="100%" />
   
                          </td>
                      </tr>
                    )
                  }

                </tbody>
              </TableBs>
            </div>


          </div>
        </Fade>
      </div>
    </div>
  )
}

export default AdminProperty;