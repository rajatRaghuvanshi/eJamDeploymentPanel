import React from 'react';
import './App.css';
import { Provider } from 'react-redux'

import Dashboard from './components/Dashboard';
import store from './storeConfig';


function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Dashboard />
      </div>
    </Provider>
    
  );
}

export default App;
