var mongoose = require('mongoose');
var deepPopulate = require('mongoose-deep-populate')(mongoose);
var Questions = mongoose.model('Questions');
var Users = mongoose.model('Users');

module.exports = {
  index: function(req, res) {
    Questions.find({}).deepPopulate('_user').exec(function(err, questions){
      if(err){
        res.json(err);
      }
      else {
        res.json(questions);
      }
    })
  },
  create: function(req, res) {
    // console.log(req.body);
    Users.findOne({_id: req.params.id}, function(err, user){
      var question = new Questions({question: req.body.question, description: req.body.description, _user: user._id});
      question.save(function(err){
        if(err){
          console.log('Error occurred while saving your question', err);
        }
        else{
          user.questions.push(question._id);
          user.save(function(err) {
            if(err) {
              res.json({message: 'Error occurred while updating your info', error: user.errors});
            } else {
              console.log('your topic successfully added!', question);
              res.json(question);
            }
          });
        }
      });
    });
  },
  show: function(req, res) {
    Questions.findOne({_id: req.params.id}).deepPopulate('_user answers answers._user answers.answer').exec(function(err, questions){
        if(err){
          res.json(err);
        }
        else {
          res.json(questions);
        }
      })
  },
  find: function(req, res) {
    // console.log(req.body.search);
    Questions.find({question: new RegExp(req.body.search, 'i')}).deepPopulate('_user').exec(function(err, topics){
      if(err){
        res.json(err);
      }
      else {
        res.json(topics);
      }
    })
  }
}
