import Categoria from "../Categoria";
import styles from "./Banner.module.css";
import { useState } from "react";

function Banner({ pagina }) {
  return (
    <div className={styles.Banner}>
      <h2>{pagina}</h2>
    </div>
  );
}

export default Banner;
