import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../styles/user_style/user_form.css';

function SignUpComponent() {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [emailError, setEmailError] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [generalError, setGeneralError] = useState('');

    const navigate = useNavigate();

    const handleSignUp = async () => {
        setEmailError('');
        setUsernameError('');
        setPasswordError('');
        setGeneralError('');

        let hasError = false;

        if (!email) {
            setEmailError('Email is required');
            hasError = true;
        }

        if (!username) {
            setUsernameError('Username is required');
            hasError = true;
        }

        if (username.length < 6) {
            setUsernameError('Username must be more than 6 characters');
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
            const response = await fetch('http://localhost:8100/v3/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    username: username,
                    password: password
                }),
            });

            const data = await response.json();

            if (response.ok) {
                console.log('Account created successfully');
                navigate('/login');
            } else {
                setGeneralError(data.message || 'Error occurred');
            }
        } catch (error) {
            setGeneralError('Network error');
        }
    };

    const handleInputChange = (setter, errorSetter) => (e) => {
        setter(e.target.value);
        if (e.target.value) {
            errorSetter('');
        }
    };

    return (
        <div className='conatain-user-form'>
            <div className='user-from'>
                <h2 className='form-title'>Sign-up</h2>

                {/* Email input */}
                <div className='contain-input-row'>
                    <label className="input-label">Email</label>
                    <input
                        type="email"
                        placeholder='Please enter email'
                        value={email}
                        onChange={handleInputChange(setEmail, setEmailError)}
                        className={emailError ? 'input-invalid ' : ''}
                    />
                    {emailError && <div className='form-message-error'>{emailError}</div>}
                </div>

                {/* Username input */}
                <div className='contain-input-row'>
                    <label className="input-label">Username</label>
                    <input
                        type="text"
                        placeholder='Please enter username'
                        value={username}
                        onChange={handleInputChange(setUsername, setUsernameError)}
                        className={usernameError ? 'input-invalid ' : ''}
                    />
                    {usernameError && <div className='form-message-error'>{usernameError}</div>}
                </div>

                {/* Password input */}
                <div className='contain-input-row'>
                    <label className="input-label">Password</label>
                    <input
                        type="password"
                        placeholder='Please enter password'
                        value={password}
                        onChange={handleInputChange(setPassword, setPasswordError)}
                        className={passwordError ? 'input-invalid ' : ''}
                    />
                    {passwordError && <div className='form-message-error'>{passwordError}</div>}
                </div>

                {/* Thông báo lỗi chung */}
                {generalError && <div className='form-message-error'>{generalError}</div>}

                <div className='contain-condition'>
                    <input type="checkbox" />
                    <p>I agree to create account</p>
                </div>

                <div className='contain-form-button'>
                    <input
                        type="button"
                        value='Sign up'
                        id='btnSignUpForm'
                        onClick={handleSignUp}
                    />
                </div>

                <div className='contain-sub-form'>
                    <p className='sub-message'>Do you have an account?</p>
                    <Link to="/login">Login</Link>
                </div>
            </div>
        </div>
    );
}

export default SignUpComponent;
