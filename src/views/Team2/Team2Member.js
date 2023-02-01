
import React, { Component } from 'react';
import { Image } from 'react-bootstrap';
import Fade from 'react-reveal/Fade';

class Team2Member extends Component {

  render() {
    let img = this.props.img;
    let name = this.props.name;
    let job = this.props.job;
    let delay = this.props.delay;

    return (
      <Fade delay={delay}>
        <div style={{margin: 30}}>
          <Image width="100%" src={img} alt="Team1Member"/>
          <div style={{height:10, backgroundColor:"#DBA87E"}}/>
          <div style={{height: 24}} />
          <div className="d-content-center d-text-36 d-font-mont-bold">
            {name}
          </div>
          <div className="d-highlight d-content-center d-text-30 d-font-book">
            {job}
          </div>
          <div className="d-content-center d-text-30" style={{color:"#786E64"}}>
            <i className="fa fa-facebook d-highlight mr-5"/>
            <i className="fa fa-linkedin d-highlight mr-5"/>
            <i className="fa fa-vimeo d-highlight"/>
          </div>
        </div>
      </Fade>
    )
  }
}

export default Team2Member;
