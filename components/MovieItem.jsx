const BASE_IMAGE_URL = 'https://image.tmdb.org/t/p/w500/';
import styles from './MovieItem.module.css';

export default function MovieItem({ posterPath, originalTitle }) {
  return (
    <div className={styles.container}>
      <img
        className={styles.img}
        src={`${BASE_IMAGE_URL}${posterPath}`}
        alt=""
      />
      {/* <h4 className={styles.title}>{originalTitle}</h4> */}
    </div>
  );
}
