const mysql = require('mysql');
const express = require('express');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const router = express.Router();



//Conectar a la BD
const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'app_react_node'
});

//Terminar
con.connect(function(err) {
    if(err) throw err;
    console.log('Conectado')
});

//Codigo para cargar imagenes y otros ajustes
const MIME_TYPE_MAP = {
    "image/png":"png",
    "image/jpeg":"jpg",
    "image/jpg":"jpg"
};

const storage = multer.diskStorage({
    destination:(req, file, cb) => {
        const isValid = MIME_TYPE_MAP[file.mimetype];
        let error = new Error("Extensión de imagen incorrecto");
        if(isValid){ error = null;}
        cb(error, "images");
    }, filename:(req, file, cb) => {
        const name = file.originalname
        .toLowerCase()
        .split(" ")
        .join("-");
        const ext = MIME_TYPE_MAP[file.mimetype];
        cb(null, name + "-" + Date.now() + "." + ext)
    }
})

//Seleccionar o Crear la tabla Usuarios
function SelectOrCreateTable(){
    con.query("SELECT * FROM users", function(err, result, fields){
        if(err) {
            const sql = "CREATE TABLE users (id INT AUTO_INCREMENT PRIMARY KEY, name varchar(255), password varchar(255), pic varchar(255), email varchar (255) NOT NULL UNIQUE, adress varchar(255))";
            con.query(sql, function(err, result){
                if(err) throw err;
            });
        }
    })
}

SelectOrCreateTable();
//Terminar



//Crear un Nuevo Usuario
router.post('/Register', async(req, res)=>{
    const email = req.body.Data.email;
    const pass = req.body.Data.password;
    const name = req.body.Data.name;

    con.query(`SELECT * FROM users WHERE email = '${email}'`, function(err, result){
        if(err){
            res.send({ err: 'err'})
        }
        if(result.length === 0){
            var sql = `INSERT INTO users (name, email, password) VALUES ('${name}', '${email}', '${pass}')`;
            con.query(sql, function(err, result){
                if(err) { throw err; }
                res.status(200).send( { result} )
                console.log(result)
            });
        }
        else {
            return res.status(201).send({ message: 'Este email está siendo usado por otra persona'})
        }
    });
});

const JwtPrivateSecret = 'Overhaz#ReactNodeCourse';

//Log In
router.post('/Login', async(req, res) => {
    const email = req.body.Data.email;
    const pass = req.body.Data.password;
    console.log(email,pass);
    con.query(`SELECT * FROM users WHERE email = '${email}' AND password = '${pass}'`, 
    async function(err, result){
        if(result.length !== 0){
            jwt.sign({ UserEmail: email}, JwtPrivateSecret,
                (err, token) => {
                    res.send({ token: token});
                });
        }
        if(result.length === 0){
            res.send({message: 'Error, no encontrado'});
            console.log('err', err);
        }
    });
});

//Obtener datos del usuario
router.get('/GetUserData', async (req, res) => {
    const token = req.headers['authorization'];
    var decoded = jwt.decode(token, {complete: true});
    const payload = decoded.payload;
    const UserE = payload.UserEmail;
    console.log('userdata', UserE);

    const theSQL = `SELECT * FROM users WHERE email = '${UserE}'`;
    con.query(theSQL, function(err, result){
        if(err) throw err;
        console.log(result.affectedRows + "Record(s) Actualizados");
        res.send({ result });

    });
});

//Updata User
const upload = multer({
    storage:storage, limits: {fieldSize:12*1024*1024}
}).single("image");

router.put('/edit/:id', upload, (req, res, next) => {
    if(req.file && req.file !== ''){
        const ID = req.params.id;
        const URL = req.protocol+"://" + req.get("host");
        const pic = URL + "/images/" + req.file.filename;
        const name = req.body.name;
        const adress = req.body.address;
        //Actualizar con MYSQL
        const sql = `UPDATE users SET name = '${name}', adress = '${adress}', pic = '${pic}' WHERE id = '${ID}'`;
        con.query(sql, function(err, result){
            if(err) throw err;
            res.status(200).send({ message: "Cambios realizados.", result})
        })
    } else {
        const ID = req.params.id;
        const name = req.body.name;
        const adress = req.body.adress;
        //Actualizar con MYSQL
        const sql = `UPDATE users SET name = '${name}', adress = '${adress}' WHERE id = '${ID}'`;
        con.query(sql, function(err, result){
            if(err) throw err;
            res.status(200).send({message: 'Acualizado', result})
        })
    }
})

//Eliminar usuario
router.delete('/delete/:id/:password', (req, res, next) => {
    const ID = req.params.id;
    const pass = req.params.password;
    con.query(`SELECT * FROM users WHERE id = '${ID}' AND password = '${pass}'`, async function(err, result){
        if(result.length !== 0){
            //La contraseña es correcta
            con.query(`DELETE FROM users WHERE id = '${ID}'`,
            async function(err, result){
                if(err) throw (err);
                res.status(200).send({ message: result })
            })
        }
        if(result.length === 0){
            res.status(400).send({ message: 'Error, la contraseña es incorrecta'})
        }
    })
})

module.exports = router;