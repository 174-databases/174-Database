app.controller('authCtrl', function ($scope, $rootScope, $routeParams, $location, $http, Data) {

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
            Data.toast(results);
            if (results.status == "success") {
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
});