import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { hydrate, render } from "react-dom";

// const root = ReactDOM.createRoot(document.getElementById('root'));
const rootElement = document.getElementById("root");
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );
if (rootElement.hasChildNodes()) {
  hydrate(<App />, rootElement);
} else {
  render(<App />, rootElement);
}