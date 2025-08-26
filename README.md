# Library Management System (Frontend)

A modern **Library Management System** built with **React**, **TypeScript**, **Redux Toolkit**, and **Tailwind CSS**. This system allows users to manage books, track borrowing, and provides a professional UI using **shadcn** components.

---

## Features

* **Book Management**: Create, read, update, and delete books.
* **Borrow Tracking**: Keep track of borrowed books and their availability.
* **Professional UI**: Built with **Tailwind CSS** and **shadcn** components.
* **Form Validation**: Uses **React Hook Form** with **Zod** schema validation.
* **Responsive Design**: Works seamlessly on desktop and mobile devices.
* **Notifications**: Success and error feedback using **Sonner** toast notifications.

---

## Tech Stack

* **Frontend**:

  * React 19
  * TypeScript
  * Redux Toolkit & RTK Query
  * React Router v6
  * Tailwind CSS & Shadcn UI
  * React Hook Form & Zod
  * Sonner for toast notifications

---

## Installation

1. **Clone the repository**:

```bash
git clone https://github.com/your-username/library-management-system.git
cd library-management-system
```

2. **Install dependencies**:

```bash
npm install
```

3. **Setup environment variables**:

Create a `.env` file in the root folder:

```env
VITE_API_BASE_URL=https://your-backend-api.com
```

4. **Run the development server**:

```bash
npm run dev
```

The app will be available at [http://localhost:5173](http://localhost:5173).

---

## Folder Structure

```
src/
├─ components/      # Reusable UI components (shadcn style)
├─ pages/           # Page components
├─ services/        # Redux Toolkit API slices
├─ types/           # TypeScript types
├─ App.tsx          # Application entry
└─ main.tsx         # React DOM render
```

---

## Usage

* Navigate to `/books` to view all books.
* Click **Add Book** to create a new book.
* Click a book title to view **Book Details**.
* Edit or delete books using the buttons on the book cards.
* Track borrowed books and manage availability in **Borrow Summary**.

---

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for improvements.


