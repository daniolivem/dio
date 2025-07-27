const dataBaseType = {
  userType: "user",
  typeData: "datalocal",
};

export const connectToDatabase = async (dataName) => {
  console.log(`Connecting to database: ${dataName}`);
};

async function disconnectFromDatabase() {
  console.log("Disconnecting from database");
}

// export default {
//     disconnectFromDatabase
// };

export { disconnectFromDatabase, dataBaseType };
