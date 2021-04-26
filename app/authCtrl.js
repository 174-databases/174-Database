app.controller('authCtrl', function ($scope, $rootScope, $routeParams, $location, $http, Data) {

    // Page title
    $scope.message = "Login";

    // Change the Title of the Page
    if($location.$$path == "/create/account" ) {
        $scope.message = "Create an Account";
    }

    $scope.toggleLogin = function() {
        if($rootScope.loggedIn == false) { 
            $location.path('login');
        } else {
            $scope.logout();
            $rootScope.loggedIn = false;
        }
        console.log($rootScope.loggedIn);
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
                console.log('sucess');
                $rootScope.loggedIn = true;
                console.log($rootScope.loggedIn);
                $location.path('/');
            }
        });
    };

    $scope.signup = {email:'',password:'',name:'',phone:'',address:''};
    $scope.signUp = function (customer) {
        Data.post('signUp', {
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