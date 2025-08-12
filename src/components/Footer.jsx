import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";


function Footer() {

  const { theme } = useContext(ThemeContext);

  return (
   <footer className={` ${theme === 'dark' ? "footer-dark" : 'footer-light'}`}> 
   
   <b>Mayduu | </b>Copyright © 2025 Mayduu. All Rights Reserved.
   </footer>
  )
}

export default Footer