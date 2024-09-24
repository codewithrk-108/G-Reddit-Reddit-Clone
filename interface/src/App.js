import {Typography,AppBar,Card,CardActions,CardContent,CardMedia,CssBaseline,Grid,Toolbar,Container} from '@mui/material'
import Login from './Pages/login'
import Signup from './Pages/signup'
import React from 'react'
import Navbar from './Pages/nav'
import {PhotoCamera} from '@mui/icons-material'
import Profile from './Pages/profile'
import Mysub from './Pages/Mysub/Mysub'
import Formmysub from './Pages/Mysub/Mysub_i'
import Mysubtab from './Pages/Mysub/Mysub_tab'
import Request from './Pages/Mysub/request'
import Report from './Pages/Mysub/report'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Subg from './Pages/sub/subg'
import Perssubg from './Pages/sub/perssubg' 
import Savedposts from './Pages/Savedposts'

function App() {
	//for login signup toggle
	const [tog,settog] = React.useState(1);
	//for login signup toggle
	function toggle_signlog()
	{
		settog((prev)=>!prev);
	}
  return (
    <>
	{/* <Profile /> */}
	<Routes>
	<Route path='/' element={tog ? <Login 
		toggle={toggle_signlog}/> : <Signup 
		toggle={toggle_signlog}/> }></Route>
	<Route path='/register' element={<Signup />}></Route>
	<Route path='/profile' element={<Profile />}></Route>
	<Route path='/mysubg' element={<Mysub />}></Route>
	<Route path='/mysubform' element={<Formmysub />}></Route>
	<Route path='/mysubg/users' element={<Mysubtab />}></Route>
	<Route path='/mysubg/joining' element={<Request />}></Route>
	<Route path='/mysubg/reports' element={<Report />}></Route>
	<Route path='/subg' element={<Subg />}></Route>
	<Route path='/posts' element={<Perssubg />}></Route>
	<Route path='/savedposts' element={<Savedposts />}></Route>
	</Routes>

	{/* <Request request={["Rohan Kumar","Yash Kawade","Nikunj Garg","Aman Raj"]}/> */}
	{/* <Mysubtab unblocked={["Yash kawade","Rohan Kumar","Nikunj Garg","Aman Raj"]}
	blocked={["Yash kawade","Rohan Kumar","Nikunj Garg","Aman Raj"]}/>  */}
	{/* <Formmysub /> */}
	{/* <Mysub /> */}
	{/* <Profile fname="Rohan" lname="Kumar" email="rohan.victorious108@gmail.com" age={18} contact={9821237789} username="codewithrk-108" password="******" follower={["Rohan","Aman","Kawade","Nikunj"]} following={["Rohan","Aman","Kawade","Nikunj"]}/> */}
		
	</>
  );
}

export default App;