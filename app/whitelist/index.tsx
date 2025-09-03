'use client';
import {useFetchLeaderboard, useFetchWhitelistSpots} from '@/api/hooks/whitelist';
import styles from './page.module.css';
import Image from 'next/image';
import {WhitelistSpot} from '@/types/types';
import Table from '@/components/table/table';
import {useState} from 'react';
import Link from 'next/link';

export default function Whitelist() {
  const {data: spots} = useFetchWhitelistSpots();
  const {data: leaders} = useFetchLeaderboard();

  const [searchText, setSearchText] = useState('');

  return (
    <div className={styles.whitelist_con}>
      <main>
        <div className={styles.hero}>
          <div className={styles.panel_img}></div>
          <div className={styles.hero_content}>
            <h1 className={styles.hero_title}>WHITELIST</h1>
            <ul className={styles.hero_list}>
              <li>
                500 spots are available via our{' '}
                <a href="#leaderboard" className={styles.partner_link}>
                  leaderboard
                </a>
                .{' '}
              </li>
              <li>
                1,500 spots are allocated to{' '}
                <a href="#partner-communities" className={styles.partner_link}>
                  partner communities
                </a>
                .
              </li>
            </ul>
            <Link href={'/whitelist-reg'}>
              <button className={styles.cta}>
                <span className={styles.cta_text}>Register for whitelist</span>
              </button>
            </Link>
          </div>
        </div>
        <div id="leaderboard" className={styles.info_section}>
          <div className={styles.leaderboard}>
            <h2 className={styles.section_title}>Leaderboard</h2>
            <input
              type="text"
              placeholder="Search username"
              value={searchText}
              onChange={e => setSearchText(e.target.value)}
              className={styles.search_bar}
            />
            <Table
              header={[{name: 'Rank'}, {name: 'Username'}, {name: 'Points'}]}
              body={leaders?.filter((leader: Record<string, string>) => leader.username.includes(searchText))?.slice(0, 7) ?? []}
              style={{margin: '0 auto', height: 'fit-content'}}
              className={styles.leaderboard_table}
            />
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
                {/* <li>Meta/Instagram</li> */}
              </ul>
              <li>10 pts for following each of our social media:</li>
              <ul>
                <li>
                  Follow our{' '}
                  <a href="https://x.com/Kyzzen_io" target="_blank" rel="noopener noreferrer" className={styles.link_action}>
                    Twitter
                  </a>
                </li>
                <li>
                  Follow OhMeOhMy_Sol on{' '}
                  <a href="https://x.com/OhMeOhMy_Sol" target="_blank" rel="noopener noreferrer" className={styles.link_action}>
                    Twitter
                  </a>
                </li>
                <li>
                  Join our{' '}
                  <a href="https://discord.gg/kyzzen" target="_blank" rel="noopener noreferrer" className={styles.link_action}>
                    Discord Server
                  </a>
                </li>
                <li>
                  Activate our{' '}
                  <a href="https://t.me/kyzzen_bot" target="_blank" rel="noopener noreferrer" className={styles.link_action}>
                    Telegram Bot
                  </a>
                </li>
                <li>
                  Subscribe to{' '}
                  <a
                    href="https://solana-pulse.ghost.io/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.link_action}
                  >
                    Solana Pulse
                  </a>
                </li>
              </ul>
              <li>10 pts for each referral that is registered for our WL</li>
              <li>
                3 pts for each{' '}
                <a
                  href="https://www.kyzzen.io/academy?category=featured&sub=featured"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.link_action}
                >
                  Kyzzen Academy
                </a>{' '}
                course completed
              </li>
              <li>1 pt / 1 SOL / day staked with Kyzzen Validator</li>
              <li>1 pt for daily login to Kyzzen Profile</li>
            </ul>
          </div>
        </div>
        <div id="partner-communities" className={styles.network_section}>
          <div className={styles.network}>
            <h2 className={styles.network_title}>Whitelist Communities</h2>

            <div className={styles.grid_section}>
              {spots?.map((spot: WhitelistSpot, index: number) => (
                <div key={index} className={styles.member_card}>
                  {spot.image ? (
                    <Image className={styles.avatar} src={spot.image} alt="girl" width={65} height={65} priority />
                  ) : (
                    <div className={styles.avatar_placeholder}></div>
                  )}
                  <div className={styles.member_details}>
                    <h3 className={styles.member_name}>{spot.collectionName}</h3>
                    <p className={styles.member_role}>{spot.numberOfSpots} spots</p>
                  </div>
                </div>
              ))}
            </div>
            <br />
            <br />
            <br />
          </div>
        </div>
      </main>
    </div>
  );
}
