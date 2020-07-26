import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { MainProvider } from "./Context";
import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.render(
  <React.StrictMode>
      <MainProvider>
          <ToastContainer />
          <Router>
              <App />
          </Router>
      </MainProvider>
  </React.StrictMode>,
  document.getElementById('root')
);