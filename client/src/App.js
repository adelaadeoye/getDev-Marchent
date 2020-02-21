import React from 'react';
import './App.css';
import AppProduct from "./components/merchant/AddProduct"
import { Switch, Route } from 'react-router-dom';
import MerchantHome from './components/merchant/MerchantHome';

function App() {
  return (
    <div >
      <Switch>

      <Route path="/addProduct" component={ AppProduct}/>
      <Route path="/merchant" component={MerchantHome}/>
      </Switch>
    </div>
  );
}

export default App;
