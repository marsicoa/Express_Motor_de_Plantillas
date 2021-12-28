import express from 'express'
import handlebars from 'express-handlebars'
import router from './routes/productos.js'
import path from 'path'
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const PORT = 8080

const app = express()

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//handlebars cfg
app.engine(
    "hbs",
    handlebars({
      extname: ".hbs",
      defaultLayout: 'index.hbs',
    })
);
  
app.set("view engine", "hbs");
app.set("views", "./views");

//Router API
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', router)

//Server
const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${server.address().port}`)
})
server.on('error', error => console.log(`Error en servidor ${error}`))
