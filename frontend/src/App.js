import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import Profile from "./pages/profile";
import Register from './components/Auth/Register';  
import Login from './components/Auth/Login';
import Navbar from "./components/Navbar/Navbar";
import ProtectedRoute from "./components/ProtectedRoutes"; 
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import bgImage from './assets/habit-bg.png.png';

function App() {
  return (

    <div
    style={{
      backgroundImage: `url(${bgImage})`,
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center 6%",
      minHeight: "100vh",
    }}
  > 

    <AuthProvider>
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<ProtectedRoute> <Dashboard /> </ProtectedRoute> } />
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />} />

      </Routes>
    </Router>
  </AuthProvider>

  </div>
    
  );
}

export default App;