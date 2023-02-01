
import React, { Component } from 'react';

class ImageLabel extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let className = this.props.className === undefined ? '' : this.props.className;
    let img = this.props.img;
    let color = this.props.color === undefined ? 'white' : this.props.color;
    let font = this.props.font === undefined ? 'book' : this.props.font;
    let fontSize = this.props.fontSize;
    let padding = this.props.padding;
    let label = this.props.label;

    return (
      <div className = {className} style={{display: 'flex', alignItems: 'center'}}>
        <img className="img-mobile" src={img} alt="" />
        <div style={{width: padding}} />
        <div className={"d-text-" + fontSize} style={{fontFamily:font, color:color}} dangerouslySetInnerHTML={{__html:label}}>
        </div>
        {this.props.children}
      </div>
    )
  }
}

export default ImageLabel;
