
import React, { Component, useEffect, useState } from 'react';
import { Row, Col, Tab, Nav, NavItem } from 'react-bootstrap';
import Fade from 'react-reveal/Fade';
import ContentEditable from 'react-contenteditable'
import { Button, Notification } from 'element-react';
import { callGet, callPost } from "../../services/axios";
import { Link } from 'react-router-dom';
import moment from 'moment'
import { useTranslation } from 'react-i18next';



export default function Blog () {
	const { t } = useTranslation();
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        callGet('/api/blogsNew')
		.then(res => {

			if(res.data){
				// set state
				setPosts(res.data)
			}

		}).catch(err => {
		  console.log('[Fail]', err);
		})
    },[])

    return (
      <div>

			<Fade>
				<div className="img-box img-box-faqs">
				<Fade bottom delay={200}>
					<div style={{ margin: "10% 12% 10% 12%" }}>
					<div className="col-md-6">
						<div className="d-highlight d-font-black d-text-82">
						{t("blog.Blog posts")}
						</div>

					</div>
					</div>
				</Fade>
				</div>
			</Fade>
			
			<div style={{ padding: "2% 12% 2% 12%", backgroundColor:"#fff" }}>
                {posts.map((data, key)=>{
                    return (
                        <div className=" mb-20">
                            
                            <div className="">
							<Link to={`/blog-post/${data.id}`} className="text-black text-3xl">
                            <h2 className="text-3xl underline  mb-3">{data.title}</h2>
                            </Link>
							</div>
                            <span className="text-black"> {moment(data.createdAt).format('MM/DD/YYYY, h:mm a')}</span>
                            <hr className="text-black"/>
                        </div>)
                })}
                  
			</div>
            
					
      </div>
    )
  }

