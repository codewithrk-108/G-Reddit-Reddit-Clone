import * as React from 'react';
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
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AppBar } from '@mui/material';
import Navbar from './nav.js'
import { width } from '@mui/system';
import axios from 'axios'
import "../index.css"
import { useNavigate } from 'react-router-dom';


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      Kumar & Sons {' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


async function Send_data (loginData,props,navigate) {
	try {
	  const res = await axios({
		method: 'post',
		url: 'http://localhost:4000/',
		data: {...loginData}
	  })
	  console.log("free");
	  alert("Succesfully signed in!");
	//   console.log(res.data.token);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('email', loginData.email);
	  navigate('/profile');
	} catch (error) {
		console.log("cool");
		alert("Try Again !!!");
	  console.log(error)
	}
}

const theme = createTheme();

export default function SignInSide(props) {

	

	const navigate = useNavigate();
	//for the button disabled
	const [on,seton] = React.useState(0);

	//for the login form

	const [loginData,setlogin]=React.useState({
		email:"",
		password:""
	});
	console.log(loginData);


	//for login form
	function updateVal(e)
	{
		setlogin((prev)=>({
			...prev,[e.target.name]:e.target.value
		}))
	}



  const handleSubmit = (event) => {
    event.preventDefault();
    Send_data(loginData,props,navigate);
  };

  React.useEffect(() => {
	let flag = 0
	for (let key in loginData) {
	  if (loginData[key].length === 0) {
		flag = 1
	  }
	}
	if (!flag && on == 0) {
	  seton(prev => !prev)
	} else if (flag === 1 && on == true) {
	  seton(prev => !prev)
	}
  }, [loginData])

  return (
    <ThemeProvider theme={theme}>
	<Navbar />
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://wallpapercave.com/wp/wp6961868.jpg)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} sx={{backgroundColor:"lightpink"}} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 3, bgcolor: 'Green' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5" sx={{fontFamily:"sans-serif"}}>
              Sign in
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
				onChange={updateVal}
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
				onChange={updateVal}
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
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
                Sign In
              </Button> : <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              disabled>
                Sign In
              </Button>}
              <Grid container sx={{alignContent:"center",justifyContent:"center"}}>
                <Grid item>
                  <Link onClick={props.toggle} variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}