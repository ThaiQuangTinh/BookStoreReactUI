import logo from './logo.svg';
import './App.css';
import { jwtDecode } from 'jwt-decode';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import BookListComponent from './components/book_component/book_list';
import LoginComponent from './components/user_component/login';
import SignUpComponent from './components/user_component/sign_up';
import Navigation from './components/layout/navigation_bar';
import Book from './components/book_component/book';
import { AuthContext } from './context/AuthContext';
import User from './components/user_component/user';

function App() {
  // State list
  const { isLoggedIn, setIsLoggedIn, userName, setUserName, role, setRole } = useContext(AuthContext);
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [userName, setUserName] = useState('');
  // const [role, setRole] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      const decoded = jwtDecode(token);
      const username = decoded.username;
      const userRole = decoded.role;

      setIsLoggedIn(true);
      setUserName(username || '');
      setRole(userRole || '');
    }
  }, []);

  // Function is used to handele when user click to the logout button
  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setUserName('');
    setRole('');
  };

  // Function is used to 
  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  // Return JSX 
  return (
    <Router>
      <Navigation
        isLoggedIn={isLoggedIn}
        userName={userName}
        role={role}
        handleLogout={handleLogout}
        onSearch={handleSearch}
      />

      {/* Define routes */}
      <Routes>
        <Route path="/" element={<BookListComponent searchQuery={searchQuery} />} />
        {/* <Route path="/login" element={<LoginComponent setIsLoggedIn={setIsLoggedIn} setUserName={setUserName} setRole={setRole} />} />
        <Route path="/sign-up" element={<SignUpComponent />} /> */}

        <Route path='/users/*' element={<User />} />
        <Route path='/books/*' element={<Book />} />
      </Routes>
    </Router>
  );
}

export default App;
