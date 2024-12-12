import styles from './Category.module.css';

function Categoria({ needSomeCategory, children, navegation }) {
  return (
    <section className={styles.Categories}>
      <h1>
        <span>
          <p>{needSomeCategory}</p>
        </span>
        <nav>{navegation}</nav>
      </h1>
      <div>{children}</div>
    </section>
    // Essa Section em que pega todo agrupamento de uma Categoria X, contendo os cards juntamente com o titulo h1 com o nome da categoria definida, "Need_AlgumaCategoria" sera o valor que é pego na pagina "Buy", esse valor é o nome da Categoria que é definida pelo map feito em uma Const contendo um Array com todas Categorias (Essa const esta nesse codigo)
  );
}
export default Categoria;
