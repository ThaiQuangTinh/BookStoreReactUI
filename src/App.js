import logo from './logo.svg';
import './App.css';
import { jwtDecode } from 'jwt-decode';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import BookListComponent from './components/book_component/book_list';
import NavigationBar from './components/layout/navigation_bar';
import Book from './components/book_component/book';
import { AuthContext } from './context/AuthContext';
import User from './components/user_component/user';

function App() {
  // State list
  const { setIsLoggedIn, setUserName, setRole } = useContext(AuthContext);
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

  // Function is used to handle search
  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  // Return JSX 
  return (
    <Router>
      <NavigationBar handleLogout={handleLogout} onSearch={handleSearch}
      />

      {/* Define routes */}
      <Routes>
        <Route path="/" element={<BookListComponent searchQuery={searchQuery} />} />
        <Route path='/users/*' element={<User />} />
        <Route path='/books/*' element={<Book />} />
      </Routes>
    </Router>
  );
}

export default App;
