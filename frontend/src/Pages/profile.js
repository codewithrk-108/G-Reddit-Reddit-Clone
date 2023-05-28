import * as React from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined.js'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import Navbar from './nav.js'
import {Delete} from '@mui/icons-material'
import axios from 'axios'
import man from '../man.png'
import Errorpage from '../Errorpage.js'

function Copyright (props) {
  return (
    <Typography
      variant='body2'
      color='text.secondary'
      align='center'
      {...props}
    >
      {'Copyright © '}
      Kumar & Sons {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

const theme = createTheme()

export default function Profile (props) {

	//for show following and show followers
	const [showFoers,setFol] = React.useState(0);
	const [showFoing,setFoling] = React.useState(0);

	function showFollowers()
	{
		setFol(prev=>!prev);
	}

	function showFollowing()
	{
		setFoling(prev=>!prev);
	}

  //for the signup button disbaled
  const [on, seton] = React.useState(0)
  const [on1, seton1] = React.useState(0)

  //creating an object for form data
  const [formData, setForm] = Reaimport * as React from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined.js'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import Navbar from './nav.js'
import {Delete} from '@mui/icons-material'
import axios from 'axios'
import man from '../man.png'
import Errorpage from '../Errorpage.js'

function Copyright (props) {
  return (
    <Typography
      variant='body2'
      color='text.secondary'
      align='center'
      {...props}
    >
      {'Copyright © '}
      Kumar & Sons {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

const theme = createTheme()

export default function Profile (props) {

	//for show following and show followers
	const [showFoers,setFol] = React.useState(0);
	const [showFoing,setFoling] = React.useState(0);

	function showFollowers()
	{
		setFol(prev=>!prev);
	}

	function showFollowing()
	{
		setFoling(prev=>!prev);
	}

  //for the signup button disbaled
  const [on, seton] = React.useState(0)
  const [on1, seton1] = React.useState(0)

  //creating an object for form data
  const [formData, setForm] = React.useState({
    fname: ' ',
    lname: ' ',
    email: ' ',
    password: ' ',
    contact: ' ',
    age: ' ',
    username: ' ',
	followers:[],
	following:[]
  })

  async function getData(){
	try {
		const res = await axios({
		  method: 'get',
		  url: 'http://localhost:4000/profile',
		  headers: {'authorization':`Bearer ${localStorage.getItem('token')}`}
		})
		setForm({...res.data.data._doc,...res.data.follow._doc});
		console.log("success");
	  } catch (error) {
		console.log(error)
	  }
  }

  //   for checking the validity of form
  React.useEffect(() => {
    let flag = 0
    for (let key in formData) {
		console.log(formData[key])
      if (formData[key]?.length === 0 && typeof formData[key] === String) {
        flag = 1
		break;
      }
    }
	// console.log(String(formData['contact'])?.length)
    if (String(formData['contact'])?.length != 10) {
      flag = 1
    }
    if (formData['age'] < 18) flag = 1
    if (!flag && on == 0) {
      seton(prev => !prev);
    } else if (flag === 1 && on == true) {
      seton(prev => !prev);
    }
  }, [formData]);

  //for updating the value in the input feild
  function updateVal (e) {
    setForm(prev => {
      return {
        ...prev,
        [e.target.name]: e.target.value
      }
    })
  }

  //backend
  const handleSubmit = event => {
    event.preventDefault()
    seton1(prev => !prev)
  }

  //for followers and following
  function delete_follower(e)
  {
	let text = e.target.nearestViewportElement?.parentElement?.innerText;
	// console.dir();
	async function dele()
	{
		try {
			const res = await axios({
			  method: 'patch',
			  url: 'http://localhost:4000/profile',
			  headers: {'authorization':`Bearer ${localStorage.getItem('token')}`},
			  data: {...formData,remove:[text],flag:'followers'}
			})
			await getData();
			console.log("success");
		  } catch (error) {
			console.log(error)
		  }
	}
	dele();
  }
  function delete_following(e)
  {
	let text = e.target.parentElement?.firstChild.innerText;
	// console.dir();
	async function dele()
	{
		try {
			const res = await axios({
			  method: 'patch',
			  url: 'http://localhost:4000/profile',
			  headers: {'authorization':`Bearer ${localStorage.getItem('token')}`},
			  data: {...formData,remove:[text],flag:'following'}
			})
			await getData();
			console.log("success");
		  } catch (error) {
			console.log(error)
		  }
	}
	dele();
  }

  //for the followers
  const mapped_followers = formData.followers?.map((element)=>{
	return (
		<Grid name={element} item xs={12} sx={{m:0,mt:3,borderRadius:"14px",backgroundColor:"lightgreen",display:"flex",justifyContent:"space-between",alignContent:"center"}}>
			<Typography xs={6} component="span" variant='h5' sx={{padding:"20px"}}>
			{element}
			</Typography>
			<Delete onClick={delete_follower} sx={{cursor:"pointer",alignSelf:"center",mr:"10px"}}/>
		</Grid>
	)
  });

  const mapped_following = formData.following?.map((element)=>{
	return (
		<Grid item xs={12} sx={{ml:"10px",m:0,mt:3,borderRadius:"14px",display:"flex",justifyContent:"space-between",alignContent:"center",backgroundColor:"lightgreen"}}>
			<Typography xs={6} component="span" variant='h5' sx={{padding:"20px"}}>
			{element}
			</Typography>
			<Button onClick={delete_following} variant='contained'>UNFOLLOW</Button>
			{/* <Delete sx={{cursor:"pointer"}}/> */}
		</Grid>
	)
  });

  function updateProf(e)
  {
	async function update_data()
	{
		try {
			const res = await axios({
			  method: 'patch',
			  url: 'http://localhost:4000/update',
			  headers:{ authorization: `Bearer ${localStorage.getItem('token')}`},
			  data: {...formData}
			})
			await getData();
			console.log("success");
		  } catch (error) {
			console.log(error)
		  }
	}
	update_data();
  }

//   console.log(formData);

  React.useEffect(()=>{
	
  
  getData();
//   getFollowing_followers();
},[]);

	console.log("hi",localStorage)
	if(localStorage.getItem('token')===null)
	{
		return <Errorpage />
	}
  return (
    <div style={{ backgroundColor: 'aliceblue'}}>
      <ThemeProvider theme={theme}>
        <Navbar />
        {/* <Grid container spacing={4}> */}
		<Container component='main' maxWidth='md'>
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
              <Avatar
                sx={{
                  m: 1,
                  bgcolor: 'secondary.main',
                  height: '100px',
                  width: '100px'
                }}
              >
                {/* <LockOutlinedIcon />
                 */}
                <img
                  src={man}
                  style={{ height: '100px', width: '100px' }}
                ></img>
              </Avatar>
              <Typography component='h1' variant='h5'>
                Profile
              </Typography>
              <Box
                component='form'
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 3 }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    {on1 ? (
                      <TextField
                        autoComplete='given-name'
                        name='fname'
                        required
                        fullWidth
                        id='firstName'
                        value={formData.fname}
                        label='First Name'
                        onChange={updateVal}
                        // autoFocus
                      />
                    ) : (
                      <TextField
                        autoComplete='given-name'
                        name='fname'
                        // required
                        fullWidth
                        id='firstName'
                        value={formData.fname}
                        label='First Name'
                        autoFocus
                        disabled
                      />
                    )}
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    {on1 ? (
                      <TextField
                        required
                        fullWidth
                        id='lastName'
                        label='Last Name'
                        name='lname'
                        onChange={updateVal}
                        value={formData.lname}
                        autoComplete='family-name'
                      />
                    ) : (
                      <TextField
                        //   required
                        fullWidth
                        id='lastName'
                        label='Last Name'
                        name='lname'
                        value={formData.lname}
                        autoComplete='family-name'
                        disabled
                      />
                    )}
                  </Grid>
                  <Grid item xs={12}>
                    {on1 ? (
                      <TextField
                        required
                        fullWidth
                        id='email'
                        label='Email Address'
                        name='email'
                        onChange={updateVal}
                        value={formData.email}
                        autoComplete='email'
                      disabled/>
                    ) : (
                      <TextField
                        // required
                        fullWidth
                        id='email'
                        label='Email Address'
                        name='email'
                        // onChange={updateVal}
                        value={formData.email}
                        autoComplete='email'
                        disabled
                      />
                    )}
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    {on1 ? (
                      <TextField
                        autoComplete='given-name'
                        name='age'
                        required
                        fullWidth
                        id='age'
                        type='number'
                        value={formData.age}
                        label='Age'
                        onChange={updateVal}
                      />
                    ) : (
                      <TextField
                        autoComplete='given-name'
                        name='age'
                        // required
                        fullWidth
                        id='age'
                        type='number'
                        value={formData.age}
                        label='Age'
                        // onChange={updateVal}
                        disabled
                      />
                    )}
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    {on1 ? (
                      <TextField
                        required
                        fullWidth
                        id='contact'
                        label='Contact No.'
                        name='contact'
                        onChange={updateVal}
                        type='number'
                        value={formData.contact}
                        autoComplete='family-name'
                      />
                    ) : (
                      <TextField
                        // required
                        fullWidth
                        id='contact'
                        label='Contact No.'
                        name='contact'
                        // onChange={updateVal}
                        type='number'
                        value={formData.contact}
                        autoComplete='family-name'
                        disabled
                      />
                    )}
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    {on1 ? (
                      <TextField
                        required
                        fullWidth
                        name='username'
                        label='User Name'
                        onChange={updateVal}
                        value={formData.username}
                        id='username'
                      />
                    ) : (
                      <TextField
                        // required
                        fullWidth
                        name='username'
                        label='User Name'
                        // onChange={updateVal}
                        value={formData.username}
                        id='username'
                        disabled
                      />
                    )}
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    {on1 ? (
                      <TextField
                        required
                        fullWidth
                        name='password'
                        label='Password'
                        onChange={updateVal}
                        value={formData.password}
                        type='password'
                        id='password'
                        autoComplete='new-password'
                      disabled/>
                    ) : (
                      <TextField
                        // required
                        fullWidth
                        name='password'
                        label='Password'
                        // onChange={updateVal}
                        value={formData.password}
                        type='password'
                        id='password'
                        autoComplete='new-password'
                        disabled
                      />
                    )}
                  </Grid>
                </Grid>
                {on ? (
                  <Button
					onClick={updateProf}
				  	id='1'
                    type='submit'
                    fullWidth
                    variant='contained'
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Update Profile
                  </Button>
                ) : (
                  <Button
					id='1'
                    type='submit'
                    fullWidth
                    variant='contained'
                    sx={{ mt: 3, mb: 2 }}
                    disabled
                  >
                    Update Profile
                  </Button>
                )}
              </Box>
            </Box>
            <Copyright sx={{ mt: 5 }} />
          </Container>

          <Container
            // component='main'
            maxWidth='md'
            sx={{justifyContent:'center',alignContent:'center',paddingBottom:"20px"}}
          >
            <CssBaseline />
            <Box
              sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Grid container spacing={4}>
                <Grid xs={6} item>
					
						<Typography component={"h1"} variant='h5' sx={{textAlign:'center'}}><Button onClick={showFollowers} sx={{fontSize:"20px",color:"black"}}>Followers</Button></Typography></Grid>
					
                <Grid xs={6}
				item ><Typography component={"h1"} variant='h5' sx={{textAlign:'center'}}><Button onClick={showFollowing} sx={{fontSize:"20px",color:"black"}}>Following</Button></Typography></Grid>
				<Grid xs={6}
				item>
					<Typography component={"h1"} variant='h4' sx={{textAlign:'center'}}>{formData.followers?.length}</Typography>
					</Grid>
                <Grid item xs={6}>
					<Typography component={"h1"} variant='h4' sx={{textAlign:'center'}}>{formData.following?.length}</Typography>
					</Grid>
				<Grid item  xs={6} >
			  		{showFoers ? mapped_followers : false}
				</Grid>
				<Grid item xs={6}>
			  		{showFoing ? mapped_following : false}
				</Grid>
              </Grid>
            </Box>
          </Container>
        {/* </Grid> */}
      </ThemeProvider>
    </div>
  )
}
