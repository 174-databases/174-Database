var app = angular.module('myApp', ['ngRoute', 'ngCookies', 'ngAnimate', 'toaster', 'ngSanitize']);
const computerKeys = ['SKU', 'price', 'details', 'stockCount', 'brand', 'isLaptop'];
const pizzaKeys = ['SKU', 'price', 'details', 'stockCount', 'orderNumber', 'type'];
const tShirtKeys = ['SKU', 'price', 'details', 'stockCount', 'size', 'color'];

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

.when('/clothing', {
    templateUrl : 'pages/clothing.html',
    controller : 'ClothingController'
})

.when('/clothing/tshirt/:SKU', {
    templateUrl : 'pages/tshirt.html',
    controller : 'TshirtController'
})

.when('/food', {
    templateUrl : 'pages/food.html',
    controller : 'FoodController'
})

.when('/food/pizza/:SKU', {
    templateUrl : 'pages/pizza.html',
    controller : 'PizzaController'
})

.when('/computer', {
    templateUrl : 'pages/computer.html',
    controller : 'ComputerController'
})

.when('/computer/laptop/:SKU', {
    templateUrl : 'pages/laptop.html',
    controller : 'LaptopController'
})

.when('/computer/desktop/:SKU', {
    templateUrl : 'pages/desktop.html',
    controller : 'DesktopController'
})

.when('/cart', {
    templateUrl : 'pages/cart.html',
    controller : 'CartController'
})
.when('/buys', {
    templateUrl : 'pages/buys.html',
    controller : 'BuysController'
})

.otherwise({redirectTo: '/'});
});

