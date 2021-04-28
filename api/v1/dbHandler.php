<?php

class DbHandler {

    private $conn;

    function __construct() {
        require_once 'dbConnect.php';
        // opening db connection
        $db = new dbConnect();
        $this->conn = $db->connect();
    }
    /**
     * Fetching single record
     */
    public function getOneRecord($query) {
        $r = $this->conn->query($query.' LIMIT 1') or die($this->conn->error.__LINE__);
        return $result = $r->fetch_assoc();    
    }
    /**
     * Creating new record
     */
    public function insertIntoTable($obj, $column_names, $table_name) {
        
        $c = (array) $obj;
        $keys = array_keys($c);
        $columns = '';
        $values = '';
        foreach($column_names as $desired_key){ // Check the obj received. If blank insert blank into the array.
           if(!in_array($desired_key, $keys)) {
                $$desired_key = '';
            }else{
                $$desired_key = $c[$desired_key];
            }
            $columns = $columns.$desired_key.',';
            $values = $values."'".$$desired_key."',";
        }
        $query = "INSERT INTO ".$table_name."(".trim($columns,',').") VALUES(".trim($values,',').")";
        $r = $this->conn->query($query) or die($this->conn->error.__LINE__);

        if ($r) {
            $new_row_id = $this->conn->insert_id;
            return $new_row_id;
        } else {
            return NULL;
        }
    }

    public function updateTable($column_names, $table_name, $name, $email) {
        $query = "UPDATE ".$table_name." SET ".$column_names."=".$name." WHERE email=".$email;
        //$query = "UPDATE CUSTOMER SET firstName='tyr' WHERE email='test@gmail.com'";
        $r = $this->conn->query($query) or die($this->conn->error.__LINE__);

        if ($r) {
            $new_row_id = $this->conn->insert_id;
            return $new_row_id;
        } else {
            return NULL;
        }
    }

    public function validateQuantity() {
        if(!empty($_GET["action"])) {
        switch($_GET["action"]) {
        	case "add":
        		if(!empty($_POST["quantity"])) {
        			$productByCode = $db_handle->runQuery("SELECT * FROM tblproduct WHERE code='" . $_GET["code"] . "'");
        			$itemArray = array($productByCode[0]["code"]=>array('name'=>$productByCode[0]["name"], 'code'=>$productByCode[0]["code"], 'quantity'=>$_POST["quantity"], 'price'=>$productByCode[0]["price"], 'image'=>$productByCode[0]["image"]));

        			if(!empty($_SESSION["cart_item"])) {
        				if(in_array($productByCode[0]["code"],array_keys($_SESSION["cart_item"]))) {
        					foreach($_SESSION["cart_item"] as $k => $v) {
        							if($productByCode[0]["code"] == $k) {
        								if(empty($_SESSION["cart_item"][$k]["quantity"])) {
        									$_SESSION["cart_item"][$k]["quantity"] = 0;
        								}
        								$_SESSION["cart_item"][$k]["quantity"] += $_POST["quantity"];
        							}
        					}
        				} else {
        					$_SESSION["cart_item"] = array_merge($_SESSION["cart_item"],$itemArray);
        				}
        			} else {
        				$_SESSION["cart_item"] = $itemArray;
        			}
        		}
        	break;
        	case "remove":
        		if(!empty($_SESSION["cart_item"])) {
        			foreach($_SESSION["cart_item"] as $k => $v) {
        					if($_GET["code"] == $k)
        						unset($_SESSION["cart_item"][$k]);
        					if(empty($_SESSION["cart_item"]))
        						unset($_SESSION["cart_item"]);
        			}
        		}
        	break;
        	case "empty":
        		unset($_SESSION["cart_item"]);
        	break;
        }
        }
    }

    public function addToCart() {}

    public function getSession(){
        if (!isset($_SESSION)) {
            session_start();
        }
        $sess = array();
        if(isset($_SESSION['id']))
        {
            $sess["id"] = $_SESSION['id'];
            $sess["firstName"] = $_SESSION['firstName'];
            $sess["lastName"] = $_SESSION['lastName'];
            $sess["email"] = $_SESSION['email'];
        }
        else
        {
            $sess["id"] = '';
            $sess["firstName"] = 'Guest';
            $sess["lastName"] = '';
            $sess["email"] = '';
        }

        return $sess;
    }

    public function destroySession(){
        if (!isset($_SESSION)) {
        session_start();
        }
        if(isSet($_SESSION['id']))
        {
            unset($_SESSION['id']);
            unset($_SESSION['firstName']);
            unset($_SESSION['lastName']);
            unset($_SESSION['email']);
            $info='info';
            if(isSet($_COOKIE[$info]))
            {
                setcookie ($info, '', time() - $cookie_time);
            }
            $msg="Logged Out Successfully...";
        }
        else
        {
            $msg = "Not logged in...";
        }
        return $msg;
    }
 
}

?>
