import { useState } from "react";

function Dashboard({ books }) {
  const [search, setSearch] = useState("");

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="page">

      <h1>Library Dashboard</h1>

      <p>Welcome to the Community Library.</p>

      <div className="dashboard-top">

        <input
          type="text"
          placeholder="Search for a book..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="total-box">
          <h3>Total Books</h3>
          <strong>{books.length}</strong>
        </div>

      </div>

      <h2>Book Availability</h2>

      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Total Copies</th>
            <th>Available</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {filteredBooks.map((book) => (
            <tr key={book.id}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.copies}</td>
              <td>{book.available}</td>

              <td>
                {book.available <= 2 ? (
                  <span className="low-stock">
                    Low Stock
                  </span>
                ) : (
                  <span className="available">
                    Available
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {filteredBooks.length === 0 && (
        <p>No books found.</p>
      )}

    </div>
  );
}

export default Dashboard;