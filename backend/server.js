const express = require('express')
const connectDB = require('./db/connect')
const { Task, Follow, Mysubg } = require('./models/schema')
require('dotenv').config()
const jwt = require('jsonwebtoken')
const cors = require('cors')
const app = express()

var bcrypt = require('bcryptjs')
const { default: mongoose } = require('mongoose')


app.use(cors()) // to avoid cross origin error and to attach headers to the response
// aconst express = require('express')
const connectDB = require('./db/connect')
const { Task, Follow, Mysubg } = require('./models/schema')
require('dotenv').config()
const jwt = require('jsonwebtoken')
const cors = require('cors')
const app = express()

var bcrypt = require('bcryptjs')
const { default: mongoose } = require('mongoose')


app.use(cors()) // to avoid cross origin error and to attach headers to the response
// app.use(express.urlencoded({ extended: false }))
// no need till headers are not url encrypted
//parses requests with the url encoded payloads
app.use(express.json())
// important to parse the incoming payloads of json
// to parse the form data
mongoose.set('strictQuery', true)
// to disable deprecation

//create a middleware for JWT
function authenticateToken (req, res, next) {
	// console.log("cjill")
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (token == null) return res.status(401).send('')

//   console.log('hi')
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.status(403).send('.')
    // console.log(user)
    req.user = user
    next()
  })
}

// for the login page
// posts data through this route
app.post('/', async (req, res) => {
  try {
    const obj = req.body
    const query = await Task.findOne({
      email: [obj.email]
    })
    if (query) {
      const reply = bcrypt.compareSync(obj.password, query.password)
      if (reply) {
        const accessToken = jwt.sign(obj, process.env.ACCESS_TOKEN_SECRET) //JWT
        res
          .status(200)
          .json({ status: 'success', msg: 'Correct', token: accessToken })
      } else {
        res.status(400).json({ status: 'failed', msg: 'Wrong' })
      }
    } else {
      res.status(400).json({ status: 'failed', msg: 'Wrong' })
    }
  } catch (error) {
    res.status(500).json({ status: 'failed', msg: error })
  }
})

app.get('/profile', authenticateToken, async (req, res) => {
  try {
    const finder = await Task.findOne({
      email: req.user.email
    })
    const finder1 = await Follow.findOne({
      email: req.user.email
    })
    res
      .status(200)
      .json({ status: 'success', data: { ...finder }, follow: { ...finder1 } })
  } catch (error) {
    res.status(403).json({ status: 'failed', data: null })
  }
})

//for mysubg
app.get('/mysubg', authenticateToken, async (req, res) => {
  try {
    // console.log(req.user);
    const finder = await Mysubg.find({
      root_email: req.user.email
    })
    res.status(200).json({ status: 'success', data: { ...finder } })
  } catch (error) {
    res.status(403).json({ status: 'failed', data: null })
  }
})

//for deleting mysubg
app.delete('/mysubg', authenticateToken, async (req, res) => {
  try {
    console.log(req.body.name)
    const finder = await Mysubg.findOneAndDelete({
      email: req.user.email,
      name: req.body.name
    })
    console.log(finder)
    res.status(200).json({ status: 'success', data: { ...finder } })
  } catch (error) {
    res.status(403).json({ status: 'failed', data: null })
  }
})

//for followers,following
app.patch('/follow', authenticateToken, async (req, res) => {
  try {
    console.log('vooo')
    let resi
    //autenticate
    const obj = req.body
    // console.log(obj.owner)
    // console.log(obj.follower)
    if (obj.owner === obj.follower) {
      throw Error
    } else {
      resi = await Follow.findOneAndUpdate(
        {
          email: obj.owner
        },
        {
          $addToSet: { followers: obj.follower }
        }
      ).clone()

      resi = await Follow.findOneAndUpdate(
        {
          email: obj.follower
        },
        {
          $addToSet: { following: obj.owner }
        }
      ).clone()
    }

    res.status(200).json({ status: 'success', data: 'done' })
  } catch (error) {
    console.log(error)
    res.status(500).json({ status: 'failed', msg: error })
  }
})

