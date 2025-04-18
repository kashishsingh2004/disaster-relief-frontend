import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './mycomponents/pages/Login';
import Signup from './mycomponents/pages/Signup';
import Welcome from './mycomponents/pages/Welcome';
import UserDashboard from './mycomponents/pages/UserDashboard'; // Yadi Home page bana chuke ho toh
// import VictimDashboard from './mycomponents/pages/VictimDashboard'; // Yadi Victim Dashboard bana chuke ho toh
// import OrgDashboard from './mycomponents/pages/OrgDashboard'; // Yadi Org Dashboard bana chuke ho toh

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={< UserDashboard />} />
        {/* <Route path="/victimdashboard" element={<VictimDashboard />} /> */}
        {/* <Route path="/orgdashboard" element={<OrgDashboard />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
