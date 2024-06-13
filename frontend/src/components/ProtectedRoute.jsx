import {Navigate, Route} from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import api from '../api';
import {ACCESS_TOKEN, RESHRESH_TOKEN } from '../constants';
import {useState, useEffect} from 'react';

function ProtectedRoute({children}){
    const [isAuthenticated, setIsAuthenticated] = useState(null);

    useEffect(() => {
        auth().catch(()=> setIsAuthenticated(false));
  
    }, []);

    const refreshToken = async () => {
        const refreshToken = localStorage.getItem(RESHRESH_TOKEN);
        try {
            const response = await api.post('/api/auth/refresh/', {
                refresh: refreshToken,
            });
            if (response.status === 200) {
                localStorage.setItem(ACCESS_TOKEN, response.data.access);
                setIsAuthenticated(true);
            }else{
                setIsAuthenticated(false);
            }
         
        } catch (error) {
            console.error(error);
            setIsAuthenticated(false);
        }
    };
    const auth = async () => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (!token) {
            setIsAuthenticated(false);
            return;
        }
        const decoded = jwtDecode(token);
        if (decoded.exp * 1000 < Date.now()) {
            await refreshToken();
        }else{
         setIsAuthenticated(true);
        }
    }

    if (isAuthenticated === null){
        return <div>Loading...</div>
    }

    return isAuthenticated ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;