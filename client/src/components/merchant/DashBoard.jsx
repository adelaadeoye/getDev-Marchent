import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { connect } from "react-redux";
import IconButton from "@material-ui/core/IconButton";
import Logo from "../../image/logo.png";
import PropTypes from "prop-types";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import PhoneIcon from "@material-ui/icons/Phone";
import FavoriteIcon from "@material-ui/icons/Favorite";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Box from "@material-ui/core/Box";
import AddProduct from "./AddProduct"
import Product from "./Products"

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

function a11yProps(index) {
  return {
    id: `scrollable-force-tab-${index}`,
    "aria-controls": `scrollable-force-tabpanel-${index}`
  };
}
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    background: "#ffffff",
    height: "100%"
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  },
  appMenu: {
    background: "#010A43"
  },
  paper: {
    padding: theme.spacing(1),
    // textAlign: "center",
    marginTop: "30px",
    width:"100%"
  },
  addProduct: {
    display:"flex",
    flexDirection:"column",
   textAlign:"center",
   justifyItems:"center",
   justifyContent:"center",
  },
  image:{
    margin:"auto"

  },
 
  
}));

export const DashBoard = (props) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [message, setMessage] = useState("Welcome");

  useEffect(() => {
    setMessage(sessionStorage.getItem("message"));
  });
  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appMenu}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <img src={Logo} />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            {message}
          </Typography>
          <Button color="inherit">Logout</Button>
          <Button color="inherit">Visit store</Button>
        </Toolbar>
      </AppBar>
      <br />
      <CssBaseline />
      <Container className={classes.paper}>
        <Grid container spacing={2} justify="center" >
          <Grid item xs={12}>
            
          </Grid>
          <Grid item xs={12}></Grid>
        </Grid>
        <Grid container spacing={2} justify="center">
          <Grid item xs={12}>
          <AppBar position="static" color="#ffffff">
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="off"
          indicatorColor="primary"
          textColor="primary"
          aria-label="scrollable force tabs example"
          
        >
          <Tab label="Item One" icon={<PhoneIcon />} {...a11yProps(0)} />
          <Tab label="Item Two" icon={<FavoriteIcon />} {...a11yProps(1)} />
          <Tab label="Add Product" icon={<AddCircleOutlineIcon />} {...a11yProps(1)} />
         
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0} >
      <Product props={props}/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
      <TabPanel value={value} index={2}>
      <AddProduct props={props}/>
      </TabPanel>
          </Grid>
        </Grid>
      </Container>
     
      

    </div>
  );
};
function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps, {})(DashBoard);
