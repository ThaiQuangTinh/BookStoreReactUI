import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/book_style/book_list.css';

function BookListComponent({ searchQuery }) {
    const navigate = useNavigate();
    const [books, setBooks] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const endpoint = searchQuery ? `http://localhost:8200/books/get-by-title?title=${searchQuery}` : 'http://localhost:8200/books/getall';

                const response = await fetch(endpoint, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch books');
                }

                const data = await response.json();
                setBooks(data); // Save data to state
            } catch (error) {
                setError(error.message); 
            }
        };

        fetchBooks(); 
    }, [searchQuery]);

    const handleBookClick = (bookId) => {
        navigate(`/book-details/${bookId}`);
    };

    return (
        <div className="book-list">
            {error && <p className="error-message">{error}</p>}

            {books.length === 0 && !error && (
                <p className="no-results-message">
                    {searchQuery ? `No books found for "${searchQuery}".` : 'No books available.'}
                </p>
            )}

            {/* Render list */}
            {books.map((book, index) => (
                <div className="book-item" key={book._id} onClick={() => handleBookClick(book._id)}>
                    <div className="item-left">
                        <img src={`http://localhost:8200${book.image_url[0]}`} alt="Book cover" id="bookImage" />
                    </div>
                    <div className="item-right">
                        <h3 className="book-name">{book.title}</h3>
                        <p className="author-name">by {book.author}</p>
                        <p className="previous-price">${book.previous_price}</p>
                        <p className="price">${book.price}</p>
                        <div className="contain-buttons">
                            <i className="fa-solid fa-cart-shopping btn-hover"></i>
                            <button id="btnBuy" className="btn-hover">Buy</button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default BookListComponent;
