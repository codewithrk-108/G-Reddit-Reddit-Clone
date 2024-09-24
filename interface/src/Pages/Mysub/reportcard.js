import { Typography } from '@mui/material'
import React from 'react'
import {Button} from '@mui/material'
import axios from 'axios'
import { DetailsRounded } from '@mui/icons-material'

function Reportcard(props) {
	const [dis,setdis] = React.useState(0)
	

	React.useEffect(()=>{
		// console.log(props.isblocked)
		if(props.ignored===true || props.isblocked?.includes(props.reportedto)===true)
			setdis(1);
	},[])

	// console.log(props.index)

  return (
	<div className='report-card'>
	  {/* <Typography variant='h5' component="h1" sx={{mt:"1rem",mb:"1rem",fontWeight:"500"}}>
		Post ID : 
	  </Typography> */}
	  <Typography variant='h5' component="h1" sx={{mt:"1rem",mb:"1rem",fontWeight:"500"}}>
		Reported By : {props.reportedby}
	  </Typography>
	  <Typography variant='h5' component="h1" sx={{mt:"1rem",mb:"1rem",fontWeight:"500"}}>
		Reported To : {props.reportedto}
	  </Typography>
	  <Typography variant='h5' component="h1" sx={{mt:"1rem",mb:"1rem",fontWeight:"500"}}>
		Concern : 
	  </Typography>
	  <textarea id="textconcern" disabled>
		{props.concern}
	  </textarea>
	  <Typography variant='h5' component="h1" sx={{mt:"1rem",mb:"1rem",fontWeight:"500"}}>
		Text of post reported : 
	  </Typography>
	  <textarea disabled>
		{props.text}
	  </textarea>
	  <div className='btn-flex'>
	  <Button variant="contained" id={props.id} name={"block"} onClick={(e)=>props.block_user(e,props.index)} disabled={dis}>BLOCK USER</Button>
	  <Button variant="contained" id={props.id} name={"delete"} onClick={(e)=>props.delete_post(e,props.index)} disabled={dis}>DELETE POST</Button>
	  <Button variant="contained" id={props.id} name={"ignore"} onClick={(e)=>props.ignore(e,props.index)} disabled={dis}>IGNORE</Button>
	  </div>
	  
	</div>
  )
}

export default Reportcard