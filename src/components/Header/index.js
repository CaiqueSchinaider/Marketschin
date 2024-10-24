import { useState } from "react";
import Buy from "../../pages/Buy";
import styles from "./Header.module.css";
import { Link } from "react-router-dom"; // Corrigido o caminho do import
import Loading from "../Loading";
import Home from "../../pages/Home";

function Header() {
    
   
  return (
    <header className={styles.Header}>
      <span>
        <Link to="/">
          Market Schin
        </Link>
      </span>
      
      <nav>
        
        <a href="/" >
          <img src="/pic/home.png" alt="Home" />
        </a>
        <a href="/comprar" >
          <img src="/pic/cart.png" alt="Cart" />
        </a>
      </nav>
    
    </header>
)}
  

export default Header;
