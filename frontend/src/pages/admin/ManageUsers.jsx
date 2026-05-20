import { useEffect, useState } from "react";
import {
  Search,
  UserCircle,
  Shield,
  Truck,
  Users,
  Pencil,
  Trash2,
  X,
} from "lucide-react";
import {
  getAllUsersApi,
  updateUserByAdminApi,
  deleteUserByAdminApi,
  updateUserStatusApi,
} from "../../api/adminApi";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editUser, setEditUser] = useState(null);

  const loadUsers = async () => {
    try {
      const data = await getAllUsersApi();
      setUsers(data.users || []);
    } catch (error) {
      alert(error.response?.data?.message || "Failed to load users");
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const filteredUsers = users.filter((user) => {
    const search = searchTerm.toLowerCase();

    return (
      user.name?.toLowerCase().includes(search) ||
      user.email?.toLowerCase().includes(search) ||
      user.phone?.toLowerCase().includes(search) ||
      user.address?.toLowerCase().includes(search) ||
      user.role?.toLowerCase().includes(search)
    );
  });

  const getRoleIcon = (role) => {
    if (role === "admin")
      return <Shield size={20} className="text-purple-600" />;
    if (role === "delivery")
      return <Truck size={20} className="text-green-600" />;
    return <UserCircle size={20} className="text-blue-600" />;
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure? If user has linked couriers, account will be disabled instead of deleted."
    );

    if (!confirmDelete) return;

    try {
      const data = await deleteUserByAdminApi(id);
      alert(data.message);
      loadUsers();
    } catch (error) {
      alert(error.response?.data?.message || "Delete failed");
    }
  };

  const handleStatusToggle = async (id, isActive) => {
    try {
      await updateUserStatusApi(id, !isActive);
      loadUsers();
    } catch (error) {
      alert(error.response?.data?.message || "Status update failed");
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateUserByAdminApi(editUser._id, editUser);
      alert("User updated successfully");
      setEditUser(null);
      loadUsers();
    } catch (error) {
      alert(error.response?.data?.message || "User update failed");
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-700 to-indigo-700 rounded-3xl p-6 text-white">
        <div className="flex items-center gap-3">
          <Users size={32} />

          <div>
            <h2 className="text-2xl font-extrabold">Manage Users</h2>
            <p className="text-blue-100">
              Complete details of customers, delivery boys, and admins.
            </p>
          </div>
        </div>
      </div>

      <div className="relative">
        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
        />

        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by name, email, phone, address, role..."
          className="w-full border rounded-xl pl-12 pr-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="bg-white rounded-3xl shadow-sm border p-5">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1100px]">
            <thead>
              <tr className="text-left text-gray-500 border-b">
                <th className="py-3">User</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Address</th>
                <th>Role</th>
                <th>Status</th>
                <th>Joined</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user._id} className="border-b last:border-0">
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      {getRoleIcon(user.role)}
                      <div>
                        <p className="font-bold">{user.name}</p>
                        <p className="text-xs text-gray-500">{user._id}</p>
                      </div>
                    </div>
                  </td>

                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td className="max-w-[220px]">{user.address || "N/A"}</td>

                  <td>
                    <span className="capitalize px-3 py-1 rounded-full bg-blue-50 text-blue-700 font-semibold text-sm">
                      {user.role}
                    </span>
                  </td>

                  <td>
                    <button
                      onClick={() =>
                        handleStatusToggle(user._id, user.isActive)
                      }
                      className={`px-3 py-1 rounded-full font-bold text-sm ${
                        user.isActive
                          ? "bg-green-50 text-green-600"
                          : "bg-red-50 text-red-600"
                      }`}
                    >
                      {user.isActive ? "Active" : "Disabled"}
                    </button>
                  </td>

                  <td>
                    {user.createdAt
                      ? new Date(user.createdAt).toLocaleDateString()
                      : "N/A"}
                  </td>

                  <td>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setEditUser(user)}
                        className="bg-blue-50 text-blue-700 p-2 rounded-xl"
                      >
                        <Pencil size={18} />
                      </button>

                      <button
                        onClick={() => handleDelete(user._id)}
                        className="bg-red-50 text-red-600 p-2 rounded-xl"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredUsers.length === 0 && (
                <tr>
                  <td colSpan="8" className="text-center py-8 text-gray-500">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {editUser && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-2xl p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-2xl font-extrabold">Edit User</h2>
              <button onClick={() => setEditUser(null)}>
                <X />
              </button>
            </div>

            <form
              onSubmit={handleEditSubmit}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              <Input
                label="Name"
                value={editUser.name}
                onChange={(value) => setEditUser({ ...editUser, name: value })}
              />

              <Input
                label="Email"
                value={editUser.email}
                onChange={(value) => setEditUser({ ...editUser, email: value })}
              />

              <Input
                label="Phone"
                value={editUser.phone}
                onChange={(value) => setEditUser({ ...editUser, phone: value })}
              />

              <div>
                <label className="text-sm font-semibold">Role</label>
                <select
                  value={editUser.role}
                  onChange={(e) =>
                    setEditUser({ ...editUser, role: e.target.value })
                  }
                  className="w-full border rounded-xl px-4 py-3 mt-1"
                >
                  <option value="customer">Customer</option>
                  <option value="delivery">Delivery</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="text-sm font-semibold">Address</label>
                <textarea
                  value={editUser.address || ""}
                  onChange={(e) =>
                    setEditUser({ ...editUser, address: e.target.value })
                  }
                  className="w-full border rounded-xl px-4 py-3 mt-1 min-h-24"
                />
              </div>

              <div>
                <label className="text-sm font-semibold">Status</label>
                <select
                  value={editUser.isActive ? "active" : "disabled"}
                  onChange={(e) =>
                    setEditUser({
                      ...editUser,
                      isActive: e.target.value === "active",
                    })
                  }
                  className="w-full border rounded-xl px-4 py-3 mt-1"
                >
                  <option value="active">Active</option>
                  <option value="disabled">Disabled</option>
                </select>
              </div>

              <div className="md:col-span-2 flex gap-3 justify-end">
                <button
                  type="button"
                  onClick={() => setEditUser(null)}
                  className="px-6 py-3 rounded-xl border font-bold"
                >
                  Cancel
                </button>

                <button className="px-6 py-3 rounded-xl bg-blue-700 text-white font-bold">
                  Update User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

const Input = ({ label, value, onChange }) => {
  return (
    <div>
      <label className="text-sm font-semibold">{label}</label>
      <input
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border rounded-xl px-4 py-3 mt-1"
      />
    </div>
  );
};

export default ManageUsers;
