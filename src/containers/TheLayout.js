import React, { Component } from 'react'
import { Layout } from 'element-react'

import { TheContent, TheFooter, TheHeader } from './index'
import { Redirect } from 'react-router';
import { connect } from 'react-redux'
class TheLayout extends Component {
  render() {

    const passed = localStorage.getItem('passed');

    return (
      <>
        {
          passed === 'true' ?
            <div>
              <Layout.Row>
                <Layout.Col span="24" style={{ backgroundColor: this.props.backMode == "light" ?'#F0EEEB':'#2e2e2e', zIndex: 1000, position: "fixed", paddingTop:"20px" }}>
                  <div className="grid-content bg-purple-light"><TheHeader /></div>
                </Layout.Col>
              </Layout.Row>
              <Layout.Row className='app-content' style={{ zIndex: 1 }}>
                <Layout.Col span="24">
                  <div className="grid-content bg-purple-light"><TheContent /></div>
                </Layout.Col>
              </Layout.Row>
              <Layout.Row>
                <Layout.Col span="24" style={{ backgroundColor: this.props.backMode == "light" ?'#F0EEEB':'#796f65'}}>
                  <div className="grid-content bg-purple-light"><TheFooter /></div>
                </Layout.Col>
              </Layout.Row>
            </div>
            :
            <Redirect to="/get-access" />
        }

      </>
    )
  }
}
const mapStateToProps = (state) => {
  const { backMode } = state.auth
  return {
    backMode
  }
}
export default connect(mapStateToProps, null)(TheLayout);