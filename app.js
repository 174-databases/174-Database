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
                if(!$rootScope.shirt) {
                    $rootScope.shirt = {type:'shirt',id:results.id,sku:101,color:'red',size:'medium',quantity:1,price:4.99};
                }
                $rootScope.item.shirt = $rootScope.shirt;

                // Pizza Items
                // Automatically get customer ID and set default values for Pizza
                if(!$rootScope.pizza) {
                    $rootScope.pizza = {type:'pizza',id:results.id,sku:105,quantity:1,price:9.99};
                }
                $rootScope.item.pizza = $rootScope.pizza;

                // Laptop Items
                // Automatically get customer ID and set default values for Pizza
                if(!$rootScope.laptop) {
                    $rootScope.laptop = {type:'laptop',id:results.id,sku:106,quantity:1,price:109.99};
                }
                $rootScope.item.laptop = $rootScope.laptop;

                // Desktop Items
                // Automatically get customer ID and set default values for Pizza
                if(!$rootScope.desktop) {
                    $rootScope.desktop = {type:'desktop',id:results.id,sku:107,quantity:1,price:299.99};
                }
                $rootScope.item.desktop = $rootScope.desktop;

                for(var i in $rootScope.item) {
                    console.log($rootScope.item[i])
                }

                // Set Global Variables from cookies
                $rootScope.shirt_quantity = $cookies.get("shirt_quantity");
                $rootScope.shirt_price = $cookies.get("shirt_price");
                $rootScope.pizza_quantity = $cookies.get("pizza_quantity");
                $rootScope.pizza_price = $cookies.get("pizza_price");
                $rootScope.laptop_quantity = $cookies.get("laptop_quantity");
                $rootScope.laptop_price = $cookies.get("laptop_price");
                $rootScope.desktop_quantity = $cookies.get("desktop_quantity");
                $rootScope.desktop_price = $cookies.get("desktop_price");


                // Set Default Values for tshirt
                if($rootScope.shirt_quantity == undefined) {
                    $rootScope.shirt_quantity = 0;
                    $rootScope.shirt_price = 0;
                    $rootScope.total = 0;
                }

                if($rootScope.pizza_quantity == undefined) {
                    $rootScope.pizza_quantity = 0;
                    $rootScope.prize_price = 0;
                    $rootScope.total = 0;
                }

                // Cart Global Variables
                $rootScope.quantity = parseInt($rootScope.shirt_quantity) + parseInt($rootScope.pizza_quantity); // add all quantities
                $rootScope.total = parseFloat($rootScope.shirt_price) * $rootScope.shirt_quantity;
                $rootScope.item.url = "#/clothing/tshirt";

                // Set Cart Icon for Navbar
                if($rootScope.quantity != 0) {
                    $rootScope.cart = $sce.trustAsHtml("<i class='fa' aria-hidden='true' style='padding: 15px 0px;'>&#xf07a;</i><span class='badge badge-warning' id='lblCartCount'>"+ $rootScope.quantity +"</span>");
                    $rootScope.cartItem = "<th class='table'><a href="+ $rootScope.item.url +"><img src='images/tshirt_red.jpg' class='cartImage'><br>" + $rootScope.item['shirt'].color + ' ' +$rootScope.item['shirt'].type +"</a></th><th><input type='text'>"+ $rootScope.shirt_quantity +"</th><th><span class='price'>"+ $rootScope.shirt_price +"</span></th>";

                } else {
                    $rootScope.cartItem = "";
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

        // Update Global shirt Variable
        $rootScope.shirt = item;
        console.log($rootScope.shirt)

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

app.controller('FoodController', function($rootScope, $scope, $cookies) {
    $scope.message = "Food";

    $scope.addToCart = function (item) {
        // Determine SKU
        console.log($rootScope.item)

        // Set Cookies
        for(var i in item) {
            $cookies.put("pizza_"+i, item[i]);
        }

        // Store shirt quantity
        $rootScope.pizza_quantity = $cookies.get("pizza_quantity");
        // Store shirt price
        $rootScope.pizza_price = $cookies.get("pizza_price");
    };
});

app.controller('ComputerController', function($scope) {
    $scope.message = "Computer";
    $scope.section_title = [];
    $scope.section_title.push("Desktop");
    $scope.section_title.push("Laptop");
});

app.controller('LaptopController', function($rootScope, $scope, $cookies) {
    $scope.message = "Laptop";

    $scope.addToCart = function (item) {
            // Determine SKU
            console.log($rootScope.item)

            // Set Cookies
            for(var i in item) {
                $cookies.put("laptop_"+i, item[i]);
            }

            // Store Laptop quantity
            $rootScope.laptop_quantity = $cookies.get("laptop_quantity");
            // Store Laptop price
            $rootScope.laptop_price = $cookies.get("laptop_price");
        };

});

app.controller('DesktopController', function($rootScope, $scope, $cookies) {
    $scope.message = "Desktop";

    $scope.addToCart = function (item) {
        // Determine SKU
        console.log($rootScope.item)

        // Set Cookies
        for(var i in item) {
            $cookies.put("desktop_"+i, item[i]);
        }

        // Store Desktop quantity
        $rootScope.desktop_quantity = $cookies.get("desktop_quantity");
        // Store Desktop price
        $rootScope.desktop_price = $cookies.get("desktop_price");
    };
});

app.controller('CartController', function($rootScope, $scope, $cookies) {
    $scope.message = "Checkout";
    console.log($cookies.get("shirt_quantity"));
    console.log($cookies.get("pizza_quantity"));
    console.log($cookies.get("laptop_quantity"));
    console.log($cookies.get("desktop_quantity"));
    $scope.checkout = function () {
        Data.post('checkout', {
            customer: customer
        }).then(function (results) {
            Data.toast(results);
            if (results.status == "success") {
                $location.path('/');
            }
        });
    }
});