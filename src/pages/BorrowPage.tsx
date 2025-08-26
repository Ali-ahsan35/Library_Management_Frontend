import { useParams, useNavigate } from 'react-router-dom';
import { useBorrowBookMutation, useGetBookQuery } from '../services/books.api';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';


const schema = z.object({
    quantity: z.coerce.number().int().positive(),
    dueDate: z.string().min(1),
});


type FormValues = z.infer<typeof schema>;


export default function BorrowPage() {
    const { bookId } = useParams();
    const { data: resp } = useGetBookQuery(bookId!);
    const book = (resp as any)?.data ?? resp;
    const [borrowBook, { isLoading }] = useBorrowBookMutation();
    const { register, handleSubmit } = useForm<FormValues>({ resolver: zodResolver(schema) });
    const navigate = useNavigate();


    const onSubmit = async (values: FormValues) => {
        try {
            if (book && values.quantity > book.copies) {
                toast.error(`Quantity cannot exceed available copies (${book.copies}).`);
                return;
            }
            await borrowBook({ book: bookId!, quantity: values.quantity, dueDate: values.dueDate }).unwrap();
            toast.success('Borrowed successfully');
            navigate('/borrow-summary');
        } catch (e: any) {
            toast.error(e?.data?.message || 'Borrow failed');
        }
    };


    return (
        <div className="max-w-md mx-auto bg-white p-6 rounded-xl shadow-sm">
            <h1 className="text-2xl font-semibold mb-4">Borrow Book</h1>
            {book && (
                <div className="mb-4 text-sm text-gray-700">Borrowing: <b>{book.title}</b> — Available copies: {book.copies}</div>
            )}
            <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
                <input className="input" type="number" placeholder="Quantity" {...register('quantity')} />
                <input className="input" type="date" {...register('dueDate')} />
                <button disabled={isLoading} className="btn-primary">{isLoading ? 'Borrowing…' : 'Borrow'}</button>
            </form>
        </div>
    );
}