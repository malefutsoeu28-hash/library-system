 import { useState } from "react";

function Users() {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Admin User",
      membershipId: "ADMIN001",
      role: "Admin"
    }
  ]);

  const [name, setName] = useState("");
  const [membershipId, setMembershipId] = useState("");
  const [role, setRole] = useState("Member");
  const [editingId, setEditingId] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();

    if (editingId) {
      setUsers(
        users.map((user) =>
          user.id === editingId
            ? {
                ...user,
                name: name,
                membershipId: membershipId,
                role: role
              }
            : user
        )
      );

      setEditingId(null);
    } else {
      const newUser = {
        id: Date.now(),
        name: name,
        membershipId: membershipId,
        role: role
      };

      setUsers([...users, newUser]);
    }

    setName("");
    setMembershipId("");
    setRole("Member");
  }

  function editUser(user) {
    setEditingId(user.id);
    setName(user.name);
    setMembershipId(user.membershipId);
    setRole(user.role);
  }

  function deleteUser(id) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (confirmDelete) {
      setUsers(
        users.filter((user) => user.id !== id)
      );
    }
  }

  function cancelEdit() {
    setEditingId(null);
    setName("");
    setMembershipId("");
    setRole("Member");
  }

  return (
    <div className="page">

      <h1>User Management</h1>

      <form
        className="user-form"
        onSubmit={handleSubmit}
      >

        <h2>
          {editingId
            ? "Update User"
            : "Add New User"}
        </h2>

        <label>Name</label>

        <input
          type="text"
          placeholder="Enter full name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
          required
        />

        <label>Membership ID</label>

        <input
          type="text"
          placeholder="Enter membership ID"
          value={membershipId}
          onChange={(e) =>
            setMembershipId(e.target.value)
          }
          required
        />

        <label>Role</label>

        <select
          value={role}
          onChange={(e) =>
            setRole(e.target.value)
          }
        >
          <option value="Member">Member</option>
          <option value="Librarian">Librarian</option>
          <option value="Admin">Admin</option>
        </select>

        <button
          type="submit"
          className="primary-button"
        >
          {editingId
            ? "Update User"
            : "Add User"}
        </button>

        {editingId && (
          <button
            type="button"
            className="secondary-button"
            onClick={cancelEdit}
          >
            Cancel
          </button>
        )}

      </form>

      <h2>Users</h2>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Membership ID</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.membershipId}</td>
              <td>{user.role}</td>

              <td>
                <button
                  className="edit-button"
                  onClick={() => editUser(user)}
                >
                  Update
                </button>

                <button
                  className="delete-button"
                  onClick={() =>
                    deleteUser(user.id)
                  }
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}

export default Users;