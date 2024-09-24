import { Typography } from '@mui/material'
import React from 'react'

function Comment(props) {
  return (
	<div className='comment'>
		<Typography component={'h1'} sx={{fontSize:'25px',padding:'10px'}}>
			Written by : {props.email}
		</Typography>
		<Typography component={'p'} sx={{fontSize:'20px',padding:'10px',width:'600px',overflow:'scroll'}}>
			{props.text}
		</Typography>
	</div>
  )
}

export default Comment