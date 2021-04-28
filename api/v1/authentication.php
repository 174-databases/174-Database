<?php 
$app->get('/session', function() {
    $db = new DbHandler();
    $session = $db->getSession();
    $response["id"] = $session['id'];
    $response["email"] = $session['email'];
    $response["firstName"] = $session['firstName'];
    $response["lastName"] = $session['lastName'];
    echoResponse(200, $session);
});

$app->post('/login', function() use ($app) {
    require_once 'passwordHash.php';
    $r = json_decode($app->request->getBody());
    verifyRequiredParams(array('email', 'password'),$r->customer);
    $response = array();
    $db = new DbHandler();
    $password = $r->customer->password;
    $email = $r->customer->email;
    $user = $db->getOneRecord("select id,firstName,lastName,password,email from CUSTOMER where email='$email'");
    if ($user != NULL) {
        if(passwordHash::check_password($user['password'], $password)){
            $response['status'] = "success";
            $response['message'] = 'Logged in successfully.';
            $response["firstName"] = $user['firstName'];
            $response["lastName"] = $user['lastName'];
            $response['id'] = $user['id'];
            $response['email'] = $user['email'];

            if (!isset($_SESSION)) {
                session_start();
            }

            $_SESSION['id'] = $user['id'];
            $_SESSION['email'] = $email;
            $_SESSION['firstName'] = $user['firstName'];
            $_SESSION['lastName'] = $user['lastName'];

        } else {
            $response['status'] = "error";
            $response['message'] = 'Login failed. Incorrect credentials';
        }
    } else {
            $response['status'] = "error";
            $response['message'] = 'No such user is registered';
    }
    echoResponse(200, $response);
});

$app->post('/signup', function() use ($app) {
    $response = array();
    $r = json_decode($app->request->getBody());
    verifyRequiredParams(array('email', 'firstName', 'password'), $r->customer);
    require_once 'passwordHash.php';
    $db = new DbHandler();
    $firstName = $r->customer->firstName;
    $lastName = $r->customer->lastName;
    $email = $r->customer->email;
    $password = $r->customer->password;
    $isUserExists = $db->getOneRecord("select 1 from CUSTOMER where email='$email'");

    if(!$isUserExists){
        $r->customer->password = passwordHash::hash($password);
        $table_name = "CUSTOMER";
        $column_names = array('firstName', 'lastName', 'email', 'password');
        $result = $db->insertIntoTable($r->customer, $column_names, $table_name);
        if ($result != NULL) {
            $response["status"] = "success";
            $response["message"] = "User account created successfully";
            $response["id"] = $result;
            if (!isset($_SESSION)) {
                session_start();
            }
            $_SESSION['id'] = $response["id"];
            $_SESSION['firstName'] = $firstName;
            $_SESSION['lastName'] = $lastName;
            $_SESSION['email'] = $email;
            echoResponse(200, $response);
        } else {
            $response["status"] = "error";
            $response["message"] = "Failed to create customer. Please try again";
            echoResponse(201, $response);
        }            
    } else {
        $response["status"] = "error";
        $response["message"] = "A user with the provided email exists!";
        echoResponse(201, $response);
    }
});

$app->get('/logout', function() {
    $db = new DbHandler();
    $session = $db->destroySession();
    $response["status"] = "info";
    $response["message"] = "Logged out successfully";
    echoResponse(200, $response);
});

$app->post('/updateAccount', function() use ($app) {
    $response = array();
    $r = json_decode($app->request->getBody());
    verifyRequiredParams(array('email', 'firstName'), $r->customer);
    require_once 'passwordHash.php';
    $db = new DbHandler();
    $firstName = $r->customer->firstName;
    $email = $r->customer->email;
    $isUserExists = $db->getOneRecord("select 1 from CUSTOMER where email='$email'");

    if($isUserExists){
        $table_name = "CUSTOMER";
        $column_names = 'firstName';
        $result = $db->updateTable($column_names, $table_name, $firstName, $email);
        if ($result != NULL) {
            $response["status"] = "success";
            $response["message"] = "Updated account successfully";
            echoResponse(200, $response);
        } else {
            $response["status"] = "error";
            $response["message"] = "Failed to update Account Info. Please try again!";
            echoResponse(201, $response);
        }
    }
});
?>