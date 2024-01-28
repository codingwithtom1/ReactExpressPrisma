import './App.css';
import {useEffect} from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home.tsx';
import Login from './Pages/Login.tsx';
import Register from './Pages/Register.tsx';
import axios from 'axios';


function App() {

    useEffect(() => {
        const getCsrfToken = async () => {
          const { data } = await axios.get('/csrf-token');
          axios.defaults.headers.common['X-CSRF-Token'] = data.csrfToken;
         };
        getCsrfToken();
      }, []);

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/" element={<Home />} />
            </Routes>
        </BrowserRouter>
    );

}
export default App;