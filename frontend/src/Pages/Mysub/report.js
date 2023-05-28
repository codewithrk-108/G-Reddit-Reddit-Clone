import React from 'react'
import Navbar from './Mysub_nav'
import { CssBaseline, Typography } from '@mui/material'
import Reportcard from './reportcard'
import axios from 'axios'
import { FlashOnRounded } from '@mui/icons-material'

function Report() {

	const [props,setprops] = React.useState([]);
	const [props_react,setprops_react] = React.useState([])
	const [blocked_arr,setblocked_arr] = React.useState([])
	const [post_arr,setpost_arr] = React.useState([])
	async function getData(){
		try {
			const res = await axios({
			  method: 'get',
			  url: 'http://localhost:4000/mysubg/reports',
			  headers: {'authorization':`Bearer ${localStorage.getItem('token')}`,'id':`${localStorage.getItem('mysubg')}`}
			})
			setblocked_arr(res.data.data.blocked)
			setpost_arr(res.data.data.posts)
			// console.log(res.data.data)
			setprops(res.data.data.reports);
		  } catch (error) {
			console.log(error)
		  }
	  }

	  async function ignore(e,ind)
	{
		// console.log(e.target.disabled)
		if(e.target.disabled===false)
		{
			let new_report = []
			props.forEach((obj,index)=>{
				if(index===ind)
				{
					new_report.push({...obj,ignored:true})
				}
				else
				{
					new_report.push(obj)
				}
			})
			// console.log("hello")
			try {
				const res = await axios({
					method: 'patch',
					url: 'http://localhost:4000/ignore',
					headers: {
					  authorization: `Bearer ${localStorage.getItem('token')}`
					},
					data: { data:new_report,id:localStorage.getItem('mysubg')}
				  })
				  // navigate('/');
				  console.log('success')
					getData()
				//   props.getData()
				} catch (error) {
				  console.log(error)
				}
			// setdis(1);
		}
	}

	let time=3;
	let id,claus;
	async function block_user(e,ind)
	{
		console.log(id)
		try {

			if(e.target.innerText[0]==="C")
			{
				console.log(id,claus)
				window.clearInterval(id);
				window.clearTimeout(claus);
				e.target.innerText = "Block User"
				alert('Aborted')
			}
			else
			{
				time=3;
				id = setInterval(()=>{
					e.target.innerText = "Cancel "+time
					time--;
					if(time===0)
					{
						window.clearInterval(id)
					}
				},1000)
				claus = setTimeout(async ()=>{
					const res = await axios({
						method: 'patch',
						url: 'http://localhost:4000/mysubg/bnbpage',
						headers: {'authorization':`Bearer ${localStorage.getItem('token')}`,'id':localStorage.getItem('mysubg')},
						data: {remove:props[ind].reportedto,flag:"unblock"}
					  })
					  await getData();
					  console.log("success");
				},4000)
			}
		}
		catch (error) {
			console.log(error)
		  }
		
	}

	async function delete_post(e,ind)
	{
		let new_post = post_arr?.filter((obj)=>{
			if(props[ind].text === obj.text)
import React from 'react'
import Navbar from './Mysub_nav'
import { CssBaseline, Typography } from '@mui/material'
import Reportcard from './reportcard'
import axios from 'axios'
import { FlashOnRounded } from '@mui/icons-material'

function Report() {

	const [props,setprops] = React.useState([]);
	const [props_react,setprops_react] = React.useState([])
	const [blocked_arr,setblocked_arr] = React.useState([])
	const [post_arr,setpost_arr] = React.useState([])
	async function getData(){
		try {
			const res = await axios({
			  method: 'get',
			  url: 'http://localhost:4000/mysubg/reports',
			  headers: {'authorization':`Bearer ${localStorage.getItem('token')}`,'id':`${localStorage.getItem('mysubg')}`}
			})
			setblocked_arr(res.data.data.blocked)
			setpost_arr(res.data.data.posts)
			// console.log(res.data.data)
			setprops(res.data.data.reports);
		  } catch (error) {
			console.log(error)
		  }
	  }

	  async function ignore(e,ind)
	{
		// console.log(e.target.disabled)
		if(e.target.disabled===false)
		{
			let new_report = []
			props.forEach((obj,index)=>{
				if(index===ind)
				{
					new_report.push({...obj,ignored:true})
				}
				else
				{
					new_report.push(obj)
				}
			})
			// console.log("hello")
			try {
				const res = await axios({
					method: 'patch',
					url: 'http://localhost:4000/ignore',
					headers: {
					  authorization: `Bearer ${localStorage.getItem('token')}`
					},
					data: { data:new_report,id:localStorage.getItem('mysubg')}
				  })
				  // navigate('/');
				  console.log('success')
					getData()
				//   props.getData()
				} catch (error) {
				  console.log(error)
				}
			// setdis(1);
		}
	}

	let time=3;
	let id,claus;
	async function block_user(e,ind)
	{
		console.log(id)
		try {

			if(e.target.innerText[0]==="C")
			{
				console.log(id,claus)
				window.clearInterval(id);
				window.clearTimeout(claus);
				e.target.innerText = "Block User"
				alert('Aborted')
			}
			else
			{
				time=3;
				id = setInterval(()=>{
					e.target.innerText = "Cancel "+time
					time--;
					if(time===0)
					{
						window.clearInterval(id)
					}
				},1000)
				claus = setTimeout(async ()=>{
					const res = await axios({
						method: 'patch',
						url: 'http://localhost:4000/mysubg/bnbpage',
						headers: {'authorization':`Bearer ${localStorage.getItem('token')}`,'id':localStorage.getItem('mysubg')},
						data: {remove:props[ind].reportedto,flag:"unblock"}
					  })
					  await getData();
					  console.log("success");
				},4000)
			}
		}
		catch (error) {
			console.log(error)
		  }
		
	}

	async function delete_post(e,ind)
	{
		let new_post = post_arr?.filter((obj)=>{
			if(props[ind].text === obj.text)
			{
				if(props[ind].reportedto === obj.posted_by)
				{
					return false;
				}
			}
			return true;
		})
		try {
				const res = await axios({
				method: 'patch',
				url: 'http://localhost:4000/deletepost',
				headers: {
				  authorization: `Bearer ${localStorage.getItem('token')}`
				},
				data: { data:new_post,id:localStorage.getItem('mysubg')}
			  })
			  // navigate('/');
			  console.log('success')
				getData()
			//   props.getData()
			} catch (error) {
			  console.log(error)
			}
	}

	

	//   console.log(props);

	  React.useEffect(()=>{
		getData();
	  },[])

	  React.useEffect(()=>{
		// console.log(blocked_arr)
		setprops_react(props?.map((obj,index)=>{
			return <Reportcard delete_post={delete_post} isblocked={blocked_arr} block_user={block_user} mysubid={localStorage.getItem('mysubg')} {...obj} ignore={ignore} index={index}/>
		}))
	  },[props])



  return (
	<>
		<Navbar name={props.name}/>
		<CssBaseline />
		<Typography variant='h2' component={"h1"} sx={{textAlign:"center",mt:"1rem",fontWeight:"700"}}>
			Reported Posts
		</Typography>
		{props_react}
		{/* <Reportcard postid="" reportedto="" reportedby="" concern="" text=""/> */}
	</>
  )
}

export default Report
