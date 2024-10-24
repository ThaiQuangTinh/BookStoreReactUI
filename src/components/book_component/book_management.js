import React, { useState, useEffect } from 'react';
import '../../styles/book_style/book_management.css';
import EditBookPopupComponent from './edit_book_popup';

function BookManagementComponent() {
    const [popupTrigger, setPopupTrigger] = useState(false);
    const [selectedBook, setSelectedBook] = useState(null);
    const [books, setBooks] = useState([]); 
    const [error, setError] = useState(null); 
    const [refresh, setRefresh] = useState(0);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await fetch('http://localhost:8200/books/getall', {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch books');
                }

                const data = await response.json();
                setBooks(data);
            } catch (error) {
                setError(error.message); 
            }
        };

        fetchBooks(); 
    }, [refresh]); 

    const handleEditClick = (book) => {
        setSelectedBook(book);
        setPopupTrigger(true); // Show popup
    };

    const handleDeleteClick = async (id) => {
        if (window.confirm('Are you sure you want to delete this book?')) {
            try {
                const response = await fetch('http://localhost:8200/books-command/delete', {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('token')}`, 
                    },
                    body: JSON.stringify({ id }), 
                });

                if (!response.ok) {
                    throw new Error('Failed to delete the book');
                }

                // Refresh list
                setRefresh(prev => prev + 1);
            } catch (error) {
                setError(error.message); 
            }
        }
    };

    return (
        <div className="book-list-container">
            <h2 className="book-list-title">Book Management</h2>
            {error && <p className="error-message">{error}</p>}
            <table className="book-list-table">
                <thead>
                    <tr>
                        <th className='th-book-name'>Book Name</th>
                        <th>Author</th>
                        <th>Publisher</th>
                        <th>Image</th>
                        <th>Genre</th>
                        <th className='th-description'>Description</th>
                        <th className='th-previous-price'>Previous Price</th>
                        <th>Price</th>
                        <th>Delete</th>
                        <th>Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {books.map((book, index) => (
                        <tr key={book._id} className={index % 2 === 0 ? 'even-row' : 'odd-row'}>
                            <td>{book.title}</td>
                            <td>{book.author}</td>
                            <td>{book.publisher}</td>
                            <td><img src={`http://localhost:8200${book.image_url[0]}`} alt="Book" /></td>
                            <td>{book.genre.join(', ')}</td> {/* Giả sử genre là một mảng */}
                            <td>{book.description}</td>
                            <td>${book.previous_price}</td>
                            <td>${book.price}</td>
                            <td>
                                <button className="delete-button" onClick={() => handleDeleteClick(book._id)}>Delete</button>
                            </td>
                            <td>
                                <button className="edit-button" onClick={() => handleEditClick(book)}>Edit</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <EditBookPopupComponent
                trigger={popupTrigger}
                setTrigger={setPopupTrigger}
                book={selectedBook}
                onUpdateSuccess={() => {
                    setRefresh(prev => prev + 1); 
                }}
            />
        </div>
    );
};

export default BookManagementComponent;
