const express = require('express')
const Article = require('../models/article')
const router = express.Router()


// GET => obtener el nuevo articulo
router.get('/new', (req, res)=>{
    res.render('articles/new', {article: new Article()})
})

//ruta para renderizar el articulo a EDITAR
router.get("/edit/:id", async(req, res, next)=>{
    const article = await Article.findById(req.params.id);
    res.render('articles/edit', {article:article})
})

//Obtenemos el articulo con slug aplicado
router.get('/:slug', async(req, res)=>{
    const article = await Article.findOne({slug: req.params.slug})
    if(article == null) res.redirect('/')
    res.render('articles/show', {article: article})
})

// //buscador
// router.get('/find', async(req, res)=>{
//     const busqueda = await Article.find({})
// })

//editamos Articulo por ID
router.put('/:id', async(req, res, next)=>{
    req.article = await Article.findById(req.params.id)
    next()
}, saveArticleAndRedirect('edit'))

//ELIMINAR articulo por id
router.delete('/:id', async(req, res)=>{
    await Article.findByIdAndDelete(req.params.id)
    
    res.redirect('/')
})

//creamos nuevo articulo
router.post('/', async(req, res, next)=>{
    req.article = new Article()
    next()
}, saveArticleAndRedirect('new'))


//Guardar articulo y redireccionar
function saveArticleAndRedirect(path){
    return async(req, res)=>{
        let article = req.article
        article.title = req.body.title
        article.description = req.body.description
        article.markdown = req.body.markdown
        try{
            article = await article.save()
            res.redirect(`/articles/${article.slug}`)
        }catch(e){
            res.render(`articles/${path}`, {article: article})
        }
    }
}


module.exports = router;

