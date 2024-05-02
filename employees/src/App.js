import logo from './logo.svg';
import './App.css';
import Employees from './component/employees';
import { Route, Routes } from 'react-router-dom';
import Login from './login';
import DeleteEmployee from './component/deleteEmployee';
import EditEmployee from './component/editEmployee';
import ShowDetails from './component/showDetails';
import TopBar from './topBar';
import AddPosition from './component/addPosition';
import { useState } from 'react';

function App() {


  return (
    <div className="App">
     <TopBar />
      <Routes>
        
        {/* <Route path='/login' element={<Login />} /> */}
        <Route path='/' element={<Employees />} />
        <Route path='/employees' element={<Employees />} />
        <Route path='/employees/deleteEmployee' element={<DeleteEmployee />} />
        <Route path='/employees/editEmployee' element={<EditEmployee />} />
        <Route path='/employees/showDetails' element={<ShowDetails />} />
        <Route path='/addEmployee' element={<EditEmployee/>} />
        <Route path='/addPosition' element={<AddPosition />} />
        </Routes>
    </div>
  );
}

export default App;
