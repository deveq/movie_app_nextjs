import { useEffect, useState } from 'react';
import MovieItem from '../components/MovieItem';
import Seo from './Seo';
import styles from './index.module.css';
import { useRouter } from 'next/router';

const Home = () => {
  const [movies, setMovies] = useState();
  useEffect(() => {
    const url = `/api/movies`;
    (async () => {
      const response = await fetch(url);
      const { results } = await response.json();
      setMovies(results);
    })();
  }, []);
  return (
    <div className={styles.container}>
      <Seo title="Home" />
      {!movies && <h4>Loading...</h4>}
      <div className={styles.movieList}>
        {movies?.map(movie => (
          <MovieItem
            key={movie.id}
            id={movie.id}
            originalTitle={movie.original_title}
            posterPath={movie.poster_path}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;

// export async function getServerSideProps() {
//   // client에서 작동하는게 아닌, server side에서 작동하는 함수
//   // 만약 next.config.js의 rewrite로 api_key를 숨기지 않을 경우
//   // 여기에서 movie db를 통해 데이터를 받아오게끔 할 수 있음
//   // (이 코드는 server side실행이므로 client는 코드를 볼 수 없으므로)
//   const API_KEY = process.env.API_KEY;

//   // url을 /api/movies로 바꿨지만, 해당 url이 정상적으로 동작할 수 있는 환경은 front뿐이므로
//   // absolute url을 입력해준다
//   const response = await fetch(
//     `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`,
//   );
//   const { results } = await response.json();
//   console.log(results);
//   return {
//     props: {
//       movies: results,
//     },
//   };
// }
