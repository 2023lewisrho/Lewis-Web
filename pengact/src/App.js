import logo from './logo.svg';
import './App.css';
import LoginPage from './LoginPage';
import { Route, BrowserRouter, Routes,  } from "react-router-dom";
import MainPage from './MainPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
