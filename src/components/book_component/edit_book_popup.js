import React, { useState, useEffect } from 'react';
import '../../styles/book_style/edit_book_popup.css';
import { useNavigate } from 'react-router-dom';

const PopupComponent = ({ trigger, setTrigger, book, onUpdateSuccess }) => {
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        publisher: '',
        image: null,
        genre: '',
        description: '',
        previous_price: '',
        price: '',
    });

    const navigate = useNavigate();

    useEffect(() => {
        if (book) {
            setFormData({
                title: book.title,
                author: book.author,
                publisher: book.publisher,
                image: null,
                genre: book.genre,
                description: book.description,
                previous_price: book.previous_price,
                price: book.price,
            });
        }
    }, [book]);

    const handleClose = () => {
        setTrigger(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            image: e.target.files[0],
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { title, author, publisher, genre, description, previous_price, price, image } = formData;

        const updatedData = new FormData();
        updatedData.append('_id', book._id);
        updatedData.append('title', title);
        updatedData.append('author', author);
        updatedData.append('publisher', publisher);
        updatedData.append('genre', JSON.stringify(genre));
        updatedData.append('description', description);
        updatedData.append('previous_price', previous_price);
        updatedData.append('price', price);
        updatedData.append('image_url', image);

        try {
            const response = await fetch('http://localhost:8200/books-command/update', {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
                body: updatedData
            });

            if (!response.ok) {
                throw new Error('Failed to update book');
            }

            const updatedBook = await response.json();
            onUpdateSuccess();
            navigate('/book-management');
            handleClose();
        } catch (error) {
            console.error(error.message);
            alert(error.message);
        }
    };

    return trigger ? (
        <div className="popup-overlay">
            <div className="popup-content">
                <h2 className='edit-book-form-title'>Edit Book</h2>
                <form className='edit-book-form' onSubmit={handleSubmit}>
                    <div className='input-list'>
                        <div className='edit-book-left'>
                            <label>
                                Book Name:
                                <input type="text" name="title" value={formData.title} onChange={handleChange} required />
                            </label>

                            <label>
                                Author:
                                <input type="text" name="author" value={formData.author} onChange={handleChange} required />
                            </label>

                            <label>
                                Publisher:
                                <input type="text" name="publisher" value={formData.publisher} onChange={handleChange} required />
                            </label>

                            <label>
                                Image:
                                <input type="file" name="image" onChange={handleFileChange} />
                            </label>
                        </div>

                        <div className='edit-book-right'>
                            <label>
                                Genre:
                                <input type="text" name="genre" value={formData.genre} onChange={handleChange} />
                            </label>

                            <label>
                                Description:
                                <input type="text" name="description" value={formData.description} onChange={handleChange} />
                            </label>

                            <label>
                                Previous price:
                                <input type="number" name="previous_price" value={formData.previous_price} onChange={handleChange} required />
                            </label>

                            <label>
                                Price:
                                <input type="number" name="price" value={formData.price} onChange={handleChange} required />
                            </label>
                        </div>
                    </div>

                    <button type="submit">Save Changes</button>
                    <button type="button" onClick={handleClose}>Cancel</button>
                </form>
            </div>
        </div>
    ) : null;
};

export default PopupComponent;
