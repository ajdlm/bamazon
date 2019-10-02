var mysql = require("mysql");

var inquirer = require("inquirer");

var password = require("./password.js");

var config = {
    productChosen: NaN,
    quantityToBuy: NaN
};

var connection = mysql.createConnection({
    host: "localhost",

    port: 3306,

    user: "root",

    // Links to my password, which is kept in a different, gitignored JS file so that I don't put it in a public GitHub repo.
    password: password.password,

    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw "error";

    console.log("Connected.", connection.threadId);

    afterConnection();
});

function afterConnection() {
    displayAvailableItems();

    userPurchaseQueries();

    console.log("You purchased " + config.productChosen + ".\n\nYou bought " + config.quantityToBuy + " units.");
};

function displayAvailableItems() {
    connection.query("SELECT * FROM PRODUCTS",

        function (err, res) {
            if (err) throw "Error.";

            console.log(res);
        });
};

function userPurchaseQueries() {
    config.productChosen = whichProduct()
        //.then(config.quantityToBuy = howManyUnits());
};

function whichProduct() {
    inquirer
        .prompt([
            {
                type: "number",
                message: "Enter the ID number of the product you'd like to purchase.",
                name: "chosenID"
            }
        ])
        .then(answers => {
            connection.query("SELECT * FROM products WHERE ?",
                [
                    {
                        id: answers.chosenID
                    }
                ],
                function (err, res) {
                    if (err) throw "Error.";

                    return res[0].id;
                });
        });
};

function howManyUnits() {
    inquirer
        .prompt([
            {
                type: "number",
                message: "How many would you like to purchase?",
                name: "quantityToBuy"
            }
        ])
        .then(answers => {
            return answers.quantityToBuy;
        });
};