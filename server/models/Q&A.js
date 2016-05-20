var mongoose = require('mongoose');
var path = require('path');

// create mongoose schema
var Users = new mongoose.Schema({
  name: String,
  questions: [{type: mongoose.Schema.Types.ObjectId, ref: 'Questions'}],
  answers: [{type: mongoose.Schema.Types.ObjectId, ref: 'Answers'}]
}, {timestamps: true});

var Questions = new mongoose.Schema({
  _user: {type: mongoose.Schema.Types.ObjectId, ref: 'Users'},
  question: String,
  description: String,
  answers: [{type: mongoose.Schema.Types.ObjectId, ref: 'Answers'}]
}, {timestamps: true});

var Answers = new mongoose.Schema({
  _user: {type: mongoose.Schema.Types.ObjectId, ref: 'Users'},
  _question: {type: mongoose.Schema.Types.ObjectId, ref: 'Questions'},
  answer: String,
  support: String,
  like: Number
}, {timestamps: true});

// we can add validations using the .path() method.
Users.path('name').required(true, 'Please enter your name to login');
Questions.path('question').required(true, 'Question field cannot be blank');
Answers.path('answer').required(true, 'Answer field cannot be blank');

var deepPopulate = require('mongoose-deep-populate')(mongoose);
Questions.plugin(deepPopulate);

mongoose.model('Users', Users);
mongoose.model('Questions', Questions);
mongoose.model('Answers', Answers);
