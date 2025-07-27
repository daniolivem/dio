// todas as funções que lidam com produto
const productType ={
    type: "product",
    description: "Product related operations"
}

//hidden const to simulate an API URL
// this const is not exported
const apiUrl = "https://api.example.com/products"; // Simulated API URL

async function getFullName(codeId, productName) {
    // return `${codeId} - ${productName}`; 
    console.log("product: " + codeId + " - " + productName);
    await doBreakLine(); 
}
//hidden function to simulate a break line
// this function is not exported
async function doBreakLine() {
    console.log("\n")
}

async function getProductLabel(productName) {
    console.log("Product label: " + productName);
    await doBreakLine();
}

module.exports = {
    getFullName,
    getProductLabel,
    productType,
}