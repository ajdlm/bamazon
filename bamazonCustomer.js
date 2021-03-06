var mysql = require("mysql");

var inquirer = require("inquirer");

var password = require("./password.js");

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
    connection.query("SELECT * FROM products",

        function (err, res) {
            if (err) throw "Error pulling the product list from the database.";

            console.log("\nPRODUCT LISTINGS:\n");

            for (i = 0; i < res.length; i++) {
                console.log(res[i].product_name + " [ID: " + res[i].id + "]\nDepartment: " + res[i].department_name + "\nPrice: $" + res[i].price + "\nLeft in Stock: " + res[i].stock_quantity + "\n");
            };

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

                    // Use Math.floor so that it can't be logged to the console as a float later.
                    var quantityToBuy = Math.floor(answers.quantityToBuy);

                    if (res[0].stock_quantity >= quantityToBuy) {
                        var numInStock = res[0].stock_quantity;

                        var orderPrice = quantityToBuy * res[0].price;

                        completePurchase(res[0].product_name, numInStock, quantityToBuy, orderPrice);
                    }

                    else {
                        notEnoughStock();
                    };
                });
        });
};

function completePurchase(name, numInStock, quantityToBuy, orderPrice) {
    connection.query(
        "UPDATE products SET ? WHERE ?",
        [
            {
                stock_quantity: (numInStock - quantityToBuy)
            },
            {
                product_name: name
            }
        ],
        function (err, res) {
            if (err) throw "Error in the completePurchase function.";

            console.log("\nYou purchased " + name + ".\n\nYou bought " + quantityToBuy + " copies.\n\nThe final price of your order is $" + orderPrice + ".\n");

            connection.end();
        });
};

function notEnoughStock() {
    console.log("\nSorry, not enough stock.");

    connection.end();
};