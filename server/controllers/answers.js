var mongoose = require('mongoose');
var Answers = mongoose.model('Answers');
var Questions = mongoose.model('Questions');
var Users = mongoose.model('Users');

module.exports = {
  create: function(req, res) {
    // console.log(req.body, req.params.id);
    Questions.findOne({_id: req.params.id}, function(err, question){
      var answer = new Answers({answer: req.body.answer, support: req.body.support, like: 0, _user: req.body.answerer_id, _question: req.body.question_id});
      answer.save(function(err){
        if(err){
          console.log('Error occurred while saving your post', err);
        }
        else{
          question.answers.push(answer._id);
          question.save(function(err, question) {
            if(err) {
              res.json({message: 'Error occurred while updating the question info', error: question.errors});
            } else {
              Users.findOne({_id: req.body.answerer_id}, function(err, user){
                user.answers.push(answer._id);
                user.save(function(err, user) {
                  if(err) {
                    res.json({message: 'Error occurred while updating your info', error: user.errors});
                  }
                  else {
                    res.json(answer);
                  }
                })
              });
            }
          });
        }
      });
    });
  },
  update_like: function(req, res) {
    Answers.update({_id: req.params.id}, {$inc: {like: 1}}, function(err, answer) {
      if(err){
        console.log(err);
      }
      else{
        console.log('successfully increased LIKE');
        res.json(answer);
      }
    })
  }
}
