import React from 'react'
import Navbar from '../nav'
import Card from '../Mysub/MysubCard'
import { Grid } from '@mui/material'
import { Button, CssBaseline, Typography } from '@mui/material'
import { Add, DataObjectSharp, EmojiObjectsTwoTone } from '@mui/icons-material'
import { Navigate, useNavigate } from 'react-router-dom'
import axios from 'axios'

import SearchBar from './search.js'
import SubgCard from './subgcard'
import Tags from './tags'
import '../../index.css'
import Errorpage from '../../Errorpage'

var name_flag = 0

function Mysub () {
  const navigate = useNavigate()
  const [searchtext, setsearch] = React.useState('')
  var render_array = []
  const [data, setdata] = React.useState([])

  //for tags
  const [search_tags, setsearch_tags] = React.useState([])
  // console.log("hi")
  async function getData () {
    try {
      const res = await axios({
        method: 'get',
        url: 'http://localhost:4000/subg',
        headers: { authorization: `Bearer ${localStorage.getItem('token')}` }
      })
      setdata(prev => {
        var arr = []
        for (let key in res.data.data) {
          arr.push(res.data.data[key])
        }
        return arr
      })
    } catch (error) {
      console.log(error)
    }
  }
  React.useEffect(() => {
    getData()
  }, [])

  //   console.log(data)
  var duplicate = data

  async function leaveData (e) {
    async function leave () {
      try {
        const res = await axios({
          method: 'patch',
          url: 'http://localhost:4000/subg',
          headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
          data: { join: e.target.name, flag: 'leave' }
        })
        await getData()
        console.log('success')
      } catch (error) {
        console.log(error)
      }
    }
    leave()
  }

  function joinData (e) {
    // console.log(e.target.name);
    async function join () {
      try {
        const res = await axios({
          method: 'patch',
          url: 'http://localhost:4000/subg',
          headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
          data: { join: e.target.name, flag: 'join' }
        })
        await getData()
        console.log('success')
      } catch (error) {
        console.log(error)
      }
    }
    join()
  }

  function change_search (e) {
    // console.log(e.target.value)
    setsearch(e.target.value)
  }

  // console.log(data);
  data.forEach(object => {
    //for tag search
    let yes = 0
    // console.log(search_tags)
    for (let i = 0; i < search_tags.length; i++) {
      var tg_arr = object.tags.split(',')
      for (let j = 0; j < tg_arr.length; j++) {
        // console.log(object.tags[j])
        if (search_tags[i] === tg_arr[j]) {
          yes = 1
          break
        }
      }
      if (yes) break
    }
    const nam = object.name
    if (
      (search_tags.length === 0 || yes) &&
      nam.toLowerCase().includes(searchtext.toLowerCase())
    ) {
      var already_req = 0
      var already_joined = 0
      var left = 0
      for (let i = 0; i < object.joining.length; i++) {
        if (object.joining[i][1] === localStorage.getItem('email')) {
          already_req = 1
        }
      }

      for (let i = 0; i < object.people.length; i++) {
		console.log(object.people[i])
        if (object.people[i][1] === localStorage.getItem('email')) {
          already_joined = 1
        }
      }

	  if(object.root_email === localStorage.getItem('email'))
	  {
		left=1;
	  }
      for (let i = 0; i < object.left_array.length; i++) {
        if (object.left_array[i][1] === localStorage.getItem('email')) {
          left = 1
        }
      }

      render_array.push(
        <Grid item>
          <SubgCard
            id={object._id}
            joinfunc={joinData}
            leavefunc={leaveData}
            name={object.name}
            description={object.description}
            banned={object.banned}
            people={object.people}
            posts={object.posts}
            requested={already_req}
			joined = {already_joined}
            left={left}
            key={object.name}
          />
        </Grid>
      )
    }
  })

  const [show_tags, set_show] = React.useState(0)
  const [show_sort, set_show_sort] = React.useState(0)

  function toggle () {
    set_show(prev => !prev)
  }

  function toggle_sort () {
    set_show_sort(prev => !prev)
  }

  //for tags
  function add_tags (e, name) {
    // console.dir(e.target)
    console.log('hi')
    if (e.target.style.backgroundColor == 'aqua') {
      e.target.style.backgroundColor = 'aliceblue'
      setsearch_tags(prev => {
        return prev.filter(el => {
          if (el != name) return el
        })
      })
    } else {
      e.target.style.backgroundColor = 'aqua'
      setsearch_tags(prev => {
        return [...prev, name]
      })
    }
  }

  function cmp_name_sort (obj1, obj2) {
    if (obj1.name.toLowerCase() <= obj2.name.toLowerCase()) return -1
    else return 1
  }

  function cmp_follower_sort (obj1, obj2) {
    // console.log(obj1)
    if (obj1.people.length >= obj2.people.length) return -1
    else return 1
  }

  function cmp_date_sort (obj1, obj2) {
    // console.log(obj1)
    if (obj1.creation_date >= obj2.creation_date) return -1
    else return 1
  }

  function nested_sort (obj1, obj2) {
    if (obj1.name.toLowerCase() === obj2.name.toLowerCase()) {
      if (obj1.people.length >= obj2.people.length) return -1
      else return 1
    }
  }

  function add_sort (e, name) {
    e.target.style.backgroundColor = 'aqua'
    if (name === 'Name') {
      name_flag = 1
      setdata(prev => {
        var arr = prev
        // console.log(prev)
        arr.sort(cmp_name_sort)
        return arr
      })
    }
    if (name === 'Followers') {
      setdata(prev => {
        var arr = prev
        // console.log(name_flag)
        if (name_flag == 1) {
          arr.sort(nested_sort)
        } else arr.sort(cmp_follower_sort)
        return arr
      })
    }
    if (name === 'Creation Date') {
      setdata(prev => {
        var arr = prev
        arr.sort(cmp_date_sort)
        return arr
      })
    }
  }

  const [render_tags, setrender_tags] = React.useState([])
  const [render_sort, setrender_sort] = React.useState([])

  React.useEffect(() => {
    var tags = []
    var sort = ['Name', 'Followers', 'Creation Date']
    data.forEach(ele => {
      var tag_arr = ele.tags.split(',')
      // console.log(tag_arr)
      tag_arr.forEach(el => {
        for (let i = 0; i < tags.length; i++) {
          if (tags[i] === el) return
        }
        tags.push(el)
      })
    })

    setrender_tags(() => {
      return tags.map(ele => {
        return <Tags key={ele} name={ele} func={add_tags} />
      })
    })

    setrender_sort(() => {
      return sort.map(ele => {
        return <Tags key={ele} name={ele} func={add_sort} />
      })
    })
  }, [data])

  var str = show_tags ? 'block' : 'none'
  var str_sort = show_sort ? 'block' : 'none'

  if(localStorage.getItem('token')===null)
	{
		return <Errorpage />
	}

  return (
    <div
      className='mysub'
      style={{ backgroundColor: 'aliceblue', minHeight: '100vh' }}
    >
      <CssBaseline />
      <Navbar />
      <div id='search' style={{marginTop:'60px'}}>
        {/* <input
          onChange={change_search}
          name='searchbar'
          placeholder='Search by name'
        /> */}
        <SearchBar onChangeFunc={change_search} />
        <Button variant='contained' sx={{p:"5px",m:"5px",width:"200px"}} onClick={toggle}>
            Search by Tags
          </Button>
          <div style={{ display: str }}>{render_tags}</div>
          <Button variant='contained' sx={{p:"5px",m:"5px",width:"200px"}} onClick={toggle_sort}>
            Sort
          </Button>
          <div style={{ display: str_sort }}>{render_sort}</div>
      </div>
      <Grid
        container
        spacing={12}
        sx={{
          position: 'static',
          marginTop: '0px',
          paddingTop: '0px',
          alignContent: 'center',
          justifyContent: 'space-around'
        }}
      >
        {render_array}
      </Grid>
    </div>
  )
}

export default Mysub
