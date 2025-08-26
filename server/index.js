require("dotenv").config();
const db_url = process.env.mongo_url;
const connectMongoDB=require("./db");
connectMongoDB();
const express = require('express')
const app = express()
const port = process.env.PORT;
let cors=require('cors');
app.use(cors());
app.use(express.json())
app.use('/api/auth',require('./routes/auth'));
app.use('/api/notes',require('./routes/notes'));
app.listen(port, () => {
  console.log(`iNotebook is listening on port http://localhost:${port}`)
}) 