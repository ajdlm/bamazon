# Bamazon

An Amazon-like storefront accessed from the bash command line.

Note: This is not a real shop but a mock one, and the only thing changed by user interaction will be the data stored in the app's MySQL database.

## Technologies Used

* JavaScript

* Node.js

* Inquirer.js

* MySQL

## Setting up the App

* Navigate into the app's repository using the bash command line.

* Enter the "npm install" command to install the node modules listed as dependencies in package.json.

* Open "bamazon.sql" in MySQL Workbench and run the commands saved in that file to generate a database with which to start using the app.

* Finally, create a JavaScript file called "password.js" in your local repository for the app.

* Put the following code in that file (replacing "password" with your own root password for MySQL) and then save it:

```
exports.password = "password";
```

## Using the App in Customer Mode

* Navigate into the app's repository using the bash command line.

* Start customer mode by typing "node bamazonCustomer.js."

* Once you have entered this command, a listing will be displayed for each product stored in the app's MySQL database.

* You will then be prompted for the ID number of the product you'd like to purchase.

* Once you have entered this information, a second prompt will appear, asking you how many copies of the aforementioned product you'd like to buy.

* Once you have responded to that question, text will be displayed informing you of which product you've purchased, how many copies of it you've purchased, and what the total cost of your order comes to.

### Examples of Customer Mode

![](/assets/images/bamazon-customer-1.gif)

![](/assets/images/bamazon-customer-2.gif)

## Using the App in Manager Mode

* Navigate into the app's repository using the bash command line.

* Start manager mode by typing "node bamazonManager.js."

* Once you have entered this command, a menu will be displayed with four options: View Products for Sale, View Low Inventory, Add to Inventory, and Add New Product.

### View Products for Sale

* If you select View Products for Sale, a listing will be displayed for each product stored in the app's MySQL database in much the same way as happens in customer mode.

* The difference here is that the app will stop running after this information is displayed, and the user will be prompted for no further input.

### View Low Inventory

* If you select View Low Inventory, a similar list of products will appear, but in this case, information will only be displayed on products with five or fewer copies in stock, should any currently exist.

### Add to Inventory

* If you select Add to Inventory, a listing will be displayed for each product stored in the app's MySQL database, in much the same way that it would in the case of either customer mode or the View Products for Sale option in the manager menu.

* When you select this option, however, these listings will be followed by a prompt asking you to enter the ID of the product that you would like to add more of.

* Once you've responded to this question with the ID of your chosen product, you will be prompted to specify how many copies of that product you'd like to add to the store's inventory.

* Afterwards, text will be displayed informing you of how many units were added to the shop and how many copies that now makes total in bamazon's inventory.

### Add New Product

* The final command, Add New Product, results in a series of prompts asking you for information about the product that you would like to add to bamazon's inventory.

* First, it asks you for a name for the product.

* Then, it asks you which department of the store you'd like the product to be found in. By default, there are only three departments -- Books, Video Games, and Blu-ray -- but you may enter anything you'd like here.

* Next, it asks what price you'd like to set for it. You may enter either an integer or a float, but any decimal places after the second will be cut off from your answer.

* Finally, it asks how many copies of this new product you'd like to add to the store's inventory.

* Once each of these prompts has been responded to, text will be displayed informing you of exactly how many units of your chosen product have been added to bamazon's inventory.

### Examples of Manager Mode

![](/assets/images/bamazon-manager-1.gif)

![](/assets/images/bamazon-manager-2.gif)

![](/assets/images/bamazon-manager-3.gif)

## The Structure of Bamazon's Code

* Both bamazonCustomer.js and bamazonManager.js read from and write to the bamazon MySQL database, which can be created using the code in bamazon.sql.

* Both files also use the Inquirer.js node package to prompt the user for information, which they then use to either decide which information to display from the bamazon MySQL database or to modify the data contained within it.

* Whenever the user modifies the database in some way, the app uses console.log() to display text describing what has been changed.

* bamazonManager.js furthermore starts by using the Inquirer.js node package to display a menu with four different options to the user.

* When the user selects one of them, the app feeds the input from that selection into a switch statement and runs one of several cases, each of which dictates what kinds of prompts and information the user will be met with.

## Author

Antonio de las Morenas -- responsible for coding the entire app