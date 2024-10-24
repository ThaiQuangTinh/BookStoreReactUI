import logo from './logo.svg';
import './App.css';
import { jwtDecode } from 'jwt-decode';
import { BrowserRouter as Router, Route, Routes, Link, NavLink, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import BookListComponent from './components/book_component/book_list';
import BookDetailsComponent from './components/book_component/book_details';
import LoginComponent from './components/user_component/login';
import SignUpComponent from './components/user_component/sign_up';
import CreateBookComponent from './components/book_component/create_book';
import BookManagementComponent from './components/book_component/book_management';
import Navigation from './components/layout/navigation_bar';

function App() {
  // State list
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [role, setRole] = useState('');
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
        <Route path="/book-management" element={<BookManagementComponent />} />
        <Route path="/create-book" element={<CreateBookComponent />} />
        <Route path="/login" element={<LoginComponent setIsLoggedIn={setIsLoggedIn} setUserName={setUserName} setRole={setRole} />} />
        <Route path="/sign-up" element={<SignUpComponent />} />
        <Route path="/book-details/:id" element={<BookDetailsComponent />} />
      </Routes>
    </Router>
  );
}

export default App;
