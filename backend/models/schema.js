const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	fname:{
		type:String,
		trim:true
	},
	lname:{
		type:String,
		trim:true
	},
	contact:{
		type:String,
		trim:true
	},
	age:{
		type:Number,
	},
	email:{
		type:String
	}
	,
	username:{
		type:String,
		trim:true
	},
	password:{
		type:String,
	},
	saved:{
		type : Array,
	}
});

const followSchema = new mongoose.Schema({
	email:{
		type:String,
		trim:true
	},
	followers:{
		type:Array
	},
	following:{
		type:Array
	}
});

const mysubgSchema = new mongoose.Schema({
	root_email:{
		type:String
	},
	creation_date:{
		type:Date
	},
	people:{
		type:Array
	},
	posts:{
		type:Array
	},
	name:{
		type:String,
		trim:true
	},
	description:{
		type:String,
		trim:true
	},
	tags:{
		type:String,
		trim:true
	},
	banned:{
		type:String,
		trim:true
	},
	blocked:{
		type:Array
	},
	unblocked:{
		type:Array
	},
	joining:{
		type:Array,
		trim:true
	},
	reports:{
		type:Array
	},
	left_array:{
		type:Array
	}
});

//in reports
/*
{
	postid,reportedto,reportedby,
	concern,text
}
*/
const Task = mongoose.model('UserData',userSchema);
const Follow = mongoose.model('FollowData',followSchema);
const Mysubg = mongoose.model('mysubgData',mysubgSchema);
module.exports = {Task,Follow,Mysubg};