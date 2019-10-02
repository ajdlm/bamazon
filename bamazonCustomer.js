var mysql = require("mysql");

var password = require("./password.js");

var connection = mysql.createConnection({
    host: "localhost",

    port: 3306,

    user: "root",

    password: password.password,
    
    database: "bamazon"
});

connection.connect(function(err) {
    if (err) throw "error";

    console.log("Connected. ", connection.threadId);

    afterConnection();
});

function afterConnection() {
    console.log();
};