var app = angular.module('myApp', ['ngRoute', 'ngCookies', 'ngAnimate', 'toaster', 'ngSanitize']);

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
    controller : 'authCtrl'
})

.when('/logout', {
    templateUrl : 'pages/logout.html',
    controller : 'authCtrl'
})

.when('/signup', {
    templateUrl : 'pages/signup.html',
    controller : 'authCtrl'
})

.when('/password', {
    templateUrl : 'pages/password.html',
    controller : 'PasswordController'
})

.when('/settings', {
    templateUrl : 'pages/settings.html',
    controller : 'SettingsController'
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

.when('/cart', {
    templateUrl : 'pages/cart.html',
    controller : 'CartController'
})

.otherwise({redirectTo: '/'});
});

app.run(function ($rootScope, $location, $cookies, $sce, Data) {
    $rootScope.$on("$routeChangeStart", function (event, next, current) {
        $rootScope.authenticated = false;
        Data.get('session').then(function (results) {
            if (results.id) {
                $rootScope.authenticated = true;
                $rootScope.id = results.id;
                $rootScope.firstName = results.firstName;
                $rootScope.lastName = results.lastName;
                $rootScope.email = results.email;
                $rootScope.loggedIn = true;

                // Define Item Global Variables
                $rootScope.item = [];

                // Shirt Items
                // Automatically get customer ID and set default values for T-Shirt
                $rootScope.shirt = {type:'shirt',id:results.id,sku:101,color:'red',size:'medium',quantity:1,price:4.99};
                $rootScope.item.shirt = $rootScope.shirt;

                for(var i in $rootScope.item) {
                    $cookies.putObject("item", JSON.stringify($rootScope.item[i]));
                }
                $rootScope.shirt_quantity = $cookies.get("shirt_quantity");
                $rootScope.shirt_price = $cookies.get("shirt_price");
                $rootScope.getItemCookies = JSON.parse($cookies.getObject("item"));

                if($rootScope.shirt_quantity == undefined) {
                    $rootScope.shirt_quantity = 0;
                    $rootScope.shirt_price = 0;
                    $rootScope.total = 0;
                }
                console.log($rootScope.shirt_quantity)

                // Cart Global Variables
                $rootScope.quantity = $rootScope.shirt_quantity; // add all quantities
                $rootScope.total = parseFloat($rootScope.shirt_price) * $rootScope.shirt_quantity;
                console.log($rootScope.quantity)
                // Set Cart Icon for Navbar
                if($rootScope.quantity != 0) {
                    $rootScope.cart = $sce.trustAsHtml("<i class='fa' aria-hidden='true' style='padding: 15px 0px;'>&#xf07a;</i><span class='badge badge-warning' id='lblCartCount'>"+ $rootScope.quantity +"</span>");
                } else {
                    $rootScope.cart = $sce.trustAsHtml("<i class='fa' aria-hidden='true' style='padding: 15px 15px;'>&#xf07a;</i>");
                }
            } else {
                var nextUrl = next.$$route.originalPath;
                if (nextUrl == '/signup' || nextUrl == '/password' || nextUrl == '/login') {
                } else {
                    $location.path("/login");
                    $rootScope.loggedIn = false;
                }
            }
        });
    });
    console.log(Data.get('session'));
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

app.controller('SettingsController', function($rootScope, $scope, $location, $interval, $http, Data) {
    $scope.message = "Account Settings";

    // Automatically get first name and email to display on UI
    Data.get('session').then(function (results) {
        if (results.id) {
            $rootScope.firstName = results.firstName;
            $rootScope.email = results.email;
        }
    });

    // Automatically detect first name changes
    Data.get('getFirstName').then(function (results) {
        $rootScope.firstName = results;
    });

    // Function to update user's first name
    $scope.updateAccount = {email:'',name:''};
    $scope.updateAccount = function (customer) {
        customer.email = $rootScope.email;
        Data.post('updateAccount', {
            customer: customer
        }).then(function (results) {
            Data.toast(results);
            if (results.status == "success") {
                $location.path('/');
            }
        });
    };
});

app.controller('PasswordController', function($scope, $location, $http, Data) {
    $scope.message = "Reset Password";
});

app.controller('TshirtController', function($rootScope, $scope, $location, $cookies, $sce, $http, Data) {
    $scope.message = "Clothing";

    $(document).ready(function() {
        $('.color-choose input').on('click', function() {
            var tshirtColor = $(this).attr('data-image');
       
            $('.active').removeClass('active');
            $('.left-column img[data-image = ' + tshirtColor + ']').addClass('active');
            $(this).addClass('active');
        });
      });

    $scope.addToCart = function (item) {
        // Determine SKU
        if(item.color) {
            switch (item.color) {
                case "blue":
                    $rootScope.item.shirt.sku = item['sku'] = 102;
                    break;
                case "white":
                     $rootScope.item.shirt.sku = item['sku'] = 103;
                     break;
                case "black":
                    $rootScope.item.shirt.sku = item['sku'] = 104;
                    break;
                default: $scope.item.shirt.sku = item['sku'] = 101; break;
            }
        }

        // Set Cookies
        for(var i in item) {
            $cookies.put("shirt_"+i, item[i]);
        }

        // Store shirt quantity
        $rootScope.shirt_quantity = $cookies.get("shirt_quantity");
        // Store shirt price
        $rootScope.shirt_price = $cookies.get("shirt_price");

        // Update Cart Icon for Navbar
        if($rootScope.shirt_quantity != 0) {
//            $rootScope.quantity += $rootScope.shirt_quantity;
            $rootScope.cart = $sce.trustAsHtml("<i class='fa' aria-hidden='true' style='padding: 15px 0px;'>&#xf07a;</i><span class='badge badge-warning' id='lblCartCount'>"+ $rootScope.shirt_quantity +"</span>");
        } else {
//            $rootScope.quantity -= $rootScope.shirt_quantity;
            $rootScope.cart = $sce.trustAsHtml("<i class='fa' aria-hidden='true' style='padding: 15px 15px;'>&#xf07a;</i>");
        }
    };
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

app.controller('CartController', function($rootScope, $scope) {
    $scope.message = "Checkout";
    $scope.cartItem = "<p><a href='#'>"+ $rootScope.getItemCookies.type +"</a> <span class='price'>"+ $rootScope.shirt_price +"</span></p>";
});