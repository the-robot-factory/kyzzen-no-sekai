import {Open_Sans} from 'next/font/google';
import Image from 'next/image';
import styles from './page.module.css';

const openSans = Open_Sans({
  subsets: ['latin'],
});

function Utility() {
  return (
    <main className={styles.main}>
      <section className={`${styles.heading} ${openSans.className}`}>
        <div className={styles.heading_text}>
          <h2>Utility</h2>
          <p>The most useful NFT for your Solana journey.</p>
        </div>
      </section>
      <section className={`${styles.panel}`}>
        <div className={styles.panel_img}>
          <Image src="/images/chats.svg" alt="chats" fill priority />
        </div>
        <div className={styles.panel_text}>
          <h2>unmatched alpha</h2>
          <p>Curated opportunities across the ecosystem, sent directly to you.</p>
        </div>
      </section>
      <section className={`${styles.panel} ${styles.reverse}`}>
        <div className={styles.panel_img}>
          <Image src="/images/alerts.svg" alt="chats" fill priority />
        </div>
        <div className={styles.panel_text}>
          <h2>Protect Your bags</h2>
          <p>Real-time alerts on events that pose risk to your portfolio</p>
        </div>
      </section>
      <section className={`${styles.panel} ${styles.single}`}>
        <div className={styles.panel_text}>
          <h2>track your portfolio</h2>
          <p>With the most advanced portfolio analytics</p>
        </div>
        <div className={styles.panel_img}>
          <Image src="/images/portfolio.svg" alt="chats" fill priority />
        </div>
      </section>
      <section className={`${styles.panel} ${styles.single} ${styles.last}`}>
        <div className={styles.panel_text}>
          <h2>Reach your full potential</h2>
          <p>Receive recommendations to improve your portfolio</p>
        </div>
        <div className={styles.panel_img}>
          <Image src="/images/potential.svg" alt="chats" fill priority />
        </div>
      </section>
    </main>
  );
}

export default Utility;
