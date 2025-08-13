import { useContext } from "react";
import { LanguageContext } from "../contexts/LanguageContext";
import { Button } from "antd";

export default function LanguageToggle() {
  const { language, setLanguage } = useContext(LanguageContext);

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "tr" : "en");
  };

  return (
    

    <Button style={{width: 25}} className="languagebutton" onClick={toggleLanguage}>
      {language === "en" ? "🇹🇷" : "🇪🇳"}
    </Button>
    
  );
}
