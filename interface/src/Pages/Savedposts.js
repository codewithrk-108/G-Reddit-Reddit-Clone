import React from 'react'
import axios from 'axios'
import {Grid} from '@mui/material'
import { Button, CssBaseline, Typography } from '@mui/material'
import Navbar from './nav.js'
import { WidthFull } from '@mui/icons-material'
import Post from './sub/post.js'
import Personalcard from './sub/Personalcard.js'
import Errorpage from '../Errorpage.js'

function Savedposts() {

	const [posts,setposts] = React.useState([]);
	const [post_data,setpost_data] = React.useState([]);

	async function getUser()
	{
		try {
			const res = await axios({
			  method: 'get',
			  url: 'http://localhost:4000/profile',
			  headers: {'authorization':`Bearer ${localStorage.getItem('token')}`}
			})
			setposts(res.data.data._doc.saved)
			console.log("success");
		  } catch (error) {
			console.log(error)
		  }
	}

	async function remove(e)
	{
		console.log(e.target.id)
		let new_posts =[];
		for(let i=0;i<posts.length;i++)
		{
			if(i!=e.target.id)
			new_posts.push(posts[i])
		}
		// console.log("bharat",new_posts)
		try {
			const res = await axios({
				method: 'patch',
				url: 'http://localhost:4000/save',
				headers: {
				  authorization: `Bearer ${localStorage.getItem('token')}`,
				},
				data:{data:new_posts,flag:1}
				// data: { owner:owner, follower:localStorage.getItem('email')}
			  })
			  // navigate('/');
			  console.log('success')
			  await getUser();
			//   props.getData()
			} catch (error) {
			  console.log(error)
			}
		  }

	// console.log(posts)

	React.useEffect(()=>{
		getUser()
	},[])

	React.useEffect(()=>{
		// console.log(posts)
		if(posts.length!=0)
		{
			setpost_data(()=>{
				let mapped = posts?.map((obj,index)=>{
					return (
					<>
					<Post {...obj} type='saved'/>
					<Button id={index} onClick={remove} variant='contained' sx={{width:'100px',alignSelf:'center',marginTop:'-25px'}}>REMOVE</Button>
					</>
					)
				})
				return mapped;
			})
		}
		
	},[posts])

	if(localStorage.getItem('token')===null)
	{
		return <Errorpage />
	}

  return (
	  <div className='personal-subg'>
		<CssBaseline />
	  	<Navbar />		
		<div className='sidebar' style={{backgroundColor:'lightgreen',position:'fixed',height:"100vh",minWidth:'35vw',maxWidth:'38vw'}}>
			<Personalcard name={"Saved Posts"} description = {"Your Saved Posts are here..."}/>
		</div>
		<div className='post-contain'>
			{post_data}
		</div>
	</div>
  )
}

export default Savedposts
