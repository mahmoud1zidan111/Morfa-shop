import React, { useState, useEffect } from "react";
import { MenuItem, Select, FormControl } from "@mui/material";
import LanguageIcon from "@mui/icons-material/Language";
import i18n from "../i18n";

// 🗂️ كل اللغات في Object واحد
const languageOptions = {
  en: { label: "🇺🇸 English", dir: "ltr" },
  ar: { label: "🇪🇬 العربية", dir: "rtl" },
  zh: { label: "🇨🇳 中文", dir: "ltr" },
};

function LanguageSwitcher({ color = "white" }) {
  // 📥 تحميل اللغة الأولية من LocalStorage أو i18n
  const initialLang =
    localStorage.getItem("preferredLanguage") || i18n.language || "";

  const [lang, setLang] = useState(initialLang);

  const handleChange = (event) => {
    const chosen = event.target.value;
    setLang(chosen);
    if (chosen) {
      i18n.changeLanguage(chosen);
      localStorage.setItem("preferredLanguage", chosen);

      document.dir = languageOptions[chosen]?.dir || "ltr";
    }
  };

  useEffect(() => {
    if (lang && languageOptions[lang]) {
      document.dir = languageOptions[lang].dir;
    }
  }, [lang]);

  return (
    <FormControl
      variant="standard"
      sx={{
        minWidth: 120,
        borderRadius: 1,
        "& .MuiSelect-select": { padding: "10px 20px" },
      }}
    >
      <Select
        value={lang}
        onChange={handleChange}
        disableUnderline
        displayEmpty
        renderValue={(selected) =>
          selected === "" ? (
            <span style={{ color }}>
              <LanguageIcon sx={{ fontSize: 18, mb: "-3px" }} /> Language
            </span>
          ) : (
            languageOptions[selected].label
          )
        }
        sx={{
          color, // 👉 هنا اللون من الـ prop
          "& .MuiSelect-icon": { color },
        }}
      >
        {Object.entries(languageOptions).map(([key, { label }]) => (
          <MenuItem key={key} value={key}>
            {label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default LanguageSwitcher;
