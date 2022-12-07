# NextJS Introduction

## redirect와 rewrite

특정 url로 요청을 보내거나 접속할 경우, 다른 url로 보낼 수 있음

1. redirect source로 지정해놓은 url로 들어왔을 때 destination으로 다시 보낼 수 있고 permanent에 따라 code가 달라짐(300번대 코드)

```js
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/old-blog/:path*',
        destination: '/new-sexy-blog/:path*',
        permanent: false,
      },
      {
        source: '/basic/:path',
        destination: '/premium/:path',
        permanent: false,
      },
    ];
  },
};
```

2. rewrite redirect와 비슷하지만 유저는 변경된 url을 볼 수 없음  
   개발자모드를 열어도 /api/movies로만 요청하고 결과값을 받은것으로 나타남

```js
const API_KEY = process.env.API_KEY;
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/movies',
        destination: `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`,
        permanent: false,
      },
    ];
  },
};
```

## getServerSideProps

페이지는 서버사이드에서 pre rendering되어 html로 전송되는데,  
pre-render가 될 때 어떤 props를 넘겨줄 지 미리 만들어서 줄 수 있다.  
서버사이드에서 작동하는 함수이기때문에 api호출을 하는 경우라면 상대경로는 사용할 수 없다.  
단, getServerSideProps가 늦어질 경우 유저는 아무것도 못본다는 단점이 있다.

```js
export async function getServerSideProps() {
  const API_KEY = process.env.API_KEY;
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`,
  );
  const { results } = await response.json();
  console.log(results);
  return {
    props: {
      movies: results,
    },
  };
}
```

## navigation - router

react navigation과 비슷하게 router를 사용할 수 있다.

```js
const router = useRouter();

// 1. 단순히 이동
router.push('/movies/123');

// 2. qs를 함께 넣기
router.push({
  pathname: '/movies/123',
  query: {
    title: 'potato',
  },
});

// 3. qs 숨기기
router.push(
  {
    pathname: `/movies/${id}`,
    query: {
      title: 'potato',
    },
  },
  `/movies/${id}`,
);

// Link 컴포넌트도 동일하게 가능
<Link
  href={{
    pathname: `/movies/${id}`,
    query: {
      title,
    },
  }}
  as={`/movies/${id}`}
></Link>;
```

1. push, replace 등으로 페이지 이동가능
2. 문자열 대신 객체로 넣어 qs를 넣을 수 있음
3. 2번째 파라미터로 as를 넣어 url 마스킹 가능
