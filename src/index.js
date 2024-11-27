import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import { Provider } from 'react-redux';

import FavCharListApp from './FavChar/FavCharListApp';
import HomePage from './HomePage';


import reportWebVitals from './reportWebVitals';
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import store from './store'


//######## ROUTING ##########

const router = createBrowserRouter([{
  path: '/',
  element: <HomePage/> 
},{
  path: '/FavCharList',
  element: <FavCharListApp/>
}])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>
);

reportWebVitals();
