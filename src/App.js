// react
import React from 'react';
import { Suspense } from 'react';
// react router
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Navigate } from 'react-router-dom';

import AuthGuard from './services/authGuard';

// component
import Login from './pages/Login';
import ListUser from './pages/ListUser';
import AddUser from './pages/AddUser';
import EditUser from './pages/EditUser';
// css
import './App.css';




function App() {
  return (
    <Suspense fallback={null}>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route index element={<Navigate to="/login" replace />} />
            <Route path='/login' element={<Login />} />

            <Route path='/user' element={
              <AuthGuard>
                <ListUser />
              </AuthGuard>} />
            <Route path='/user/add' element={
              <AuthGuard>
                <AddUser />
              </AuthGuard>} />
            <Route path='/user/edit/:id' element={
              <AuthGuard>
                <EditUser />
              </AuthGuard>} />


            <Route path='*' element={<Navigate to="/login" replace />} />

          </Routes>


        </BrowserRouter>
      </div>
    </Suspense>

  );
}

export default App;