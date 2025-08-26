import { useGetBorrowSummaryQuery } from '../services/books.api';


export default function BorrowSummaryPage() {
    const { data, isLoading, isError } = useGetBorrowSummaryQuery();


    if (isLoading) return <div>Loading summary…</div>;
    if (isError) return <div>Failed to load summary.</div>;


    return (
        <div className="overflow-x-auto">
            <h1 className="text-2xl font-semibold mb-4">Borrow Summary</h1>
            <table className="min-w-full bg-white border rounded-xl">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-3 py-2 text-left">Book Title</th>
                        <th className="px-3 py-2 text-left">ISBN</th>
                        <th className="px-3 py-2 text-right">Total Quantity Borrowed</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.map((row, idx) => (
                        <tr key={idx} className="border-t">
                            <td className="px-3 py-2">{row.book.title}</td>
                            <td className="px-3 py-2">{row.book.isbn}</td>
                            <td className="px-3 py-2 text-right">{row.totalQuantity}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}