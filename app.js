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
    templateUrl : 'pages/food.html',
    controller : 'FoodController'
})

.when('/computer', {
    templateUrl : 'pages/computer.html',
    controller : 'ComputerController'
})

.when('/computer/laptop', {
    templateUrl : 'pages/laptop.html',
    controller : 'LaptopController'
})

.when('/computer/desktop', {
    templateUrl : 'pages/desktop.html',
    controller : 'DesktopController'
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
    $scope.message = "Login";

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
    $scope.message = "Clothing";
    $scope.entities = [{
        name: 'Small',
        checked: false
      }, {
        name: 'Medium',
        checked: false
      }, {
        name: 'Large',
        checked: true
      }
    ];

    $(document).ready(function() {
        $('.color-choose input').on('click', function() {
            var tshirtColor = $(this).attr('data-image');
       
            $('.active').removeClass('active');
            $('.left-column img[data-image = ' + tshirtColor + ']').addClass('active');
            $(this).addClass('active');
        });
      });

    // Only select one size
    $scope.updateSelection = function(position, entities) {
        angular.forEach(entities, function(subscription, index) {
          if (position != index) 
            subscription.checked = false;
        });
    }
});

app.controller('FoodController', function($scope) {
    $scope.message = "Food";
});

app.controller('ComputerController', function($scope) {
    $scope.message = "Computer";
    $scope.section_title = [];
    $scope.section_title.push("Desktop");
    $scope.section_title.push("Laptop");
});

app.controller('LaptopController', function($scope) {
    $scope.message = "Laptop";
});

app.controller('DesktopController', function($scope) {
    $scope.message = "Desktop";
});