import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { connect } from "react-redux";
import {merchantProduct,addProduct,deleteProduct} from "../../redux/actions/AddProductActions"
import { Grid } from '@material-ui/core';
const useStyles = makeStyles({
  root: {
    maxWidth: 300,
  },
  media: {
    height: 250,
  },
});

export const Product=(props)=>{
  const classes = useStyles();
  const userID=sessionStorage.getItem("userID")
  const [products, setProducts]=useState("")

  useEffect(()=>{
    props.merchantProduct(userID)
      setProducts(props.products)
    
  },[props.prodReceived])
const pro= Object.entries(products) 
console.log("I am products",pro)
const handleDelete=(prod_id)=>{
  props.deleteProduct(prod_id)
}
  return (

    <Grid container spacing={2}>
      {pro.map(([key,value])=>(
        
 <Grid item xs={12} sm={3} key={key}>
 <Card className={classes.root}>
 <CardActionArea>
   <CardMedia
     className={classes.media}
     image={value.prod_image_url}
     title="Contemplative Reptile"
   />
   <CardContent>
     <Typography gutterBottom variant="h5" component="h2">
       {value.prod_name}
     </Typography>
     <Typography variant="h6" color="textSecondary" component="h6">
       Price:#{value.prod_price}.00
     </Typography>
     <Typography variant="h6" color="textSecondary" component="p">
       Type:{value.prod_type}
     </Typography>
   </CardContent>
 </CardActionArea>
 <CardActions>
   <Button size="small" color="primary" disabled>
     Edit
   </Button>
   <Button size="small" color="primary" onClick={()=>handleDelete(value.id)} >
     Delete
   </Button>
 </CardActions>
</Card>

 </Grid>

      ))}
     
    </Grid>
   );
}
function mapStateToProps(state) {
    return {
        products:state.addProductReducer.products,
        prodReceived:state.addProductReducer.prodReceived
    };
  }
  
  export default connect(mapStateToProps, {merchantProduct,addProduct,deleteProduct})(Product);
  