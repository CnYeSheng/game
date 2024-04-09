var app = angular.module('MyApp', ['chieffancypants.loadingBar', 'ui.bootstrap', 'ngAnimate']);
app.controller("MyCtrl", ['$scope', function ($scope) {
  $scope.max = 7;
  $scope.maxP = 100;
  $scope.number = 0;
  $scope.numberP = 0;
  $scope.process = 0;
  $scope.word1 = "";
  $scope.word2 = "";
  $scope.setuped = false;
  $scope.assigning = false;
  $scope.prompt = "抽題";

  $scope.list = [];

  $scope.random = function() {
    return 0.5 - Math.random();
  }

  $scope.setup = function() {
    $scope.list = [];
    var n = Math.floor((Math.random()*2)+1);
    if(n==1){
      a = $scope.word1;
      b = $scope.word2;
    } else {
      a = $scope.word2;
      b = $scope.word1;
    }
    $scope.list.push(a);
    for(i=1;i<$scope.max;i++){
      $scope.list.push(b);
    }
    $scope.list.sort(function() {
       return Math.random() - 0.5;
    });

    $scope.setuped = true;
    console.log($scope.list);
  }

  $scope.assign = function() {
    if($scope.number == $scope.max){
      $scope.status = "分發完畢";
    } else if($scope.assigned == true  ){
      $scope.status = "請傳給下一位";
      $scope.prompt = "抽題";
      $scope.assigned = false;
    } else {
      $scope.prompt = "了解";
      $scope.assigning = true;
      $scope.assigned = true;
      $scope.status = $scope.list[$scope.number++];
      $scope.numberP = $scope.number/$scope.max*100;
    }
  }

  $scope.reset = function() {
    $scope.setuped = false;
    $scope.assigning = false;
    $scope.assigned = true;
    $scope.status = "";
    $scope.numberP = 0;
    $scope.number = 0;

    $scope.process = 0;
    $scope.word1 = "";
    $scope.word2 = "";
    $scope.list = [];
  }

}])