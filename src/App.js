import NotFound from "./pages/404";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import SignIn from "./pages/SingIn";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignIn />}></Route>
          <Route path="*" element={<NotFound />}></Route>
          <Route path="/dashboard" element={<Dashboard />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
