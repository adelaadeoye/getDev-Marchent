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
import SignUp from "../Login_SignUp/SignUp"
import IconButton from '@material-ui/core/IconButton';
import Logo from "../../image/logo.png"
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

export default function MerchantHome() {
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
          <Typography variant="h6" className={classes.title}>
        
store          </Typography>
          <Button color="inherit"onClick= {()=>handleClickOpen("signIn")}>SignIn</Button>
          <Button color="inherit" onClick= {()=>handleClickOpen("signUp")}>SignUp</Button>
          <Button color="inherit">Visit store</Button>
        </Toolbar>
      </AppBar>
      <br/>
      <CssBaseline />
      <Container maxWidth="lg">
        <Grid container spacing={2} justify="center" className={classes.paper}>
          <Grid item xs={12}>
            <Typography variant="h4">
              Welcome to Get Dev Online Store
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">
              We help you get to over 10 millions of customers who wants your products<br/>
              Signup today and start making more money 
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>

            <img src={store} className={classes.image}/>
          </Grid>
        </Grid>
        <SignIn handleClose={handleClose} open={signIn}/>
        <SignUp handleClose={handleClose} open={signUp}/>
      </Container>
    </div>
  );
}
