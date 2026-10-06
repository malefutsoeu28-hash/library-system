import { useState } from "react";

function Transactions({ books, setBooks }) {
  const [selectedBook, setSelectedBook] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [type, setType] = useState("borrow");
  const [history, setHistory] = useState([]);

  function handleTransaction(e) {
    e.preventDefault();

    const book = books.find(
      (book) => book.id === Number(selectedBook)
    );

    if (!book) {
      alert("Please select a book.");
      return;
    }

    const amount = Number(quantity);

    if (type === "borrow" && amount > book.available) {
      alert("There are not enough books available.");
      return;
    }

    if (type === "return" && amount > book.copies - book.available) {
      alert("The returned quantity is too high.");
      return;
    }

    const updatedBooks = books.map((item) => {
      if (item.id === book.id) {
        let newAvailable;

        if (type === "borrow") {
          newAvailable = item.available - amount;
        } else {
          newAvailable = item.available + amount;
        }

        return {
          ...item,
          available: newAvailable
        };
      }

      return item;
    });

    setBooks(updatedBooks);

    const newTransaction = {
      id: Date.now(),
      book: book.title,
      type: type,
      quantity: amount,
      date: new Date().toLocaleString()
    };

    setHistory([newTransaction, ...history]);

    setSelectedBook("");
    setQuantity(1);

    alert("Transaction completed successfully.");
  }

  return (
    <div className="page">

      <h1>Transactions</h1>

      <form
        className="transaction-form"
        onSubmit={handleTransaction}
      >

        <h2>Add / Deduct Stock</h2>

        <label>Select Book</label>

        <select
          value={selectedBook}
          onChange={(e) =>
            setSelectedBook(e.target.value)
          }
          required
        >
          <option value="">
            Select a book
          </option>

          {books.map((book) => (
            <option
              key={book.id}
              value={book.id}
            >
              {book.title}
            </option>
          ))}
        </select>

        <label>Transaction Type</label>

        <select
          value={type}
          onChange={(e) =>
            setType(e.target.value)
          }
        >
          <option value="borrow">
            Borrow / Deduct Stock
          </option>

          <option value="return">
            Return / Add Stock
          </option>
        </select>

        <label>Quantity</label>

        <input
          type="number"
          min="1"
          value={quantity}
          onChange={(e) =>
            setQuantity(e.target.value)
          }
          required
        />

        <button
          type="submit"
          className="primary-button"
        >
          Save Transaction
        </button>

      </form>

      <h2>Transaction History</h2>

      <table>
        <thead>
          <tr>
            <th>Book</th>
            <th>Type</th>
            <th>Quantity</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>
          {history.map((transaction) => (
            <tr key={transaction.id}>
              <td>{transaction.book}</td>

              <td>
                {transaction.type === "borrow"
                  ? "Borrowed"
                  : "Returned"}
              </td>

              <td>{transaction.quantity}</td>

              <td>{transaction.date}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {history.length === 0 && (
        <p>No transactions have been recorded yet.</p>
      )}

    </div>
  );
}

export default Transactions;