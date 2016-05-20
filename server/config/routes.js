var users = require('../controllers/users.js');
var questions = require('../controllers/questions.js');
var answers = require('../controllers/answers.js');

module.exports = function(app) {
  app.get('/users', function(req, res) {
    users.index(req, res);
  })

  app.post('/find_user', function(req, res) {
    users.find(req, res);
  })

  app.post('/create_user', function(req, res) {
    users.create(req, res);
  })

  app.get('/session_user', function(req,res){
    users.session_user(req,res)
  })

  app.get('/questions', function(req, res) {
    questions.index(req, res);
  })

  app.get('/logout', function(req,res){
    users.logout(req,res)
  })

  app.post('/create_question/:id', function(req, res) {
    questions.create(req, res);
  })

  app.get('/get_question/:id', function(req, res) {
    questions.show(req, res);
  })
  app.post('/create_answer/:id', function(req, res) {
    answers.create(req, res);
  })

  app.post('/increase_like/:id', function(req, res) {
    answers.update_like(req, res);
  })
  
}
