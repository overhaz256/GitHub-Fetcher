const mysql = require('mysql');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require("cors");
const path = require('path');
//User
const Users = require('./routes/users');

app.use(cors({origin:"*"}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


//Esta función permite a los usuarios visitar este Path.
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/', express.static(path.join(__dirname, 'react')));

//API
app.use('/api/users', Users);

//Puerto
const port = process.env.PORT || 4000;

//Correr el servidor
app.listen(port, ()=> console.log(`Aplicación corriendo en el puerto ${port}`));
