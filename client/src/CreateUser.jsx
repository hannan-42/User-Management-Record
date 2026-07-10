import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CreateUser() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const navigate = useNavigate();

  console.log('render', { name, email, age });

  const Submit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://user-management-record.vercel.app/createUser', { name: name, email: email, age: Number(age) });
      alert("User Created Successfully!");
      navigate('/');
    } catch (err) {
      console.error("Submission Error:", err);
      alert("Failed to create user.")
    }
  };

  return (
    <div className='min-vh-100 bg-info d-flex justify-content-center align-items-center py-5'>
      <div className='card shadow-sm w-50'>
        <div className='card-header bg-white text-center'>
          <h2 className='mb-0'>Create User</h2>
        </div>
        <div className='card-body'>
          <form onSubmit={Submit}>
            <div className='mb-3'>
              <label htmlFor='name' className='form-label'>Name</label>
              <input id='name' name='name' value={name} type='text' className='form-control' placeholder='Enter name' onChange={(e) => setName(e.target.value)} />
            </div>
            <div className='mb-3'>
              <label htmlFor='email' className='form-label'>Email</label>
              <input id='email' name='email' value={email} type='email' className='form-control' placeholder='Enter email' onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className='mb-3'>
              <label htmlFor='age' className='form-label'>Age</label>
              <input id='age' name='age' value={age} type='number' className='form-control' placeholder='Enter age' onChange={(e) => setAge(e.target.value)} />
            </div>
            <button type='submit' className='btn btn-sm btn-outline-success me-2'>Create User</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateUser;