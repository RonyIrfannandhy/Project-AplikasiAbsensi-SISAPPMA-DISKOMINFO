import React from 'react';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import LayoutWithNavbar from './LayoutWithNavbar';

import {
  NotFound,
  About,
  Contact,
  Gallery,
  Home,
  Plans,
  Trainers,
} from "./pages1";

import Homepage from './pages/Homepage';
import Peserta from './pages/Peserta';
import PresensiMagang from './pages/PresensiMagang';
import Penugasan from './pages/Penugasan';
import LoginSignup from './Components/LoginSignup/LoginSignup';
import Data from './pages/user/Data'
import Presensi from './pages/user/Presensi';
import Tugas from './pages/user/Tugas';
import UserPages from './pages/user/UserPages';
import Admin from './pages/Admin';
import Profil from './pages/user/Profil';
import Surat from './pages/user/Surat';

const App = () => {
  return (
    <BrowserRouter>
      <ToastContainer />

      <Routes>
        <Route element={<LayoutWithNavbar />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="gallery" element={<Gallery />} />
          <Route path="plans" element={<Plans />} />
          <Route path="trainers" element={<Trainers />} />
        </Route>

        <Route path="login" element={<LoginSignup />} />
        <Route path="user/riwayat" element={<Data/>}/>
        <Route path="user/presensi" element={<Presensi/>}/>
        <Route path="user/tugas" element={<Tugas/>}/>
        <Route path="user/homepage" element={<UserPages />}/>
        <Route path="user/surat" element={<Surat/>}/>
        <Route path="user/profil" element={<Profil/>}/>

        <Route path='admin' element={<Admin />} />
        <Route path="homepage" element={<Homepage />}/>
        <Route path='peserta' element={<Peserta />}/>
        <Route path='presensi' element={<PresensiMagang />}/>
        <Route path='penugasan' element={<Penugasan />}/>   
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
