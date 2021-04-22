<?php

$server = "localhost";
$user = "root";
$pass = "password";
$db = "test";

$conn = new mysqli($server, $user, $pass, $db);

//Make a connection to the server
if($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

//Check to see if the Accept button was selected else it was Declined
$sql = "SELECT * FROM person";
$result = $conn->query($sql);

if($result->num_rows > 0)
{
    //output data of each row
    while($row = $result->fetch_assoc())
    {
        echo "<tr><td>" . $row["firstname"] . "</td><td>" . $row["lastname"] . "</td><td>" . $row["email"] . "</td></tr>";
    }
    echo "</table>";
}
else 
{
    echo "Sorry No one is on the list yet!";
}

//Close the connection to the server
$conn->close();
?>