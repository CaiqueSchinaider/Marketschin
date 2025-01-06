import Loading from '../Loading';
import styles from './Category.module.css';

function Categoria({ needSomeCategory, children, navigation }) {
  return (
    <section className={styles.Categories}>
      <span className={styles.TitleCategory}>
        <p>{`${needSomeCategory}`} </p>
      </span>
      <nav className={styles.Navigation}>{navigation}</nav>

      <div className={styles.ChildrenContainer}>{children}</div>
    </section>
  );
  // Essa Section em que pega todo agrupamento de uma Categoria X, contendo os cards juntamente com o titulo h1 com o nome da categoria definida, "Need_AlgumaCategoria" sera o valor que é pego na pagina "Buy", esse valor é o nome da Categoria que é definida pelo map feito em uma Const contendo um Array com todas Categorias (Essa const esta nesse codigo)
}
export default Categoria;
