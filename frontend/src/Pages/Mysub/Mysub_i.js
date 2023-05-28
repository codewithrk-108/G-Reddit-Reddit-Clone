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
import Navbar from '../nav.js'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
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

export default function FormMysub (props) {
	const navigate = useNavigate('/mysubg');
  //for the signup button disbaled
  const [on, seton] = React.useState(0)

  //creating an object for form data
  const [formData, setForm] = React.useState({
    name: '',
    banned: '',
    description: '',
    tags: ''
  })

  //for checking the validity of form
  React.useEffect(() =import * as React from 'react'
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
import Navbar from '../nav.js'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
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

export default function FormMysub (props) {
	const navigate = useNavigate('/mysubg');
  //for the signup button disbaled
  const [on, seton] = React.useState(0)

  //creating an object for form data
  const [formData, setForm] = React.useState({
    name: '',
    banned: '',
    description: '',
    tags: ''
  })

  //for checking the validity of form
  React.useEffect(() => {
    let flag = 0
    for (let key in formData) {
      if (formData[key].length === 0) {
        flag = 1
      }
    }

	//for tags

    let myarr = formData['tags'].split(',')
    myarr = myarr.map(el => {
      return el.trim()
    })

    myarr.forEach(element => {
      if (element.split(' ')[0] != element) {
        flag = 1
      }
	  if(element.toLowerCase()!=element)
	  {
		flag=1;
	  }
    })

	//for banned keywords
	let myarr1 = formData['banned'].split(',')
    myarr1 = myarr1.map(el => {
      return el.trim()
    })

    myarr1.forEach(element => {
      if (element.split(' ')[0] != element) {
        flag = 1
      }
    })

    if (!flag && on == 0) {
      seton(prev => !prev)
    } else if (flag === 1 && on == true) {
      seton(prev => !prev)
    }

  }, [formData])

  async function Send_data () {
	try {
	  const res = await axios({
		method: 'post',
		url: 'http://localhost:4000/mysubform',
		data: {...formData,people:[],posts:[]},
		headers: {'authorization':`Bearer ${localStorage.getItem('token')}`}
	  })
	  alert("Succesfully created Subzi !!!");
	  navigate('/mysubg');
	} catch (error) {
	  console.log(error)
	}
  }

  //for updating the value in the input feild
  function updateVal (e) {
    setForm(prev => {
      return {
        ...prev,
        [e.target.name]: e.target.value
      }
    })
  }

  const handleSubmit = event => {
    event.preventDefault();

  }

  return (
    <div style={{ backgroundColor: 'aliceblue', height: '100vh' }}>
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
            {/* <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar> */}
            <Typography component='h1' variant='h5'>
              My Sub Greddit
            </Typography>
            <Box
              component='form'
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    autoComplete='given-name'
                    name='name'
                    required
                    fullWidth
                    id='Name'
                    value={formData.name}
                    label='Name'
                    onChange={updateVal}
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id='description'
                    label='Description'
                    name='description'
                    onChange={updateVal}
                    value={formData.description}
                    autoComplete='family-name'
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id='tags'
                    label='Tags (single word,lowercase,comma seperated)'
                    name='tags'
                    onChange={updateVal}
                    value={formData.tags}
                    autoComplete='tags'
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    autoComplete='given-name'
                    name='banned'
                    required
                    fullWidth
                    id='banned'
                    value={formData.banned}
                    label='Banned Keywords (single word,comma seperated)'
                    onChange={updateVal}
                  />
                </Grid>
              </Grid>
              {on ? (
                <Button
				  onClick={Send_data}
                  fullWidth
                  variant='contained'
                  sx={{ mt: 3, mb: 2 }}
                >
                  Create My Subgreddit
                </Button>
              ) : (
                <Button
                  type='submit'
                  fullWidth
                  variant='contained'
                  sx={{ mt: 3, mb: 2 }}
                  disabled
                >
                  Create My Subgreddit
                </Button>
              )}
            </Box>
          </Box>
          <Copyright sx={{ mt: 5 }} />
        </Container>
      </ThemeProvider>
    </div>
  )
}
