import { Avatar, Typography } from '@mui/material'
import React from 'react'
import {Done} from '@mui/icons-material'
import {Close} from '@mui/icons-material'
import man from '../../man.png'

function Requestcard(props) {
	// console.group(props.id)
  return (
	<div className='requestCard'>
		<div className='req-name'>
		<Avatar sx={{backgroundColor:"blue",cursor:"pointer",alignSelf:"center",mr:2}}>
	  	<img src={man} style={{height:"40px",width:"40px"}}></img>
	    </Avatar>
		<div className='top-bottom'>
		<Typography variant='h6' component={"h1"} sx={{alignSelf:"center"}}>
			Name - {props.name}
	  		</Typography>
			  <Typography variant='h6' component={"h1"} sx={{alignSelf:"center"}}>
			E-mail - {props.email}
	  		</Typography>
		</div>
			
		</div>
		

	  <div className='btn'>
	  <Avatar sx={{backgroundColor:"blue",cursor:"pointer",alignSelf:"center",mr:2}}>
	  	<Done id="accept" onClick={(e)=>props.accept(props.id,e)}/>
	  </Avatar>
	  <Avatar sx={{backgroundColor:"blue",cursor:"pointer",alignSelf:"center"}}>
	  	<Close id="reject" onClick={(e)=>props.reject(props.id,e)}/>
	  </Avatar>
	  </div>
	  
	</div>
  )
}

export default Requestcard