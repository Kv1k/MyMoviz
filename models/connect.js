var mongoose = require('mongoose')
require ('dotenv').config ();


var options = {
    connectTimeoutMS: 5000,
    useNewUrlParser: true,
    useUnifiedTopology : true
}
  mongoose.connect('URI_BDD', 
      options,         
      function(err) {
       console.log(err);
      }
  );
  
mongoose.connect(`mongodb+srv://dbKv1k:${process.env.connectDB}@cluster0.szpqy.mongodb.net/mymovizapp?retryWrites=true&w=majority`,
    options,         
    function(error){
    if (error) {
        console.log(error);
    } else {
        console.log("connection ok");
    }
    }
);

