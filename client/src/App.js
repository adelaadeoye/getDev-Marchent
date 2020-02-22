import React from 'react';
import './App.css';
import AppProduct from "./components/merchant/AddProduct"
import { Switch, Route } from 'react-router-dom';
import MerchantHome from './components/merchant/MerchantHome';
import Home from './components/customer/Home';
import DashBoard from './components/merchant/DashBoard';

function App() {
  return (
    <div >
      <Switch>

      <Route path="/addProduct" component={ AppProduct}/>
      <Route path="/merchant" component={MerchantHome}/>
      <Route exact path="/" component={Home}/>
      <Route path="/dashBoard" component={DashBoard}/>
      </Switch>
    </div>
  );
}

export default App;
