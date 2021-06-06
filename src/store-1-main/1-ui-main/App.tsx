import React from 'react';
import { Provider } from 'react-redux';
import { Route, withRouter } from 'react-router';
import store from '../2-bll-main/redux-store';
import { BrowserRouter } from "react-router-dom";
import Store from '../../store-2-features/Store/1-ui/Store';
import Product from './../../store-2-features/Store/1-ui/Product';


const App = () => {
  return (
    <React.Fragment>
      <Route exact path='/' render={() => <Store />} />
      <Route exact path='/products/:Id?' render={() => <Product />} />
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
