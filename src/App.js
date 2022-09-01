import logo from './logo.svg';
import './App.css';
import Login from './components/login';
import Aadhar from './components/aadhar';
import { Routes, Route } from 'react-router-dom'
import Captcha from './components/captcha';
import Otp from './components/genotp';
import Details from './components/details';
import Loginbutton from './components/loginbutton';
import One from './components/landingpage';
import KYCdetails from './components/kycdetails';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path='/consent' element={<One/>}></Route>
        <Route path='/' element={<Loginbutton/>}></Route>
        <Route path="/aadhar" element={<Aadhar/>} ></Route>
        <Route path='/captcha' element={<Captcha/>}></Route>
        <Route path='/genotp' element={<Otp/>}></Route>
        <Route path='/details' element={<Details/>}></Route>
        <Route path='/kycdetails' element={<KYCdetails/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
