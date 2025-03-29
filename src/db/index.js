import mongoose from "mongoose";

import { DB_NAME } from "../constants.js";

const connectDB = async () => {
  try {
    const connectInstance = await mongoose.connect(`${process.env.MONGODB_URI}/ ${DB_NAME}`);

    console.log(`\n mongodb is connected || DB HOST:${connectInstance.connection.host}`);
  } catch (error) {
    console.log("Connection error while fetching the data with mongodb", error);
    process.exit(1);
  }
};

export default connectDB; 

// const connectDB = new Promise((resolve, reject)=>
// {
//   const connectDB = mongoose.connect(`${process.env.MONGODB_URI}/ ${DB_NAME}`);
// }).then(()=>
// {
//   console.log(`\n mongodb is connected || DB HOST:${connectInstance.connection.host}`);
// }).catch((error)=>
// {
//   console.log("Connection error while fetching the data with mongodb", error);
//   process.exit(1);
// })
// export default connectDB;