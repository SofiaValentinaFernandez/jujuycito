const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const Article = require('../models/article')
const articleRouter = require('../routes/articles')
const methodOverride = require('method-override')

const app = express() //inicializamos express
const port = process.env.PORT || 3000

app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: false}))
app.use(methodOverride('_method')) //usar edit y delete en nuestro form


//RUTA PRINCIPAL > HOME
app.get('/', async(req, res)=>{ //trabajamos con asincronia. Le tenmos que decir que la ruta se va a trabajar de forma asincrona.
    const articles = await Article.find().sort({
        createAt: "desc"//lo mas nuevo ,lo trae primero.
    })
    res.render('articles/index', {articles: articles}) //nos trae la vista. 
})

app.get('/historia', async(req, res)=>{
    const historia = await Article.find()
    res.render('articles/historia', {historia: historia})
})

app.get('/gastronomia', async(req, res)=>{
    const gastronomia = await Article.find()
    res.render('articles/gastronomia', {gastronomia: gastronomia})
})

app.get('/turismo', async(req, res)=>{
    const turismo = await Article.find()
    res.render('articles/turismo', {turismo:turismo})
})

app.get('/economia', async(req, res)=>{
    const economia = await Article.find()
    res.render('articles/economia', {economia:economia})
})

app.get('/musica', async(req, res)=>{
    const musica = await Article.find()
    res.render('articles/musica', {musica:musica})
})
// MONGODB CONNECTION
mongoose
    .connect(process.env.MONGODB_URI)
    .then(()=>console.log('¡Conectado a MongoDB Atlas!'))
    .catch((err)=>console.error(err))

app.use('/articles', articleRouter);

app.use('/public/', express.static('./public/'))


app.listen(port, 
    ()=>console.log(`Servidor escuchando en el puerto ${port}`)
)



