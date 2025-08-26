// import React from 'react';
import { useGetBooksQuery, useDeleteBookMutation } from '@/services/books.api';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'sonner';
import { Pencil, Trash } from 'lucide-react';
import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { IBook } from '@/types';

export default function BooksPage() {
    const { data: books, isLoading } = useGetBooksQuery({ sortBy: 'createdAt', sort: 'desc', limit: 100 });
    const [deleteBook] = useDeleteBookMutation();
    const navigate = useNavigate();

    if (isLoading) return <div>Loading…</div>;

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this book?')) return;
        try {
            await deleteBook(id).unwrap();
            toast.success('Book deleted');
        } catch (e: any) {
            toast.error(e?.data?.message || 'Delete failed');
        }
    };

    return (
        <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {books?.map((book: IBook) => (
                <Card
                    key={book._id}
                    className="cursor-pointer hover:shadow-lg transition-shadow duration-200 flex flex-col justify-between"
                    onClick={() => navigate(`/books/${book._id}`)}
                >
                    <CardHeader>
                        <CardTitle className="text-lg font-bold text-gray-800">{book.title}</CardTitle>
                        <CardDescription className="text-gray-600">By {book.author}</CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-1">
                        <p><b>Genre:</b> {book.genre}</p>
                        <p><b>ISBN:</b> {book.isbn}</p>
                        <p className="line-clamp-3">{book.description}</p>
                    </CardContent>

                    <CardFooter className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center gap-2">
                        <Badge variant={book.available ? 'success' : 'destructive'}>
                            {book.available ? 'Available' : 'Unavailable'}
                        </Badge>

                        <div className="flex gap-2 mt-2 sm:mt-0">
                            <Button
                                size="sm"
                                variant="outline"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    navigate(`/edit-book/${book._id}`);
                                }}
                            >
                                <Pencil size={16} /> Edit
                            </Button>
                            <Button
                                size="sm"
                                variant="destructive"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    if (!book._id) return;
                                    handleDelete(book._id);
                                }}
                            >
                                <Trash size={16} /> Delete
                            </Button>

                        </div>
                    </CardFooter>
                </Card>
            ))}
        </div>
    );
}
