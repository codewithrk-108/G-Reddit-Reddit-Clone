import { Avatar, Typography } from '@mui/material'
import React from 'react'

import man from '../../man.png'

function Personalcard(props) {
  return (
	<div className='card-personal' style={{margin:'auto'}}>
	  <Avatar sx={{margin:'auto',marginTop:'60%',height:'100px',width:'100px'}} src={man}></Avatar>
	  <Typography varimport { Avatar, Typography } from '@mui/material'
import React from 'react'

import man from '../../man.png'

function Personalcard(props) {
  return (
	<div className='card-personal' style={{margin:'auto'}}>
	  <Avatar sx={{margin:'auto',marginTop:'60%',height:'100px',width:'100px'}} src={man}></Avatar>
	  <Typography variant='h3' component='h1' sx={{textAlign:'center',fontSize:'40px',padding:'1rem'}}>
		{props.name ? props.name : "Mera Blog"}
	  </Typography>
	  <Typography variant='h3' component='h1' sx={{textAlign :'justify',fontSize:'25px',padding:'1rem'}}>
		{props.description ? props.description : "Ham log Belog banane ka karya karte hain"}
	  </Typography>
	</div>
  )
}

export default Personalcard
