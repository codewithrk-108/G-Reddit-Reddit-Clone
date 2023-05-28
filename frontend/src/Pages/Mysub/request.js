import React from 'react'
import Navbar from './Mysub_nav'
import { Css } from '@mui/icons-material'
import { CssBaseline, Typography, getAccordionDetailsUtilityClass } from '@mui/material'
import Requestcard from './requestcard'
import axios from 'axios'
import { useLocation } from 'react-router-dom'

function Request() {
	// const location = useLocation();
	// console.log(location.state?.id);
	const [props,setprops] = React.useState({});

	async function getData(){
		// console.log(props.id);
		try {
			const res = await axios({
			  method: 'get',
			  url: 'http://localhost:4000/mysubg/requests',
			  headers: {'authorization':`Bearer ${localStorage.getItem('token')}`,'id':`${localStorage.getItem('mysubg')}`}
			})
			setprops({
				...res.data.data._doc,id:localStorage.getItem('mysubg')
			});
			console.log(res.data.data._doc.name);
		  } catch (error) {
			console.log(error)
		  }
	  }

	React.useEffect(()=>{
		getData();
	},[])

	async function alter_req(index,e)
	{
		try {
			const res = await axios({
			  method: 'patch',
			  url: 'http://localhost:4000/mysubg/requests',
			  headers: {'authorization':`Bearer ${localStorage.getItem('token')}`,'id':`${props.id}`},
			  data: {name:props.joining[index],flag:e.target.id}
			})
			await getData();
			if(e.target.id==="accept")
			alert("Accepted");
			else
			alert("Ignored");
			console.log("success");
		  } catch (error) {
			console.log(error)
		  }
	}
	const mapped_req = props.joining?.map((el,ind)=>{
		if(el && el[0].trim()!='')
			return (<Requestcard id={ind} accept={alter_req} reject={alter_req}  name={el[0]} email={el[1]}/>)
	})
  return (
	<div>
		<Navbar name={props.name}/>
		<CssBaseline />
		<Typography variant='h1' component={"h1"} sx={{mb:5,p:5,textAlign:'center',fontWeight:"50import React from 'react'
import Navbar from './Mysub_nav'
import { Css } from '@mui/icons-material'
import { CssBaseline, Typography, getAccordionDetailsUtilityClass } from '@mui/material'
import Requestcard from './requestcard'
import axios from 'axios'
import { useLocation } from 'react-router-dom'

function Request() {
	// const location = useLocation();
	// console.log(location.state?.id);
	const [props,setprops] = React.useState({});

	async function getData(){
		// console.log(props.id);
		try {
			const res = await axios({
			  method: 'get',
			  url: 'http://localhost:4000/mysubg/requests',
			  headers: {'authorization':`Bearer ${localStorage.getItem('token')}`,'id':`${localStorage.getItem('mysubg')}`}
			})
			setprops({
				...res.data.data._doc,id:localStorage.getItem('mysubg')
			});
			console.log(res.data.data._doc.name);
		  } catch (error) {
			console.log(error)
		  }
	  }

	React.useEffect(()=>{
		getData();
	},[])

	async function alter_req(index,e)
	{
		try {
			const res = await axios({
			  method: 'patch',
			  url: 'http://localhost:4000/mysubg/requests',
			  headers: {'authorization':`Bearer ${localStorage.getItem('token')}`,'id':`${props.id}`},
			  data: {name:props.joining[index],flag:e.target.id}
			})
			await getData();
			if(e.target.id==="accept")
			alert("Accepted");
			else
			alert("Ignored");
			console.log("success");
		  } catch (error) {
			console.log(error)
		  }
	}
	const mapped_req = props.joining?.map((el,ind)=>{
		if(el && el[0].trim()!='')
			return (<Requestcard id={ind} accept={alter_req} reject={alter_req}  name={el[0]} email={el[1]}/>)
	})
  return (
	<div>
		<Navbar name={props.name}/>
		<CssBaseline />
		<Typography variant='h1' component={"h1"} sx={{mb:5,p:5,textAlign:'center',fontWeight:"500"}}>
			Joining Requests
		</Typography>
		<div className='requests'>
			{mapped_req}
		</div>
	</div>
  )
}

export default Request
