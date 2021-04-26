app.controller('authCtrl', function ($scope, $rootScope, $routeParams, $location, $http, Data) {

    $scope.message = "Login";

    // Change the Title of the Page
    if($location.$$path == "/create/account" ) {
        $scope.message = "Create an Account";
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
                $location.path('/');
            } else {
                console.log(results);
            }
        });
        console.log(Data.get('login'));
    };

    $scope.signup = {email:'',password:'',name:'',phone:'',address:''};
    $scope.signUp = function (customer) {
        Data.post('signUp', {
            customer: customer
        }).then(function (results) {
            Data.toast(results);
            if (results.status == "success") {
                $location.path('dashboard');
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