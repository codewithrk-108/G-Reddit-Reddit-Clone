import React from 'react'
import { Dialog } from '@mui/material'
import FormPost from './FormPost'

function ModalDialogue(props) {
  return (
	<div className='modal'>
		<Dialog open={props.open} onClose={props.close} >
			<FormPost name={"Post"} post = {props.post}/>
		</Dialog>
	</div>
  )
}

export default ModalDialogue