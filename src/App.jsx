import { useState } from "react";
import { useMemo } from "react";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { Toaster } from "react-hot-toast";
import { Routes, Route } from "react-router-dom";
import './App.css'
import Footer from "./components/Footer"
import Header from "./components/Header"
import { Admin } from "./pages/Admin";
import Home from "./pages/Home"
import Result from "./pages/Result"
import Survey from "./pages/Survey"
import { useAccountDetial } from "./utils";

function App() {
  const [jobPositionList, setJobPositionList] = useState([])
  const { isAdmin } = useAccountDetial()
  
  
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/job-positions`, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then(res => res.json())
    .then(data => {
      setJobPositionList(data || [])
    })
    .catch(error => {
      console.log("catch: ", error)
    })
  }, [])

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        {!isAdmin && <Route path="/survey" element={<Survey jobPositionList={jobPositionList} />} />}
        <Route path="/results/*" element={<Result />} />
        {isAdmin && <Route path="/admins" element={<Admin />} />}
      </Routes>
      <Footer />
      <Toaster
        position="top-center"
        reverseOrder={false}
        containerClassName=""
        containerStyle={{
          zIndex: 999999
        }}
        toastOptions={{
          duration: 5000,
        }}
      />
    </div>
  )
}

export default App
