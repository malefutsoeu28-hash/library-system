import { useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import Navbar from "./components/navbar";
import Login from "./pages/login";
import Dashboard from "./pages/dashboard";
import Books from "./pages/books";
import Transactions from "./pages/transactions";
import Users from "./pages/users";

import "./App.css";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  const [books, setBooks] = useState(() => {
    const savedBooks =
      localStorage.getItem("books");

    return savedBooks
      ? JSON.parse(savedBooks)
      : [
          {
            id: 1,
            title: "Things Fall Apart",
            author: "Chinua Achebe",
            category: "Fiction",
            quantity: 5
          },
          {
            id: 2,
            title: "Introduction to Computing",
            author: "John Smith",
            category: "Technology",
            quantity: 3
          }
        ];
  });

  const [users, setUsers] = useState(() => {
    const savedUsers =
      localStorage.getItem("users");

    return savedUsers
      ? JSON.parse(savedUsers)
      : [
          {
            id: 1,
            name: "Admin User",
            membershipId: "ADMIN001",
            role: "Admin"
          }
        ];
  });

  const [transactions, setTransactions] =
    useState(() => {
      const savedTransactions =
        localStorage.getItem(
          "transactions"
        );

      return savedTransactions
        ? JSON.parse(savedTransactions)
        : [];
    });

  useEffect(() => {
    localStorage.setItem(
      "books",
      JSON.stringify(books)
    );
  }, [books]);

  useEffect(() => {
    localStorage.setItem(
      "users",
      JSON.stringify(users)
    );
  }, [users]);

  useEffect(() => {
    localStorage.setItem(
      "transactions",
      JSON.stringify(transactions)
    );
  }, [transactions]);

  function login() {
    setLoggedIn(true);
  }

  function logout() {
    setLoggedIn(false);
  }

  if (!loggedIn) {
    return <Login onLogin={login} />;
  }

  return (
    <BrowserRouter>
      <Navbar onLogout={logout} />

      <main className="container">
        <Routes>
          <Route
            path="/"
            element={
              <Dashboard books={books} />
            }
          />

          <Route
            path="/books"
            element={
              <Books
                books={books}
                setBooks={setBooks}
              />
            }
          />

          <Route
            path="/transactions"
            element={
              <Transactions
                books={books}
                setBooks={setBooks}
                transactions={transactions}
                setTransactions={
                  setTransactions
                }
              />
            }
          />

          <Route
            path="/users"
            element={
              <Users
                users={users}
                setUsers={setUsers}
              />
            }
          />

          <Route
            path="*"
            element={
              <Navigate to="/" />
            }
          />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;