import styles from "./Carroseul.module.css";
import produtos from "../../utils/produtosMock";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Link } from "react-router-dom";
function Carroseul() {
  return (
    <inside className={styles.Carroseul}>
      <nav>
        <Link to={"/comprar/all"}>
          <p>Produtos</p>
        </Link>
        <Link to={"/#"}>
          <p>Vender</p>
        </Link>
        <Link to={"/#"}>
          <p>Ajuda</p>
        </Link>
      </nav>

      <Carousel
        className={styles.Juntante}
        autoPlay
        infiniteLoop
        showThumbs={false}
        interval={5000}
        showArrows={false}
        showStatus={false}
        showIndicators={false}
      >
        {produtos.map((produtosslide) => {
          return (
            <Link
              to={`/comprar/${produtosslide.categoria}`}
              style={{ boxShadow: "inset 2px 2px 10px black" }}
            >
              <div key={produtosslide.id}>
                <img
                  src={produtosslide.thumb}
                  style={{ width: "250px", height: "250px" }}
                />

                <section>
                  <h3>
                    {" "}
                    {Number.parseFloat(produtosslide.valor).toLocaleString(
                      "pt-BR",
                      {
                        style: "currency",
                        currency: "BRL",
                      }
                    )}
                  </h3>
                  <p
                    style={{
                      width: "200px",
                      display: "inline",
                      fontSize: "1.4rem",
                    }}
                  >
                    {produtosslide.name}
                  </p>
                  <Link to={`/produto/${produtosslide.id}`}>Comprar</Link>
                </section>
              </div>
            </Link>
          );
        })}
      </Carousel>
    </inside>
  );
}

export default Carroseul;
