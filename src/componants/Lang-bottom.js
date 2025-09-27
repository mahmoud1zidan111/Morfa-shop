import React, { useState } from "react";
import { MenuItem, Select, FormControl } from "@mui/material";
import LanguageIcon from "@mui/icons-material/Language";
import i18n from "../i18n";

const languageOptions = {
  en: "🇺🇸 English",
  ar: "🇪🇬 العربية",
  zh: "🇨🇳 中文",
};

function LanguageSwitcher({ color = "white" }) {
  const initialLang =
    localStorage.getItem("preferredLanguage") || i18n.language || "en";
  const [lang, setLang] = useState(initialLang);

  const handleChange = (event) => {
    const chosen = event.target.value;
    setLang(chosen);
    if (chosen) {
      i18n.changeLanguage(chosen);
      localStorage.setItem("preferredLanguage", chosen);
      document.dir = chosen === "ar" ? "rtl" : "ltr";
    }
  };

  return (
    <FormControl
      variant="standard"
      sx={{ minWidth: 120, padding: "10px 20px " }}
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
            languageOptions[selected]
          )
        }
        sx={{ color, "& .MuiSelect-icon": { color } }}
      >
        {Object.entries(languageOptions).map(([key, label]) => (
          <MenuItem key={key} value={key}>
            {label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default LanguageSwitcher;
