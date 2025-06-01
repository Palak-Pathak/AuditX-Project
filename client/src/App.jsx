import React from "react";
import { Routes, Route } from "react-router-dom";
import MatrixRain from "./PortfolioSection/MatrixRain";
import HeroSection from "./PortfolioSection/Hero";
import Navbar from "./Navbar";
import AboutSection from "./PortfolioSection/AboutSection";
import ServicesSection from "./PortfolioSection/Services";
import TryAudit from "./AuditX_Tool/TryAudit";
import AuthForm from "./Users/Auth_Form";
import Dashboard from "./Users/User_Dashboard";

const HomePage = () => (
  <>
    <MatrixRain />
    <HeroSection />
    <ServicesSection />
    <AboutSection />
  </>
);

function App() {
  return (
    <div className="relative bg-black text-white min-h-screen">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path ="/Auth" element={<AuthForm />} />
        <Route path ="/dashboard" element={<Dashboard/>}/>
        <Route path="/services" element={<ServicesSection />} />
        <Route path="/about" element={<AboutSection />} />
        <Route path="/try" element={<TryAudit />} />
      </Routes>
    </div>
  );
}

export default App;
