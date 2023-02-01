import React, { useRef, useState } from "react"
import { useHistory } from 'react-router-dom';
import { Button, Form, Input, Layout, Select } from "element-react"
import Fade from "react-reveal/Fade"
import { useDispatch } from 'react-redux';
import { Carousel } from 'react-bootstrap';
import { actionPropertyCreate } from "../../redux/actions/property";
import { callPost } from "../../services/axios";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';


const rules = {
  rentStartsDate: [{ required: true, message: 'This field is required', trigger: 'blur' }],
  // monthlyRentPerToken: [{ required: true, message: 'This field is required', trigger: 'blur' }],
  // tokenValue: [{ required: true, message: 'This field is required', trigger: 'blur' }],
  generatedToken: [{ required: true, message: 'This field is required', trigger: 'blur' }],
  propertyType: [{ required: true, message: 'This field is required', trigger: 'blur' }],
  neighborhood: [{ required: true, message: 'This field is required', trigger: 'blur' }],
  squareFeet: [{ required: true, message: 'This field is required', trigger: 'blur' }],
  lotSize: [{ required: true, message: 'This field is required', trigger: 'blur' }],
  bedroomOrBath: [{ required: true, message: 'This field is required', trigger: 'blur' }],
  bedRoomBath: [{ required: true, message: 'This field is required', trigger: 'blur' }],
  constructionYear: [{ required: true, message: 'This field is required', trigger: 'blur' }],
  currentStatusOfProperty: [{ required: true, message: 'This field is required', trigger: 'blur' }],
  section8: [{ required: true, message: 'This field is required', trigger: 'blur' }],
  monthlyGrossRent: [{ required: true, message: 'This field is required', trigger: 'blur' }],
  // monthlyCosts: [{ required: true, message: 'This field is required', trigger: 'blur' }],
  // propertyManagementFee: [{ required: true, message: 'This field is required', trigger: 'blur' }],
  // platformFee: [{ required: true, message: 'This field is required', trigger: 'blur' }],
  tax: [{ required: true, message: 'This field is required', trigger: 'blur' }],
  insuranceFee: [{ required: true, message: 'This field is required', trigger: 'blur' }],
  utility: [{ required: true, message: 'This field is required', trigger: 'blur' }],
  assetPrice: [{ required: true, message: 'This field is required', trigger: 'blur' }],
  initMaintainanceReserve: [{ required: true, message: 'This field is required', trigger: 'blur' }],
  basic: [{ required: true, message: 'This field is required', trigger: 'blur' }],
  gold: [{ required: true, message: 'This field is required', trigger: 'blur' }],
  premium: [{ required: true, message: 'This field is required', trigger: 'blur' }],
  propertyDetail: [{ required: true, message: 'This field is required', trigger: 'blur' }],
  marketEvaluation: [{ required: true, message: 'This field is required', trigger: 'blur' }],
  longTermAssetManagement: [{ required: true, message: 'This field is required', trigger: 'blur' }],
};

const typeOptions = [
  { key: "single", label: "Single Family" },
  { key: "multi", label: "Multiple Family" }
];

const currentStatusOptions = [
  { key: "fully", label: "Fully Rented" },
  { key: "partially", label: "Partially Rented" },
  { key: "not", label: "Not Rented" }
];

const section8Options = [
  { key: "true", label: "Yes" },
  { key: "false", label: "No" },
];

const utilityOptions = [
  { key: 'tenant-paid', label: 'Tenant-Paid always' }
]

const PROPERTY_MANAGEMENT_FEE = 8 / 100.0;
const PROPERTYplatformFee_FEE = 2 / 100.0;

