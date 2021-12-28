import express from 'express'
import Contenedor from '../public/javascripts/Contenedor.js'

const router = express.Router()
const productos = new Contenedor('./public/txt/productos.txt')

router.get('/', (req, res) => {
    res.render('main')
})

router.post('/productos', (req, res) => {
    productos.save(req.body)
    res.redirect('/')
})

router.get('/productos', (req, res) =>{
    const db = productos.getAll()
    res.render('listado', {productos: db})
})

export default router