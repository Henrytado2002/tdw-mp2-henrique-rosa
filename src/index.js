import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { AnimatePresence } from 'framer-motion';

import { Provider } from 'react-redux';

import FavCharListApp from './FavChar/FavCharListApp';
import AllCharList from './AllChar/AllCharList';
import HomePage from './HomePage';


import reportWebVitals from './reportWebVitals';
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import store from './store'
import TierList from './tierlist/TierList';
import CharDetail from './CharDetail/CharDetail';
import About from './About/About'


//######## ROUTING ##########

const router = createBrowserRouter([{
  path: '/',
  element: <HomePage/> 
},{
  path: '/FavCharList',
  element: <FavCharListApp/>
},{
  path: '/AllChars',
  element: <AllCharList/>  
},{
  path: '/TierList',
  element: <TierList/>  
},{
  path: '/CharDetail',
  element: <CharDetail/>
},{
  path: '/About',
  element: <About/>
}])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AnimatePresence mode="wait">
    <Provider store={store}>
      
        <RouterProvider router={router} />
      
    </Provider>
  </AnimatePresence>
);

reportWebVitals();
