import { WrapText } from '@mui/icons-material'
import { Typography,Button } from '@mui/material'
import { Container } from '@mui/system'
import React from 'react'
import axios from 'axios'
import "../../index.css"


function MysubCard(props) {
  return (
	<div className='report-card'>
	  <Typography variant='h5' component="h1" sx={{mt:"1rem",mb:"1rem",fontWeight:"500"}}>
		People : {props.people?.length}
	  </Typography>
	  <Typography variant='h5' component="h1" sx={{mt:"1rem",mb:"1rem",fontWeight:"500"}}>
		Posts : {props.posts?.length}
	  </Typography>
	  <Typography variant='h5' component="h1" sx={{mt:"1rem",mb:"1rem",fontWeight:"500"}}>
		Name : {props.name}
	  </Typography>
	  <Typography variant='h5' component="h1" sx={{mt:"1rem",mb:"1rem",fontWeight:"500"}}>
		Banned Keywords : 
	  </Typography>
	  <textarea id="textconcern" disabled>
	  {props.banned}
	  </textarea>
	  <Typography variant='h5' component="h1" sx={{mt:"1rem",mb:"1rem",fontWeight:"500"}}>
		Description : 
	  </Typography>
	  <textarea disabled>
		{props.description}
	  </textarea>
	  <div className='btn-flex'>
	  <Button variant='contained' sx={{p:"5px",m:"5px",width:"200px"}} name={props.name} onClick={props.deletefunc}>DELETE</Button>
	  <Button variant='contained'sx={{p:"5px",m:"5px",width:"200px"}} name={props.id} onClick={props.openfunc}>OPEN</Button>
	  </div>
	  
	</div>
  )
}

// export default Reportcard
export default MysubCard