const AdminPropertyNew = props => {

  const [form, setForm] = useState({
    address1: null,
    address2: null,

    pos_latitude: null,
    pos_longitude: null,
    imageData: null,

    rentStartsDate: null,
    monthlyRentPerToken: null,
    tokenValue: null,
    generatedToken: null,
    propertyType: null,
    neighborhood: null,
    squareFeet: 0,
    lotSize: 0,
    bedroomOrBath: 0,
    bedRoomBath:0,
    constructionYear: null,
    currentStatusOfProperty: null,
    section8: null,

    monthlyGrossRent: 0,
    monthlyCosts: null,
    propertyManagementFee: null,
    platformFee: null,
    tax: 0,
    insuranceFee: 0,
    utility: null,
    assetPrice: 0,
    fee: 0,
    initMaintainanceReserve: 0,
    basic: 0,
    gold: 0,
    premium: 0,
    propertyDetail: null,
    marketEvaluation: null,
    longTermAssetManagement: null,
    hoursToPublish: null,
    etherScanLink: null,

    //invest
    projectIRR:0,
    maintenanceExpenses:0,
    renovationUpgrade:0,
    operatingExpenseReimbursement:0,
    vacancyReserve:0,
    initialRenovationReserve:0,
    administrativeFee:0,

    projectedAppreciation:0,

    //details
    stories:0,
    totalUnits:0,
    office:0,
    heating:null,
    cooling:null,
    buildingClass:null,
    foundation:null,
    exteriorWall:null,
    parking:null,
    renovated:null,
    propertyManager:null,
    roofType:null,
    
    propertyClass:null,

    //documents
    documentURL:null,
    //blockchain
    identifier:null,
    etherDate:null,
    etherContractAddrress:null,
    etherOwnerWallet:null,
    gNosisContractAddress:null,
    gNosisOwnerWallet:null,
    gNosisLevins:null,

    //market
    marketEvaluationTitle:null,
    evaluationImg:null,
    marketEvaluationImgTitle:null,

    gMapImg:null,
    xDaiLink:null,
    mapCode:null,
    hellosignlink:null,
  });

  const dispatch = useDispatch();
  const history = useHistory();

  const formRef = useRef();
  const [imgFile, setImgFile] = useState([]);
  const [evaluationFile, setEvaluationFile] = useState({});
  const [gMapFile, setGMapFile] = useState(null);
  const OnEditorChange = (editor) => {
    let formClone = Object.assign({}, form);
    const data = editor.getData();
    formClone["propertyDetail"] = data;
    setForm(formClone);
  }

  const onFormChange = (key, value) => {
    let formClone = Object.assign({}, form);
    formClone[key] = value;

    const monthlyGrossRent = key == 'monthlyGrossRent' ? value : formClone['monthlyGrossRent'];

    if (key == 'monthlyGrossRent') {
      formClone['propertyManagementFee'] = (monthlyGrossRent * PROPERTY_MANAGEMENT_FEE).toFixed(2);
      formClone['platformFee'] = (monthlyGrossRent * PROPERTYplatformFee_FEE).toFixed(2);
    } else if (key == 'generatedToken' || key == 'assetPrice') {
      formClone['tokenValue'] = formClone['generatedToken'] != 0 ? (formClone['assetPrice'] / parseFloat(formClone['generatedToken'])).toFixed(2) : null;
    }
    if (key == 'assetPrice') {
      formClone['fee'] = formClone[key] > 0 ? parseFloat((10 / 100) * formClone[key]).toFixed(2) : 0
    }
    
    // formClone['monthlyCosts'] = - (-formClone['propertyManagementFee'] - formClone['platformFee'] - formClone['tax'] - formClone['insuranceFee'] - formClone['fee']).toFixed(2);
    formClone['monthlyCosts'] = - (-formClone['propertyManagementFee'] - formClone['platformFee'] - formClone['tax'] - formClone['insuranceFee'] -formClone['maintenanceExpenses']).toFixed(2);   // remove fromClone['fee']
    formClone['monthlyRentPerToken'] = formClone['generatedToken'] != 0 ? (formClone['monthlyCosts'] / formClone['generatedToken']).toFixed(2) : null;


    setForm(formClone);
  }

  const onFileChange = e => {
    console.log(e.target.files);

    if(e.target.files.length > 0) {
      let files = [];
      for (let i = 0 ; i < e.target.files.length; i ++)
      {
        files.push(e.target.files[i]);
      }
      setImgFile(files);
    }
  }
  const onEvaluationChange = e => {
    if (e.target.files[0])
      setEvaluationFile([e.target.files[0]]);
  }
  const onGMapChange = e => {
    if (e.target.files[0])
      setGMapFile(e.target.files[0]);
  }

  const onSubmit = (e) => {
    e.preventDefault();
    formRef.current.validate(valid => {
      // if (!valid || !imgFile) return false;

      const token = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user'))['accessToken'] : null
      if (imgFile.length) {
        // imgFile.forEach(img => {
        const formData = new FormData();
        imgFile.forEach(img => formData.append("img", img, img.name));
        callPost('/api/admin/image/upload', formData, token)
          .then(res => {
            //console.log('[Image Uploaded]', res);
            const formData1 = new FormData();
            let payload = Object.assign({}, form);
            payload.imageData = [];
            payload.imageData = res.data.imgPaths;
            evaluationFile.forEach(img => formData1.append("img", img, img.name));
            callPost('/api/admin/image/upload', formData1, token)
              .then(res => {
                payload.evaluationImg = [];
                payload.evaluationImg = res.data.imgPaths;
                const formData2 = new FormData();
                formData2.append("img", gMapFile, gMapFile.name);
                callPost('/api/admin/image/upload', formData1, token)
                .then(res => {
                  payload.gMapImg = [];
                  payload.gMapImg = res.data.imgPaths;
                  dispatch(actionPropertyCreate(payload));
                  history.push('/admin/properties');
                });
              }).catch(err => {
                
              })
            
          }).catch(err => {
            console.log('[Image Upload Fail]', err);
          })
        }
      });
  }

  return (
    <div className="d-flex flex-column justify-content-center align-items-center overflow-hidden">
      <div style={{ width: '80%' }}>
        <Fade bottom delay={200}>
          <Form ref={formRef} model={form} rules={rules} labelWidth="100" className="login-ruleForm d-font-bold" labelPosition={"top"} style={{ border: "2px solid #03ffa4", margin: 20, borderRadius: 10 }}>
            <Layout.Row style={{ fontSize: 25, margin: "-1px 0px 15px 0px" }}>
              <Layout.Col span="24">
                <div className="grid-content d-content-highlight d-flex" style={{ borderRadius: "10px 10px 1px 1px" }}>
                  <div className="ms-3">Property Detail</div>
                  <div className="ms-auto me-3 d-flex align-items-center">
                    <img src="imgs/logo3.png" alt='logo' style={{ height: "35px" }} />
                  </div>
                </div>
              </Layout.Col>
            </Layout.Row>


            <div className="container-fluid">
              <h3 className="my-3 text-white">Property Highlights</h3>
              <div className="row">

                <div className="col-md-3 mt-4">
                  <div className="bg-white d-flex rounded justify-content-center align-items-center position-relative overflow-hidden d-inline-block w-100" style={{ height: 150 }}>
                    {
                      imgFile.length ?
                        <Carousel indicators={true} >

                          {imgFile.map(img =>
                            <Carousel.Item interval={5000} key={img}>
                              <img src={URL.createObjectURL(img)} alt="img" width="100%" height="100%" />
                            </Carousel.Item>
                          )
                          }
                        </Carousel>
                        :
                        <div className="text-muted bg-white" style={{ fontSize: 50 }}>+</div>
                    }
                    <input type="file" multiple="multiple" onChange={onFileChange} className="position-absolute top-0 left-0 opacity-0 w-100 h-100 cursor-pointer" />
                  </div>
                </div>
                <div className="col-md-9 mt-4">
                  <Form.Item label="Address1" prop="address1">
                    <Input type="text" value={form.address1} onChange={val => onFormChange('address1', val)} />
                  </Form.Item>
                  <Form.Item label="Address2" prop="address2">
                    <Input type="text" value={form.address2} onChange={val => onFormChange('address2', val)} />
                  </Form.Item>
                </div>

                {/* ************************** Row 2 ***************************** */}
                <div className="col-md-3 mt-4">
                  <Form.Item label="Construction Year" prop="constructionYear">
                    <Input type="number" value={form.constructionYear} onChange={val => onFormChange('constructionYear', val)} />
                  </Form.Item>
                </div>
                <div className="col-md-3 mt-4">
                  <Form.Item label="Price" prop="assetPrice">
                    <Input type="number" value={form.assetPrice} onChange={val => onFormChange('assetPrice', val)} />
                  </Form.Item>
                </div>
                <div className="col-md-3 mt-4">
                  <Form.Item label="Type" prop="propertyType">
                    <Select className="w-100" value={form.propertyType} onChange={val => onFormChange('propertyType', val)}>
                      {
                        typeOptions.map(item => <Select.Option value={item.key} label={item.label}>{item.label}</Select.Option>)
                      }
                    </Select>
                  </Form.Item>
                </div>
                <div className="col-md-3 mt-4">
                  <Form.Item label="Bedroom" prop="bedroomOrBath">
                    <Input type="number" value={form.bedroomOrBath} onChange={val => onFormChange('bedroomOrBath', val)} />
                  </Form.Item>
                </div>
                <div className="col-md-3 mt-4">
                  <Form.Item label="Bath" prop="bedRoomBath">
                    <Input type="number" value={form.bedRoomBath} onChange={val => onFormChange('bedRoomBath', val)} />
                  </Form.Item>
                </div>

                {/* **************************** Row 3 ******************************* */}
                <div className="col-md-3 mt-4">
                  <Form.Item label="Square Feet" prop="squareFeet">
                    <Input type="number" value={form.squareFeet} onChange={val => onFormChange('squareFeet', val)} />
                  </Form.Item>
                </div>
                <div className="col-md-3 mt-4">
                  <Form.Item label="Lot Size" prop="lotSize">
                    <Input type="number" value={form.lotSize} onChange={val => onFormChange('lotSize', val)} />
                  </Form.Item>
                </div>
                <div className="col-md-3 mt-4">
                  <Form.Item label="Neighborhood" prop="neighborhood">
                    <Input type="text" value={form.neighborhood} onChange={val => onFormChange('neighborhood', val)} />
                  </Form.Item>
                </div>
                <div className="col-md-3 mt-4">
                  <Form.Item label="Section 8" prop="section8">
                    <Select className="w-100" value={form.section8} onChange={val => onFormChange('section8', val)}>
                      {
                        section8Options.map(item => <Select.Option value={item.key} label={item.label}>{item.label}</Select.Option>)
                      }
                    </Select>
                  </Form.Item>
                </div>

                <div className="col-md-12"><hr style={{ color: 'white' }} /></div>

                {/* **************************** Row 4 ******************************* */}
                <div className="col-md-3 mt-4">
                  <Form.Item label="Rent Starts From" prop="rentStartsDate">
                    <Input type="date" value={form.rentStartsDate} onChange={val => onFormChange('rentStartsDate', val)} />
                  </Form.Item>
                </div>
                <div className="col-md-3 mt-4">
                  <Form.Item label="Current Status" prop="currentStatusOfProperty">
                    <Select className="w-100" value={form.currentStatusOfProperty} onChange={val => onFormChange('currentStatusOfProperty', val)}>
                      {
                        currentStatusOptions.map(item => <Select.Option value={item.key} label={item.label}>{item.label}</Select.Option>)
                      }
                    </Select>
                  </Form.Item>
                </div>
                <div className="col-md-3 mt-4">
                  <Form.Item label="Utilities" prop="utility">
                    <Select className="w-100" value={form.utility} onChange={val => onFormChange('utility', val)}>
                      {
                        utilityOptions.map(item => <Select.Option value={item.key} label={item.label}>{item.label}</Select.Option>)
                      }
                    </Select>
                  </Form.Item>
                </div>
                <div className="col-md-3 mt-4">
                  <Form.Item label="Maintain Reserve" prop="initMaintainanceReserve">
                    <Input type="number" value={form.initMaintainanceReserve} onChange={val => onFormChange('initMaintainanceReserve', val)} />
                  </Form.Item>
                </div>

                {/* **************************** Row 5 ******************************* */}
                <div className="col-md-12"><hr style={{ color: 'white' }} /></div>
                <div className="col-md-6 mt-4">
                  <Form.Item label="Monthly Gross Rent" prop="monthlyGrossRent">
                    <Input type="number" value={form.monthlyGrossRent} onChange={val => onFormChange('monthlyGrossRent', val)} />
                  </Form.Item>
                </div>
                <div className="col-md-3 mt-4">
                  <Form.Item label="Tax" prop="tax">
                    <Input type="number" value={form.tax} onChange={val => onFormChange('tax', val)} />
                  </Form.Item>
                </div>

                <div className="col-md-3 mt-4">
                  <Form.Item label="Insurance" prop="insuranceFee">
                    <Input type="number" value={form.insuranceFee} onChange={val => onFormChange('insuranceFee', val)} />
                  </Form.Item>
                </div>

                {/* **************************** Row 6 ******************************* */}
                <div className="col-md-3 mt-4">
                  <Form.Item label="Fee" prop="fee">
                    <Input type="number" value={form.fee} disabled />
                  </Form.Item>
                </div>
                <div className="col-md-3 mt-4">
                  <Form.Item label="Monthly Cost" prop="monthlyCosts">
                    <Input type="number" value={form.monthlyCosts} onChange={val => onFormChange('monthlyCosts', val)} disabled />
                  </Form.Item>
                </div>
                <div className="col-md-3 mt-4">
                  <Form.Item label="Property Manage Fee" prop="propertyManagementFee">
                    <Input type="text" value={form.propertyManagementFee} onChange={val => onFormChange('propertyManagementFee', val)} disabled />
                  </Form.Item>
                </div>
                <div className="col-md-3 mt-4">
                  <Form.Item label="Platform Fee" prop="platformFee">
                    <Input type="text" value={form.platformFee} onChange={val => onFormChange('platformFee', val)} disabled />
                  </Form.Item>
                </div>

                {/* **************************** Row 7 ******************************* */}
                <div className="col-md-12"><hr style={{ color: 'white' }} /></div>
                <div className="col-md-6 mt-4">
                  <Form.Item label="Token Amount" prop="generatedToken">
                    <Input type="number" value={form.generatedToken} onChange={val => onFormChange('generatedToken', val)} />
                  </Form.Item>
                </div>
                <div className="col-md-3 mt-4">
                  <Form.Item label="Month Rent Per Token" prop="monthlyRentPerToken">
                    <Input type="number" value={form.monthlyRentPerToken} onChange={val => onFormChange('monthlyRentPerToken', val)} disabled />
                  </Form.Item>
                </div>
                <div className="col-md-3 mt-4">
                  <Form.Item label="Token Value" prop="tokenValue">
                    <Input type="number" value={form.tokenValue} onChange={val => onFormChange('tokenValue', val)} disabled />
                  </Form.Item>
                </div>
                {/* **************************** Row 8 ******************************* */}
                <div className="col-md-12"><hr style={{ color: 'white' }} /></div>
                <div className="col-md-4 mt-4">
                  <Form.Item label="basic" prop="basic">
                    <Input type="number" value={form.basic} onChange={val => onFormChange('basic', val)} />
                  </Form.Item>
                </div>
                <div className="col-md-4 mt-4">
                  <Form.Item label="gold" prop="gold">
                    <Input type="number" value={form.gold} onChange={val => onFormChange('gold', val)} />
                  </Form.Item>
                </div>
                <div className="col-md-4 mt-4">
                  <Form.Item label="premium" prop="premium">
                    <Input type="number" value={form.premium} onChange={val => onFormChange('premium', val)} />
                  </Form.Item>
                </div>
                {/* **************************** Row 9 ******************************* */}
                <div className="col-md-12"><hr style={{ color: 'white' }} /></div>
                <div className="col-md-12 mt-4">
                  {/* <Form.Item label="Property Detail" prop="propertyDetail">
                    <textarea value={form.propertyDetail} rows={5} onChange={val => onFormChange('propertyDetail', val.target.value)} style={{width:"100%", lineHeight:"24px"}}>
                      
                    </textarea>
                  </Form.Item> */}
                  <CKEditor
                      editor={ ClassicEditor }
                      data={form.propertyDetail?form.propertyDetail:""}
                      onChange={ ( event, editor ) => OnEditorChange(editor)}
                    
                  />
                </div>
                <div className="col-md-12 mt-4">
                  <Form.Item label="Market Evaluation" prop="marketEvaluation">
                    {/* <Input type="text" value={form.marketEvaluation} onChange={val => onFormChange('marketEvaluation', val)} /> */}
                    <textarea value={form.marketEvaluation} rows={5} onChange={val => onFormChange('marketEvaluation', val.target.value)} style={{width:"100%", lineHeight:"24px"}}>
                      
                    </textarea>
                  </Form.Item>
                </div>
                
                {/* **************************** Row 10 ******************************* */}
                <div className="col-md-12"><hr style={{ color: 'white' }} /></div>
                <div className="col-md-4 mt-4">
                  <Form.Item label="Long Term Asset Management" prop="longTermAssetManagement">
                    <Input type="text" value={form.longTermAssetManagement} onChange={val => onFormChange('longTermAssetManagement', val)} />
                  </Form.Item>
                </div>
                <div className="col-md-3 mt-4">
                  <Form.Item label="Property Latitude" prop="pos_latitude">
                    <Input type="number" value={form.pos_latitude} placeholder="EX: 51.507351" onChange={val => onFormChange('pos_latitude', val)} />
                  </Form.Item>
                </div>
                <div className="col-md-3 mt-4">
                  <Form.Item label="Property Longitude" prop="pos_longitude">
                    <Input type="number" value={form.pos_longitude} placeholder="EX: -0.127758" onChange={val => onFormChange('pos_longitude', val)} />
                  </Form.Item>
                </div>
                <div className="col-md-3 mt-4">
                  <Form.Item label="Hours To Publish" prop="hoursToPublish">
                    <Input type="number" value={form.hoursToPublish} placeholder="EX: 48" onChange={val => onFormChange('hoursToPublish', val)} />
                  </Form.Item>
                </div>
                <div className="col-md-3 mt-4">
                  <Form.Item label="EtherScan Link" prop="etherScanLink">
                    <Input type="text" value={form.etherScanLink} onChange={val => onFormChange('etherScanLink', val)} />
                  </Form.Item>
                </div>
                <div className="col-md-3 mt-4">
                  <Form.Item label="xDai Link" prop="xDaiLink">
                    <Input type="text" value={form.xDaiLink} onChange={val => onFormChange('xDaiLink', val)} />
                  </Form.Item>
                </div>
                
                {/* Investment & Finance ADD */}
                <div className="col-md-12"><hr style={{ color: 'white' }} /></div>
                <div className="col-md-3 mt-4">
                  <Form.Item label="Property Project IRR" prop="projectIRR">
                    <Input type="number" value={form.projectIRR}  onChange={val => onFormChange('projectIRR', val)} />
                  </Form.Item>
                </div>
                <div className="col-md-3 mt-4">
                  <Form.Item label="Maintenance Expenses" prop="maintenanceExpenses">
                    <Input type="number" value={form.maintenanceExpenses}  onChange={val => onFormChange('maintenanceExpenses', val)} />
                  </Form.Item>
                </div>
                <div className="col-md-3 mt-4">
                  <Form.Item label="Renovation & Upgrade" prop="renovationUpgrade">
                    <Input type="number" value={form.renovationUpgrade}  onChange={val => onFormChange('renovationUpgrade', val)} />
                  </Form.Item>
                </div>
                <div className="col-md-3 mt-4">
                  <Form.Item label="Expense Reimbursement" prop="operatingExpenseReimbursement">
                    <Input type="number" value={form.operatingExpenseReimbursement} onChange={val => onFormChange('operatingExpenseReimbursement', val)} />
                  </Form.Item>
                </div>
                <div className="col-md-3 mt-4">
                  <Form.Item label="Vacancy Reserve" prop="vacancyReserve">
                    <Input type="number" value={form.vacancyReserve}  onChange={val => onFormChange('vacancyReserve', val)} />
                  </Form.Item>
                </div>
                <div className="col-md-3 mt-4">
                  <Form.Item label="Initial Renovation Reserve" prop="initialRenovationReserve">
                    <Input type="number" value={form.initialRenovationReserve}  onChange={val => onFormChange('initialRenovationReserve', val)} />
                  </Form.Item>
                </div>
                <div className="col-md-3 mt-4">
                  <Form.Item label="Administrative Fee" prop="administrativeFee">
                    <Input type="number" value={form.administrativeFee}  onChange={val => onFormChange('administrativeFee', val)} />
                  </Form.Item>
                </div>
                <div className="col-md-3 mt-4">
                  <Form.Item label="Projected Appreciation" prop="projectedAppreciation">
                    <Input type="number" value={form.projectedAppreciation}  onChange={val => onFormChange('projectedAppreciation', val)} />
                  </Form.Item>
                </div>
                <div className="col-md-12"><hr style={{ color: 'white' }} /></div>
                <div className="col-md-3 mt-4">
                  <Form.Item label="Property Stories" prop="stories">
                    <Input type="number" value={form.stories}  onChange={val => onFormChange('stories', val)} />
                  </Form.Item>
                </div>
                <div className="col-md-3 mt-4">
                  <Form.Item label="Total Units" prop="totalUnits">
                    <Input type="number" value={form.totalUnits}  onChange={val => onFormChange('totalUnits', val)} />
                  </Form.Item>
                </div>
                <div className="col-md-3 mt-4">
                  <Form.Item label="Property Office" prop="office">
                    <Input type="number" value={form.office}  onChange={val => onFormChange('office', val)} />
                  </Form.Item>
                </div>
                <div className="col-md-3 mt-4">
                  <Form.Item label="Property heating" prop="heating">
                    <Input type="text" value={form.heating} onChange={val => onFormChange('heating', val)} />
                  </Form.Item>
                </div>
                <div className="col-md-3 mt-4">
                  <Form.Item label="Property cooling" prop="cooling">
                    <Input type="text" value={form.cooling}  onChange={val => onFormChange('cooling', val)} />
                  </Form.Item>
                </div>
                <div className="col-md-3 mt-4">
                  <Form.Item label="Building Class" prop="buildingClass">
                    <Input type="text" value={form.buildingClass}  onChange={val => onFormChange('buildingClass', val)} />
                  </Form.Item>
                </div>
                <div className="col-md-3 mt-4">
                  <Form.Item label="Property Foundation" prop="foundation">
                    <Input type="text" value={form.foundation}  onChange={val => onFormChange('foundation', val)} />
                  </Form.Item>
                </div>
                <div className="col-md-3 mt-4">
                  <Form.Item label="Property Exterior Wall" prop="exteriorWall">
                    <Input type="text" value={form.exteriorWall}  onChange={val => onFormChange('exteriorWall', val)} />
                  </Form.Item>
                </div>
                <div className="col-md-3 mt-4">
                  <Form.Item label="Property Parking" prop="parking">
                    <Input type="text" value={form.parking}  onChange={val => onFormChange('parking', val)} />
                  </Form.Item>
                </div>
                <div className="col-md-3 mt-4">
                  <Form.Item label="Property Renovated" prop="renovated">
                    <Input type="text" value={form.renovated}  onChange={val => onFormChange('renovated', val)} />
                  </Form.Item>
                </div>
                <div className="col-md-3 mt-4">
                  <Form.Item label="Property Manager" prop="propertyManager">
                    <Input type="text" value={form.propertyManager}  onChange={val => onFormChange('propertyManager', val)} />
                  </Form.Item>
                </div>
                <div className="col-md-3 mt-4">
                  <Form.Item label="Property Roof Type" prop="roofType">
                    <Input type="text" value={form.roofType}  onChange={val => onFormChange('roofType', val)} />
                  </Form.Item>
                </div>
                <div className="col-md-3 mt-4">
                  <Form.Item label="Property Class" prop="propertyClass">
                    <Input type="text" value={form.propertyClass}  onChange={val => onFormChange('propertyClass', val)} />
                  </Form.Item>
                </div>
                <div className="col-md-12"><hr style={{ color: 'white' }} /></div>
                <div className="col-md-3 mt-4">
                  <Form.Item label="Document URL" prop="documentURL">
                    <Input type="text" value={form.documentURL}  onChange={val => onFormChange('documentURL', val)} />
                  </Form.Item>
                </div>
                <div className="col-md-3 mt-4">
                  <Form.Item label="Blockchain Identifier" prop="identifier">
                    <Input type="text" value={form.identifier}  onChange={val => onFormChange('identifier', val)} />
                  </Form.Item>
                </div>
                <div className="col-md-3 mt-4">
                  <Form.Item label="Ether Date" prop="etherDate">
                    <Input type="date" value={form.etherDate}  onChange={val => onFormChange('etherDate', val)} />
                  </Form.Item>
                </div>
                <div className="col-md-3 mt-4">
                  <Form.Item label="Property Class" prop="etherContractAddrress">
                    <Input type="text" value={form.etherContractAddrress}  onChange={val => onFormChange('etherContractAddrress', val)} />
                  </Form.Item>
                </div>
                <div className="col-md-3 mt-4">
                  <Form.Item label="Ether Owner Wallet" prop="etherOwnerWallet">
                    <Input type="text" value={form.etherOwnerWallet}  onChange={val => onFormChange('etherOwnerWallet', val)} />
                  </Form.Item>
                </div>
                <div className="col-md-3 mt-4">
                  <Form.Item label="GNosis Contract Address" prop="gNosisContractAddress">
                    <Input type="text" value={form.gNosisContractAddress}  onChange={val => onFormChange('gNosisContractAddress', val)} />
                  </Form.Item>
                </div>
                <div className="col-md-3 mt-4">
                  <Form.Item label="GNosis Owner Wallet" prop="gNosisOwnerWallet">
                    <Input type="text" value={form.gNosisOwnerWallet}  onChange={val => onFormChange('gNosisOwnerWallet', val)} />
                  </Form.Item>
                </div>
                <div className="col-md-3 mt-4">
                  <Form.Item label="GNosis Levins Pool" prop="gNosisLevins">
                    <Input type="text" value={form.gNosisLevins}  onChange={val => onFormChange('gNosisLevins', val)} />
                  </Form.Item>
                </div>
                <div className="col-md-12"><hr style={{ color: 'white' }} /></div>
                <div className="col-md-3 mt-4">
                  <div className="bg-white d-flex rounded justify-content-center align-items-center position-relative overflow-hidden d-inline-block w-100" style={{ height: 150 }}>
                    {
                      evaluationFile.length ?
                        <img src={URL.createObjectURL(evaluationFile[0])} alt="img" width="100%" height="100%" />
                          
                        :
                        <div className="text-muted bg-white" style={{ fontSize: 50 }}>+</div>
                    }
                    <input type="file" onChange={onEvaluationChange} className="position-absolute top-0 left-0 opacity-0 w-100 h-100 cursor-pointer" />
                  </div>
                </div>
                <div className="col-md-3 mt-4">
                  <Form.Item label="Market Evaluation Title" prop="marketEvaluationTitle">
                    <Input type="text" value={form.marketEvaluationTitle}  onChange={val => onFormChange('marketEvaluationTitle', val)} />
                  </Form.Item>
                </div>
                <div className="col-md-3 mt-4">
                  <Form.Item label="Hello Sign Link" prop="hellosignlink">
                    <Input type="text" value={form.hellosignlink}  onChange={val => onFormChange('hellosignlink', val)} />
                  </Form.Item>
                </div>
                
                <div className="col-md-3 mt-4">
                  <Form.Item label="Market Evaluation Title" prop="marketEvaluationImgTitle">
                    <Input type="text" value={form.marketEvaluationImgTitle}  onChange={val => onFormChange('marketEvaluationImgTitle', val)} />
                  </Form.Item>
                </div>
                <div className="col-md-12"><hr style={{ color: 'white' }} /></div>
                <div className="col-md-3 mt-4">
                  <div className="bg-white d-flex rounded justify-content-center align-items-center position-relative overflow-hidden d-inline-block w-100" style={{ height: 150 }}>
                    {
                      gMapFile?
                        <img src={URL.createObjectURL(gMapFile)} alt="img" width="100%" height="100%" />
                          
                        :
                        <div className="text-muted bg-white" style={{ fontSize: 50 }}>+</div>
                    }
                    <input type="file" onChange={onGMapChange} className="position-absolute top-0 left-0 opacity-0 w-100 h-100 cursor-pointer" />
                  </div>
                </div>
                <div className="col-md-12 mt-4">
                  <Form.Item label="Google Map Embed Code" prop="mapCode">
                    {/* <Input type="text" value={form.marketEvaluation} onChange={val => onFormChange('marketEvaluation', val)} /> */}
                    <textarea value={form.mapCode} rows={5} onChange={val => onFormChange('mapCode', val.target.value)} style={{width:"100%", lineHeight:"24px"}}>
                      
                    </textarea>
                  </Form.Item>
                </div>
              </div>
            </div>


            <Form.Item style={{ textAlign: "center" }}>
              <Button type="primary" nativeType="submit" onClick={onSubmit}>Create</Button>
            </Form.Item>
          </Form>
        </Fade>
      </div>
    </div>
  )
}

export default AdminPropertyNew;