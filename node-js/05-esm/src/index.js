// Importing the database utility functions
import * as database from "./utils/database.js"; //  para importar todo o módulo

database.connectToDatabase("myDatabase");
database.disconnectFromDatabase();

import { getDataFromApi } from "./utils/api.js";    // Importing a specific function from the API module
getDataFromApi(); // Calling the function to get data from the API
//Using destructuring exporta uma função do módulo database.js

// import { connectToDatabase, dataBaseType } from "./utils/database.js"
//é necessário passar a extensão .js para que o Node.js reconheça o arquivo como um módulo ES6


// connectToDatabase("myDatabase")
