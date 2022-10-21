import mongoose from "mongoose";

const DBNAME = "whistleblog", USER = "wsh", PASS = "19930304wsh", PORT = 27017

mongoose.connect(`mongodb://127.0.0.1:${PORT}/${DBNAME}`, {dbName:DBNAME, user:USER, pass:PASS}, err => {if(!err) console.log(`db:${DBNAME} connect on port:${PORT}`); else console.log(err)})
