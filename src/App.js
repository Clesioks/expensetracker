import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Test from './pages/Test';
import Home from './pages/Home.jsx';

function App() {
  return (
    <div className="App">
      
      <BrowserRouter>

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/test' element={<Test />} />

        </Routes>

      </BrowserRouter>

    </div>
  );
}

export default App;
