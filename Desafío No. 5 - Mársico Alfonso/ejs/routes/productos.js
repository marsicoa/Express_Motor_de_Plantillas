import express from 'express'
import Contenedor from '../public/javascripts/Contenedor.js'

const router = express.Router()
const productos = new Contenedor('./public/txt/productos.txt')

router.get('/', (req, res) => {
    res.render('pages/index')
})

router.post('/productos', async (req, res) => {
    await productos.save(req.body)
    res.redirect('/')
})

router.get('/productos', async (req, res) =>{
    const db = await productos.getAll()
    res.render('pages/listado', {productos: db})
})

export default router