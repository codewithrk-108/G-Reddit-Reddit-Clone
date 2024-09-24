import { WrapText } from '@mui/icons-material'
import { Typography,Button } from '@mui/material'
import { Container } from '@mui/system'
import React from 'react'
import axios from 'axios'
import "../../index.css"
import {Link} from 'react-router-dom'
import { useNavigate } from 'react-router-dom'



function MysubCard(props) {
	// console.log(props.left)
	const navigate = useNavigate();

	function getPersonalData(id)
	{
		localStorage.setItem('openSubg',String(id));  
		navigate('/posts')
	}

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
	  <textarea value={props.banned} id="textconcern" disabled>
	  
	  </textarea>
	  <Typography variant='h5' component="h1" sx={{mt:"1rem",mb:"1rem",fontWeight:"500"}}>
		Description : 
	  </Typography>
	  <textarea value={props.description} disabled>
		
	  </textarea>
	  <div className='btn-flex'>
		{
			props.left ? <Button variant='contained' sx={{p:"5px",m:"5px",width:"200px"}} name={props.id} onClick={props.leavefunc} disabled>LEAVE</Button> : <Button variant='contained' sx={{p:"5px",m:"5px",width:"200px"}} name={props.id} onClick={props.leavefunc}>LEAVE</Button>
		}
	  {
		(props.requested || props.left || props.joined) ? <Button variant='contained'sx={{p:"5px",m:"5px",width:"200px"}} name={props.id} onClick={props.joinfunc} disabled>JOIN</Button> : <Button variant='contained'sx={{p:"5px",m:"5px",width:"200px"}} name={props.id} onClick={props.joinfunc}>JOIN</Button>
	  }	  
	  {
	  	(!props.joined) ? <Button variant='contained' sx={{p:"5px",m:"5px",width:"200px"}} onClick={()=>getPersonalData(props.id)} disabled>OPEN</Button> : <Button variant='contained' sx={{p:"5px",m:"5px",width:"200px"}} onClick={()=>getPersonalData(props.id)}>OPEN</Button>
	  }
	  </div>
	  
	</div>
  )
}

// export default Reportcard
export default MysubCard