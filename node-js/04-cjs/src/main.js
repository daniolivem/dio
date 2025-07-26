
const p = require("./services/products");

async function main() {
    console.log("carrinho compras");
    // const result = await p.getFullName("408", "Product A");
    // console.log("Product:", result);
    p.getFullName("408", "Product A")
}

main(); 