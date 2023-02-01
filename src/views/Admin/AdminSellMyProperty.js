import React, { useEffect } from "react"
import { Button,  Layout } from "element-react"
import Fade from "react-reveal/Fade"
import { useDispatch, useSelector } from "react-redux";
import { Table as TableBs, Carousel } from 'react-bootstrap';
import { actionAnswerList, actionQuizList } from "../../redux/actions/quiz";
import { Link } from "react-router-dom"
import {AiOutlineDownload} from 'react-icons/ai';
import { jsPDF } from "jspdf";
import ReactDOMServer from "react-dom/server";


const AdminSellMyProperty = props => {

  const dispatch = useDispatch();
  const answers = useSelector(state => state.quiz.answerData);
  const quizs = useSelector(state => state.quiz.quizData);
  useEffect(() => {
    dispatch(actionAnswerList());
    dispatch(actionQuizList());
    return () => {

    }
  }, [])

  const doc = new jsPDF("p", "pt", "letter");


  const pdfTemplate = (item) => {
    return (
      <div style={{width:700}}>
        {
          quizs.map((item1, index1) => {
            const answerLists = JSON.parse(item.answers);
            const obj = answerLists.find(o => o.quiz_id == item1.id);
            return (
              <div key={index1}>
                <span>{item1.title}:</span><br/>
                <span><b>{obj != undefined ? obj.answer:""}</b></span>
              </div>
            );
          })
        }
      </div>
    )
  }
  const downloadItem = (item) => {


    const width = doc.internal.pageSize.getWidth();
    doc.html(ReactDOMServer.renderToString(pdfTemplate(item)), {
        width: width,
        windowWidth: 794,
        margin: [58, 80, 52, 80],
    }).then(() => {
      doc.save('sell-my-property.pdf');
    })
  }

  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <div style={{ width: '80%' }}>
        <Fade bottom delay={200}>
          <h1 style={{ textAlign: "center" }} className='d-font-bold d-text-90 d-white'>Sell My Property</h1>
          <div className="d-flex">
            <Link to="/admin/quiz/new" className="ms-auto">
              <Button type="outlined">Edit Quiz</Button>
            </Link>
          </div>
          <div className="login-ruleForm mt-4" style={{ border: "2px solid #03ffa4", borderRadius: "10px 10px 0 0" }}>
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
                    <th className="bg-secondary"> Options</th>
                    { quizs.map((item, index) => (
                      <th className="bg-secondary" key = {index}>{item.title}</th>
                    ))}
                    
                  </tr>
                </thead>
                <tbody>
                  {

                    answers.map((item, index) => {

                      const answerLists = JSON.parse(item.answers);
                      return (

                        <tr key = {index}>
                        <td> { index + 1}</td>
                          <td>
                          
                            <AiOutlineDownload color="#fff" size={24} onClick={() => downloadItem(item)}/>
                            
                          </td>
                        { quizs.map((item1, index1) => {
                          const obj = answerLists.find(o => o.quiz_id == item1.id);
                          return (
                          <td key = {index1} > {obj != undefined ?obj.answer : "" } </td>
                          )})}
                      </tr>
                      )
                    })
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

export default AdminSellMyProperty;