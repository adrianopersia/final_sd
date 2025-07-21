import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Public from "./pages/Public";
import Private from "./pages/Private";
import Admin from "./pages/Admin";
import ApiTest from "./pages/ApiTest";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="py-8 px-4 sm:px-6 lg:px-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/public" element={<Public />} />
            <Route path="/private" element={<Private />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/api-test" element={<ApiTest />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
