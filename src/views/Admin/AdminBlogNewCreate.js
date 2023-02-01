import React, {useState, useRef, useEffect} from 'react';
import JoditEditor from "jodit-react";
import { Button, Input, Notification } from 'element-react';
import { callPost } from '../../services/axios';
import { Label } from 'reactstrap';

export default function BlogNewCreate (props) {
	const editor = useRef(null)
	const [content, setContent] = useState('')
  const [title, setTitle] = useState('')
  const [id, setId] = useState(null)
	
	const config = {
		readonly: false // all options from https://xdsoft.net/jodit/doc/
	}

  useEffect(()=>{
    if(props.id && props.content){
      setId(id);
      setContent(JSON.parse(props.content))
      setTitle(props.title)
    }
    else if(props?.location?.state?.id){
      const {id, content, title} = props?.location?.state
      setId(id);
      setContent(JSON.parse(content))
      setTitle(title)
    }
    // alert(JSON.stringify(props.location.state))
  },[])
	
  const saveChanges = () => {
    const token = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user'))['accessToken'] : null
    let url = '/api/admin/blogsNew/create';
    let data = {content: JSON.stringify(content), title};
    if(id){
      url = '/api/admin/blogsNew/update'
      data['id'] = id;
    }
    callPost(url, data, token)
    .then(res => {
      if(res.data?.id){
        setId(res.data?.id);
      }
        Notification.success({
            title: 'Success',
            message: 'Blog post update success!',
            type: 'success',
          })
    }).catch(err => {
      console.log('[Fail]', err);
      Notification.error({
        title: 'Failed',
        message: 'something went wrong!',
        type: 'warning',
      })
    })
}
console.log(content, id, 'dddddddddddddddddddddddd')
	return (
    <div className="bg-black text-white">
      <h1 className=" text-3xl">Post title</h1>
      <Input  value={title} placeholder="Post title" onChange={(val)=>setTitle(val)}/>
      <h1 className="mt-5 text-3xl">Details</h1>
            <JoditEditor
            	ref={editor}
                value={content}
                config={config}
		tabIndex={1} // tabIndex of textarea
		onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                onChange={newContent => {}}
            />
            <Button onClick={saveChanges} className="fixed top-5 right-10 w-40 h-10 text-gray-50 pt-2">Save changes</Button>
            </div>
        );
}