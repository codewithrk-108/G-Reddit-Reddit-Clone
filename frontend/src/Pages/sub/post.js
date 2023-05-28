import { DisplaySettings, ForkLeft, UnarchiveTwoTone } from '@mui/icons-material'
import { Avatar, Button, Typography } from '@mui/material'
import React from 'react'
import man from '../../man.png'
import { Dialog } from '@mui/material'
import FormPost from './FormPost'
import axios from 'axios'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import Comment from './Comment'
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
// import {Keyboard_arrow_down} from '@mui/icons-material'

function Post (props) {
  console.log('hello', props)
  const [open, setopen] = React.useState(0)
  const [show, setshow] = React.useState(1)
  // if(props.index)
  const [comments, setcomments] = React.useState([])
  const [comments_react, setcomments_react] = React.useState([])
//   const [concern,setconcern] = React.useState("")
  // else

  React.useEffect(() => {
      setcomments([...props.comments])
  },[])
  // const [data,setdata] = React.useState([])

  function handle_open () {
    setopen(1)
  }
  function handle_close () {
    setopen(0)
  }

  //posting a comment

  function show_func()
  {
	setshow((prev)=>!prev);
  }

  async function save(current)
  {
	try {
	const res = await axios({
		method: 'patch',
		url: 'http://localhost:4000/save',
		headers: {
		  authorization: `Bearer ${localStorage.getItem('token')}`,
		},
		data:{data:props.post[props.index]}
		// data: { owner:owner, follower:localStorage.getItem('email')}
	  })
	  // navigate('/');
	  console.log('success')
	//   props.getData()
	} catch (error) {
	  console.log(error)
	}
  }


  async function report(concern)
  {
	try {
	const res = await axios({
		method: 'patch',
		url: 'http://localhost:4000/mysubg/reports',
		headers: {
		  authorization: `Bearer ${localStorage.getItem('token')}`,
		  id: localStorage.getItem('openSubg')
		},
		data:{data:{text:props.post[props.index].text,reportedby:localStorage.getItem('email'),reportedto:props.post[props.index].posted_by,index:props.index,concern:concern,ignored:false}}
		// data: { owner:owner, follower:localStorage.getItem('email')}
	  })
	  // navigate('/');
	  console.log('success')
	//   props.getData()
	} catch (error) {
	  console.log(error)
	}
  }

  function Report(index)
  {
	let concern = prompt('concern')
	report(concern);
  }
  

  async function follow(owner)
  {
	try {
		//   console.log("ja")
		  const res = await axios({
			method: 'patch',
			url: 'http://localhost:4000/follow',
			headers: {
			  authorization: `Bearer ${localStorage.getItem('token')}`,
			  id: localStorage.getItem('openSubg')
			},
			data: { owner:owner, follower:localStorage.getItem('email')}
		  })
		  // navigate('/');
		  console.log('success')
		  props.getData()
		} catch (error) {
		  console.log(error)
		}
  }
  async function voting(e,name)
  {	
	let roha = props.post;
	if(name==="up" && !roha[props.index].downvotes.includes(localStorage.getItem('email')))
	{	if(!roha[props.index].upvotes.includes(localStorage.getItem('email')))
		roha[props.index].upvotes.push(localStorage.getItem('email'));
		else
		roha[props.index].upvotes = roha[props.index].upvotes.filter((obj)=>{
			if(localStorage.getItem('email')===obj)
			{
				return false;
			}
			return true;
		});
	}
	if(name==="down" && !roha[props.index].upvotes.includes(localStorage.getItem('email')))
	{
		if(!roha[props.index].downvotes.includes(localStorage.getItem('email')))
		roha[props.index].downvotes.push(localStorage.getItem('email'));
		else
		roha[props.index].downvotes = roha[props.index].downvotes.filter((obj)=>{
			if(localStorage.getItem('email')===obj)
			{
				return false;
			}
			return true;
		});
	}
		try {
		//   console.log("ja")
		  const res = await axios({
			method: 'patch',
			url: 'http://localhost:4000/subg/posts',
			heaimport { DisplaySettings, ForkLeft, UnarchiveTwoTone } from '@mui/icons-material'
import { Avatar, Button, Typography } from '@mui/material'
import React from 'react'
import man from '../../man.png'
import { Dialog } from '@mui/material'
import FormPost from './FormPost'
import axios from 'axios'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import Comment from './Comment'
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
// import {Keyboard_arrow_down} from '@mui/icons-material'

function Post (props) {
  console.log('hello', props)
  const [open, setopen] = React.useState(0)
  const [show, setshow] = React.useState(1)
  // if(props.index)
  const [comments, setcomments] = React.useState([])
  const [comments_react, setcomments_react] = React.useState([])
//   const [concern,setconcern] = React.useState("")
  // else

  React.useEffect(() => {
      setcomments([...props.comments])
  },[])
  // const [data,setdata] = React.useState([])

  function handle_open () {
    setopen(1)
  }
  function handle_close () {
    setopen(0)
  }

  //posting a comment

  function show_func()
  {
	setshow((prev)=>!prev);
  }

  async function save(current)
  {
	try {
	const res = await axios({
		method: 'patch',
		url: 'http://localhost:4000/save',
		headers: {
		  authorization: `Bearer ${localStorage.getItem('token')}`,
		},
		data:{data:props.post[props.index]}
		// data: { owner:owner, follower:localStorage.getItem('email')}
	  })
	  // navigate('/');
	  console.log('success')
	//   props.getData()
	} catch (error) {
	  console.log(error)
	}
  }


  async function report(concern)
  {
	try {
	const res = await axios({
		method: 'patch',
		url: 'http://localhost:4000/mysubg/reports',
		headers: {
		  authorization: `Bearer ${localStorage.getItem('token')}`,
		  id: localStorage.getItem('openSubg')
		},
		data:{data:{text:props.post[props.index].text,reportedby:localStorage.getItem('email'),reportedto:props.post[props.index].posted_by,index:props.index,concern:concern,ignored:false}}
		// data: { owner:owner, follower:localStorage.getItem('email')}
	  })
	  // navigate('/');
	  console.log('success')
	//   props.getData()
	} catch (error) {
	  console.log(error)
	}
  }

  function Report(index)
  {
	let concern = prompt('concern')
	report(concern);
  }
  

  async function follow(owner)
  {
	try {
		//   console.log("ja")
		  const res = await axios({
			method: 'patch',
			url: 'http://localhost:4000/follow',
			headers: {
			  authorization: `Bearer ${localStorage.getItem('token')}`,
			  id: localStorage.getItem('openSubg')
			},
			data: { owner:owner, follower:localStorage.getItem('email')}
		  })
		  // navigate('/');
		  console.log('success')
		  props.getData()
		} catch (error) {
		  console.log(error)
		}
  }
  async function voting(e,name)
  {	
	let roha = props.post;
	if(name==="up" && !roha[props.index].downvotes.includes(localStorage.getItem('email')))
	{	if(!roha[props.index].upvotes.includes(localStorage.getItem('email')))
		roha[props.index].upvotes.push(localStorage.getItem('email'));
		else
		roha[props.index].upvotes = roha[props.index].upvotes.filter((obj)=>{
			if(localStorage.getItem('email')===obj)
			{
				return false;
			}
			return true;
		});
	}
	if(name==="down" && !roha[props.index].upvotes.includes(localStorage.getItem('email')))
	{
		if(!roha[props.index].downvotes.includes(localStorage.getItem('email')))
		roha[props.index].downvotes.push(localStorage.getItem('email'));
		else
		roha[props.index].downvotes = roha[props.index].downvotes.filter((obj)=>{
			if(localStorage.getItem('email')===obj)
			{
				return false;
			}
			return true;
		});
	}
		try {
		//   console.log("ja")
		  const res = await axios({
			method: 'patch',
			url: 'http://localhost:4000/subg/posts',
			headers: {
			  authorization: `Bearer ${localStorage.getItem('token')}`,
			  id: localStorage.getItem('openSubg')
			},
			data: { data: [...roha], number:1 }
		  })
		  // navigate('/');
		  console.log('success')
		  props.getData()
		} catch (error) {
		  console.log(error)
		}
  }
  React.useEffect(() => {
	let comm_new;
    if (comments.length != 0) {
      comm_new = comments?.map(obj => {
        return <Comment email={obj[0]} text={obj[1]} />
      })
    }
	setcomments_react(comm_new)
  }, [comments])

//   console.log('comments', comments)
//   console.log('comments', comments_react)
// console.log(props,"from post")
// console.log(props.name)
// console.log(props.blocked)
// console.log()
  return (
    <div className='postcard'>
      <header
        style={{ display: 'flex', padding: '3rem', paddingBottom: '1rem' }}
      >
        <Avatar src={man}></Avatar>
        <Typography sx={{ fontSize: '15px', alignSelf: 'center',marginLeft:'20px' }}>
          {props?.blocked?.includes(props.posted_by) ? "Blocked User" : props.posted_by}
        </Typography>
        <Button sx={{ marginLeft: '50px' }} onClick={()=>save(localStorage.getItem('email'))}>SAVE</Button>
        <Button sx={{ marginLeft: '10px',marginRight:'20px' }} onClick={()=>follow(props.post[props.index].posted_by)}>Follow</Button>
		<h4 id="up">{props.upvotes.length || "0"}</h4>
		<ThumbUpIcon onClick={(e)=>voting(e,"up")}/>
		<h4 id="down">{-props.downvotes.length || "0"}</h4>
		<ThumbDownIcon onClick={(e)=>voting(e,"down")}/>
      </header>
      <textarea className='text-post' value={props.text} disabled></textarea>
      <footer
        style={{
          display: 'flex',
          width: '600px',
          justifyContent: 'space-between',
          margin: 'auto',
          alignItems: 'center',
          marginTop: '10px',
          marginBottom: '10px'
        }}
      >
        <Button
          variant='contained'
          sx={{ borderRadius: '50%' }}
          onClick={() => setopen(1)}
        >
          +
        </Button>
        <Button sx={{ marginLeft: '50px' }} onClick={()=>Report(props.index)}>REPORT</Button>
        <Typography sx={{ fontSize: '15px', padding: '10px' }}>
          Comments
        </Typography>
        <KeyboardArrowDownIcon sx={{ cursor: 'pointer' }} onClick={show_func} />
      </footer>
      {show ? comments_react : ''}
      {open ? (
        <Dialog open={handle_open} onClose={handle_close}>
          <FormPost name='Comment' comment={props.addcomment} post = {props.post} index={props.index}/>
        </Dialog>
      ) : (
        ''
      )}
    </div>
  )
}

export default Post
