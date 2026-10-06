import { useState } from "react";

function Books({ books, setBooks }) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [copies, setCopies] = useState("");
  const [editingId, setEditingId] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();

    if (editingId) {
      setBooks(
        books.map((book) =>
          book.id === editingId
            ? {
                ...book,
                title: title,
                author: author,
                copies: Number(copies),
                available: Math.min(
                  book.available,
                  Number(copies)
                )
              }
            : book
        )
      );

      setEditingId(null);
    } else {
      const newBook = {
        id: Date.now(),
        title: title,
        author: author,
        copies: Number(copies),
        available: Number(copies)
      };

      setBooks([...books, newBook]);
    }

    setTitle("");
    setAuthor("");
    setCopies("");
  }

  function editBook(book) {
    setEditingId(book.id);
    setTitle(book.title);
    setAuthor(book.author);
    setCopies(book.copies);
  }

  function deleteBook(id) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this book?"
    );

    if (confirmDelete) {
      setBooks(
        books.filter((book) => book.id !== id)
      );
    }
  }

  function cancelEdit() {
    setEditingId(null);
    setTitle("");
    setAuthor("");
    setCopies("");
  }

  return (
    <div className="page">

      <h1>Book Management</h1>

      <form
        className="book-form"
        onSubmit={handleSubmit}
      >
        <h2>
          {editingId
            ? "Update Book"
            : "Add New Book"}
        </h2>

        <label>Book Title</label>

        <input
          type="text"
          placeholder="Enter book title"
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
          required
        />

        <label>Author</label>

        <input
          type="text"
          placeholder="Enter author name"
          value={author}
          onChange={(e) =>
            setAuthor(e.target.value)
          }
          required
        />

        <label>Number of Copies</label>

        <input
          type="number"
          min="1"
          placeholder="Enter number of copies"
          value={copies}
          onChange={(e) =>
            setCopies(e.target.value)
          }
          required
        />

        <button
          type="submit"
          className="primary-button"
        >
          {editingId
            ? "Update Book"
            : "Add Book"}
        </button>

        {editingId && (
          <button
            type="button"
            onClick={cancelEdit}
            className="secondary-button"
          >
            Cancel
          </button>
        )}
      </form>

      <h2>List of Books</h2>

      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Copies</th>
            <th>Available</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {books.map((book) => (
            <tr key={book.id}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.copies}</td>
              <td>{book.available}</td>

              <td>
                <button
                  onClick={() => editBook(book)}
                  className="edit-button"
                >
                  Update
                </button>

                <button
                  onClick={() =>
                    deleteBook(book.id)
                  }
                  className="delete-button"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {books.length === 0 && (
        <p>No books have been added yet.</p>
      )}

    </div>
  );
}

export default Books;