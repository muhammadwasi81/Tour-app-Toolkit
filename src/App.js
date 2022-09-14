import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Login from './pages/css/Login';
import Dashboard from './pages/css/Dashboard';
import Register from './pages/css/Register';
import AddEditTour from './pages/css/Register';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <ToastContainer position="bottom-center" />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/register" element={<Register />} />
          <Route path="/add" element={<AddEditTour />} />
          <Route path="/edit/:id" element={<AddEditTour />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
