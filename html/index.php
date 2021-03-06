<!doctype html>
<html ng-app="myApp">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
    <meta http-equiv="Pragma" content="no-cache" />
    <meta http-equiv="Expires" content="0" />
    <title>Ronny & Tyler Shop</title>
    <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">   
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
    <link rel="stylesheet" type="text/css" href="css/style.css">
    <link rel="stylesheet" type="text/css" href="css/toaster.css">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.4.7/angular.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.4.7/angular-route.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.4.7/angular-cookies.js"></script> 
    <script src="https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.4.7/angular-animate.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.4.7/angular-sanitize.min.js"></script>  
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.0/jquery.js"></script>
</head>
<body>
    <style type="text/css" media="screen">
        .footer {
            position: fixed;
            left: 0;
            bottom: 0;
            width: 100%;
            background-color: gray;
            color: white;
            text-align: center;
        }
    </style>

    <!-- Navigation Bar -->
    <ul id="navbar" ng-controller="authCtrl">
        <a href="#/"><img src="images/rt_logo.png" class="logo"></img></a>

        <div class="dropdown" style="float:right;">
            <i class="dropbtn fa fa-user-circle-o" aria-hidden="true"></i>
            <div class="dropdown-content">
                <a href="#/settings">Account Settings</a>
            </div>
        </div>

        <li><a ng-click="toggleLogin();" style="padding: 28px 16px;">{{ loggedIn ? 'Logout'  : 'Login' }}</a></li>
        <li><a href="#/cart" style="color:black;" ng-bind-html="cart"></a></li>
        <li><a href="#/buys" style="padding: 28px 16px;">{{ loggedIn ? 'Purchases' : '' }}</a></li>
        <!-- Search Bar -->
        <div class="wrap">
            <div class="search">
               <input type="text" class="searchTerm" placeholder="T-Shirt...">
               <button type="submit" class="searchButton">
                 <i class="fa fa-search"></i>
              </button>
            </div>
         </div>
    </ul>
    <div ng-view></div>
    <toaster-container toaster-options="{'time-out': 3000}"></toaster-container>

<!-- Libs -->
<script src="app.js"></script>
<script src="app/data.js"></script>
<script src="app/directives.js"></script>
<script src="app/authCtrl.js"></script>
<script src="js/toaster.js"></script>

<footer class="footer">
    <div>
        <div class="col-sm-12 text-center"><br>
            <p>Developed by Ronny Ritprasert and Tyler Chang</p>
            <a href="https://github.com/174-databases/174-Database" style="text-decoration: none;"><i class="fa fa-github" style="font-size=24px"></i>GitHub</a><br>
            <small>&copy; Copyright 2021,  All Rights Reserved</small>
        </div>
    </div>
</footer>
</body>
</html>
