import { useRouter } from 'next/router';
import Seo from '../Seo';

export default function MovieDetail({ params }) {
  const router = useRouter();

  // 서버사이드에서 pre-render할때는 아래의 데이터가 없는 상태이므로 데이터가 없는상태이다.
  // 이를 해결하기 위해(SEO도 챙기고) getserverSideProps에 ctx.params로 넣어줄 수 있다.
  const [title, id] = params || [];

  return (
    <div>
      <Seo title={title} />
      <h4>{title || 'Loading...'}</h4>
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
