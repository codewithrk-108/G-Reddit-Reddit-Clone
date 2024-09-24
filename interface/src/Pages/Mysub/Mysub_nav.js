import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { FlareSharp, Pets } from '@mui/icons-material';
import { Link } from 'react-router-dom';
let store ;

export default function ButtonAppBar(props) {
  return (
	<AppBar position="sticky" sx={{backgroundColor:"black"}}>
	<Toolbar>
	  <Pets sx={{ mr: 2 }} />
	  <Typography xs="false" variant="h6" color="inherit" sx={{flexGrow:1}}>
	  {props.name}
	  </Typography>
	  <Link to="/mysubg/users" style={{textDecoration:"none",color:"white"}}>
	<Button   color="inherit">USERS</Button>
	</Link>
	<Link to="/mysubg/joining" style={{textDecoration:"none",color:"white"}}>
	<Button  color="inherit">REQUESTS</Button>
	</Link>
	<Button   color="inherit">Stats</Button>
	<Link to="/mysubg/reports" style={{textDecoration:"none",color:"white"}}>
	<Button  color="inherit">Report</Button>
	</Link>
	</Toolbar>
  </AppBar>
  );
}
