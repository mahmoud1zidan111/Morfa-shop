import "./App.css";
import React, { useEffect } from "react";
import i18n from "./i18n";
import SimpleContainer from "./componants/contener";
import PrimarySearchAppBar from "./componants/Navbar";
import HeroBackground from "./componants/upSiction"; // (أو HeroBackground حسب الاسم عندك)
import Profile from "./Profile";
import Account from "./Account";
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
        {/* ✅ الصفحة الرئيسية فقط */}
        <Route
          path="/"
          element={
            <>
              <HeroBackground /> {/* الخلفية المتغيرة تظهر هنا فقط */}
              <SimpleContainer /> {/* المحتوى الرئيسي */}
            </>
          }
        />

        {/* باقي الصفحات بدون الخلفية */}
        <Route path="/categories" element={<ActionAreaCard />} />
        <Route path="/products/:category/:id" element={<ProductPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/account" element={<Account />} />

        {/* صفحة افتراضية عند الخطأ */}
        <Route
          path="*"
          element={<div style={{ padding: 20 }}>صفحة غير موجودة</div>}
        />
      </Routes>
    </div>
  );
}
