import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import BooksPage from './pages/BooksPage';
import CreateBookPage from './pages/CreateBookPage';
import EditBookPage from './pages/EditBookPage';
import BookDetailsPage from './pages/BookDetailsPage';
import BorrowPage from './pages/BorrowPage';
import BorrowSummaryPage from './pages/BorrowSummaryPage';

const App: React.FC = () => {
  return (
    <>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="container mx-auto px-4 py-6 flex-1">
          <Routes>
            {/* Redirect root to /books */}
            <Route path="/" element={<Navigate to="/books" replace />} />

            {/* Pages */}
            <Route path="/books" element={<BooksPage />} />
            <Route path="/create-book" element={<CreateBookPage />} />
            <Route path="/books/:id" element={<BookDetailsPage />} />
            <Route path="/edit-book/:id" element={<EditBookPage />} />
            <Route path="/borrow/:bookId" element={<BorrowPage />} />
            <Route path="/borrow-summary" element={<BorrowSummaryPage />} />

            {/* Catch-all for 404 */}
            <Route path="*" element={<h1>Page Not Found</h1>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default App;
