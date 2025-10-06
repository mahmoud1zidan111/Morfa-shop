import "./App.css";
import React, { useEffect } from "react";
import i18n from "./i18n";
import SimpleContainer from "./componants/contener";
import PrimarySearchAppBar from "./componants/Navbar";

import Profile from "./Profile"; // عدّل المسار حسب مكان الملف
import Account from "./Account"; // عدّل المسار حسب مكان الملف

import { Routes, Route, useParams } from "react-router-dom";
import ActionAreaCard from "./componants/cards";

function ProductPage() {
  const { category, id } = useParams();
  return (
    <div style={{ padding: 20 }}>
      <h2>صفحة المنتج</h2>
      <p>الفئة: {category}</p>
      <p>المنتج رقم: {id}</p>
    </div>
  );
}

export default function App() {
  useEffect(() => {
    const savedLang = localStorage.getItem("preferredLanguage") || "en";
    i18n.changeLanguage(savedLang);
    document.dir = savedLang === "ar" ? "rtl" : "ltr";
  }, []);

  return (
    <div className="App">
      <PrimarySearchAppBar />

      <Routes>
        <Route path="/" element={<SimpleContainer />} />
        <Route path="/categories" element={<ActionAreaCard />} />
        <Route path="/products/:category/:id" element={<ProductPage />} />

        {/* المهم: دول اللي كانوا ناقصين */}
        <Route path="/profile" element={<Profile />} />
        <Route path="/account" element={<Account />} />

        {/* اختياري: صفحة لأي مسار غلط */}
        <Route
          path="*"
          element={<div style={{ padding: 20 }}>صفحة غير موجودة</div>}
        />
      </Routes>
    </div>
  );
}
