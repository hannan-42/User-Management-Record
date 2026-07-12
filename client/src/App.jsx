import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Users from './Users';
import CreateUser from './CreateUser';
import UpdateUser from './UpdateUser'; 

const NotFound = () => (
  <div className="min-vh-100 d-flex flex-column justify-content-center align-items-center bg-light">
    <h1 className="display-1 fw-bold text-danger">404</h1>
    <h2 className="mb-4">Page Not Found</h2>
    <a href="/" className="btn btn-outline-primary">Return to Homepage</a>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Users />} />
        <Route path='/create' element={<CreateUser />} />
        <Route path='/update/:id' element={<UpdateUser />} />
        
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;