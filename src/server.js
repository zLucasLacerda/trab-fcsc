import app from './app.js'

const PORT = 3000 || process.env.PORT
app.listen(PORT,()=>{
    console.log(`servidor rodando em http://localhost:${PORT}`)
})