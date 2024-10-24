import { Link, NavLink, useLocation } from 'react-router-dom';
import { useState } from 'react';

function Navigation({ isLoggedIn, userName, role, handleLogout, onSearch }) {
    const location = useLocation();
    const [searchQuery, setSearchQuery] = useState(''); 

    const showSearchBar = location.pathname === '/' && !['/login', '/sign-up'].includes(location.pathname);

    const handleSearchInputChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSearch = () => {
        if (onSearch) {
            onSearch(searchQuery); 
        }
    };

    const resetSearchQuery = () => {
        setSearchQuery(''); 
        if (onSearch) {
            onSearch('');
        }
    };

    return (
        <nav id='navigationBar'>
            <div id='nav-left'>
                <Link to="/" id='appTitle' onClick={() => resetSearchQuery()}>Book store</Link> 

                {showSearchBar && (
                    <div id='contain-search-feature'>
                        <input
                            type='text'
                            placeholder='Please enter book name'
                            id='searchInput'
                            value={searchQuery}
                            onChange={handleSearchInputChange}
                        />
                        <i className="fa-solid fa-magnifying-glass" onClick={handleSearch}></i> 
                    </div>
                )}
            </div>

            {role === 'admin' && (
                <div id='nav-center'>
                    <NavLink to="/" className={({ isActive }) => isActive ? 'admin-fe-link under-line-active' : 'admin-fe-link'} onClick={() => resetSearchQuery()}>
                        Home
                    </NavLink>
                    <NavLink to="/books/book-management" className={({ isActive }) => isActive ? 'admin-fe-link under-line-active' : 'admin-fe-link'}>
                        Book management
                    </NavLink>
                    <NavLink to="/books/create-book" className={({ isActive }) => isActive ? 'admin-fe-link under-line-active' : 'admin-fe-link'}>
                        Create book
                    </NavLink>
                    <div className='admin-fe-link' id='verticalLine'></div>
                </div>
            )}

            <div id='nav-right'>
                {isLoggedIn ? (
                    <div id='userLogged'>
                        <div className='contain-icon-fullname'>
                            <div id='contain-user-icon'>
                                <i className="fa-regular fa-user"></i>
                            </div>
                            <span id='fullName'>{userName || 'User'}</span>
                        </div>
                        <Link to="/" className='' id='btnLogout' onClick={handleLogout}>Sign out</Link>
                    </div>
                ) : (
                    <div id='userNotLogin'>
                        {!['/login', '/sign-up'].includes(location.pathname) && (
                            <>
                                <Link to="/users/login" className='nav-button' id='btnLogin'>Login</Link>
                                <Link to="/users/sign-up" className='nav-button' id='btnSignUp'>Sign up</Link>
                            </>
                        )}
                    </div>
                )}
            </div>
        </nav>
    );
}

export default Navigation;
