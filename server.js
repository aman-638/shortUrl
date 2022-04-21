const express = require('express');
const mongoose = require('mongoose');
const shortUrl = require('./models/shortUrl');



const app = express()

mongoose.connect('mongodb+srv://aman_638:aman_638@cluster0.txhrb.mongodb.net/shortUrl?retryWrites=true&w=majority',{
    useNewUrlParser:true,useUnifiedTopology:true
})

app.set('view engine','ejs')
app.use(express.urlencoded({extended:false}))

app.get('/',  async (req,res) => {
 const shortUrls = await shortUrl.find()
 let s=shortUrls.length;
  res.render('../views/index',{shortUrls:shortUrls[s-1]})
})

app.post('/shortUrls', async (req,res) => {
  await shortUrl.create({full:req.body.fullUrl})
  res.redirect('/')
})

app.get('/:shortUrl', async (req,res) => {
   const shortUrls = await shortUrl.findOne({short:req.params.shortUrl})
   
   if(shortUrls == null) return res.sendStatus(404)

   shortUrls.save()

   res.redirect(shortUrls.full)
})

app.listen(process.env.PORT || 5000);