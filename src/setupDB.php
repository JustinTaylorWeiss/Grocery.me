<?php
// I Justin Weiss R01918238 certify that this submission is my own origional work.
$servername = "localhost";
$username = "jweiss";
$password = "mysql";

$connection = new mysqli($servername, $username, $password);
if ($connection->connect_error)
  die("Connection failed: ".$conn->connect_error);

$createDatabse = "CREATE DATABASE CAPSTONE";
$createUserTable = "CREATE TABLE users(
  user_id INT NOT NULL AUTO_INCREMENT,
  user_email VARCHAR(40) NOT NULL,
  user_name VARCHAR(40) NOT NULL,
  user_password VARCHAR(20) NOT NULL,
  PRIMARY KEY( user_id )
)";
$createProductTable = "CREATE TABLE products(
  product_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(40) NOT NULL,
  product_favorited BOOLEAN NOT NULL,
  product_inCart BOOLEAN NOT NULL,
  PRIMARY KEY( product_id )
)";

if ($connection->query($createDatabse) === TRUE) {
    echo "CAPSTONE database created";
    if ($connection->query($createUserTable) === TRUE) {
        echo "User table created";
        if ($connection->query($createProductTable) === TRUE) {
            echo "Product table created";
        }
        else {
            echo "Error: ".$connection->error;
        }
    }
    else {
        echo "Error: ".$connection->error;
    }
}
else {
    echo "Error: ".$connection->error;
}

$connection->close();
?>
