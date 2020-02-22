import { axiosWithAuth } from "../../utils/AxiosWithAuth";
export const ADD_PRODUCTS_LOADING = "ADD_PRODUCTS_LOADING";
export const ADD_PRODUCTS_SUCCESS = "ADD_PRODUCTS_SUCCESS";
export const ADD_PRODUCTS_FAILED = "ADD_PRODUCTS_FAILED";

export const addProductLoading = () => ({ type: ADD_PRODUCTS_LOADING });
export const addProductSuccess = data => ({
  type: ADD_PRODUCTS_SUCCESS,
  payload: data
});
export const addProductFailure = error => ({
  type: ADD_PRODUCTS_FAILED,
  payload: error
});


export function addProduct(values, merch_id, history) {
  return function(dispatch) {
    dispatch(addProductLoading());
    //TODO merchant
    return axiosWithAuth()
      .post(`http://localhost:4000/api/products/${merch_id}`,values)
      .then(response => {
        dispatch(addProductSuccess(response));
        //TODO push to Merchant login page or push to merchant dashboard
        
      })
      .catch(error => {
        dispatch(addProductFailure(error.response));
        console.log(error.response);
      });
  };
}
export function merchantProduct(merch_id, history) {
  return function(dispatch) {
    dispatch(addProductLoading());
    //TODO merchant
    return axiosWithAuth()
      .get(`http://localhost:4000/api/products/${merch_id}`)
      .then(response => {
        dispatch(addProductSuccess(response));
        //TODO push to Merchant login page or push to merchant dashboard
        
      })
      .catch(error => {
        dispatch(addProductFailure(error.response));
        console.log(error.response);
      });
  };
}
export function deleteProduct(prod_id) {
  return function(dispatch) {
    dispatch(addProductLoading());
    //TODO merchant
    return axiosWithAuth()
      .delete(`http://localhost:4000/api/products/${prod_id}`)
      .then(response => {
        dispatch(addProductSuccess(response));
        //TODO push to Merchant login page or push to merchant dashboard
        
      })
      .catch(error => {
        dispatch(addProductFailure(error.response));
        console.log(error.response);
      });
  };
}