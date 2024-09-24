import { CheckBox } from '@mui/icons-material'
import { Typography } from '@mui/material'
import React from 'react'

function Tags(props) {
  return (
	<div className='tags'>
		<h2 style={{textAlign:"center"}} onClick={(e)=>props.func(e,props.name)}>{props.name}</h2>
	</div>
  )
}

export default Tags