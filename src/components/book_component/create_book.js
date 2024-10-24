import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../styles/book_style/create_book.css';

function CreateBookComponent() {
    const [bookName, setBookName] = useState('');
    const [genre, setGenre] = useState('');
    const [author, setAuthor] = useState('');
    const [description, setDescription] = useState('');
    const [publisher, setPublisher] = useState('');
    const [previousPrice, setPreviousPrice] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate();

    const handleFileChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleCreateBook = async () => {
        // Kiểm tra các trường đầu vào
        if (!bookName || !genre || !author || !description || !publisher || !price || !previousPrice || !image) {
            setErrorMessage('All fields are required');
            return;
        }

        const formData = new FormData();
        formData.append('title', bookName);
        formData.append('genre', JSON.stringify(genre)); // Chuyển đổi genre thành chuỗi JSON
        formData.append('author', author);
        formData.append('description', description);
        formData.append('publisher', publisher);
        formData.append('previous_price', previousPrice);
        formData.append('price', price);
        formData.append('image_url', image); // Nếu chỉ một file

        // // Append file(s) to formData
        // if (Array.isArray(image)) {
        //     image.forEach((img) => {
        //         formData.append('image_url', img); 
        //     });
        // } else {
        //     formData.append('image_url', image); 
        // }

        try {
            const response = await fetch('http://localhost:8200/books-command/create', {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
                body: formData
            });

            const result = await response.json();
            if (response.ok) {
                // alert('Book created successfully');
                navigate('/book-management');
            } else {
                setErrorMessage(result.message || 'Failed to create book');
            }
        } catch (error) {
            setErrorMessage('Error creating book');
        }
    };


    return (
        <div className="contain-create-book-form">
            <div className="create-book-form">
                <div className="cb-form-title">Create book form</div>
                {errorMessage && <div className="error-message">{errorMessage}</div>}

                <div className="input-list">
                    <div className="contain-input-row">
                        <label>Book name</label>
                        <input
                            type="text"
                            className="input-row"
                            placeholder="Please enter book name"
                            value={bookName}
                            onChange={(e) => setBookName(e.target.value)}
                        />
                    </div>

                    <div className="contain-input-row">
                        <label>Genre</label>
                        <input
                            type="text"
                            className="input-row"
                            placeholder="Please enter genre"
                            value={genre}
                            onChange={(e) => setGenre(e.target.value)}
                        />
                    </div>

                    <div className="contain-input-row">
                        <label>Author</label>
                        <input
                            type="text"
                            className="input-row"
                            placeholder="Please enter author name"
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                        />
                    </div>

                    <div className="contain-input-row">
                        <label>Description</label>
                        <input
                            type="text"
                            className="input-row"
                            placeholder="Please enter description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>

                    <div className="contain-input-row">
                        <label>Publisher</label>
                        <input
                            type="text"
                            className="input-row"
                            placeholder="Please enter publisher"
                            value={publisher}
                            onChange={(e) => setPublisher(e.target.value)}
                        />
                    </div>

                    <div className="contain-input-row">
                        <label>Previous price</label>
                        <input
                            type="text"
                            className="input-row"
                            placeholder="Please enter previous price"
                            value={previousPrice}
                            onChange={(e) => setPreviousPrice(e.target.value)}
                        />
                    </div>

                    <div className="contain-input-row">
                        <label>Image</label>
                        <input
                            type="file"
                            name="images"
                            className="input-row"
                            onChange={handleFileChange}
                        />
                    </div>

                    <div className="contain-input-row">
                        <label>Price</label>
                        <input
                            type="text"
                            className="input-row"
                            placeholder="Please enter price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </div>
                </div>

                <div className="contain-create-bool-button">
                    <input
                        type="button"
                        value="Create book"
                        id="btnCreateBook"
                        onClick={handleCreateBook}
                    />
                </div>
            </div>
        </div>
    );
}

export default CreateBookComponent;
