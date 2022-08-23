import { Routes, Route } from "react-router-dom";
import './App.css'
import Footer from "./components/Footer"
import Header from "./components/Header"
import Home from "./pages/Home"
import Result from "./pages/Result"
import Survey from "./pages/Survey"

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/survey" element={<Survey />} />
        <Route path="/results" element={<Result />} />
        {/* <Home /> */}
      </Routes>
      <Footer />
    </div>
  )
}

export default App
