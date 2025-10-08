import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Box from "@mui/material/Box";

// استيراد الصور (ما تغيّرتش)
import Kitchen_supplies_ar from "../image/top-secction/ar/Kitchen_supplies.jpg";
import Childrens_games_ar from "../image/top-secction/ar/Childrens_games.jpg";
import shoes_ar from "../image/top-secction/ar/shoes.jpg";
import redy_ar from "../image/top-secction/ar/redy.jpg";

import Kitchen_supplies_en from "../image/top-secction/en/Kitchen_supplies.jpg";
import Childrens_games_en from "../image/top-secction/en/Childrens_games.jpg";
import shoes_en from "../image/top-secction/en/shoes.jpg";
import redy_en from "../image/top-secction/en/redy.jpg";

import Kitchen_supplies_zh from "../image/top-secction/zh/Kitchen_supplies.jpg";
import Childrens_games_zh from "../image/top-secction/zh/Childrens_games.jpg";
import shoes_zh from "../image/top-secction/zh/shoes.jpg";
import redy_zh from "../image/top-secction/zh/redy.jpg";

export default function HeroBackground() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  const imagesByLang = {
    ar: [Kitchen_supplies_ar, Childrens_games_ar, shoes_ar, redy_ar],
    en: [Kitchen_supplies_en, Childrens_games_en, shoes_en, redy_en],
    zh: [Kitchen_supplies_zh, Childrens_games_zh, shoes_zh, redy_zh],
  };

  const images = imagesByLang[lang] || imagesByLang.en;
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [images]);

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        // 👇 Responsive height:
        height: { xs: "220px", sm: "280px", md: "450px", lg: "550px" },
        mt: { xs: "56px", sm: "60px", md: "60px" },
        backgroundImage: `url(${images[index]})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        transition: "background-image 1.2s ease-in-out",
        borderBottom: "2px solid #fff",
        overflow: "hidden",
      }}
    >
      {/* ممكن تضيف هنا نص وتتأكد إنه ريسبونسف */}
      <Box
        sx={{
          position: "absolute",
          top: { xs: "55%", sm: "50%" },
          left: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
          color: "#000",
          px: { xs: 1, sm: 2 },
          zIndex: 0,
        }}
      ></Box>

      {/* Gradient */}
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background:
            "linear-gradient(to bottom, rgba(255,255,255,0) 65%, #fff 100%)",
          zIndex: 1,
        }}
      />
    </Box>
  );
}
