import React, { Component } from 'react'
import Carousel from 'react-gallery-carousel'
import 'react-gallery-carousel/dist/index.css'
import { AiOutlineLeftCircle, AiOutlineRightCircle } from "react-icons/ai"
// import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
// import { Carousel } from 'react-responsive-carousel';
export default class MyCarousel extends Component {
    // eslint-disable-next-line
    constructor(props) {
        super(props)
    }

    render() {
        const images = this.props.images ? this.props.images.map((e) => ({
            src: `${process.env.REACT_APP_API_ENDPOINT}/public/${e}`
        })) : []
        // const images = this.props.images ? this.props.images.map((e) => (
        //     <img src={`${process.env.REACT_APP_API_ENDPOINT}/public/${e}`}></img>
        // )) : []

        return (
                <Carousel 
                style={{ backgroundColor:"#fff", height:"90vh", width:"100%" }}
                images={images}
                hasSizeButton="false"
                hasMediaButton="false"
                hasIndexBoard="false"
                hasDotButtons="bottom"
                hasLeftButton="false"
                hasRightButton="false"
                isAutoPlaying="true"
                autoPlayInterval={3000}
                
                hasThumbnails={this.props.hasThumbnails}
                thumbnailWidth="20vw"
                thumbnailHeight="15vh"
                activeIcon={
                    <span className='icon-text ml-2'>
                        <img src="imgs/marketplace/active.png" style={{width:"3.5vw"}}></img>
                    </span>
                  }
                  passiveIcon={
                    <span className='icon-text ml-2'>
                        <img src="imgs/marketplace/deactive.png" style={{width:"3.5vw"}}></img>
                    </span>
                  }
                
                >
                </Carousel>
            //     <Carousel images={images}
            //     style={{ height: "400px", width: "100%" }}
            //     leftIcon={<div style={{
            //         color: "#ffffff",
            //         fontSize: 80,
            //         padding: 0,
            //         margin: 0
            //     }}
            //     ><AiOutlineLeftCircle /></div>}

            //     rightIcon={<div style={{
            //         color: "#ffffff",
            //         fontSize: 80,
            //         padding: 0,
            //         margin: 0
            //     }}><AiOutlineRightCircle /></div>}

            //     hasThumbnails={this.props.hasThumbnails}
            // />
            
        )
    }
}


