const BASE_IMAGE_URL = 'https://image.tmdb.org/t/p/w500/';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from './MovieItem.module.css';

export default function MovieItem({ id, posterPath, originalTitle }) {
  const router = useRouter();
  const onClick = () => {
    router.push(`/movies/${originalTitle}/${id}`);
  };
  return (
    <div className={styles.container} onClick={onClick} title={originalTitle}>
      <img
        className={styles.img}
        src={`${BASE_IMAGE_URL}${posterPath}`}
        alt=""
      />
      <h4 className={styles.title}>{originalTitle}</h4>
    </div>
  );
}
