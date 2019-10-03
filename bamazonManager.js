var mysql = require("mysql");

var inquirer = require("inquirer");

var password = require("./password.js");

var config = {
    onlyView: false
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
    displayMenuOptions();
};

function displayMenuOptions() {
    inquirer
        .prompt([
            {
                type: "list",
                message: "MENU OPTIONS:",
                choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"],
                name: "menuSelection"
            }
        ])
        .then(answers => {
            switch (answers.menuSelection) {
                // Set config.onlyView to true so that if View Products for Sale is selected, the code will stop running after displaying the list of products; otherwise, it will continue on to run the addToInventory() function.
                case "View Products for Sale":
                    config.onlyView = true;
                case "Add to Inventory":
                    viewProductsForSale();
                    break;
                case "View Low Inventory":
                    viewLowInventory();
                    break;
                case "Add New Product":
                    addNewProduct();
                    break;
            };
        });
};

function viewProductsForSale() {
    connection.query("SELECT * FROM products",

        function (err, res) {
            if (err) throw "Error pulling product information from the database.";

            console.log("\nPRODUCTS FOR SALE:\n");

            displayProductList(res);

            if (config.onlyView === true) {
                connection.end();
            }

            else {
                addToInventory();
            };
        });
};

function viewLowInventory() {
    connection.query("SELECT * FROM products WHERE stock_quantity < 6",
        function (err, res) {
            if (err) throw "Error pulling product information from the database.";

            console.log("\nPRODUCTS LOW ON STOCK:\n");

            displayProductList(res);

            connection.end();
        });
};

function displayProductList(x) {
    for (i = 0; i < x.length; i++) {
        console.log(x[i].product_name + " [ID: " + x[i].id + "]\nDepartment: " + x[i].department_name + "\nPrice: $" + x[i].price + "\nLeft in Stock: " + x[i].stock_quantity + "\n");
    };
};

function addToInventory() {
    inquirer
        .prompt([
            {
                type: "number",
                message: "Enter the ID number of the product you'd like to add more of.",
                name: "chosenID"
            },
            {
                type: "number",
                message: "How many copies would you like to add to the store's stock?",
                name: "numberToAdd"
            }
        ])
        .then(answers => {
            getProductInformation(answers.chosenID, answers.numberToAdd);
        });
};

function getProductInformation(x, y) {
    connection.query(
        "SELECT * FROM products WHERE ?",
        [
            {
                id: x
            }
        ],
        function (err, res) {
            if (err) throw "Error finding product in database.";

            updateProductStock(res[0].product_name, y, res[0].stock_quantity);
        });
};

function updateProductStock(x, y, z) {
    connection.query(
        "UPDATE products SET ? WHERE ?",
        [
            {
                stock_quantity: (z + y)
            },
            {
                product_name: x
            }
        ],
        function (err, res) {
            if (err) throw "Error adding more units of the product to the database.";

            console.log("\nYou added " + Math.floor(y) + " copies of " + x + " to the store's inventory.\n\nThere are now " + Math.floor(z + y) + " copies of " + x + " in stock.\n");

            connection.end();
        });
}

function addNewProduct() {
    inquirer
        .prompt([
            {
                type: "input",
                message: "What is the name of the product you would like to add to the store?",
                name: "productName"
            },
            {
                type: "input",
                message: "Which department of the store should it be found in?",
                name: "departmentName"
            },
            {
                type: "number",
                message: "What price do you want to set for it?",
                name: "price"
            },
            {
                type: "number",
                message: "How many copies of the product would you like to stock?",
                name: "stockQuantity"
            }
        ])
        .then(answers => {
            addProductToDatabase(answers.productName, answers.departmentName, answers.price, answers.stockQuantity);
        });
};

function addProductToDatabase(name, department, price, quantity) {
    var post = { product_name: name, department_name: department, price: price, stock_quantity: quantity };

    connection.query("INSERT INTO products SET ?", post, function(err, res, fields) {
        if (err) throw "Error inserting your new product into the database.";

        console.log("Successfully added " + Math.floor(quantity) + " copies of " + name + " to the store's inventory.");

        connection.end();
    });
};