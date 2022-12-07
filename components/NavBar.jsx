import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from './NavBar.module.css';

export default function NavBar() {
  const router = useRouter();
  return (
    <nav className={styles.nav}>
      {/* 이미지를 public폴더에 넣고, root를 public폴더로 잡고 사용 */}
      <img className={styles.img} src="/vercel.svg" alt="logo" />
      <div className={styles.nav_list}>
        <Link href="/">
          <span className={styles.link}>Home</span>
        </Link>
        <Link href="/about">
          <span className={styles.link}>About</span>
        </Link>
      </div>
    </nav>
  );
}
