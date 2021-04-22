var app = angular.module('myApp', ['ngRoute', 'ngCookies']);

app.service('sharedProperties', function () {
    var title = [];

    return {
        getProperty: function() {
            return title;
        },
        setProperty: function(value) {
            title.push(value);
        }
    };
});

app.config(function($routeProvider) {
$routeProvider
 
.when('/', {
    templateUrl : 'pages/home.html',
    controller : 'HomeController'
})
 
.when('/login', {
    templateUrl : 'pages/login.html',
    controller : 'LoginController'
})

.when('/create/account', {
    templateUrl : 'pages/createAccount.html',
    controller : 'NewAccountController'
})

.when('/clothing/tshirt', {
    templateUrl : 'pages/tshirt.html',
    controller : 'TshirtController'
})

.when('/food/pizza', {
    templateUrl : 'pages/tshirt.html',
    controller : 'FoodController'
})

.when('/computer', {
    templateUrl : 'pages/tshirt.html',
    controller : 'ComputerController'
})

.otherwise({redirectTo: '/'});
});

app.controller('HomeController', function($scope, sharedProperties) {
    $scope.message = "Welcome to Ronny and Tyler's Shop!";

    function setItem($item) {
        sharedProperties.setProperty($item);
        $scope.item_name = sharedProperties.getProperty();
    }

    setItem("Clothing");
    setItem("Food");
    setItem("Computer");
});
     
app.controller('LoginController', function($scope, $cookies) {

    $scope.SetCookies = function () {
        $cookies.put("username", 'changt');
        console.log($cookies);
    };

    $scope.GetCookies = function () {
        console.log($cookies.get('username'));
    };

    $scope.ClearCookies = function () {
        $cookies.remove('username');
    };
});

app.controller('NewAccountController', function($scope) {
    $scope.message = "Create an Account Now!";
});

app.controller('TshirtController', function($scope) {
    $scope.message = "T-Shirts";
});

app.controller('FoodController', function($scope) {
    $scope.message = "Food";
});

app.controller('ComputerController', function($scope) {
    $scope.message = "Computer";
});