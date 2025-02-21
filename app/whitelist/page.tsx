'use client';
import {useFetchWhitelistSpots} from '@/api/hooks/whitelist';
import styles from './page.module.css';
import Image from 'next/image';
import {WhitelistSpot} from '@/types/types';

export default function Whitelist() {
  const {data: spots} = useFetchWhitelistSpots();
  const leaderboardData = [
    {rank: 1, username: 'TheAnimeSoL', points: 20420},
    {rank: 2, username: 'OKAY BEARS ZOMBIE', points: 18900},
    {rank: 3, username: 'The Sports Club - MVP', points: 18230},
    {rank: 4, username: 'EyePhucked Kitty', points: 17420},
    {rank: 5, username: 'Stranger Fins', points: 14200},
    {rank: 6, username: 'Glorious Lions', points: 12320},
    {rank: 7, username: 'Stranger Fins', points: 10870},
    {rank: 8, username: 'Glorious Lions', points: 8390},
    {rank: 9, username: 'Stranger Fins', points: 2390},
    {rank: 10, username: 'EyePhucked Kitty', points: 800},
  ];
  return (
    <div className={styles.whitelist_con}>
      <main>
        <div className={styles.hero}>
          <div className={styles.panel_img}></div>
          <div className={styles.hero_content}>
            <h1 className={styles.hero_title}>WHITELIST</h1>
            <ul className={styles.hero_list}>
              <li>500 spots are available via our Leaderboard.</li>
              <li>
                1,500 spots are allocated to <a className={styles.partner_link}>50 partner communities</a>.
              </li>
            </ul>
            <button className={styles.cta}>
              <span className={styles.cta_text}>View more details</span>
            </button>
          </div>
        </div>
        <section className={styles.info_section}>
          <div className={styles.leaderboard}>
            <h2 className={styles.section_title}>Leaderboard</h2>
            <input type="text" placeholder="Search username" className={styles.search_bar} />
            <table className={styles.leaderboard_table}>
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Username</th>
                  <th>Points</th>
                </tr>
              </thead>
              <tbody>
                {leaderboardData.map(item => (
                  <tr key={item.rank}>
                    <td>{item.rank}</td>
                    <td>
                      <Image src="/images/founder.png" alt="girl" width={40} height={40} priority />
                      {item.username}
                    </td>
                    <td>{item.points}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className={styles.point_system}>
            <h2 className={styles.section_title}>Point System</h2>
            <ul className={styles.point_list}>
              <li>10 pts for linking each social media:</li>
              <ul>
                <li>Google/YouTube</li>
                <li>Twitter/X</li>
                <li>Discord</li>
                <li>Telegram</li>
                <li>Meta/Instagram</li>
              </ul>
              <li>10 pts for following each of our social media:</li>
              <ul>
                <li>Follow our Twitter</li>
                <li>Join our Discord Server</li>
                <li>Activate our Telegram Bot</li>
                <li>Subscribe to Kyzen Newsletter</li>
                <li>Follow our YouTube</li>
                <li>Follow our Instagram</li>
              </ul>
              <li>1 pt for each Kyzen Academy course completed.</li>
              <li>5 pts for each referral (must connect at least 1 social).</li>
            </ul>
          </div>
        </section>
        <section className={styles.network_section}>
          <div className={styles.network}>
            <h2 className={styles.network_title}>Whitelist Communities</h2>

            <div className={styles.grid_section}>
              {spots?.map((spot: WhitelistSpot, index: number) => (
                <div key={index} className={styles.member_card}>
                  {spot.thumbnail ? (
                    <Image className={styles.avatar} src="/images/founder.png" alt="girl" width={65} height={65} priority />
                  ) : (
                    <div className={styles.avatar_placeholder}></div>
                  )}
                  <div className={styles.member_details}>
                    <h3 className={styles.member_name}>{spot.name}</h3>
                    <p className={styles.member_role}>{spot.amount} spots</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
