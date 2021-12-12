const express = require("express");
const cors = require("cors");
require('dotenv').config()
require("./db/db");

const app = express();
app.use(express.json());
app.use(cors());


///////////////////////////////

const postRoute = require("./routers/routes/postRoute");
const signUpRoute = require("./routers/routes/signUpRoute");
const loginRoute  = require("./routers/routes/loginRoute")

app.use(postRoute);
app.use(signUpRoute);
app.use(loginRoute);



////////////////////

const Port = 5000;
app.listen(Port, () => {
  console.log("SERVER IS RUN!");
});

