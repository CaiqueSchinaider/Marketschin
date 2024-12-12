import styles from './Banner.module.css';

function Banner({ page }) {
  return (
    <div className={styles.Banner}>
      <h2>{page}</h2>
    </div>
  );
}

export default Banner;
