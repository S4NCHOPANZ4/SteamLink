import { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CasePage, HomePage, LoginPage, ProfilePage } from './Routes';
import { useAppDispatch, useAppSelector } from "./redux/store";
import { setUser, clearUser } from './redux/slice/user/userSlice';


import axios from 'axios';
import { SteamUserData, UserProfileData } from './models/Typos';

interface UserData {
  steamId: string;
  username: string;
  displayName: string;
  // Otros campos de usuario si los tienes
}

function App() {

  const dispatch = useAppDispatch();

  useEffect(() => {

    axios.get(`${import.meta.env.VITE_BACKEND_URL}/auth/user`, { withCredentials: true })
      .then(response => {
        FetchUserData(response.data.steamId)
      })
      .catch(error => {
        console.error('Error al obtener datos de usuario:', error);
      });
  }, []);

  const FetchUserData = async (steamId: string) => {
    try {
      if (steamId) {
        const response = await axios.post<{ success: boolean, user: UserProfileData }>(`${import.meta.env.VITE_BACKEND_URL}/user/authUser`, {
          steamId: steamId
        });
        if (response.data.success) {
          dispatch(setUser(response.data.user));
        }
        else {
          console.log('error 404 No user found (FrontEnd Error)');
        }
      }
    } catch (error) {
      console.error('Error al obtener datos del usuario:', error);
    }
  };


  return (
    <div className='bg-[var(--graybase-700)] min-h-[100vh]'>

      <BrowserRouter>
        <Routes>
          <Route path="/case/:caseName" element={<CasePage />} />
          <Route path="/login/:id" element={<LoginPage/>}/>
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;