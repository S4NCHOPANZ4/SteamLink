import { BrowserRouter, Routes, Route, useNavigate} from "react-router-dom";
import { HomePage, LoginPage } from './Routes';

// function SteamLogin() {
//   const [redirecting, setRedirecting] = useState(false);
//   const navigate = useNavigate();
//   const [userData, setUserData] = useState<null | any>(null);


//   useEffect(() => {
//     const queryParams = new URLSearchParams(window.location.search);
//     const token = queryParams.get('token');

//     if (token) {
//       // Aquí puedes almacenar el token en el estado o en las cookies según tu preferencia
//       // Por ejemplo, utilizando el estado local:
//       // localStorage.setItem('authToken', token);
//       // O configurando una cookie
//       // document.cookie = `authToken=${token}; path=/;`;
//       // Redirigir al usuario a la página de inicio o a donde sea necesario
//       navigate('/'); // Cambia esto
//     } else {
//       // El usuario no está autenticado, puedes mostrar un botón para iniciar sesión con Steam
//       setRedirecting(false);
//     }
//   }, [navigate]);

//   useEffect(() => {
//     axios.get('http://localhost:3001/auth/user', { withCredentials: true })
//       .then(response => {
//         console.log(response);
        
//       })
//       .catch(error => {
//         console.error('Error al obtener datos de usuario:', error);
//       });
//   }, []);

//   const handleSteamLogin = () => {
//     // Redirigir al usuario a tu backend para iniciar sesión con Steam
//     setRedirecting(true);
//     window.location.href = 'http://localhost:3001/auth/steam'; // Reemplaza con la URL de tu backend
//   };

//   return (
//     <div>
//       {redirecting ? (
//         <p>Redirigiendo a Steam...</p>
//       ) : (
//         <button onClick={handleSteamLogin}>Iniciar sesión con Steam</button>
//       )}

//       {userData ? (
//         <div>
//           <p>Steam ID: {userData.steamId}</p>
//           <p>Nombre de usuario: {userData.username}</p>
//           {/* Otros datos del usuario */}
//         </div>
//       ) : (
//         <p>No se encontraron datos de usuario en la cookie.</p>
//       )}
//     </div>
//   );
// }

function App() {
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