import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetBookQuery, useUpdateBookMutation } from '@/services/books.api';
import { z } from 'zod';
import type { Genre } from '@/types';

const schema = z.object({
    title: z.string().min(1),
    author: z.string().min(1),
    genre: z.enum(['FICTION', 'NON_FICTION', 'SCIENCE', 'HISTORY', 'BIOGRAPHY', 'FANTASY']),
    isbn: z.string().min(1),
    description: z.string().optional(),
    copies: z.number().int().nonnegative(),
});

type FormValues = z.infer<typeof schema>;

export default function EditBookPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data: resp, isLoading } = useGetBookQuery(id!);
    const [updateBook] = useUpdateBookMutation();
    const book = (resp as any)?.data ?? resp;

    const { register, handleSubmit, reset } = useForm<FormValues>({
        resolver: zodResolver(schema) as any,
    });

    React.useEffect(() => {
        if (book) {
            reset({
                title: book.title,
                author: book.author,
                genre: book.genre,
                isbn: book.isbn,
                description: book.description,
                copies: book.copies,
            });
        }
    }, [book, reset]);

    const onSubmit = async (values: FormValues) => {
        try {
            await updateBook({
                id: id!,
                data: { ...values, available: values.copies > 0, genre: values.genre as Genre },
            }).unwrap();
            toast.success('Book updated');
            navigate('/books');
        } catch (e: any) {
            toast.error(e?.data?.message || 'Update failed');
        }
    };

    if (isLoading) return <div>Loading…</div>;

    return (
        <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Edit Book</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="grid gap-5">
                <div className="flex flex-col">
                    <label className="text-gray-600 mb-1">Title</label>
                    <input
                        className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        placeholder="Book Title"
                        {...register('title')}
                    />
                </div>

                <div className="flex flex-col">
                    <label className="text-gray-600 mb-1">Author</label>
                    <input
                        className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        placeholder="Author Name"
                        {...register('author')}
                    />
                </div>

                <div className="flex flex-col">
                    <label className="text-gray-600 mb-1">Genre</label>
                    <select
                        className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        {...register('genre')}
                    >
                        {(['FICTION', 'NON_FICTION', 'SCIENCE', 'HISTORY', 'BIOGRAPHY', 'FANTASY'] as Genre[]).map(g => (
                            <option key={g} value={g}>{g}</option>
                        ))}
                    </select>
                </div>

                <div className="flex flex-col">
                    <label className="text-gray-600 mb-1">ISBN</label>
                    <input
                        className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        placeholder="ISBN Number"
                        {...register('isbn')}
                    />
                </div>

                <div className="flex flex-col">
                    <label className="text-gray-600 mb-1">Description</label>
                    <textarea
                        className="border border-gray-300 rounded-lg p-3 h-32 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        placeholder="Description"
                        {...register('description')}
                    />
                </div>

                <div className="flex flex-col">
                    <label className="text-gray-600 mb-1">Copies</label>
                    <input
                        type="number"
                        className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        placeholder="Number of Copies"
                        {...register('copies', { valueAsNumber: true })}
                    />
                </div>

                <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-200"
                >
                    Save Changes
                </button>
            </form>
        </div>
    );
}
