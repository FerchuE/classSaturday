const app = require("./app") /* '127.0.0.1' */
require("dotenv").config()
const port = process.env.PORT || 3000

app.listen/* listen:levanta el servidor */(port, () => {
    console.log(`Fer sos un genio se inicio el server en ${port}!`)
})

/* const server = http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/html'})
    fs.readFile('index.html', (error, data) => {
        if(error){
            res.writeHead(404)
            res.write("archivo no encontrado")
        }else{
            res.write(data)
        }
        res.end()
    })
})

server.listen(port, host, () => {
    console.log("servidor funcionando en", host, port)
}) */