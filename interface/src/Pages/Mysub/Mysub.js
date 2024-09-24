import React from 'react'
import Navbar from '../nav'
import Card from './MysubCard.js'
import {Grid} from '@mui/material'
import { Button, CssBaseline, Typography } from '@mui/material'
import {Add, EmojiObjectsTwoTone} from '@mui/icons-material'
import { Navigate, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Errorpage from '../../Errorpage'

function Mysub() {
	const navigate = useNavigate();
	var render_array=[];
	const [data,setdata] = React.useState([]);
	// console.log("hi")
	async function getData(){
		try {
			const res = await axios({
			  method: 'get',
			  url: 'http://localhost:4000/mysubg',
			  headers: {'authorization':`Bearer ${localStorage.getItem('token')}`}
			})
			setdata((prev)=>{
				var arr=[]
				for(let key in res.data.data)
				{
					arr.push(res.data.data[key]);
				}
				return arr;
			});
		  } catch (error) {
			console.log(error)
		  }
	  }
	React.useEffect(()=>{
		
		  getData();
	},[])

	async function deleteData(e){
		console.dir(e.target);
		try {
			const resi = await axios({
			  method: 'delete',
			  url: 'http://localhost:4000/mysubg',
			  headers: {'authorization':`Bearer ${localStorage.getItem('token')}`},
			  data: {name:e.target?.name}
			})


			await getData();
		  } catch (error) {
			console.log(error)
		  }
	  }

	  function openData(e)
	  {
		localStorage.setItem('mysubg',e.target?.name);
		navigate('/mysubg/users');
	  }

	// console.log(data);
	data.forEach((object)=>{
		render_array.push((
		<Grid item>
			<Card id={object._id} openfunc={openData} deletefunc={deleteData} name={object.name} description={object.description} banned={object.banned} people={object.people} posts={object.posts} key={object.name}/>
		</Grid>));
	});
	if(localStorage.getItem('token')===null)
	{
		return <Errorpage />
	}

  return (
	
	<div className='mysub' style={{backgroundColor:"aliceblue",minHeight:"100vh"}}>
	  <CssBaseline />
	  <Navbar />

	  <Button variant='contained' onClick={()=>{
		navigate('/mysubform')}} sx={{display:"flex",margin:"auto",mt:10,borderRadius:"20px"}}>
		<Typography variant='h4' sx={{display:"block"}}>ADD NEW SUB GREDDIT</Typography>
		<Add sx={{display:"block"}}/>
	  </Button>

	  <Grid container spacing={12} sx={{alignContent:'center',justifyContent:'space-around'}}>
		{render_array}
	  </Grid>
	</div>
  )
}

export default Mysub