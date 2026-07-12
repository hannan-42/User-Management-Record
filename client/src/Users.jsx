import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Users() {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get(`${API_URL}/`);
                setUsers(response.data.users);
            } catch (err) {
                console.error("Fetch Error:", err);
                alert(err.response?.data?.error || "Failed to load users from the database.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchUsers();
    }, [API_URL]);

    const handleDelete = async (id) => {
        const isConfirmed = window.confirm("Are you sure you want to delete this user?");
        if (!isConfirmed) return;

        try {
            await axios.delete(`${API_URL}/deleteUser/${id}`);
            setUsers(prevUsers => prevUsers.filter(user => user._id !== id));
            alert("User deleted successfully.");
        } catch (err) {
            console.error("Delete Error:", err);
            alert(err.response?.data?.error || "Failed to delete user.");
        }
    };

    return (
        <div className='min-vh-100 bg-info d-flex justify-content-center align-items-center py-5'>
            <div className='w-100 mx-3 mx-md-0' style={{ maxWidth: 900 }}>
                <div className='card shadow'>
                    <div className='card-header bg-white d-flex justify-content-between align-items-center'>
                        <div>
                            <h3 className='mb-1'>User Management</h3>
                            <p className='text-muted mb-0'>View and manage user records.</p>
                        </div>
                        <Link to='/create' className='btn btn-success'>Add User</Link>
                    </div>
                    <div className='card-body'>
                        <div className='table-responsive'>
                            <table className='table table-striped table-hover mb-0'>
                                <thead className='table-dark'>
                                    <tr>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Age</th>
                                        <th className='text-end'>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {isLoading ? (
                                        <tr>
                                            <td colSpan='4' className='text-center py-4 text-muted'>
                                                Loading users...
                                            </td>
                                        </tr>
                                    ) : users.length > 0 ? (
                                        users.map((user) => (
                                            <tr key={user._id}>
                                                <td>{user.name}</td>
                                                <td>{user.email}</td>
                                                <td>{user.age}</td>
                                                <td className='text-end'>
                                                    <Link to={`/update/${user._id}`} className='btn btn-sm btn-outline-success me-2'>
                                                        Update
                                                    </Link>
                                                    <button
                                                        className='btn btn-sm btn-outline-danger'
                                                        onClick={() => handleDelete(user._id)}
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan='4' className='text-center py-4 text-muted'>
                                                No users found. Add a new user to get started.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Users;