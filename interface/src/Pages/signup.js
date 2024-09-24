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
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import Navbar from './nav.js'
import { LineAxisOutlined, Send } from '@mui/icons-material'
import axios from 'axios'
import { useNavigate } from "react-router-dom";

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

async function Send_data (formData,props) {
  try {
    const res = await axios({
      method: 'post',
      url: 'http://localhost:4000/register',
      data: {...formData}
    })
	alert("Succesfully signed up!");
	props.toggle();
	// navigate('/');
	// console.log("success");
  } catch (error) {
    console.log(error)
  }
}

export default function SignUp (props) {
  //for the signup button disbaled
  const [on, seton] = React.useState(0)

  //creating an object for form data
  const [formData, setForm] = React.useState({
    fname: '',
    lname: '',
    email: '',
    password: '',
    contact: '',
    age: '',
    username: ''
  })

  //for checking the validity of form
  React.useEffect(() => {
    let flag = 0
    for (let key in formData) {
      if (formData[key].length === 0) {
        flag = 1
      }
    }
    if (formData['contact'].length != 10) flag = 1
    if (formData['age'] < 18) flag = 1
    if (!flag && on == 0) {
      seton(prev => !prev)
    } else if (flag === 1 && on == true) {
      seton(prev => !prev)
    }
  }, [formData])

  //for updating the value in the input feild
  function updateVal (e) {
    setForm(prev => {
      return {
        ...prev,
        [e.target.name]: e.target.value
      }
    })
  }

  //for sending data to backend
  const handleSubmit = event => {
    event.preventDefault()
    Send_data(formData,props)
  }

  return (
    <div style={{ backgroundColor: 'lightpink', height: '100vh' }}>
      <ThemeProvider theme={theme}>
        <Navbar />
        <Container component='main' maxWidth='xs'>
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component='h1' variant='h5'>
              Sign up
            </Typography>
            <Box
              component='form'
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete='given-name'
                    name='fname'
                    required
                    fullWidth
                    id='firstName'
                    value={formData.fname}
                    label='First Name'
                    onChange={updateVal}
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
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
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id='email'
                    label='Email Address'
                    name='email'
                    onChange={updateVal}
                    value={formData.email}
                    autoComplete='email'
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
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
                </Grid>
                <Grid item xs={12} sm={6}>
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
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    name='username'
                    label='User Name'
                    onChange={updateVal}
                    value={formData.username}
                    id='username'
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
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
                  />
                </Grid>
              </Grid>
              {on ? (
                <Button
                  type='submit'
                  fullWidth
                  variant='contained'
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign up
                </Button>
              ) : (
                <Button
                  type='submit'
                  fullWidth
                  variant='contained'
                  sx={{ mt: 3, mb: 2 }}
                  disabled
                >
                  Sign Up
                </Button>
              )}
              <Grid item sx={{ textAlign: 'center' }}>
                <Link variant='body2' onClick={props.toggle}>
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 5 }} />
        </Container>
      </ThemeProvider>
    </div>
  )
}