app.run(function ($rootScope, $location, $cookies, $sce, Data) {
    if ($cookies.get('cart') == null) $cookies.put('cart', JSON.stringify([]))
    $rootScope.getQuantity = () => {
        let cart = JSON.parse($cookies.get('cart'));
        let length = 0;
        for (let item of cart) {
            length += item.quantity;
        }
        return length;
    };
    $rootScope.updateCartIcon = () => {
        if($rootScope.getQuantity() >  0) {
            $rootScope.cart = $sce.trustAsHtml("<i class='fa' aria-hidden='true' style='padding: 15px 0px;'>&#xf07a;</i><span class='badge badge-warning' id='lblCartCount'>"+ $rootScope.getQuantity() +"</span>");
        } else {
            $rootScope.cart = $sce.trustAsHtml("<i class='fa' aria-hidden='true' style='padding: 15px 15px;'>&#xf07a;</i>");
        }
    }
    $rootScope.updateCartIcon();
    $rootScope.removeCart = () => {
        $cookies.remove('cart');
        $cookies.put('cart', JSON.stringify([]))
        $rootScope.updateCartIcon();
    }
    $rootScope.addToCart = (item, quantity) => {
        if (isNaN(quantity)) return;
        quantity = parseInt(quantity);
        let cart = JSON.parse($cookies.get('cart'));
        let found = cart.find(e => e.item.SKU == item.SKU);
        if (!found) {
            cart.push({item, quantity});
            $cookies.put('cart', JSON.stringify(cart));
        } else {
            found.quantity += quantity
            $cookies.put('cart', JSON.stringify(cart));
        }
        $rootScope.updateCartIcon();
        console.log(JSON.parse($cookies.get('cart')));
    }

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

                /*
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
                */
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

app.controller('TshirtController', function($rootScope, $scope, $cookies, $routeParams, Data) {
    $scope.message = "Clothing";
    $scope.item = {shirt: {quantity:1}};

    Data.get('shirtDetails/' + $routeParams.SKU).then(res => {
        $scope.shirt = {};
        res = res[0];
        for (let i in tShirtKeys) {
            $scope.shirt[tShirtKeys[i]] = res[i];
        }
        //$rootScope.addToCart($scope.shirt, 4);

    });

});
app.controller('ClothingController', function($rootScope, $scope, $location, $interval, $http, Data) {
    Data.get('tshirts').then(res => {
        $scope.tshirts = [];
        for (let r of res) {
            let d = {};
            for (let i in tShirtKeys) {
                d[tShirtKeys[i]] = r[i];
            }
            $scope.tshirts.push(d);
        }
    });

    $scope.message = "Clothing";
    $scope.section_title = [];
    $scope.section_title.push("TShirts");
});
app.controller('FoodController', function($rootScope, $scope, $location, $interval, $http, Data) {
    Data.get('pizzas').then(res => {
        $scope.pizzas = [];
        for (let r of res) {
            let d = {};
            for (let i in pizzaKeys) {
                d[pizzaKeys[i]] = r[i];
            }
            $scope.pizzas.push(d);
        }
    });

    $scope.message = "Food";
    $scope.section_title = [];
    $scope.section_title.push("Pizzas");
    $scope.section_title.push("Laptop");
});

app.controller('PizzaController', function($rootScope, $scope, $cookies, $routeParams, Data) {
    $scope.message = "Food";
    $scope.item = {pizza: {quantity:1}};
    Data.get('pizzaDetails/' + $routeParams.SKU).then(res => {
        $scope.pizza = {};
        res = res[0];
        for (let i in pizzaKeys) {
            $scope.pizza[pizzaKeys[i]] = res[i];
        }
    });

    /*
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
    */
});


app.controller('ComputerController', function($rootScope, $scope, $location, $interval, $http, Data) {
    Data.get('computers').then(res => {
        $scope.desktops = [];
        $scope.laptops = [];
        for (let r of res) {
            let d = {};
            for (let i in computerKeys) {
                d[computerKeys[i]] = r[i];
            }
            if (d.isLaptop == 1) {
                $scope.laptops.push(d);
            } else {
                $scope.desktops.push(d);
            }
        }
    });

    $scope.message = "Computer";
    $scope.section_title = [];
    $scope.section_title.push("Desktop");
    $scope.section_title.push("Laptop");
});

app.controller('LaptopController', function($rootScope, $scope, $cookies, $routeParams, Data) {
    $scope.message = "Laptop";
    $scope.item = {laptop: {quantity:1}};
    Data.get('computerDetails/' + $routeParams.SKU).then(res => {
        $scope.computer = {};
        res = res[0];
        for (let i in computerKeys) {
            $scope.computer[computerKeys[i]] = res[i];
        }

    });
});

app.controller('DesktopController', function($rootScope, $scope, $cookies, $routeParams, Data) {
    $scope.message = "Desktop";
    $scope.item = {desktop: {quantity:1}};
    Data.get('computerDetails/' + $routeParams.SKU).then(res => {
        $scope.computer = {};
        res = res[0];
        for (let i in computerKeys) {
            $scope.computer[computerKeys[i]] = res[i];
        }

    });

    /*
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
    */
});

app.controller('CartController', function($rootScope, $scope, $location, $cookies, Data) {
    $scope.message = "Checkout";
    $scope.cart = JSON.parse($cookies.get('cart'));
    $scope.total = $scope.cart.reduce((acc, v) => (parseFloat(acc) + parseFloat(v.item.price) * parseFloat(v.quantity)).toFixed(2), 0);
    $scope.removeCart =() => {
        $scope.total = 0;
        $rootScope.removeCart();
        $scope.cart = JSON.parse($cookies.get('cart'));
    };
    console.log($cookies.getAll());
    $scope.checkout = function () {
        let customer = JSON.parse($cookies.get('customer'));
        let cart = $scope.cart;
        Data.post('checkout', {
            customer: customer,
            cart: cart
        }).then(function (results) {
            Data.toast(results);
            $scope.removeCart();
            console.log(results);
            $location.path('/buys');
        }).catch(err => {
            console.error(err);
        });;
    }
});

app.controller('BuysController', function($rootScope, $scope, $cookies, Data) {
    $scope.message = "Purchases";
    let customer = JSON.parse($cookies.get('customer'));
    let cart = $scope.cart;
    Data.get('buys/'+customer.id).then(function (results) {
        let buys = [];
        for (let r of results) {
            let buy = {};
            buy.quantity = r[2];
            buy.price = r[4];
            buy.itemType = r[7];
            buys.push(buy);
        }
        $scope.buys = buys;
        $scope.total = $scope.buys.reduce((acc, v) => (parseFloat(acc) + parseFloat(v.price) * parseFloat(v.quantity)).toFixed(2), 0);
        console.log(results);
    });
            //$location.path('/');
});
