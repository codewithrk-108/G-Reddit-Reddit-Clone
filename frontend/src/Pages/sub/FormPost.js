import React from 'react'

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import {Toolbar}import React from 'react'

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import {Toolbar} from '@mui/material'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined.js';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AppBar } from '@mui/material';
import { width } from '@mui/system';
import axios from 'axios'
import { Copyright } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

function FormPost(props) {
	const [on,seton] = React.useState(0)
	const [text,settext] = React.useState()
	function updateVal(e)
	{
		// console.log(e.target.value)
		settext(e.target.value)
		if(text?.length!=0 && on===0)
		{
			seton(1)
		}
		// console.log(text?.length)
	}

	if(text?.length===0 && on===1)
	{
			seton(0)
	}

	function handleSubmit(e)
	{
		e.preventDefault();
		if(props.name==="Post")
		props.post(text);
		else
		// console.log("comment")
		props.comment(text,props.post,props.index)
	}
  return (
	<div>
		<Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1,padding:'50px',borderRadius:'1rem'}}>
              <Typography variant='h2' component='h1' sx={{textAlign:'center',fontWeight:700}}>
				Add {props.name} Text
			  </Typography>
              <textarea value={text} style={{fontSize:'25px',marginTop:'15px',display:'block',height:'300px',width:'500px',border:0,backgroundColor:'lightyellow'}} onChange={updateVal} placeholder='Enter text' fullWidth>
			  </textarea>
              {/* <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              /> */}
              {on ? <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                ADD {props.name}
              </Button> : <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              disabled>
                ADD {props.name}
              </Button>}
            </Box>
	</div>
  )
}

export default FormPost
