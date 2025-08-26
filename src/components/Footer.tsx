export default function Footer() {
return (
<footer className="border-t bg-white">
<div className="container mx-auto px-4 py-6 text-sm text-gray-600 flex flex-col sm:flex-row gap-2 items-center justify-between">
<p>© {new Date().getFullYear()} LibraryMS</p>
<p>Built with React, TypeScript & RTK Query</p>
</div>
</footer>
);
}