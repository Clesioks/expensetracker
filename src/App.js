import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Test from './pages/Test';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import { ToastContainer } from 'react-toastify'

function App() {
  return (
    <>
    
    <div className="App">
      
      <BrowserRouter>

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/test' element={<Test />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />


        </Routes>

      </BrowserRouter>

    </div>
    <ToastContainer />

    </>
  );
}

export default App;
