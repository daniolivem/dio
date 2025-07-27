
const {getFullName, getProductLabel, productType} = require("./services/products"); //destructuring import
const config = require("./services/config");
const dataBase = require("./services/database");

async function main() {
    console.log("carrinho compras");
    // const result = await p.getFullName("408", "Product A");
    // console.log("Product:", result);
    getFullName("408", "Product A")
    getProductLabel("Product A")

    config.version = "1.0.1"; // Simulating a change in config
    console.log("Config version:", config.version);

    productType.type = "updated product"; // Simulating a change in product type
    console.log("Product Type:", productType.type);

    dataBase.connectToDatabase(); // Simulating a database connection
    console.log("Database connected");
    dataBase.disconnectFromDatabase(); // Simulating a database disconnection
    console.log("Database disconnected");
}

main(); 