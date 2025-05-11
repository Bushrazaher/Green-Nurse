import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Welcome from './Components/Welcome';
import Login from './Components/Login';
import Register from './Components/Register';
import Home from './Components/Home';
import LocalSeedling from './Components/LocalSeedling';
import ImpotrSeedling from './Components/ImpotrSeedling';
import UpdateImpotredSeedling from './Components/UpdateImprtedSeedling';
import UpdateLocalSeedling from './Components/UpdateLocalSeedling';
import Profile from './Components/Profile';


function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/local" element={<LocalSeedling/>} />
        <Route path="/import" element={<ImpotrSeedling />} />
        <Route path="/updateimport/:id" element={<UpdateImpotredSeedling />} />
        <Route path="/updatelocal/:id" element={<UpdateLocalSeedling />} />
        <Route path="/profile" element={<Profile />} />


      </Routes>
    </Router>
  );
}

export default App;