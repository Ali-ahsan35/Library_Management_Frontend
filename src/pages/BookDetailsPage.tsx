import { useParams, Link } from 'react-router-dom';
import { useGetBookQuery } from '../services/books.api';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function BookDetailsPage() {
    const { id } = useParams();
    const { data: resp, isLoading, isError } = useGetBookQuery(id!);
    const book = (resp as any)?.data ?? resp;

    if (isLoading) return <div className="text-center py-10 text-gray-500">Loading…</div>;
    if (isError || !book) return <div className="text-center py-10 text-red-500">Book not found</div>;

    return (
        <div className="max-w-3xl mx-auto my-8 px-4">
            <Card className="shadow-lg">
                <CardHeader>
                    <CardTitle className="text-3xl">{book.title}</CardTitle>
                    <CardDescription className="text-gray-600">By {book.author}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                        <Badge variant="secondary">Genre: {book.genre}</Badge>
                        <Badge variant="secondary">ISBN: {book.isbn}</Badge>
                        <Badge variant={book.available ? "default" : "destructive"}>
                            {book.copies} Copies - {book.available ? "Available" : "Unavailable"}
                        </Badge>
                    </div>

                    {book.description && (
                        <p className="text-gray-700">{book.description}</p>
                    )}

                    <div className="flex flex-wrap gap-3 mt-4">
                        <Link to={`/borrow/${book._id}`}>
                            <Button variant="default">Borrow</Button>
                        </Link>
                        <Link to={`/edit-book/${book._id}`}>
                            <Button variant="outline" className="bg-yellow-100 hover:bg-yellow-200">Edit</Button>
                        </Link>
                        <Link to="/books">
                            <Button variant="ghost">Back</Button>
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
