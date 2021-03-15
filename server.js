const express = require("express");
const app = express();
const port = 8000;

// make sure these lines are above any app.get or app.post code blocks
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(__dirname + "/public"));

// Esto establece la ubicación donde express buscará la vista ejs
app.set('views', __dirname + '/views');

// Ahora configuremos el motor de visualización para que express sepa que estamos usando ejs en lugar de otro motor de jade
app.set('view engine', 'ejs');

//rutas

app.get("/", function(req, res) {
    //vistas
    res.render("index");
});

app.post("/results", function(req, res) {
    //vistas
    let info = req.body;
    console.log(info);
    res.render("results", info = info);
});



//lanzamos nuestra app
//guardamos en varialble server
const server = app.listen(port, function() {
    console.log('Escuchando en el puerto ' + port);
});


//Ahora creamos nuestras funciones de Sockets 
//npm install --save socket.io
const io = require('socket.io')(server);

// cuando me conecte con algún cliente
io.on('connection', function(socket) {
    // le mando información con el código "formulario_publicacion" al cliente
    socket.emit('formulario_publicacion', { msg: 'El servidor te manda un cordial saludo!' });

    // espero información desde el cliente hacia el terminal

    socket.on('formulario_publicacion', function(data) {
        //generar numero al azar
        const numeroAzar = Math.floor(Math.random() * 1000)
        socket.emit('numero', { numero: numeroAzar });
        console.log(data);
    });


});