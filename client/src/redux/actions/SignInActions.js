import axios from "axios";

export const LOGIN_USER_LOADING = "LOGIN_USER_LOADING";
export const LOGIN_USER_SUCCESS = "LOGIN_USER_SUCCESS";
export const LOGIN_USER_FAILED = "LOGIN_USER_FAILED";

export const loginUserLoading = () => ({ type: LOGIN_USER_LOADING });
export const loginUserSuccess = data => ({
  type: LOGIN_USER_SUCCESS,
  payload: data
});
export const loginUserFailure = error => ({
  type: LOGIN_USER_FAILED,
  payload: error
});

export function loginUser(values, history, userType) {
  if (userType === "merchant") {
    return function(dispatch) {
      dispatch(loginUserLoading());
      //TODO merchant
      return axios
        .post("http://localhost:4000/api/merchAuth/login", values)
        .then(response => {
          dispatch(loginUserSuccess(response));
          //TODO push to Merchant login page or push to merchant dashboard
          sessionStorage.setItem("token",response.data.token);
          sessionStorage.setItem("userID",response.data.userID);
          // history.push("/dashBoard");
        })
        .catch(error => {
          dispatch(loginUserFailure(error.response));
          console.log(error.response);
        });
    };
  } else {
    return function(dispatch) {
      const cust_email=values.merch_email
      const cust_password=values.merch_password
      dispatch(loginUserLoading());
      return axios
        .post("http://localhost:4000/api/custAuth/login", {cust_email,cust_password})
        .then(response => {
          dispatch(loginUserSuccess(response));
          //TODO push to customer login page or push to customer dashboard
          // history.push("/login");
        })
        .catch(error => {
          dispatch(loginUserFailure(error.response));
        });
    };
  }
}
