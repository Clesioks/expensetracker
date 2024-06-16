import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Test from './pages/Test';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';

function App() {
  return (
    
    <div className="App">      
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path='/test' element={<ProtectedRoute><Test /></ProtectedRoute>} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}


export const ProtectedRoute = (props) => {
  if(localStorage.getItem('sheymoney-udemy-user')) {
    return props.children
  } else {
    return <Navigate to='/login' />
  }
}

export default App;
