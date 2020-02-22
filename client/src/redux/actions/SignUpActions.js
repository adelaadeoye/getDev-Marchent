import axios from "axios";

export const REGISTER_USER_LOADING = "REGISTER_USER_LOADING";
export const REGISTER_USER_SUCCESS = "REGISTER_USER_SUCCESS";
export const REGISTER_USER_FAILED = "REGISTER_USER_FAILED";

export const registerUserLoading = () => ({ type: REGISTER_USER_LOADING });
export const registerUserSuccess = data => ({
  type: REGISTER_USER_SUCCESS,
  payload: data
});
export const registerUserFailure = error => ({
  type: REGISTER_USER_FAILED,
  payload: error
});

export function registerUser(values, history, userType) {
  if (userType === "merchant") {
    return function(dispatch) {
      dispatch(registerUserLoading());
      //TODO merchant
      return axios
        .post("http://localhost:4000/api/merchAuth/register", values)
        .then(response => {
          dispatch(registerUserSuccess(response));
          //TODO push to Merchant login page or push to merchant dashboard

          // history.push("/login");
        })
        .catch(error => {
          dispatch(registerUserFailure(error.response));
        });
    };
  } else {
    return function(dispatch) {
      dispatch(registerUserLoading());
      console.log(history)
      return axios
        .post(
            "http://localhost:4000/api/custAuth/register", values
        )
        .then(response => {
          dispatch(registerUserSuccess(response));
          //TODO push to customer login page or push to customer dashboard
        })
        .catch(error => {
          dispatch(registerUserFailure(error.response));
        });
    };
  }
}
