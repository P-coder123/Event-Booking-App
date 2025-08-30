import Navbaar from "./components/Navbaar"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/Home'
import Admin from "./pages/Admin";


function App() {
 

  return (
    <>
    <div>
      <Router>
       <Navbaar/>
       <Routes>

        <Route path="/" element={<Home/>}/>
        <Route path = "/admin" element={<Admin/>}/>
        
       </Routes>
          
      </Router>
    </div>
     
    </>
  )
}

export default App
