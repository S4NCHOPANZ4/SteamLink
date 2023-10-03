import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react'
import { useParams } from "react-router-dom";


const LoginPage = () => {

    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate()
    
    useEffect(() => {
    document.title = "CaseJolt - Auth";

        axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/createUser`,
        {
            id: id
        }
        , { withCredentials: true })
          .then((response) => {
            console.log(response);
            navigate('/')
          })
          .catch(error => {
            console.error('Error al obtener datos de usuario:', error);
          });
      }, []);


    return (
        <div className='h-[100vh] w-full flex items-center justify-center'>
            <div className='flex items-center justify-center flex-col'>
                <div className='loader_med'></div>
                <h1 className='text-yellow-400 text-lg my-2'>Authenticating...</h1>
            </div>
        </div>
    )
}

export default LoginPage