import { useContext } from "react";
import { LanguageContext } from "../contexts/LanguageContext";


export default function LanguageToggle() {
  const { language, setLanguage } = useContext(LanguageContext);

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "tr" : "en");
  };

  return (
    
<div className="language-toggle-container">
  <input
    type="checkbox"
    id="language-toggle"
    checked={language === "en"}
    onChange={toggleLanguage}
  />
  <label id="button" htmlFor="language-toggle">
    <div id="knob"></div>
    <div id="language-text">
      {language === "en" ? "English" : "Türkçe"}
    </div>
  </label>
</div>
    
  );
}
