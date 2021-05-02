app.controller('authCtrl', function ($scope, $rootScope, $cookies, $routeParams, $location, $http, Data) {

    // Page title
    $scope.message = "Login";

    // Change the Title of the Page
    if($location.$$path == "/signup" ) {
        $scope.message = "Create an Account";
    }

    $scope.toggleLogin = function() {
        if($rootScope.loggedIn == false) { 
            $location.path('login');
        } else {
            $scope.logout();
            $rootScope.loggedIn = false;
        }
    }

    //initially set those objects to null to avoid undefined error
    $scope.login = {};
    $scope.signup = {};
    $scope.doLogin = function (customer) {
        Data.post('login', {
            customer: customer
        }).then(function (results) {
            if (results.status == "success") {
                $cookies.put('customer', JSON.stringify(results));
                $rootScope.loggedIn = true;
                $location.path('/');
            }
        });
    };

    $scope.signup = {email:'',password:'',firstName:'',lastName:''};
    $scope.signUp = function (customer) {
        Data.post('signup', {
            customer: customer
        }).then(function (results) {
            Data.toast(results);
            if (results.status == "success") {
                $location.path('login');
            }
        });
    };

    $scope.logout = function () {
        Data.get('logout').then(function (results) {
            Data.toast(results);
            $location.path('login');
        });
    }

//    $scope.cartQuantity = function () {
//        console.log($scope.quantity);
//        $cookieStore.put("quantity", $scope.quantity);
//    }
});