//updating followers
app.patch('/profile',authenticateToken,async (req, res) => {
  try {
    //autenticate
    // console.log(req);
    const obj = req.body
    //   console.log(obj);
    if (obj.flag === 'followers') {
      const resi = await Follow.findOneAndUpdate(
        {
          email: obj.email
        },
        { $pull: { followers: String(obj.remove) } },
        { new: true },
        (error, data) => {
          if (error) console.log(error)
          else {
            console.log(data)
          }
        }
      ).clone()
      res.status(200).json({ status: 'success', data: resi })
    } else {
      const resi = await Follow.findOneAndUpdate(
        {
          email: obj.email
        },
        { $pull: { following: String(obj.remove) } },
        { new: true },
        (error, data) => {
          if (error) console.log(error)
          else {
            console.log(data)
          }
        }
      ).clone()
      res.status(200).json({ status: 'success', data: resi })
    }
  } catch (error) {
    res.status(500).json({ status: 'failed', msg: error })
  }
})

//for updating the data
app.patch('/update', authenticateToken,async (req, res) => {
  try {
    // authenticate
    const obj = req.body
    const resi = await Task.findOneAndUpdate(
      {
        email: obj.email
      },
      {
        $set: {
          fname: obj.fname,
          lname: obj.lname,
          age: obj.age,
          contact: obj.contact,
          username: obj.username
        }
      },
      { new: true },
      (error, data) => {
        if (error) console.log(error)
        else {
          console.log(data)
          // console.log("success")
        }
      }
    ).clone()
    res.status(200).json({ status: 'success', data: resi })
  } catch (error) {
    console.log(error)
    res.status(500).json({ status: 'failed', msg: error })
  }
})

// for the signup page
app.post('/register', async (req, res) => {
  try {
    const finder = await Task.findOne({
      email: req.body.email
    })
    if (finder) {
      res.status(403).json({ status: 'failed', msg: 'User Already Exists' })
    }
    //autenticate
    const obj = req.body
    var bcrypt = require('bcryptjs')
    var salt = bcrypt.genSaltSync(10)
    var hash = bcrypt.hashSync(obj.password, salt)
    const all_data = new Task({
      fname: obj.fname,
      lname: obj.lname,
      contact: obj.contact,
      age: obj.age,
      email: obj.email,
      username: obj.username,
      password: hash
    })
    console.log(obj)
    // saves the data to the mongoDB
    await all_data.save()

    const data = new Follow({
      email: obj.email,
      followers: [],
      following: []
    })
    // saves the data to the mongoDB
    await data.save()

    res.status(200).json({ status: 'success', data: all_data })
  } catch (error) {
    res.status(500).json({ status: 'failed', msg: error })
  }
})

//for the creation of mysubg
app.post('/mysubform', authenticateToken, async (req, res) => {
  try {
    const finder = await Mysubg.findOne({
      name: req.body.name,
      email: req.user.email
    })

    const fir = await Task.findOne({
      email: req.user.email
    })
    const nam = fir.fname + ' ' + fir.lname

    //assuming unique
    if (finder) {
      res.status(403).json({ status: 'failed', msg: 'Mysubg Already Exists' })
      return
    }
    //autenticate
    req.body.people.push([nam, req.user.email])
    // req.body.unblocked.push({,req.user.email})
    const all_data = new Mysubg({
      ...req.body,
      root_email: req.user.email
    })
    //   console.log(all_data);
    // saves the data to the mongoDB
    await all_data.save()

    res.status(200).json({ status: 'success', data: all_data })
    return
  } catch (error) {
    res.status(500).json({ status: 'failed', msg: error })
  }
})

app.get('/mysubg/requests', authenticateToken, async (req, res) => {
  try {
    const id = req.headers['id']
    const resi = await Mysubg.findOne({
      root_email: req.user.email,
      _id: id
    })
    res.status(200).json({ status: 'success', data: { ...resi } })
  } catch (error) {
    res.status(403).json({ status: 'failed', data: null })
  }
})

//accept or reject requests

