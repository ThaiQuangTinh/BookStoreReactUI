import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import '../../styles/user_style/user_form.css';

function LoginComponent({ setIsLoggedIn, setUserName, setRole }) {
    // State list
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [generalError, setGeneralError] = useState('');
    const navigate = useNavigate();

    // This function is used to handle when user click to the login button
    const handleLogin = async () => {
        setUsernameError('');
        setPasswordError('');
        setGeneralError('');

        let hasError = false;

        if (!username) {
            setUsernameError('Username is required');
            hasError = true;
        }
        if (!password) {
            setPasswordError('Password is required');
            hasError = true;
        }

        if (hasError) {
            return;
        }

        try {
            const response = await fetch('http://localhost:8100/v3/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    password,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('token', data.token);

                const decoded = jwtDecode(data.token);
                setUserName(decoded.username);
                setRole(decoded.role);

                setIsLoggedIn(true);
                navigate('/');
            } else {
                setGeneralError(data.message || 'Error occurred');
            }
        } catch (error) {
            setGeneralError('Network error');
        }
    };

    // Retun JSX
    return (
        <div className='conatain-user-form'>
            <div className='user-from'>

                <h2 className='form-title'>Login</h2>

                <div className='contain-input-row'>
                    <label className="input-label">Username</label>
                    <input
                        type="text"
                        placeholder='Please enter username'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className={usernameError ? 'input-invalid' : ''}
                    />
                    {usernameError && <div className='form-message-error'>{usernameError}</div>}
                </div>

                <div className='contain-input-row'>
                    <label className="input-label">Password</label>
                    <input
                        type="password"
                        placeholder='Please enter password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={passwordError ? 'input-invalid' : ''}
                    />
                    {passwordError && <div className='form-message-error'>{passwordError}</div>}
                </div>

                {generalError && <div className='form-message-error'>{generalError}</div>}

                <div className='contain-form-button'>
                    <input
                        type="button"
                        value='Login'
                        id='btnLogin'
                        onClick={handleLogin}
                    />
                </div>

                <div className='contain-sub-form'>
                    <p className='sub-message'>Don't have an account?</p>
                    <Link to="/sign-up">Sign up</Link>
                </div>

            </div>
        </div>
    );
}

export default LoginComponent;
