var Q_A = angular.module('Q&A', ['ngRoute']);
Q_A.config(function ($routeProvider) {
  $routeProvider
    .when('/',{
      templateUrl: 'partials/dashboard.html'
    })
    .when('/index',{
      templateUrl: 'partials/login.html'
    })
    .when('/new_question',{
      templateUrl: 'partials/new_question.html'
    })
    .when('/question/:id',{
      templateUrl: 'partials/question.html'
    })
    .when('/question/:id/:keyword',{
      templateUrl: 'partials/new_answer.html'
    })
      redirectTo: '/'
    });
