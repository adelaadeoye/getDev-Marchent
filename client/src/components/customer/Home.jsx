import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import store from "../../image/store.jpg"
import SignIn from "../Login_SignUp/SignIn"
import CustomerSignUp from "./CustomerSignUp"
import IconButton from '@material-ui/core/IconButton';
import Logo from "../../image/logo.png"
import Product from "../merchant/Products"
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    background: "#ffffff",
    height: "100vh"
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  },
  appMenu: {
    background: "#010A43",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    marginTop: "30px"

  },
  image:{
    maxWidth:"100%",
    maxHeight:"100%",
    display:"block"
  }
}));

export default function Home(props) {
  const classes = useStyles();
  const [signUp, setSignUp] = React.useState(false);
  const [signIn, setSignIn] = React.useState(false);

  const handleClickOpen = (option) => {
    if(option==="signUp"){

      setSignUp(true);
    }
    else{
      setSignIn(true)
    }
  };

  const handleClose = () => {
    setSignUp(false);
    setSignIn(false);
  };
  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appMenu}>
        <Toolbar>
        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <img src={Logo}/>
          </IconButton>
         
          <Button color="inherit"onClick= {()=>handleClickOpen("signIn")}>SignIn</Button>
          <Button color="inherit" onClick= {()=>handleClickOpen("signUp")}>SignUp</Button>
          <Button color="inherit">Be a Merchant </Button>
        </Toolbar>
      </AppBar>
      <br/>
      <CssBaseline />
      <Container maxWidth="lg">
        <Grid container spacing={2} justify="center" className={classes.paper}>
            
        </Grid>
        <SignIn handleClose={handleClose} open={signIn} userType={"customer"}/>
        <CustomerSignUp handleClose={handleClose} open={signUp} props={props}/>
        <Product/>
      </Container>
    </div>
  );
}
