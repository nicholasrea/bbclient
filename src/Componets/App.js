import { Container } from "react-bootstrap"
import { AuthProvider } from "../contexts/AuthContext";
import { 
  BrowserRouter as Router,
  Routes, 
  Route } from "react-router-dom"
  
import Login from "./Login";
import SignUp from "./SignUp";
import Home from "./Home";
import AllData from "./AllData";
import Nav from "./Nav"
import Deposit from "./Deposit.js";
import Withdraw from "./Withdraw";


function App() {
  return (
    <AuthProvider>
      <Router>
        <Nav />
          <Container 
            className="d-flex align-items-center justify-content-center"
            style={{minHeight: "100vh"}}
          >
          <div className="w-100" style={{maxWidth: "400px"}}>
            <Routes>
              <Route exact path="/" element={<SignUp />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/login" element={<Login />} />
              <Route path="/deposit" element={<Deposit />} />
              <Route path="/withdraw" element={<Withdraw />} />
              <Route path="/alldata" element={<AllData />} />
            </Routes>
          </div>
          </Container>
      </Router>
    </AuthProvider>
  );
}


export default App;
