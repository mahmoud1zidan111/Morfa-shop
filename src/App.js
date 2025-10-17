import "./App.css";
import React, { useEffect, useRef } from "react"; // + useRef
import "animate.css"; // ← إضافة animate.css
import WOW from "wowjs"; // ← إضافة WOW.js

import i18n from "./i18n";
import SimpleContainer from "./componants/contener";
import PrimarySearchAppBar from "./componants/Navbar";
import HeroBackground from "./componants/upSiction"; // (أو HeroBackground حسب الاسم عندك)
import Profile from "./Profile";
import Account from "./Account";
import { Routes, Route, useParams } from "react-router-dom";
import { useLocation } from "react-router-dom"; // ← هنستخدمها عشان نعمل sync بعد تغيّر الروت
import ActionAreaCard from "./componants/cards";
import Check from "./check";
// import CategoryProducts from "./CategoryProducts";

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
  const wowRef = useRef(null); // ← مرجع للـ WOW instance
  const location = useLocation(); // ← لمزامنة WOW عند تغيير الصفحة

  useEffect(() => {
    const savedLang = localStorage.getItem("preferredLanguage") || "en";
    i18n.changeLanguage(savedLang);
    document.dir = savedLang === "ar" ? "rtl" : "ltr";
  }, []);

  // ← تهيئة WOW.js مرة واحدة
  useEffect(() => {
    // ملاحظة: في wowjs لازم new WOW.WOW()
    wowRef.current = new WOW.WOW({
      boxClass: "wow",
      animateClass: "animate__animated",
      offset: 60,
      mobile: true,
      live: false, // أسرع مع React
    });
    wowRef.current.init();
  }, []);

  // ← عند تغيّر المسار (الراوتر) خلّي WOW يعيد فحص العناصر
  useEffect(() => {
    wowRef.current?.sync();
  }, [location.pathname]);

  return (
    <div className="App">
      <PrimarySearchAppBar />

      <Routes>
        <Route
          path="/"
          element={
            <>
              {/* حرك الهيرو نزول */}
              <div
                className="wow animate__animated animate__fadeInDown"
                data-wow-duration="0.8s"
              >
                <HeroBackground />
              </div>

              {/* المحتوى الرئيسي يطلع لفوق */}
              <div
                className="wow animate__animated animate__fadeInUp"
                data-wow-duration="0.8s"
                data-wow-delay="0.15s"
              >
                <SimpleContainer />
              </div>
            </>
          }
        />

        {/* باقي الصفحات: لفّها بـ div فيه كلاس WOW */}
        <Route
          path="/categories"
          element={
            <div
              className="wow animate__animated animate__fadeInUp"
              data-wow-duration="0.6s"
            >
              <ActionAreaCard />
            </div>
          }
        />

        <Route
          path="/products/:category/:id"
          element={
            <div
              className="wow animate__animated animate__fadeInUp"
              data-wow-duration="0.6s"
            >
              <ProductPage />
            </div>
          }
        />

        <Route
          path="/profile"
          element={
            <div className="wow animate__animated animate__fadeIn">
              <Profile />
            </div>
          }
        />

        <Route
          path="/account"
          element={
            <div className="wow animate__animated animate__fadeIn">
              <Account />
            </div>
          }
        />

        <Route
          path="/check"
          element={
            <div className="wow animate__animated animate__fadeInUp">
              <Check />
            </div>
          }
        />

        {/* <Route path="/categories/:id" element={<CategoryProducts />} /> */}

        {/* صفحة افتراضية عند الخطأ */}
        <Route
          path="*"
          element={
            <div
              className="wow animate__animated animate__fadeIn"
              style={{ padding: 20 }}
            >
              صفحة غير موجودة
            </div>
          }
        />
      </Routes>
    </div>
  );
}
