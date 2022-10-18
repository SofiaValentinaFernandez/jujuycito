const mongoose = require('mongoose');
const { marked } = require('marked'); // velocidad
const slugify = require('slugify'); // despues del dominio(.com), se refiere a una ruta específica. https://dominio.com/nombre-entrada.html/#schema => nombre-entrada sería slug. Mejora el SEO.
const createDOMPurify = require('dompurify');  //purificador de DOM. Seguridad => evita que se destruya o robe data. 
const { JSDOM } = require('jsdom'); //recrear un dom dentro del servidor.
const DOMPurify = createDOMPurify(new JSDOM().window);

const articleSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
        },
        markdown: {
            type: String,
            required: true,
        },
        createdAt: { //esto nos va a decir la fecha de creacion
            type: Date, 
            default: Date.now,
        },
        slug: {
            type: String,
            required: true,
            unique: true,
        },
        sanitizedHtml:{
            type: String,
            required: true,
        }
    },
    {
        versionKey: false
    }
)

//MIDDLEWARE .pre()
articleSchema.pre('validate', function(next){
    if(this.title){
        this.slug = slugify(this.title, {lower: true, strict:true})
    }

    if(this.markdown){
        this.sanitizedHtml = DOMPurify.sanitize(marked(this.markdown))
    }
    next();
})

module.exports = mongoose.model('Article', articleSchema)


















