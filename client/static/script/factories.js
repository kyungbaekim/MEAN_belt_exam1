Q_A.factory('userFactory', function($http){
  var sessionUser = {};
  var factory = {};

  factory.index = function(callback) {
    $http.get('/users').success(function(data) {
      users = data;
      callback(users);
    })
  }
  factory.userLogin = function(User, callback) {
    $http.post('/find_user', User).success(function(data) {
      if(!data){
        $http.post('/create_user', User).success(function(user){
          sessionUser = {message: 'user successfully added', user: user};
          callback(sessionUser);
        })
      }
      else {
        sessionUser = {message: 'user already exists', data: data};
        callback(sessionUser);
      }
    })
  }
  factory.getUser = function(callback){
    $http.get('/session_user').success(function(user){
      sessionUser = user;
      callback(sessionUser)
    })
  }
  factory.logout = function(callback){
    $http.get('/logout').success(function(data){
      if(data.status){
        sessionUser = data.sessionUser
      }
      callback(data)
    })
  }
  return factory;
});

Q_A.factory('questionFactory', function($http){
  var questions = [];
  var factory = {};

  factory.index = function(callback) {
    $http.get('/questions').success(function(data) {
      // console.log('Data received successfully');
      questions = data;
      callback(questions);
    })
  }
  factory.addQuestion = function(newQuestion, callback){
    $http.post('/create_question/' + newQuestion.id, newQuestion).success(function(question){
      $http.get('/questions').success(function(data) {
        questions = data;
        callback(questions);
      })
    });
  }
  factory.getQuestion = function(question, callback){
    // console.log(topic.id)
    $http.get('/get_question/' + question.id).success(function(data){
      question = data;
      callback(question);
    });
  }
  factory.searchTopic = function(Topic, callback) {
    // console.log('Sending search product request', Topic);
    $http.post('/search_topic', Topic).success(function(data) {
      topics = data;
      callback(topics);
    })
  }
  return factory;
});

Q_A.factory('answerFactory', function($http){
  var question = [];
  var factory = {};
  factory.addAnswer = function(newAnswer, callback){
    console.log(newAnswer);
    $http.post('/create_answer/' + newAnswer.question_id, newAnswer).success(function(answer){
      $http.get('/get_question/' + question._id).success(function(data) {
        question = data;
        callback(question);
      })
    })
  }
  factory.likeAnswer = function(Answer, question, callback){
    console.log(Answer, question);
    $http.post('/increase_like/' + Answer.answer_id).success(function(answer){
      console.log('Successfully increased LIKE!');
      $http.get('/get_question/' + question._id).success(function(data) {
        question = data;
        callback(question);
      })
    });
  }
  return factory;
});
