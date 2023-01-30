import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import App from './App';
import store from './redux';

// fetch(`https://api.themoviedb.org/3/search/movie?api_key=fd7f0dd49d8e0e215decc17c71731392&query=Jack+Reacher`)
//   .then(res => res.json())
//   .then(data => console.log(data))

// fetch(`https://api.themoviedb.org/3/discover/movie?api_key=fd7f0dd49d8e0e215decc17c71731392&with_genres=28`)
//   .then(res => res.json())
//   .then(data => console.log(data))

// fetch(`https://api.themoviedb.org/3/movie/315162/images?api_key=fd7f0dd49d8e0e215decc17c71731392`)
//   .then(res => res.json())
//   .then(data => console.log(data))



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Provider store={store}>
        <App />
      </Provider>
    </Router>
  </React.StrictMode>,
);
