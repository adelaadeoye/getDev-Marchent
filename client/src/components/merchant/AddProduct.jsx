import React, { useState, useEffect } from "react";
import { storage } from "../../firebase";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import CircularProgress from '@material-ui/core/CircularProgress';
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import { TextField } from "@material-ui/core";
import { connect } from "react-redux";
import {addProduct} from "../../redux/actions/AddProductActions"

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    background: "#ffffff",
    height: "100vh",
    textAlign: "center",
    border: "2px solid red"
  },
  image: {
    maxWidth: "100%",
    maxHeight: "100%",
    display: "block",
    textAlign: "center"
  },
  images: {
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
    height: "100%",
    width: "50%",
    margin: "auto",
    border: "2px solid red"
  },
  input: {
    display: 'none',
  },
}));
export const AddProduct =(props)=> {
  const classes = useStyles();
  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = useState(2012);
  useEffect(() => {
    setLabelWidth(100);
  }, []);
  
  const [input, setInput] = useState({
    image: null,
    url: "",
    progress: 0,
    disable:true
  });
  const [values, setValues] = useState({
    prod_type:"",
    prod_name:"",
    prod_image_url:"",
    prod_price:"",
    merch_id:""
  });
const userID= sessionStorage.getItem("userID")
  useEffect(()=>{
    setValues({...values, prod_image_url:input.url,merch_id:userID});

  },[input.url])
  const handleChange = event => {
  setValues({...values, [event.target.name]:event.target.value});
};
  const handleSelect = e => {
    if (e.target.files[0]) {
      setInput({ ...input, [e.target.name]: e.target.files[0],disable:false });
    }
  };

  

  const handleUpload = e => {

    e.preventDefault();
    const UploadTask = storage
      .ref(`images/${input.image.name}`)
      .put(input.image);
    UploadTask.on(
      "state_changed",
      snapshot => {
        //progress function
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setInput({ ...input, progress: progress });
      },
      error => {
        //error function
        console.log(error);
      },
      () => {
        //complete function
        storage
          .ref("images")
          .child(input.image.name)
          .getDownloadURL()
          .then(url => {
            console.log(url);
            setInput({ ...input, url: url });
          });
      }
    );
  };
  const disable=true
  const submit=e=>{
    e.preventDefault();
   
      props.addProduct(values,userID,props.history)
      setInput(props.inputInitial)
      setValues(props.valuesInitial)

  


  }
  return (
    <div className={classes.root}>
      <CssBaseline />
      <Container maxWidth="sm">
        {/* <progress value={input.progress} max="100" /> */}
  <p>{props.successMessage}</p>
        <CircularProgress variant="determinate" value={input.progress}  />

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <div className={classes.images}>
              <img
                name="url"
                src={
                  input.url ||
                  "https://via.placeholder.com/100x150?text=Product Image"
                }
                alt="uploaded"
                className={classes.image}
              />
            </div>
          </Grid>
          <Grid item xs={12} sm={6}>
           
            <input name="image" type="file" onChange={handleSelect} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button variant="outlined"onClick={handleUpload} disabled={input.disable}>Upload</Button>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="outlined-basic"
              label="Outlined"
              variant="outlined"
              label="Name"
              fullWidth
              name="prod_name"
              value={values.prod_name}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl
              variant="outlined"
              fullWidth
              className={classes.formControl}
            >
              <InputLabel ref={inputLabel} htmlFor="outlined-age-native-simple">
                Product Type
              </InputLabel>
              <Select
                native
                value={values.prod_type}
                onChange={handleChange}
                labelWidth={labelWidth}
                inputProps={{
                  name: "prod_type",
                  id: "outlined-age-native-simple"
                }}
              >
                <option value="" />
                <option value={"Goods"}>Goods</option>
                <option value={"Services"}>Services</option>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="outlined-basic"
              label="Outlined"
              variant="outlined"
              label="Price (#)"
              type="number"
              fullWidth
              name="prod_price"
              value={values.prod_price}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button variant="outlined" type="number" fullWidth size="large" onClick={submit}>
              Save
            </Button>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
function mapStateToProps(state) {
  return {
    inputInitial:state.addProductReducer.inputInitial,
    valuesInitial:state.addProductReducer.valuesInitial,
    isFetching:state.addProductReducer.isFetching,
    successMessage:state.addProductReducer.successMessage,
  };
}

export default connect(mapStateToProps, {addProduct})(AddProduct);

