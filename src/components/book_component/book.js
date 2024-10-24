import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BookManagementComponent from './book_management';
import CreateBookComponent from './create_book';
import BookDetailsComponent from './book_details';

function Book() {
    return (
        <Routes>
            <Route path="book-management" element={<BookManagementComponent />} />
            <Route path="create-book" element={<CreateBookComponent />} />
            <Route path="book-details/:id" element={<BookDetailsComponent />} />
        </Routes>
    );
}

export default Book;