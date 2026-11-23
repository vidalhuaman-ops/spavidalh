const express = require('express');
const mysql=require('mysql');
const app = express()
app.use("/css", express.static(__dirname + "/css"));
app.use("/img", express.static(__dirname + "/img"));
app.use("/js", express.static(__dirname + "/js"));


let conexion=mysql.createConnection({
    host: "localhost",
    database:"spavidal",
    user:"root",
    password:""
})
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.listen(3000,()=>{
    console.log("Servidor creado correctamente");
});


app.get('/', (req, res) => {
  res.sendFile(__dirname+'/index.html');
});

app.post("/validar", function(req, res){
    const datos=req.body;
    console.log(datos);
    
    let dni=datos.dni;
    let nombres=datos.nombres;
    let correo=datos.correo;
    let celular=datos.celular;

    let registrar="INSERT INTO info(dni, nombres, correo, celular) VALUES ('"+dni+"','"+nombres+"','"+correo+"','"+celular+"')";
    conexion.query(registrar,function(error){
        if(error){
            throw error;
        }else{
            //console.log("datos almacenados correctamente ");
            res.send(`
                <script>
                alert("Datos enviados correctamente");
                window.location.href= "/";
                </script>
                `);
        }
    })
})