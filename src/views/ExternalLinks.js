import React, {Component} from "react";
import { useSelector } from "react-redux";


    let linkImages = [
    {name: 'twitter', icon : '/imgs/footer/1.png'},
    {name: 'linkedin', icon : '/imgs/footer/2.png'},
    {name: 'youtube', icon : '/imgs/footer/3.png'},
    {name: 'weibo', icon : '/imgs/footer/4.png'},
    {name: 'rarible', icon : '/imgs/footer/5.png'},
    {name: 'weibo', icon : '/imgs/footer/6.png'},
    {name: 'discord', icon : '/imgs/footer/7.png'},
];

export default function ExternalLinks() {
    

    const sitesettings = useSelector(state => state.sitesettings.sitesettingsData);
    
    const setting = sitesettings?.[0];

        return (
            <div style={{width: "100%"}} className="d-flex justify-content-end" >
                {
                    linkImages.map((item, i) => {
                        return <div key={i} style={{borderRadius:"50%", backgroundColor:"#b69a8f", width:36, height:36 }} className="d-flex align-items-center justify-center mr-4">
                            <a href={setting?.[item.name] || '#'} key={i} ><img src={item.icon} style={{width:24}}alt={'footer'}/></a></div>
                    })
                }
            </div>
        )
}
