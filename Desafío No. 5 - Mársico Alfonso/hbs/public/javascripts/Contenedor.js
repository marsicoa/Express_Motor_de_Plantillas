import fs from 'fs'
//const fsPromises = fs.promises
/*
❏ readFile: lectura de un archivo en forma asincrónica
❏ writeFile: escritura de un archivo en forma asincrónica
❏ appendFile: actualización de un archivo en forma asincrónica
❏ unlink: borrado de un archivo en forma asincrónica
❏ mkdir: creación de una carpeta
*/
let db = []
class Contenedor{
    constructor(archivo){
        this.archivo = archivo
    }

    save(o){        

        const escribirProductos = async () => {
            try{
                const res = await fs.promises.readFile(this.archivo, 'UTF-8')
                if(res.length == 0){
                    o.id = 1
                    db.push(o)
                }else {
                    db = JSON.parse(res)
                    o.id = db[db.length - 1].id + 1
                    db.push(o)
                }
                await fs.promises.writeFile(this.archivo, JSON.stringify(db))
            }
            catch (err) {
                console.log(`${err} No se encuentra el archivo ${this.archivo}, se procede a crearlo`)
                await fs.promises.writeFile(this.archivo, '')
            }
        }
        escribirProductos().then(res => res)

    }

    getById(n){

        const buscarIdObjetos = async () => {
            try {
                const res = await fs.promises.readFile(this.archivo, 'UTF-8')
            
                if (res.length == 0) {
                    return console.log('El contenedor esta vacio')
                } else {
                    const objetos = JSON.parse(res)
                    let filtroId = objetos.filter(el => el.id == n)
                    if (!filtroId.length) {
                        console.log(`No se encontraron objetos con id ${n}`)
                        return {error: 'producto no encontrado'}
                    } else {
                        console.log(`Resultado de la busqueda> ${JSON.stringify(filtroId)}`)
                        return filtroId
                    }
                }
            }
            catch (err){
                console.log(err)
            }
        }
        buscarIdObjetos().then(res => res)

    }

    getAll(){

        const recuperarObjetos = async () => {
            try {
                const res = await fs.promises.readFile(this.archivo, 'UTF-8')
                if (res.length == 0 || res == '[]') {
                    return console.log('El contenedor esta vacio')
                } else {
                    db = JSON.parse(res)
                    //console.log(db)
                    return db
                }
            }
            catch (err){
                console.log(err);
            }
        }
        recuperarObjetos().then((res) => {res.forEach(element => {
            db.push(element)
        })})

        return db       
    }

    deleteById(n){

        const eliminarIdObjetos = async () => {
            try {
                const res = await fs.promises.readFile(this.archivo, 'UTF-8')
                const objetos = JSON.parse(res);
                let filtroId = objetos.filter(el => el.id == n)
                if (filtroId.length) {
                    let objetosRestantes = objetos.filter(el => el.id != n)
                    await fs.promises.writeFile(this.archivo, JSON.stringify(objetosRestantes))
                    return console.log(`Se ha borrado el objeto ${n}`)
                } else  {
                    console.log(`No se encontraron objetos con id ${n}`)
                    return {error: 'producto no encontrado'}
                }
            }
            catch (err){
                console.log(err)
            }
        }
        eliminarIdObjetos().then(res => res)

    }

    deleteAll(){

        const eliminarObjetos = async () => {
            try {
                await fs.promises.writeFile(this.archivo, '');
                console.log('Se han eliminado todos los objetos')
            }
            catch (err) {
                console.log(err);
            } 
        }
        eliminarObjetos().then(res => res)

    }

    updateById(n, o){

        const actualizarProductos = async () => {
            try{
                const res = await fs.promises.readFile(this.archivo, 'UTF-8')
                db = JSON.parse(res)
                const filtroId = db.filter((el) => {return el.id == n})
                if(filtroId[0] == undefined){
                    console.log(`No se encontraron objetos con id ${n}`)
                    return {error: 'producto no encontrado'}
                }else{
                    o.id = filtroId[0].id
                    filtroId[0] = o
                    db[--n] = filtroId[0]
                    await fs.promises.writeFile(this.archivo, JSON.stringify(db))
                    console.log(`Se ha actualizado el producto con id ${filtroId[0].id}`)
                }            
            }
            catch (err) {
                console.log(`${err} No se encuentra el archivo ${this.archivo}, se procede a crearlo`)
            }
        }
        actualizarProductos().then(res => res)

    }

}
export default Contenedor