import {
  ADD_PRODUCTS_LOADING,
  ADD_PRODUCTS_FAILED,
  ADD_PRODUCTS_SUCCESS
} from "../actions/AddProductActions";
export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PRODUCTS_LOADING:
      return {
        ...state,
        isFetching: "Adding Product",
        error: null
      };
    case ADD_PRODUCTS_FAILED:
      return {
        ...state,
        isFetching:"" ,
        error: action.payload
      };
    case ADD_PRODUCTS_SUCCESS:
      return {
        ...state,
        isFetching:"" ,
        successMessage:"Product Added Successfully",
        error: null,
        products: action.payload.data,
        prodReceived:true
        
       
        
      };
    default:
      return state;
  }
};

const initialState = {
  error: null,
  products:"",
  isFetching: "",
  prodReceived: false,
  successMessage:"",
  inputInitial: {
    image: null,
    url: "",
    progress: 0
  },
  valuesInitial: { prod_type: "",
  prod_name: "",
  prod_image_url: "",
  prod_price: "",
  merch_id: ""}
};
