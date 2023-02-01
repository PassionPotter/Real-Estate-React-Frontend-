import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { Button, Layout, Notification } from "element-react"
import Fade from "react-reveal/Fade"
import { Table as TableBs } from 'react-bootstrap';
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { actionBlogList } from "../../redux/actions/blog";
import { callGet } from "../../services/axios";

const AdminBlog = props => {

  let history =  useHistory();
  // const blogs = useSelector(state => state.blog.blogData);

  // console.log(blogs)

  // useEffect(() => {
  //   dispatch(actionBlogList());
  // }, []);

  const [posts, setPosts] = useState([]);
  useEffect(() => {
    getPosts();
  },[])

  const getPosts = () => {
      callGet('/api/blogsNew')
    .then(res => {

      if(res.data){
        // set state
        setPosts(res.data)
      }

    }).catch(err => {
      console.log('[Fail]', err);
    })
  }

  const editPost = (id, content, title) => {
    history.push({
      pathname: '/admin/blogs/create',
      state: { id, content, title }
    });
  }

  const deletePost = (id) => {
    callGet(`api/admin/blogsNew/del?id=${id}`)
    .then(res => {
      getPosts();
      Notification.success({
        title: 'Success',
        message: 'Post delete Success!',
        type: 'success',
      });
    }).catch(err =>{
      Notification.error({
        title: 'Failed',
        message: 'Post delete falied. Please try again.',
        type: 'Warning',
      })
    })
  }

  return (
    <div className="d-flex flex-column justify-content-center align-items-center overflow-hidden">
      <div style={{ width: '80%' }}>
        <Fade bottom delay={200}>
          <h1 style={{ textAlign: "center" }} className='d-font-bold d-text-90 d-white'>Blogs</h1>
          <div className="d-flex">
            <Link to="/admin/blogs/create" className="ms-auto">
              <Button type="outlined">New Blog</Button>
            </Link>
          </div>
          <div className="login-ruleForm mt-4" labelPosition={"top"} style={{ border: "2px solid #03ffa4", borderRadius: "10px 10px 0 0" }}>
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
                    <th className="bg-secondary" style={{ minWidth: '80%' }}>Title</th>
                    <th className="bg-secondary" style={{ minWidth: '80%' }}>Content</th>
                    <th className="bg-secondary" style={{ minWidth: 130 }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    posts.map((item, key) =>
                      <tr key={key}>
                        <td>{key + 1}</td>
                        <td className="h-full align-middle border-l-2 border-gray-300 border-opacity-20">{item.title}</td>
                        <td className="text-white overflow-auto h-72" dangerouslySetInnerHTML={{ __html: JSON.parse(item.content) }}></td>
                        <td className="h-full align-middle border-l-2 border-gray-300 border-opacity-20">
                          <Button onClick={()=>editPost(item.id, item.content, item.title)} className="top-24 right-10 w-40 h-10 text-gray-50 pt-2">Edit</Button>
                          <Button onClick={()=>deletePost(item.id)} className="top-24 right-10 w-40 h-10 text-gray-50 pt-2" style={{ marginLeft: '0px' }}>Delete</Button>
                        </td>
                      </tr>
                    )
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

export default AdminBlog;