app.patch('/mysubg/requests', authenticateToken, async (req, res) => {
  try {
    const id = req.headers['id']
    let resi
    if (req.body.flag == 'accept') {
      resi = await Mysubg.findOneAndUpdate(
        {
          root_email: req.user.email,
          _id: id
        },
        {
          $pull: { "joining" : req.body.name },
          $addToSet: { "people": req.body.name,"unblocked" : req.body.name[1]}
        }
      )
    } else {
      	resi = await Mysubg.findOneAndUpdate(
        	{
          	root_email: req.user.email,
          	_id: id
        	},
        	{
          	$pull: { "joining": req.body.name },
        	}
      	)
    }

    res.status(200).json({ status: 'success', data: { ...resi } })
  } catch (error) {
    res.status(403).json({ status: 'failed', data: null })
  }
})

//for bnbpage
app.get('/mysubg/bnbpage', authenticateToken, async (req, res) => {
  try {
    const id = req.headers['id']
    // console.log(id);
    // console.log(req.user.root);
    // console.log(req.body);
    const resi = await Mysubg.findOne({
      root_email: req.user.email,
      _id: id
    })
    // console.log(resi);

    res.status(200).json({ status: 'success', data: { ...resi } })
  } catch (error) {
    res.status(403).json({ status: 'failed', data: null })
  }
})

//for joining
//for bnbpage

//for reports get
app.get('/mysubg/reports', authenticateToken, async (req, res) => {
  try {
    const id = req.headers['id']
    const resi = await Mysubg.findOne({
      root_email: req.user.email,
      _id: id
    })

    res
      .status(200)
      .json({ status: 'success', data: {reports:resi.reports, name: resi.name ,blocked:resi.blocked,posts:resi.posts} })
  } catch (error) {
    res.status(403).json({ status: 'failed', data: null })
  }
})

//for updating posts
app.patch('/mysubg/reports', authenticateToken, async (req, res) => {
	try {
	  const id = req.headers['id']
		// console.log(id)
	  const resi = await Mysubg.findOneAndUpdate({
		_id: id
	  },{$addToSet :{"reports" : req.body.data}})
  
	  res
		.status(200)
		.json({ status: 'success', data: resi.reports })
	} catch (error) {
	  res.status(403).json({ status: 'failed', data: null })
	}
  })

//for bnbpage patch
app.patch('/mysubg/bnbpage', authenticateToken, async (req, res) => {
  try {
    // console.log("hi");
    const id = req.headers['id']
    let resi
    if (req.body.flag === 'block') {
      resi = await Mysubg.findOneAndUpdate(
        {
          root_email: req.user.email,
          _id: id
        },
        {
          $pull: { blocked: req.body.remove },
          $addToSet: { unblocked: req.body.remove }
        }
      ).clone()
    } else {
		// console.log(req.user.email);
      resi = await Mysubg.findOneAndUpdate(
        {
          root_email: req.user.email,
          _id: id
        },
        {
          $addToSet: { blocked: req.body.remove },
          $pull: { unblocked: req.body.remove }
        }
      ).clone()
    }

    // console.log(resi);

    res.status(200).json({ status: 'success', data: { ...resi } })
  } catch (error) {
    res.status(403).json({ status: 'failed', data: null })
  }
})

//for subg
//for mysubg
app.get('/subg', authenticateToken, async (req, res) => {
  try {
    // console.log(req.user);
    const finder = await Mysubg.find({})
    res.status(200).json({ status: 'success', data: { ...finder } })
  } catch (error) {
    res.status(403).json({ status: 'failed', data: null })
  }
})

