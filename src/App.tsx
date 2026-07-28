import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import "./css/style.css";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";

import Navbar from "./components/navbar";
import Home from "./components/home";
import Service from "./components/service";
import Client from "./components/client";
import Contact from "./components/contact";
import Review from "./components/review";
import Location from "./components/location";
import Locations from "./components/Location-1";
import ScrollToSection from "./components/scroll";
import DemoForm from "./components/form";

import BookAppointment from "./pages/bookappointment";
import Ambulance from "./pages/ambulance";
import Airplane from "./pages/airplane";
import LabTesting from "./pages/labtesting";
import NearestService from "./pages/nearestservice";
import Vaccination from "./pages/vaccination";
import Pharmacy from "./pages/pharmacy";
import ServiceDetail from "./pages/serviceDetail";
import DoctorAppointment from "./pages/doctorappointment";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function App() {
  const appRef = useRef<HTMLDivElement>(null);
  const [liveNotification, setLiveNotification] = useState<{ title: string; message: string; createdAt: string } | null>(null);

  useEffect(() => {
    const eventSource = new EventSource("http://localhost:5000/api/notifications");

    eventSource.addEventListener("message", (event) => {
      try {
        const payload = JSON.parse(event.data);
        if (payload?.message) {
          setLiveNotification({
            title: payload.title || "Realtime update",
            message: payload.message,
            createdAt: payload.createdAt || new Date().toISOString(),
          });
        }
      } catch (error) {
        console.error("Notification stream error:", error);
      }
    });

    eventSource.onerror = () => {
      eventSource.close();
    };

    return () => eventSource.close();
  }, []);

  useEffect(() => {
    if (!liveNotification) return;

    const timer = window.setTimeout(() => setLiveNotification(null), 5000);
    return () => window.clearTimeout(timer);
  }, [liveNotification]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-section", {
        opacity:0,
        y:80,
        duration:1.4,
        ease:"power3.out"
      });
      gsap.from(".service-section", {
        scrollTrigger:{
          trigger:".service-section",
          start:"top 80%"
        },
        opacity:0,
        y:100,
        duration:1.2,
        ease:"power3.out"
      });
      gsap.utils.toArray(".glass-card").forEach((card:any)=>{
        gsap.from(card,{
          scrollTrigger:{
            trigger:card,
            start:"top 85%"
          },
          opacity:0,
          y:60,
          scale:0.9,
          duration:1,
          ease:"power2.out"
        });
      });
    },appRef);
    return ()=>ctx.revert();
  },[]);
  return (
<BrowserRouter>
<ScrollToSection />
<div ref={appRef}
className="min-h-screen bg-gradient-to-br from-slate-950 via-sky-950 to-black text-white overflow-x-hidden"
>
<div className="fixed inset-0 -z-10">
<div className="blob blob1"></div>
<div className="blob blob2"></div>
<div className="blob blob3"></div>
</div>
<Navbar />
{liveNotification && (
  <div className="fixed top-4 right-4 z-50 max-w-sm rounded-xl border border-sky-400/40 bg-slate-900/95 px-4 py-3 shadow-2xl backdrop-blur">
    <p className="text-sm font-semibold text-sky-300">{liveNotification.title}</p>
    <p className="mt-1 text-sm text-slate-100">{liveNotification.message}</p>
  </div>
)}
<Routes>
<Route path="/" element={
<main>
  <Home/>
  <Service/>
  <Client/>
  <Contact/>
  <Review/>
  <Location/>
  <Locations/>
</main>
}/>

<Route path="/book-demo" element={<DemoForm />} />
<Route path="/doctor-appointment" element={<DoctorAppointment />} />
<Route path="/services/:category" element={<ServiceDetail />} />
<Route path="/book-appointment" element={<BookAppointment />} />
<Route path="/ambulance" element={<Ambulance />}/>
<Route path="/airplane" element={<Airplane />}/>
<Route path="/labtesting" element={<LabTesting />}/>
<Route path="/nearest-service" element={<NearestService />}/>
<Route path="/vaccination" element={<Vaccination />} />
<Route path="/pharmacy" element={<Pharmacy />} />
</Routes>
<footer>
<div className="center">
Copyright © www.MediSync.com. All rights reserved!
</div>
</footer>
</div>
</BrowserRouter>
  );
}

export default App;
