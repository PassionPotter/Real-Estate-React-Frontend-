import React, { Component } from 'react'
import GoogleMapReact from 'google-map-react'
import {BsBuilding} from "react-icons/bs";
import { useSelector } from 'react-redux';

const AnyReactComponent = ({ text }) => (<div >
                                            <BsBuilding color="white" size="30px"/>
                                            <div style={{position:"relative","top":"-60px",left:"0px",color:"white",width:"50px"}}><b>{text}</b></div>
                                        </div>);

function SimpleMap(props) {
    // eslint-disable-next-line

    const credentials = useSelector(state => state.credential.credentialData);
    

    const handleApiLoaded = (map) => {
        if(props.lat && props.long)
            map.setCenter({lat: props.lat,lng:props.long});
    }
    
        return credentials?.[0]?.googleMapsApiKey? (
            // Important! Always set the container height explicitly
            <div style={{ height: "100%", width: "100%" }}>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: credentials?.[0]?.googleMapsApiKey}}
                    defaultCenter={props.center}
                    defaultZoom={props.zoom}
                    yesIWantToUseGoogleMapApiInternals={true}
                    onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
                >
                    {
                    props.lat?(<AnyReactComponent
                        lat={props.lat}
                        lng={props.long}
                        text={props.title}
                    />):null
                }
                    
                </GoogleMapReact>
            </div>
        ):null;
    
}
SimpleMap.defaultProps = {
    center: {
        lat: 59.95,
        lng: 30.33
    },
    zoom: 20
};

export default SimpleMap