//update subg leave join
app.patch('/subg', authenticateToken, async (req, res) => {
  try {
    let resi
    if (req.body.flag == 'join') {
      const fir = await Task.findOne({
        email: req.user.email
      })
      const nam = fir.fname + ' ' + fir.lname

      resi = await Mysubg.findOne({
        _id: req.body.join,
        joining: { $elemMatch: { $elemMatch: { $in: req.user.email } } }
      })

      // console.log(resi)
      if (resi) {
        console.log('already present')
        res.status(400).send('error')
        return
      }
      resi = await Mysubg.findOneAndUpdate(
        { _id: req.body.join },
        { $addToSet: { joining: [nam, req.user.email] } }
      )
    }
    if (req.body.flag == 'leave') {
      const fir = await Task.findOne({
        email: req.user.email
      })
      const nam = fir.fname + ' ' + fir.lname

      resi = await Mysubg.findOneAndUpdate(
        { _id: req.body.join },
        { $pull: { people: [nam, req.user.email] } }
      )
      // console.log(resi)
      if (resi) {
        resi = await Mysubg.findOneAndUpdate(
          { _id: req.body.join },
          { $addToSet: { left_array: [nam, req.user.email] } }
        )
      }
    }
    // console.log("success");
    console.log('success')
    res.status(200).send('success')
  } catch (error) {
    console.log('fail')
    res.status(400).send('fail')
  }
})

//for opening a subgreddit
app.get('/subg/page', authenticateToken, async (req, res) => {
  try {
    const finder = await Mysubg.findOne({
      _id: req.headers['id']
    })
    res.status(200).json({ status: 'success', data: { ...finder } })
  } catch (error) {
    res.status(403).json({ status: 'failed', data: null })
  }
})

//for submiting a subgreddit post
app.patch('/subg/posts', authenticateToken, async (req, res) => {
  try {
    if (req.body.type === 'comment' || req.body.number) {
      // console.log("jai hind")
      const finder = await Mysubg.findOneAndUpdate(
        {
          _id: req.headers['id']
        },
        { $set: { posts: req.body.data } }
      )
      console.log('success')
      res.status(200).json({ status: 'success', data: { ...finder } })
    } else {
      const finder = await Mysubg.findOneAndUpdate(
        {
          _id: req.headers['id']
        },
        {
          $addToSet: {
            posts: {
              text: req.body.data,
              posted_by: req.user.email,
              posted_in: req.body.name,
              upvotes: [],
              downvotes: [],
              comments: []
            }
          }
        }
      )
      console.log(typeof req.headers['id'], finder)
      res.status(200).json({ status: 'success', data: { ...finder } })
    }

    // console.log("hello here")

    // console.log("ok")
  } catch (error) {
    res.status(403).json({ status: 'failed', data: null })
  }
})
//saved posts
app.patch('/save', authenticateToken, async (req, res) => {
  try {
    if (req.body.flag === 1) {
		const resi = await Task.findOneAndUpdate(
			{
			  email: req.user.email
			},
			{
			  $set: { saved: req.body.data }
			}
		  )
    } else {
      console.log(req.body.data)
      const resi = await Task.findOneAndUpdate(
        {
          email: req.user.email
        },
        {
          $addToSet: { saved: req.body.data }
        }
      )
    }

    res.status(200).send('success')
  } catch (error) {
    res.status(500).send('failed')
  }
})

app.patch('/ignore',authenticateToken,async(req,res)=>{
	console.log(req.body.data)
	console.log(req.body.id)
	try {
		const resi = await Mysubg.findOneAndUpdate({
			_id : req.body.id
		},{
			$set:{"reports":req.body.data}
			// $set:{"reports":{num:{"ignored":true}}}
		})
		// console.log("hi")
		res.status(200).send('success')
	} catch (error) {
		res.status(400).send('failure')
	}
})
//delete post
app.patch('/deletepost',authenticateToken,async(req,res)=>{
	// console.log(req.body.data)
	// console.log(req.body.id)
	try {
		const resi = await Mysubg.findOneAndUpdate({
			_id : req.body.id
		},{
			$set:{"posts":req.body.data}
			// $set:{"reports":{num:{"ignored":true}}}
		})
		// console.log("hi")
		res.status(200).send('success')
	} catch (error) {
		res.status(400).send('failure')
	}
})

const start = async () => {
  try {
    // to connect to the mongodb server
    await mongoose.connect(process.env.mongo_db_uri)
    app.listen(4000, console.log(`Server is listening on port ${4000}`))
  } catch (error) {
    console.log(error)
  }
}


// starting the server
start()
