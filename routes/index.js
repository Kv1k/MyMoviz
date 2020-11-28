var express = require('express');
var router = express.Router();

var moviesModel = require('../models/movies');

/* GET home page. */

var request = require('sync-request');
require ('dotenv').config ();





router.get('/new-movies', function(req, res, next) {
  var resAPI = request("GET", `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.api_key}&language=fr-FR&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`);

  var resAPI = JSON.parse(resAPI.body);
  
 
  res.json({resAPI,result:true});
});


router.post('/wishlist-movie', async function(req,res,next){
  


    var newMovie= new moviesModel({ 
    name:req.body.name,
    img: req.body.img,
   
  })
  var dataSave=await newMovie.save()

  

  if(dataSave.name){
   
    
    result=true
  }
 
 
 
  res.json({result})

  
});

router.delete( '/wishlist-movie/:name', async function(req,res,next){
  
  var deleteMovie= await moviesModel.deleteOne({ name: req.params.name })
  var result= false;

  if (deleteMovie.deletedCount === 1){
    result=true
  }
  
  
  res.json({result})

  
});

router.get('/wishlist-movie', async function(req,res,next){
  
  var movies= await moviesModel.find()

  res.json({movies})

  
});
  

module.exports = router;
