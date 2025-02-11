import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {Provider} from 'react-redux'
import {store, persistor} from './redux/store'
import {PersistGate} from 'redux-persist/integration/react'
import { webcrypto } from 'crypto';
import { Buffer } from 'buffer'

if (typeof window === 'undefined') {
  globalThis.crypto = webcrypto;
}
if (!window.Buffer) {
  window.Buffer = Buffer
}
ReactDOM.render(
  //redux
  <Provider store = {store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);