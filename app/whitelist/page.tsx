import styles from './page.module.css';
import Image from 'next/image';

export default function Whitelist() {

  const networkMembers = [
    { name: 'JemmyJemm', role: 'MonkeDAO Co-Founder', avatar: ' ' },
    { name: 'CryptoApe', role: 'MultiChain Advisors, Founder', avatar: ' ' },
    { name: 'PapiChuloGrim', role: 'MultiChain Advisors CMO', avatar: ' ' },
    { name: 'Zeneca', role: 'Zen Academy Founder', avatar: ' ' },
    { name: 'Genuine Articles', role: 'GeckoDAO Founder', avatar: ' ' },
    { name: 'Voshy', role: 'GREED Academy Founder', avatar: ' ' },
    { name: 'unjustmouse', role: 'GREED Academy Head of Education', avatar: ' ' },
    { name: 'Turnt Up Dylan', role: 'Dead King Society Founder', avatar: ' ' },
    { name: 'draxx.ts.sol', role: 'Famous Fox Federation Co-Founder', avatar: ' ' },
    { name: 'HoTsAuCe', role: 'NFT Radar Community Manager', avatar: ' ' },
    { name: 'Nom', role: 'Bonk Co-Founder', avatar: ' ' },
    { name: 'Kais', role: 'Okay Bears Founder', avatar: ' ' },
    { name: 'Easy', role: 'BoDoggos Founder', avatar: ' ' },
    { name: 'Solarians', role: 'RoboDAO Council Member', avatar: ' ' },
    { name: 'NFP', role: 'Pesky Penguins Co-Founder', avatar: ' ' },
    { name: 'Solana Sensei', role: 'Sensei / Namaste Founder', avatar: ' ' },
    { name: 'Timon', role: 'Meerkat Millionaires Founder', avatar: ' ' },
    { name: 'DogeFather', role: 'Doge Capital Founder', avatar: ' ' },
    { name: 'DJ Trix', role: 'Fearless Bulls Club Founder', avatar: ' ' },
    { name: 'SOK', role: 'Raposa Founder', avatar: ' ' },
  ];
  const leaderboardData = [
    { rank: 1, username: 'TheAnimeSoL', points: 20420 },
    { rank: 2, username: 'OKAY BEARS ZOMBIE', points: 18900 },
    { rank: 3, username: 'The Sports Club - MVP', points: 18230 },
    { rank: 4, username: 'EyePhucked Kitty', points: 17420 },
    { rank: 5, username: 'Stranger Fins', points: 14200 },
    { rank: 6, username: 'Glorious Lions', points: 12320 },
    { rank: 7, username: 'Stranger Fins', points: 10870 },
    { rank: 8, username: 'Glorious Lions', points: 8390 },
    { rank: 9, username: 'Stranger Fins', points: 2390 },
    { rank: 10, username: 'EyePhucked Kitty', points: 800 },
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
              {networkMembers.map((member, index) => (
                <div key={index} className={styles.member_card}>
                  {member.avatar ? (
                    <Image className={styles.avatar} src="/images/founder.png" alt="girl" width={65} height={65} priority />
                  ) : (
                    <div className={styles.avatar_placeholder}></div>
                  )}
                  <div className={styles.member_details}>
                    <h3 className={styles.member_name}>{member.name}</h3>
                    <p className={styles.member_role}>50 spots</p>
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
