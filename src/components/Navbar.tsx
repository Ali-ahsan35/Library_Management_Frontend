import { Link, NavLink } from 'react-router-dom';
import { Book, PlusCircle, ClipboardList } from 'lucide-react';

export default function Navbar() {
    const baseLink = 'px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 flex items-center gap-1';
    const activeLink = 'text-blue-600 font-semibold';

    return (
        <header className="bg-white shadow sticky top-0 z-50">
            <nav className="container mx-auto px-6 h-16 flex items-center justify-between">
                {/* Logo */}
                <Link to="/" className="text-2xl font-bold text-gray-800 hover:text-blue-600 transition-colors duration-200">
                    LibraryMS
                </Link>

                {/* Navigation Links */}
                <div className="flex items-center gap-4">
                    <NavLink to="/books" className={({ isActive }) => `${baseLink} ${isActive ? activeLink : 'text-gray-700'}`}>
                        <Book size={16} /> All Books
                    </NavLink>

                    <NavLink to="/create-book" className={({ isActive }) => `${baseLink} ${isActive ? activeLink : 'text-gray-700'}`}>
                        <PlusCircle size={16} /> Add Book
                    </NavLink>

                    <NavLink to="/borrow-summary" className={({ isActive }) => `${baseLink} ${isActive ? activeLink : 'text-gray-700'}`}>
                        <ClipboardList size={16} /> Borrow Summary
                    </NavLink>
                </div>
            </nav>
        </header>
    );
}
