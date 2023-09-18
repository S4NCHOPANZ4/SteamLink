import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route} from "react-router-dom";
import { HomePage, LoginPage } from './Routes';
import { useAppDispatch, useAppSelector } from "./redux/store";
import { setUser, clearUser  } from './redux/slice/userSlice';

import axios from 'axios';

interface UserData {
  steamId: string;
  username: string;
  displayName: string;
  // Otros campos de usuario si los tienes
}

function App() {

  const dispatch = useAppDispatch(); 

  useEffect(() => {

      axios.get('http://localhost:3001/auth/user', { withCredentials: true })
          .then(response  => {
              console.log(response);
              dispatch(setUser(response.data))
          })
          .catch(error => {
              console.error('Error al obtener datos de usuario:', error);
          });
  }, []);



  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/" element={<HomePage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;