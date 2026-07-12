import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function UpdateUser() {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [isLoading, setIsLoading] = useState(false); 

  const navigate = useNavigate();

  const API_URL = process.env.REACT_APP_API_URL || 'https://user-management-record.vercel.app';

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${API_URL}/getUser/${id}`);
        setName(response.data.user.name);
        setEmail(response.data.user.email);
        setAge(response.data.user.age);
      } catch (err) {
        console.error('Issue in Data Loading:', err);
        const errorMessage = err.response?.data?.error || 'User is not fetching data';
        alert(errorMessage);
      }
    };
    fetchUserData();
  }, [id, API_URL]);

  const Update = async (e) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !age) {
      alert('Please fill all fields with valid data');
      return;
    }

    try {
      setIsLoading(true);

      const response = await axios.put(`${API_URL}/updateUser/${id}`, {
        name: name.trim(),
        email: email.trim(),
        age: Number(age)
      });

      console.log('Update Result:', response.data);
      alert('User updated successfully');
      navigate('/');

    } catch (err) {
      console.error('Error during update:', err);
      const errorMessage = err.response?.data?.error || 'Error updating user';
      alert(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='min-vh-100 d-flex justify-content-center align-items-center bg-light'>
      <div className='card shadow-sm w-100 mx-3 mx-md-0' style={{ maxWidth: '520px' }}>
        <div className='card-header bg-white text-center border-0 pb-0'>
          <h2 className='mb-1'>Update User</h2>
          <p className='text-muted mb-3'>Edit the user details and save changes.</p>
        </div>
        <div className='card-body'>
          <form onSubmit={Update}>
            <div className='mb-3'>
              <label className='form-label'>Name</label>
              <input
                type='text'
                placeholder='Enter name'
                className='form-control form-control-lg'
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <div className='mb-3'>
              <label className='form-label'>Email</label>
              <input
                type='email'
                placeholder='Enter email'
                className='form-control form-control-lg'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <div className='mb-4'>
              <label className='form-label'>Age</label>
              <input
                type='number'
                placeholder='Enter age'
                className='form-control form-control-lg'
                value={age}
                onChange={(e) => setAge(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <div className='d-flex justify-content-between align-items-center'>
              <button
                type='submit'
                className='btn btn-sm btn-outline-success me-2'
                disabled={isLoading}
              >
                {isLoading ? 'Saving...' : 'Save Changes'}
              </button>
              <Link
                to='/'
                className={`btn btn-outline-secondary btn-lg ${isLoading ? 'disabled' : ''}`}
              >
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdateUser;