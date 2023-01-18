// Assigment EGTD Demo App
// This is ReactJS application wit redux && redux toolkit
// Styled with Ant Design
//
// Developed by Radoslav Smokov
// Licensed under MIT
// 2023

import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from '@/components/App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '@/store';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
);
