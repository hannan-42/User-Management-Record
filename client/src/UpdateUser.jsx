import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'

function UpdateUser() {
  const { id } = useParams()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [age, setAge] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    axios.get('https://user-management-record.vercel.app/getUser/' + id)
      .then(result => {
        console.log(result)
        setName(result.data.users.name)
        setEmail(result.data.users.email)
        setAge(result.data.users.age)
      })
      .catch(err => console.log(err))
  }, [])

  const Update = (e) => {
    e.preventDefault()
    if (!name || !email || !age) {
      alert('Please fill all fields')
      return
    }
    axios.put('https://user-management-record.vercel.app/updateUser/' + id, { name, email, age }).then(result => {
      console.log(result)
      alert('User updated successfully')
      navigate('/')
    })
      .catch(err => {
        console.log(err)
        alert('Error updating user')
      })
  }

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
              />
            </div>
            <div className='d-flex justify-content-between align-items-center'>
              <button type='submit' className='btn btn-sm btn-outline-success me-2'>Save Changes</button>
              <Link to='/' className='btn btn-outline-secondary btn-lg'>Cancel</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default UpdateUser