
import React, { Component, useEffect, useState } from 'react';
import { Row, Col, Tab, Nav, NavItem } from 'react-bootstrap';
import Fade from 'react-reveal/Fade';
import { callGet, callPost } from "../../services/axios";
import { Link } from 'react-router-dom';
import moment from 'moment'
import {useParams} from 'react-router-dom'



export default function Blog () {

    const [post, setPost] = useState({});
    const { postId } = useParams();
    useEffect(() => {
        callGet('/api/blogsNewById?id='+postId)
		.then(res => {

			if(res.data){
				// set state
				setPost(res.data)
			}

		}).catch(err => {
		  console.log('[Fail]', err);
		})
    },[])

    return (
      <div>

			{/* <Fade>
				<div className="img-box img-box-faqs">
				<Fade bottom delay={200}>
					<div style={{ margin: "10% 12% 10% 12%" }}>
					<div className="col-md-6">
						<div className="d-highlight d-font-black d-text-82">
						Blog post
						</div>

					</div>
					</div>
				</Fade>
				</div>
			</Fade> */}
			
			<div style={{ padding: "2% 12% 2% 12%", backgroundColor:"#fff" }}>
                { post?.content && (
                <div className=" mb-20">
                            
                    
                    <h2 className="text-center text-black text-4xl">{post.title}</h2>
                    <span className="text-black text-left"> {moment(post.createdAt).format('MM/DD/YYYY, h:mm a')}</span>
                    <hr className="text-black"/>
                    <div className="text-black" dangerouslySetInnerHTML={{ __html: JSON.parse(post.content) }}>

                    </div>
                    
                </div>)
                }
                  
			</div>
            
					
      </div>
    )
  }

