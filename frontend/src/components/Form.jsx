import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import api from '../api';
import {ACCESS_TOKEN, RESHRESH_TOKEN} from '../constants';
import "../styles/Form.css";
import LoadingIndicator from './LoadingIndicator';

function Form({route, method}) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        try {
            const response = await api.post(route, {
                username,
                password,
            });
            if (method === "login") {
                localStorage.setItem(ACCESS_TOKEN, response.data.access);
                localStorage.setItem(RESHRESH_TOKEN, response.data.refresh);
                navigate('/');
            }else{
                navigate('/login');
            }
        } catch (error) {
            console.error(error);
        }finally{
            setLoading(false);
        }
    };
    return (
        <form onSubmit={handleSubmit} className='form-container'>
            <h1>{method === "login" ? "Login" : "Register"}</h1>
            <input className='form-input'
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input className='form-input'
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            /> 
            {loading && <LoadingIndicator />}
            <button type="submit" className='form-button'>
                {method === "login" ? "Login" : "Register"}
            </button>
        </form>
    );

}
export default Form;