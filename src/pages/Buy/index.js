import { useState } from "react";
import Banner from "../../components/Banner";
import Card from "../../components/Card";
import Header from "../../components/Header";
import produtosMock from "../../utils/produtosMock";
import styles from "./Buy.module.css";
import Container from "../../components/Container";
import Listadevideos from "../../components/Listadevideos";

function Buy() {
  document.body.style.backgroundImage =
    "linear-gradient(to right, #282b76f4, #060846d4)";

        const [searchValue, setSearchValue] = useState("");

        const lidarComMudança = (evento) => {
          setSearchValue(evento.target.value);
        };

      
  return (
    
    <section className={styles.Buy}>
      <Header />
      <Banner />
        <input
            type="search"
            placeholder="Pesquisar..."
            value={searchValue}
            onChange={lidarComMudança}
        />
    
            <Listadevideos/>
    
    
    </section>
  );
}

export default Buy
