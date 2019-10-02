var mysql = require("mysql");

var inquirer = require("inquirer");

var password = require("./password.js");

var config = {
    answers: [],

    productChosen: NaN,

    quantityToBuy: NaN,

    orderPrice: NaN,

    numInStock: NaN
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
    if (err) throw "Error connecting to the database.";

    console.log("Connected.", connection.threadId);

    afterConnection();
});

function afterConnection() {
    displayAvailableItems();
};

function displayAvailableItems() {
    connection.query("SELECT * FROM PRODUCTS",

        function (err, res) {
            if (err) throw "Error pulling the product list from the database.";

            console.log(res);

            userPurchaseQuestions();
        });
};

function userPurchaseQuestions() {
    inquirer
        .prompt([
            {
                type: "number",
                message: "Enter the ID number of the product you'd like to purchase.",
                name: "chosenID"
            },
            {
                type: "number",
                message: "How many would you like to purchase?",
                name: "quantityToBuy"
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
                    if (err) throw "Error finding the selected product in the database.";

                    config.quantityToBuy = answers.quantityToBuy;

                    console.log("It is " + res[0].stock_quantity);

                    if (res[0].stock_quantity >= config.quantityToBuy) {

                        config.productChosen = res[0].product_name;

                        config.numInStock = res[0].stock_quantity;

                        config.orderPrice = config.quantityToBuy * res[0].price;

                        completePurchase();
                    }

                    else {
                        notEnoughStock();
                    };
                });
        });
};

function completePurchase() {
    var query = connection.query(
        "UPDATE products SET ? WHERE ?",
        [
            {
                stock_quantity: (config.numInStock - config.quantityToBuy)
            },
            {
                product_name: config.productChosen
            }
        ],
        function (err, res) {
            if (err) throw "Error in the completePurchase function.";

            console.log("\nYou purchased " + config.productChosen + ".\n\nYou bought " + config.quantityToBuy + " units.\n\nThe final price of your order is " + config.orderPrice);
        });
};

function notEnoughStock() {
    console.log("\nSorry, not enough stock.");
};