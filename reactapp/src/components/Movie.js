import React, { useState } from 'react';
import { Col } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart,faVideo,faStar} from '@fortawesome/free-solid-svg-icons'
import {
    
    Card, CardImg, CardText, CardBody,CardTitle,
    Button, ButtonGroup,
    Badge
    
   
} from 'reactstrap';
  



const Cards = (props) => {
  var star=[]
  var rating=[]
  
  var nbVote= props.movieVote
  var moyenne= props.movieNote
  

  
  const [views, setWatch] = useState(0);
  const [myRatingMovie, setRating]= useState(0);
  const [addVote, setVote]= useState(false);
  const [addStar, setAddStar]= useState(0);
 
  var ratingMoreClick = () =>{
    if (myRatingMovie<10){
      setRating(myRatingMovie+1)
      setVote(true)
     
      
    }
    
  }
  var ratingLessClick = () =>{
    if (myRatingMovie>0){
       setRating(myRatingMovie-1)
    }
   
   
  }
  var starClick= (note) =>{
    for(let i= 0; i<rating.length;i++){
      setAddStar(note)
      
    }
    
  }
  



  
  for (let i = 0; i <10; i++) {
     nbVote=props.movieVote
    let colorRating;
    if (i<myRatingMovie){
      colorRating={color:'#e74c3c'};
      moyenne= (((props.movieVote*props.movieNote)+myRatingMovie)/(props.movieVote+1));
    }
    
    if (i<addStar){
      colorRating={color:'#e74c3c'};
      moyenne= (((props.movieVote*props.movieNote)+addStar)/(props.movieVote+1));
    }
    
    
    
    rating.push(<FontAwesomeIcon onClick={ ()=>starClick(i+1) } style={colorRating} icon={faStar} size="sm"/>)
  }
  
  
  var likeClick = (name, img, movieSee)=> {
    

    
    if(movieSee === true){
      props.handleClickDeleteMovieParent(name)
    }
    else{
      props.handleClickParent(name, img)
      
    }
    
    // L'enfant fait connaissance de son parent App via la props handleClickParent
   
    
  }
  var watchClick = ()=> {
    setWatch(views+1);
  }

  var colorLike;
   
  if(props.movieSee === true ) {

    colorLike= { color: "#e74c3c" };
    
  }
  else {
    var colorLike = {cursor:'pointer'}
  }
   

  for (let i = 0; i <10; i++) {
   let color=''
   if(addVote===true || addStar>0){
     nbVote=(props.movieVote+1)
   }
   if (i<moyenne ){
     color={color:'#e74c3c'};
   }
   star.push(<FontAwesomeIcon style={color} icon={faStar}/>)
  }
  
    

    return (
      
       
            <Col  xs="12" lg="6" xl="4" style={{marginTop: '20px'}}>
              <Card>
                <CardImg top width="100%" src={props.movieImg} alt={props.movieName} />
                <CardBody>
                  <CardText >Likes <FontAwesomeIcon onClick={ ()=>likeClick(props.movieName, props.movieImg, props.movieSee) } style ={ colorLike} cursor="pointer" icon={faHeart}/></CardText>
                  <CardText>Nombres de vue <FontAwesomeIcon  onClick={ ()=>watchClick() }  cursor="pointer" icon={faVideo}/>  <Badge color="secondary">{views}</Badge></CardText>
                  
                  <CardText> Mon avis 
                    {rating}
                    
                    <ButtonGroup size="sm"color="secondary">
                      <Button onClick={ ()=>ratingLessClick() }>-</Button>
                      <Button onClick={ ()=>ratingMoreClick() }>+</Button>
                    </ButtonGroup>  
                  </CardText>
                  <CardText> Vote 
                    {star}
                    ({nbVote})
                  </CardText>
                 
                  <CardTitle>{props.movieName}</CardTitle>
                  <CardText>{props.movieDesc}</CardText>
                </CardBody>
              </Card>
             
            </Col>
  
    );
  };
  
  
  
  
  
  
  
  
export {Cards};