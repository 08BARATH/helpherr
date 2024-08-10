import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home'; // Import the Home component
import Signup from './components/Signup';
import Navbar from './components/Navbar'; // Import the Navbar component
import About from './components/About'; // Import the About component
import Mainpage from './components/Mainpage';
import BikeRide from './components/BikeRide';
import Menstruals from './components/Menstruals';
import Mentalcounselling from './components/Mentalcounselling';
import FoodDelivery from './components/pickanddrop';
import Rooms from './components/Rooms';
import Fitness from './components/Fitness';
import Cybercrime from './components/Cybercrime';
import Pregnancy from './components/Pregnancy';
import AdminDashboard from './components/Admin/AdminUserDashboard';
import Contact from './components/Contact';
import Emergency from './components/Emergencey';
import UserLogin from './components/UserLogin';
import Pickme from './components/Pickme';
import Dashboard from './components/Admin/Dashboard';





function App() {
  return (
    <Router>
      <div>
        <Navbar /> 
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/user-login" element={<UserLogin />} />
          <Route path="/admin-dashboard" element={<Dashboard/>} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/emergency" element={<Emergency />} />
          <Route path="/main" element={<Mainpage />} /> 
          <Route path="/pickme" element={<Pickme />} /> 
          <Route path="/bike-ride" element={<BikeRide />} />
          <Route path="/food-delivery" element={<FoodDelivery />} />
          <Route path="/menstruals" element={<Menstruals />} />
          <Route path="/mental" element={<Mentalcounselling />} />
          <Route path="/fitness" element={<Fitness />} />
          <Route path="/cybercrime" element={<Cybercrime />} />
          <Route path="/pregnancy" element={<Pregnancy />} />
          <Route path="/rooms" element={<Rooms />} />

        
        </Routes>
      </div>
    </Router>
  );
}

export default App;
