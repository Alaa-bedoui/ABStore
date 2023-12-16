import React from "react"; 
import SignUp from './components/SignIn.jsx'
import Navbar from "./components/NavBar.jsx";
import Home from "./components/Home.jsx";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css"

function App() {
  
  return (
    <div>
      <Router>
 {/* <SignUp/> */}
 <Navbar />
 </Router>
    </div>
   
    // <BrowserRouter>
    //   <div>
    //     <nav className="navbar">
    //       <ul>
    //         <li>
    //           <Link to="/">Home</Link>
    //         </li>
    //         <li>
    //           <Link to="/AllItems">All Items</Link>
    //         </li>
    //       </ul>
    //     </nav>
    //     <Routes>
    //       <Route
    //         path="/"
    //         element={
    //           <Home allData={allData} reload={reload} setReload={setReload} />
    //         }
    //       />
    //       <Route
    //         path="/AllItems"
    //         element={
    //           <List allData={allData} reload={reload} setReload={setReload} />
    //         }
    //       />
    //     </Routes>
    //   </div>
    // </BrowserRouter>
  );
}

export default App;
     