import React from 'react'
import axios from 'axios'
import {Grid} from '@mui/material'
import { Button, CssBaseline, Typography } from '@mui/material'
import Navbar from '../nav.js'
import { WidthFull } from '@mui/icons-material'
import Personalcard from './Personalcard.js'
import ModalDialogue from './ModalDialogue.js'
import Post from './post.js'


function Perssubg(props) {
	let post = [];
	//for modal
	const [open,setopen] = React.useState(0);
	const [post_data,setpost_data] = React.useState([])
	function handleOpen()
	{
		setopen(1);
	}

	function handleClose()
	{
		setopen(0);
	}

	const [data,setdata] = React.useState({})
	async function getData () {
		try {
		  const res = await axios({
			method: 'get',
			url: 'http://localhost:4000/subg/page',
			headers: { authorization: `Bearer ${localStorage.getItem('token')}`,id:localStorage.getItem('openSubg')}
		  })
		  setdata(prev => {
			return res.data.data._doc;
		  })
		  setopen(0)
		} catch (error) {
		  console.log(error)
		}
	  }

	  async function addcomment (text,post,index) {
		// console.log("here am i")
		let roha = post
		// console.log(roha)
		// console.log(roha[props.index])
		;(roha[index]?.comments).push([localStorage.getItem('email'), text])
		try {
		//   console.log("ja")
		  const res = await axios({
			method: 'patch',
			url: 'http://localhost:4000/subg/posts',
			headers: {
			  authorization: `Bearer ${localStorage.getItem('token')}`,
			  id: localStorage.getItem('openSubg')
			},
			data: { data: [...roha], type: 'comment' }
		  })
		  // navigate('/');
		  console.log('success')
		  getData()
		} catch (error) {
		  console.log(error)
		}
	  }

	//   console.log('new',data.posts)

	  React.useEffect(() => {
		getData()
	  }, [])

	  React.useEffect(()=>{
		console.log("hi")
		// console.log(data.posts)
		post = data?.posts?.map((obj,index)=>{
			console.log(obj)
			return (<Post getData = {getData} blocked={data.blocked} post = {data.posts} {...obj} index={index} addcomment={addcomment}/>)
		})
		setpost_data(post)
		// console.log(post)
	  },[data])



	//   console.log(open)

	  async function postData (text) {
		let banned_keywords = data.banned.split(',')
		let text_data = text.split(' ')
		let flag=0;
		for(let i=0;i<banned_keywords.length;i++)
		{
			for(let j=0;j<text_data.length;j++)
			{
				if(banned_keywords[i]===text_data[j])
				{
					flag=1;
					text_data[j]="*"
				}
			}
		}

		let final_text=""
		for(let i=0;i<text_data.length;i++)
		{
			final_text+=" "+text_data[i]
		}

		if(flag===1) alert("Text contains some banned keywords")

		try {
		  const res = await axios({
			method: 'patch',
			url: 'http://localhost:4000/subg/posts',
			headers: { authorization: `Bearer ${localStorage.getItem('token')}`,id:localStorage.getItem('openSubg')},
			data: {data:final_text,name:data.name}
		  })
		  // navigate('/');
		  console.log("success")
		getData();
		} catch (error) {
		  console.log(error)
		}
	  }
	
  return (
	<div className='personal-subg'>
		<CssBaseline />
	  	<Navbar name={data.name}/>
		<div className='sidebar' style={{backgroundColor:'lightgreen',position:'fixed',height:"100vh",minWidth:'35vw',maxWidth:'38vw'}}>
			<Personalcard name={data.name} description = {data.description}/>
		</div>
		<Button variant='contained' sx={{padding:'20px',borderRadius:'50%',position:'fixed',bottom:'3%',right:'3%',height:'80px',width:'80px',fontSize:'30px',zIndex:2}} onClick={()=>setopen(1)}>+</Button>
		<div className='post-contain'>
			{post_data}
		{/* <Post name="Rohan Kumar" email="rohan.kumar@students.iiit.ac.in" text="ggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg"/> */}
		</div>
		{open && <ModalDialogue post={postData} open={handleOpen} close={handleClose}/>}
	</div>
  )
}

export default Perssubg
