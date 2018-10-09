// import React, { Component } from "react";
// import logo from "./logo.svg";
// import "./App.css";
// import axios from "axios";

//  class App extends Component {
//   componentDidMount() {
//     axios.get("http://localhost:5000/app").then(res => {
//       console.log(res);
//     });
//   }
//   render() {
//     return (
//       <div className="App">
//         <header className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//           <p>
//             Edit <code>src/App.js</code> and save to reload.
//           </p>
//           <a
//             className="App-link"
//             href="https://reactjs.org"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             Learn React
//           </a>
//         </header>
//       </div>
//     );
//   }
// }
import React from "react";
import Routes from "./routes";

const App = () => (
  <div>
    <Routes />
  </div>
);

export default App;