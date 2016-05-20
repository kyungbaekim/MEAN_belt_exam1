Q_A.controller('UsersController', function(userFactory, $scope, $location){
  $('#name').focus();
  userFactory.getUser(function(info){
    $scope.user = info
    console.log($scope.user);
    if($scope.user.sessionUser.loggedIn == false){
      $location.url('/index')
    }
  });
  $scope.login = function(){
    if(Object.keys($scope.user).length > 0){
      userFactory.userLogin($scope.user, function(data) {
        $location.url('/')
      });
    }
    else {
      $location.url('/index')
      $('#name').focus();
    }
  }
  $scope.logout = function(){
    userFactory.logout(function(info){
      if(!info.sessionUser.loggedIn){
        $scope.user = info.sessionUser
        $location.url('/index')
      }
      else {
        $scope.error = {message: 'logout failed'}
      }
    })
  };
});

Q_A.controller('QuestionsController', function(userFactory, questionFactory, answerFactory, $scope, $location, $routeParams){
  // console.log($routeParams);
  if($routeParams.id){
    questionFactory.getQuestion($routeParams, function(data){
      console.log(data);
      $scope.question = data;
    });
  } else {
    questionFactory.index(function(data) {
      $scope.questions = data;
      console.log($scope.questions);
      $('#question').focus();
    });
  }
  userFactory.getUser(function(info){
    $scope.user = info
    console.log($scope.user);
    if($scope.user.sessionUser.loggedIn == false){
      $location.url('/index')
    }
  });
  $scope.addQuestion = function(){
    if($scope.new_question.question.length > 9){
      var user_id = {id: $scope.user.sessionUser.id};
      questionFactory.addQuestion(angular.extend($scope.new_question, user_id), function(data){
        $scope.questions = data;
        $scope.new_question = {};
        $scope.question_error = {};
        $location.url('/');
      })
    }
    else {
      $scope.question_error = {message: 'Your question must be at least 10 characters'};
    }
  }
  $scope.searchQuestion = function(){
    // console.log($scope.topic);
    questionFactory.searchQuestion($scope.question, function(data){
      $scope.questions = data;
    });
  };
  $scope.addAnswer = function(){
    if($scope.new_answer.answer.length > 4){
      var info = {question_id: $scope.question._id, answerer_id: $scope.user.sessionUser.id}
      answerFactory.addAnswer(angular.extend($scope.new_answer, info), function(data){
        $scope.question = data;
        $scope.answer_error = {};
        $location.url('/');
      })
    }
    else {
      $scope.answer_error = {message: 'Your answer must be at least 5 characters'};
    }
  }
  $scope.likeAnswer = function(answer){
    // console.log(answer);
    var answer_id = {answer_id: answer};
    answerFactory.likeAnswer(answer_id, $scope.question, function(data){
      $scope.question = data;
    })
  }
});
