import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { FlareSharp, Pets } from '@mui/icons-material';

import {Link} from 'react-router-dom'

export default function ButtonAppBar(props) {

	function clear_func()
	{
		localStorage.clear();
	}

  return (
	<AppBar position="sticky" sx={{backgroundColor:"black",position:'fixed'}}>
	<Toolbar>
	  <Pets sx={{ mr: 2 }} />
	  <Typography xs="false" variant="h6" color="inherit" sx={{flexGrow:1}}>
		{props.name ? props.name : "Greddit"}
	  </Typography>

	  <Linimport * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { FlareSharp, Pets } from '@mui/icons-material';

import {Link} from 'react-router-dom'

export default function ButtonAppBar(props) {

	function clear_func()
	{
		localStorage.clear();
	}

  return (
	<AppBar position="sticky" sx={{backgroundColor:"black",position:'fixed'}}>
	<Toolbar>
	  <Pets sx={{ mr: 2 }} />
	  <Typography xs="false" variant="h6" color="inherit" sx={{flexGrow:1}}>
		{props.name ? props.name : "Greddit"}
	  </Typography>

	  <Link to='/profile' style={{textDecoration:"none",color:"white"}}>
		<Button   color="inherit">Profile</Button>
	  </Link>
	  <Link to='/mysubg' style={{textDecoration:"none",color:"white"}}>
		<Button   color="inherit">My SubGreddit</Button>
	  </Link>
	  <Link to='/subg' style={{textDecoration:"none",color:"white"}}>
		<Button   color="inherit">SubGreddit</Button>
	  </Link>
	  <Link to='/savedposts' style={{textDecoration:"none",color:"white"}}>
		<Button  color="inherit">Posts</Button>
	  </Link>
	  <Link to='/' style={{textDecoration:"none",color:"white"}}>
			{localStorage.getItem('token') && localStorage.getItem('email') ? <Button  color="inherit" onClick={clear_func}>LOGOUT</Button> : <Button color='inherit'>LOGIN</Button>}
	  </Link>
	</Toolbar>
  </AppBar>
    //  </Box>
  );
}
