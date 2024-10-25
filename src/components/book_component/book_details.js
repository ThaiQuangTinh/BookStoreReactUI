import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../../styles/book_style/book_details.css';
import bookImage from '../../images/book.jpg';

function BookDetailsComponent() {
    const { id } = useParams(); // Lấy ID từ URL
    const [book, setBook] = useState(null); // State để lưu trữ dữ liệu sách
    const [error, setError] = useState(null); // State để lưu thông báo lỗi

    const fetchBookDetails = async () => {
        try {
            const response = await fetch(`http://localhost:8200/books/get-by-id?id=${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch book details');
            }

            const data = await response.json();
            setBook(data);
        } catch (error) {
            setError(error.message);
        }
    };
    
    useEffect(() => {
        fetchBookDetails();
    }, [id]);

    if (error) return <p className="error-message">{error}</p>;
    if (!book) return <p>Loading...</p>;

    return (
        <div className='contain-book-details'>
            <div className='book-details'>
                <img src={`http://localhost:8200${book.image_url[0]}`} alt='Book details' id='bookImage' /> {/* Giả sử image_url là mảng */}
                <div className='contain-content'>
                    <h3 className='book-name'>{book.title}</h3>
                    <p>Author: {book.author}</p>
                    <p>Publisher: {book.publisher}</p>
                    <p>Genre: {book.genre.join(', ')}</p> {/* Giả sử genre là mảng */}
                    <p>Description: {book.description}</p>
                    <p>Previous price: <span className='previous-price'>${book.previous_price}</span></p>
                    <p>Price: <span className='price'>${book.price}</span></p>
                    <div className="contain-buttons">
                        <i className="fa-solid fa-cart-shopping btn-hover"></i>
                        <button id="btnBuy" className="btn-hover">Buy</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BookDetailsComponent;
