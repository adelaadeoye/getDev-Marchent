import React,{useState} from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { connect } from "react-redux";
import { registerUser } from "../../redux/actions/SignUpActions";

const useStyles = makeStyles(theme => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));
export const CustomerSignUp=props=> {
  console.log(props)
  const classes = useStyles();
  const initials={
   
    cust_name:"",
    cust_email:"",
    cust_password:""
  }
  const [values,setValues] =useState({
   
    cust_name:"",
    cust_email:"",
    cust_password:""
  })
 
  const handleChanges=e=>{
    e.preventDefault();
    setValues({...values,[e.target.name]:e.target.value})
  }


  const submit=(e)=>{
    e.preventDefault();
    console.log(values)
    props.registerUser(values,props.history,"customer")
    props.handleClose()

  }
  return (
    <div>
      <Dialog
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogContent>
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
         
            <form className={classes.form} noValidate>
            
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                type="text"
                label="Full Name"
                name="cust_name"
                autoComplete="name"
                value={values.cust_name}
                onChange={handleChanges}
              /><TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              type="email"
              label="Email Address"
              name="cust_email"
              autoComplete="email"
              value={values.cust_email}
              onChange={handleChanges}
            />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="cust_password"
                label="Password"
                type="password"
                autoComplete="current-password"
                value={values.cust_password}
                onChange={handleChanges}
              />

              <Grid container></Grid>
            </form>
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={submit}
          >
            Sign Up
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
function mapStateToProps(state) {
  return {
    isFetching: state.signUpReducer.isFetching,
    error: state.signUpReducer.error
  };
}

export default connect(mapStateToProps, { registerUser })(CustomerSignUp);
