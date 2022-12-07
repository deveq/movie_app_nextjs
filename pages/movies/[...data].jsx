import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Seo from '../Seo';
import { BASE_IMAGE_URL } from '../../components/MovieItem';
import styles from './data.module.css';

export default function MovieDetail({ params }) {
  const [movie, setMovie] = useState();

  // 서버사이드에서 pre-render할때는 아래의 데이터가 없는 상태이므로 데이터가 없는상태이다.
  // 이를 해결하기 위해(SEO도 챙기고) getserverSideProps에 ctx.params로 넣어줄 수 있다.
  const [title, id] = params || [];
  useEffect(() => {
    (async () => {
      const response = await fetch(`/api/movies/${id}`);
      const result = await response.json();
      setMovie(result);
    })();
  }, [id]);

  return (
    <div>
      <Seo title={title} />
      {movie && (
        <div className={styles.container}>
          <img
            className={styles.img}
            src={`${BASE_IMAGE_URL}${movie.poster_path}`}
            alt="poster"
          />
          <h4 className={styles.title}>{title || 'Loading...'}</h4>
          <p className={styles.content}>{movie.overview}</p>
        </div>
      )}
    </div>
  );
}

export function getServerSideProps(ctx) {
  // console.log(ctx);
  const { data } = ctx.params;
  return {
    props: {
      params: data,
    },
  };
}
