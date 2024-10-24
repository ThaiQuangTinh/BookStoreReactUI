import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginComponent from './login';
import SignUpComponent from './sign_up';

function User() {
    return (
        <Routes>
            <Route path="login" element={<LoginComponent />} />
            <Route path="sign-up" element={<SignUpComponent />} />
        </Routes>
    );
}

export default User;