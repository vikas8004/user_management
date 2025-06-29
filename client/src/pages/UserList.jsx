import { useEffect, useState } from 'react';
import { axiosInstance } from '../api/axiosInstance';
import UserForm from '../components/UserForm';
import { useUser } from '../context/UserContextApi';
import { LoaderCircle } from 'lucide-react';
import toast from 'react-hot-toast';

const UserListPage = () => {
  const { users, setUsers } = useUser();
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      const res = await axiosInstance.get('/users');
      if (res.status === 200) {
        setUsers(res.data.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [setUsers]);

  const handleAdd = () => {
    setSelectedUser(null);
    setShowModal(true);
  };

  const handleEdit = user => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const handleFormSubmit = async (values, { resetForm }) => {
    try {
      if (selectedUser) {
        const res = await axiosInstance.put(`/users/${selectedUser._id}`, values);
        if (res.status === 200) {
          // console.log(res.data.data);
          setShowModal(true);
          toast.success(res.data.message);
        }
      } else {
        const res = await axiosInstance.post('/users', values);
        if (res.status === 201) {
          console.log(res.data.data);
          toast.success(res.data.message);
          setShowModal(false);
        }
      }
      resetForm();
      setShowModal(false);
      fetchUsers();
    } catch (err) {
      // console.error('Error saving user', err);
      toast.error(err.response.data.message);
    }
  };

  return (
    <div className="pt-20 px-4 w-full">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">User Management</h1>
        <button className="btn btn-primary" onClick={handleAdd}>
          + Add User
        </button>
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center h-64 text-primary">
          <LoaderCircle className="w-10 h-10 animate-spin mb-2" />
          <p className="text-sm font-medium">Loading users...</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full bg-base-100">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td colSpan="3" className="text-center py-6 text-gray-500">
                    No users found.
                  </td>
                </tr>
              ) : (
                users.map(user => (
                  <tr key={user._id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td className="text-right">
                      <button onClick={() => handleEdit(user)} className="btn btn-sm btn-outline">
                        Edit
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-base-100 rounded-xl p-6 w-full max-w-md shadow-lg">
            <div className="flex justify-between mb-4">
              <h3 className="text-lg font-semibold">{selectedUser ? 'Edit User' : 'Add User'}</h3>
              <button className="btn btn-sm btn-ghost" onClick={() => setShowModal(false)}>
                ✕
              </button>
            </div>
            <UserForm
              initialValues={{
                name: selectedUser?.name || '',
                email: selectedUser?.email || '',
                password: '',
              }}
              isEditMode={!!selectedUser}
              onSubmit={handleFormSubmit}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default UserListPage;
