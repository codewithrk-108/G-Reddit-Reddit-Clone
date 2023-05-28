import React from 'react'
import Navbar from './Mysub_nav'
import { Button, CssBaseline, Grid, Typography } from '@mui/material'
import { Container } from '@mui/system'
// import { useLocation } from 'react-router-dom';
import axios from 'axios'

function Mysub_tab() {

	// const location = useLocation();
	// console.log(location.state.name);

	const [props,setprops] = React.useState({
		blocked:[],
		unblocked:[],
		id:localStorage.getItem('mysubg')
	})

	async function getData(){
		console.log(props.id);
		try {
			const res = await axios({
			  method: 'get',
			  url: 'http://localhost:4000/mysubg/bnbpage',
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

	  async function Alter_data(e)
	  {
		// console.log(e.target.id);
		// console.log(props.id);
		try {
			const res = await axios({
			  method: 'patch',
			  url: 'http://localhost:4000/mysubg/bnbpage',
			 import React from 'react'
import Navbar from './Mysub_nav'
import { Button, CssBaseline, Grid, Typography } from '@mui/material'
import { Container } from '@mui/system'
// import { useLocation } from 'react-router-dom';
import axios from 'axios'

function Mysub_tab() {

	// const location = useLocation();
	// console.log(location.state.name);

	const [props,setprops] = React.useState({
		blocked:[],
		unblocked:[],
		id:localStorage.getItem('mysubg')
	})

	async function getData(){
		console.log(props.id);
		try {
			const res = await axios({
			  method: 'get',
			  url: 'http://localhost:4000/mysubg/bnbpage',
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

	  async function Alter_data(e)
	  {
		// console.log(e.target.id);
		// console.log(props.id);
		try {
			const res = await axios({
			  method: 'patch',
			  url: 'http://localhost:4000/mysubg/bnbpage',
			  headers: {'authorization':`Bearer ${localStorage.getItem('token')}`,'id':`${props.id}`},
			  data: {remove:e.target.id,flag:e.target.name}
			})
			await getData();
			console.log("success");
		  } catch (error) {
			console.log(error)
		  }
	  } 
	
	const mapped_unblocked = props.unblocked?.map((el)=>{
		return (
			<div className='usercard'>
				<Typography variant='h3' component={"h1"} sx={{m:"10px",textAlign:'center',fontSize:"20px"}}>
				{el}
				</Typography>
				<Button variant='contained' onClick={Alter_data} id={el} name="unblock">block</Button>
			</div>
			
		)
	});

	const mapped_blocked = props.blocked?.map((el)=>{
		return (
			<div className='usercard'>
				<Typography variant='h3' component={"h1"} sx={{m:"10px",textAlign:'center',fontSize:"20px"}}>
				{el}
				</Typography>
				<Button variant='contained' onClick={Alter_data} id={el} name="block">unblock</Button>
			</div>
			
		)
	});

  return (
	<div className='tab-mysub'>
		<Navbar name={props.name} />
		<CssBaseline />
		<div className='bunb'>
			<div className='b'>
				<Typography variant='h3' component={"h1"} sx={{m:5,textAlign:'center',fontWeight:"700"}}>
					Unblocked Users
				</Typography>
				<div className='bi'>
					{mapped_unblocked}
				</div>
			</div>
			<div className='unb'>
			<Typography variant='h3' component={"h1"} sx={{m:5,textAlign:'center',fontWeight:"700"}}>
					Blocked Users
			</Typography>	
			<div className='unbi'>
			{mapped_blocked}
			</div>	
			</div>
		</div>
	</div>
  )
}

export default Mysub_tab
