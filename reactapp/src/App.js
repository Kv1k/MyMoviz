
import React, { useState, useEffect } from 'react';
import { Container, Row, Nav, NavItem,NavLink, Button, Popover, PopoverHeader, PopoverBody, ListGroup, ListGroupItem} from 'reactstrap';
import {Cards} from './components/Movie'

//composant reactStrap:


function App() {
  // Les datas des films
  const [movieData, setMovieData]= useState([]);
  const [moviesCount, setmoviesCount]= useState(0);
  const[moviesWishList, setmoviesWishList]= useState([]);

 useEffect(()=>{
   async function loadDataAPI(){
       var apiResponse= await fetch('/new-movies');
       var response = await apiResponse.json();
      setMovieData (response.resAPI.results)

      var wishlist= await fetch('/wishlist-movie');
      var responseWishlist = await wishlist.json();
      
     
   
    
     var wishlistfromDB = responseWishlist.movies.map((movie, i) => { 
       
         return {img:movie.img, name:movie.name};
       
       
     })

     setmoviesWishList(wishlistfromDB)
     setmoviesCount(responseWishlist.movies.length)
       
  }

    

      loadDataAPI()
     
  
  },[]);

 

  console.log(movieData);
  
  
  

  var handleClickDeleteMovie= async (name)=> {
    await fetch(`/wishlist-movie/${name}`, {
      
      method: 'DELETE'
    });
    
    setmoviesCount(moviesCount-1);
    setmoviesWishList( moviesWishList.filter((object)=>(object.name !== name) ));
    
    

    
    
   
    
  }
 // app fait les presentation
 

  var handleClickAddMovie =async (name,img)=> {
     setmoviesWishList( [...moviesWishList,{name:name, img: img} ] );
    
    setmoviesCount(moviesCount+1)
   
      await fetch('/wishlist-movie', {
         method: 'POST',
         headers: {'Content-Type':'application/x-www-form-urlencoded'},
         body: `name=${name}&img=${img}`
       });
      
     
    
    
      
      
      
     
   
    
    
   
  }
  
 
  //On push les data dans movieList
  
  

  const [popoverOpen, setPopoverOpen] = useState(false);
  const toggle = () => setPopoverOpen(!popoverOpen);


  var cardWish= moviesWishList.map((movie,i)=>{
    

    return (<ListGroup> <ListGroupItem onClick={() => {handleClickDeleteMovie(movie.name)}}> <img width="70" height="40" src={movie.img} alt='ok'/> {movie.name}</ListGroupItem></ListGroup>)
  })
  console.log(moviesWishList);


  var movieList= movieData.map((movie, i)=>{
    var resultMovie = moviesWishList.find(element => (element.name === movie.title))
    var isSee = false
    if(resultMovie !== undefined){
      isSee = true
    }
    var desc= movie.overview;
    
     var image = `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`
     if(movie.overview.length> 80){
      desc= movie.overview.slice(0,200)
     
    }
     
    return (<Cards key= {i} movieSee={isSee} movieName={movie.title} movieDesc={desc} movieImg={image} 
     movieNote={movie.vote_average} movieVote={movie.vote_count} handleClickParent={handleClickAddMovie}
     handleClickDeleteMovieParent={handleClickDeleteMovie}/> 
     )
  })


  return (
    <div>
      <Nav color="dark" light expand="md" >
          <span className="navbar-brand">
            <img src="./logo.png" width="30" height="30" className="d-inline-block align-top" alt="logo" />
          </span>
          <NavItem>
            <NavLink style={{color:'white'}}>Last Releases</NavLink>
          </NavItem>
          <NavItem>
            <NavLink>
               <div>
                <Button type="button" id="Popover1"> {moviesCount} films</Button>
                <Popover placement="bottom" isOpen={popoverOpen} target="Popover1" toggle={toggle}>
                  <PopoverHeader>Wishlist</PopoverHeader>
                  <PopoverBody>
                  
                  
                   {cardWish}
                  
                  </PopoverBody>
                </Popover>
               </div>
                
            </NavLink>
          </NavItem>
        </Nav>
      <Container>
        <Row>
          {movieList}
        </Row>
      </Container>
     
      
      
    </div>
  );
}






export default App;
