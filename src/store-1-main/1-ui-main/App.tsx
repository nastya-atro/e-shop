import React from 'react';
import { Provider } from 'react-redux';
import { Route, withRouter } from 'react-router';
import store from '../2-bll-main/redux-store';
import { BrowserRouter } from "react-router-dom";
import Store from '../../store-2-features/Store/product-1-ui/Store';
import Product from '../../store-2-features/Store/product-1-ui/Product';
import AdminAllCart from './../../store-2-features/ShopCart/1-ui-cart/AdminAllCart';
import Users from './../../store-2-features/Users/1-ui-users/Users';
import LoginPage from '../../store-2-features/Users/1-ui-users/LoginPage';
import User from '../../store-2-features/Users/1-ui-users/SingleUser';
import AgminSingleCart from '../../store-2-features/ShopCart/1-ui-cart/AdminSingleCart';


const App = () => {
  return (
    <React.Fragment>
      <Route exact path='/admin' render={() => <AdminAllCart />} />
      <Route path='/admin/cart/:Id?' render={() => <AgminSingleCart/>} />
      <Route path='/users' render={() => <Users />} />
      <Route path='/login' render={() => <LoginPage />} />
      <Route exact path='/' render={() => <Store />} />
      <Route exact path='/products/:Id?' render={() => <Product />} />
      <Route exact path='/user/:Id?' render={() => <User />} />
    </React.Fragment>
  );
}




let AppC = withRouter(App)

const AppContainer = () => {
  return (
    <AppC />
  )
}

let MainApp: React.FC = () => {
  return <BrowserRouter>
    <Provider store={store}>
      <AppContainer />
    </Provider>
  </BrowserRouter>
}

export default MainApp
