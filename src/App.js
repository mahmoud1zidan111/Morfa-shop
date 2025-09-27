import "./App.css";
import React, { useEffect } from "react";
import i18n from "./i18n"; // ✅ إعدادات الترجمة
import SimpleContainer from "./componants/contener";
import PrimarySearchAppBar from "./componants/Navbar";

// ✅ استدعاء React Router
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import ActionAreaCard from "./componants/cards"; // لو ملف الكروت اسمه cards.js

// ✅ صفحة تعرض تفاصيل المنتج حسب الرابط
function ProductPage() {
  const { category, id } = useParams();
  return (
    <div style={{ padding: "20px" }}>
      <h2>صفحة المنتج</h2>
      <p>الفئة: {category}</p>
      <p>المنتج رقم: {id}</p>
    </div>
  );
}

function App() {
  useEffect(() => {
    const savedLang = localStorage.getItem("preferredLanguage") || "en";
    i18n.changeLanguage(savedLang);
    document.dir = savedLang === "ar" ? "rtl" : "ltr";
  }, []);

  return (
    <div className="App">
      {/* ✅ تغليف بالـ Router */}
      <BrowserRouter>
        {/* دايمًا النافبار فوق */}
        <PrimarySearchAppBar />

        <Routes>
          {/* الصفحة الرئيسية زي ما هي */}
          <Route path="/" element={<SimpleContainer />} />

          {/* صفحة فيها كروت المنتجات */}
          <Route path="/categories" element={<ActionAreaCard />} />

          {/* صفحة تفاصيل أي منتج */}
          <Route path="/products/:category/:id" element={<ProductPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
