import {Anton} from 'next/font/google';
import styles from './page.module.css';
import Image from 'next/image';
import EndlessImageScroll from './components/endless-scroll';

const anton = Anton({
  subsets: ['latin'],
  weight: '400',
});

const networkMembers = [
  {name: 'JemmyJemm', role: 'MonkeDAO Co-Founder', avatar: ' '},
  {name: 'CryptoApe', role: 'MultiChain Advisors, Founder', avatar: ' '},
  {name: 'PapiChuloGrim', role: 'MultiChain Advisors CMO', avatar: ' '},
  {name: 'Zeneca', role: 'Zen Academy Founder', avatar: ' '},
  {name: 'Genuine Articles', role: 'GeckoDAO Founder', avatar: ' '},
  {name: 'Voshy', role: 'GREED Academy Founder', avatar: ' '},
  {name: 'unjustmouse', role: 'GREED Academy Head of Education', avatar: ' '},
  {name: 'Turnt Up Dylan', role: 'Dead King Society Founder', avatar: ' '},
  {name: 'draxx.ts.sol', role: 'Famous Fox Federation Co-Founder', avatar: ' '},
  {name: 'HoTsAuCe', role: 'NFT Radar Community Manager', avatar: ' '},
  {name: 'Nom', role: 'Bonk Co-Founder', avatar: ' '},
  {name: 'Kais', role: 'Okay Bears Founder', avatar: ' '},
  {name: 'Easy', role: 'BoDoggos Founder', avatar: ' '},
  {name: 'Solarians', role: 'RoboDAO Council Member', avatar: ' '},
  {name: 'NFP', role: 'Pesky Penguins Co-Founder', avatar: ' '},
  {name: 'Solana Sensei', role: 'Sensei / Namaste Founder', avatar: ' '},
  {name: 'Timon', role: 'Meerkat Millionaires Founder', avatar: ' '},
  {name: 'DogeFather', role: 'Doge Capital Founder', avatar: ' '},
  {name: 'DJ Trix', role: 'Fearless Bulls Club Founder', avatar: ' '},
  {name: 'SOK', role: 'Raposa Founder', avatar: ' '},
];
const images = [
  {url: '/images/image 749.png'},
  {url: '/images/image 750.png'},
  {url: '/images/image 751.png'},
  {url: '/images/image 752.png'},
  {url: '/images/image 749.png'},
  {url: '/images/image 750.png'},
  {url: '/images/image 751.png'},
  {url: '/images/image 752.png'},
  {url: '/images/image 749.png'},
  {url: '/images/image 750.png'},
  {url: '/images/image 751.png'},
  {url: '/images/image 752.png'},
];
const imagesHero = [
  {url: '/images/Layer 3.png', width: 250, height: 350, className: styles.hero_people_big},
  {url: '/images/Layer 4.png', width: 170, height: 250, className: styles.hero_people_small},
  {url: '/images/Layer 1.png', width: 250, height: 350, className: styles.hero_people_big},
  {url: '/images/Layer 2.png', width: 170, height: 250, className: styles.hero_people_small},
  {url: '/images/Layer 5.png', width: 310, height: 430, className: styles.hero_people_big},
  {url: '/images/Layer 3.png', width: 170, height: 250, className: styles.hero_people_small},
  {url: '/images/Layer 6.png', width: 250, height: 350, className: styles.hero_people_big},
  {url: '/images/Layer 1.png', width: 170, height: 250, className: styles.hero_people_small},
  {url: '/images/Layer 4.png', width: 250, height: 350, className: styles.hero_people_big},
  {url: '/images/Layer 5.png', width: 170, height: 250, className: styles.hero_people_small},
  {url: '/images/Layer 3.png', width: 250, height: 350, className: styles.hero_people_big},
  {url: '/images/Layer 4.png', width: 170, height: 250, className: styles.hero_people_small},
  {url: '/images/Layer 1.png', width: 250, height: 350, className: styles.hero_people_big},
  {url: '/images/Layer 2.png', width: 170, height: 250, className: styles.hero_people_small},
];
export default function Home() {
  return (
    <div>
      <main>
        <div className={styles.hero}>
          <h1 className={styles.hero_title}>
            <span>KYZZEN</span>
            <br />
            NO SEKAI
          </h1>
          <div className={styles.hero_people}>
            <EndlessImageScroll images={imagesHero} />
          </div>
        </div>
        <div className={styles.panel}>
          <div className={styles.panel_img}>
            <Image src="/images/body-1.png" alt="X" width={6096} height={3738} priority color="white" className={styles.bg} />
          </div>
          <div className={styles.about}>
            <div className={styles.panel_text}>
              <h2>
                <span>AT A TIME WHERE</span>
                <span>AI AND ART</span>
                <span>COLLIDE</span>
              </h2>
            </div>
          </div>
          <div className={styles.art}>
            <div>
              <Image src="/images/girl-card.png" alt="avatar" width={400} height={500} priority className={styles.art_girl} />
            </div>
            <div className={styles.art_vs + ' ' + anton.className}>VS</div>
            <div>
              <Image src="/images/robot-card.png" alt="avatar" width={400} height={500} priority className={styles.art_robot} />
            </div>
          </div>
        </div>
        <div className={styles.panel + ' ' + styles.reverse}>
          <div className={styles.about}>
            <div className={styles.panel_text}>
              <p>
                Solana’s largest <br />
                NFT data, analytics & <br />
                EDUCATIONAL platform
              </p>
              <Image
                src="/images/vector.png"
                alt="avatar"
                width={300}
                height={70}
                priority
                className={styles.hero_people_small}
              />
            </div>
          </div>
          <div className={styles.art}>
            <Image src="/images/kyzzen.png" alt="avatar" width={700} height={450} priority className={styles.art_kyzzen} />
          </div>
        </div>

        <div className={styles.panel + ' ' + styles.single}>
          <div className={styles.experiment}>
            <div className={styles.panel_text}>
              <h2>Is about to launch the biggest AI art experiment</h2>
            </div>

            <EndlessImageScroll images={images} />
            <div className={styles.panel_text}>
              <h2>to push the limits of generative art and creativity itself</h2>
            </div>
            <EndlessImageScroll images={images} direction="left" />
          </div>
        </div>

        <div className={styles.panel + ' ' + styles.founder}>
          <div className={styles.founder_text}>
            <div className={styles.founder_detail}>
              <Image className={styles.hero_girl} src="/images/founder.png" alt="girl" width={60} height={60} priority />
              <div>
                <b>OhMeOhMy</b> <br />
                <Image src="/svg/xwhite.svg" alt="X" width={25} height={25} priority color="white" />
              </div>
            </div>
            <ul>
              <li>Kyzzen, Founder & CEO</li>
              <li>MonkeDAO, Singapore Ambassador</li>
              <li>Solarians RoboDAO, Council Advisor</li>
              <li>Superteam, Singapore Member</li>
            </ul>
          </div>
          <div className={styles.founder_img}>
            <Image src="/images/body-3.png" alt="avatar" width={400} height={450} priority />
          </div>
        </div>

        <div className={styles.panel + ' ' + styles.single}>
          <div className={styles.network}>
            <div className={styles.grid_section}>
              {networkMembers.map((member, index) => (
                <div key={index} className={styles.member_card}>
                  {member.avatar ? (
                    <Image className={styles.avatar} src="/images/founder.png" alt="girl" width={60} height={60} priority />
                  ) : (
                    <div className={styles.avatar_placeholder}></div>
                  )}
                  <div className={styles.member_details}>
                    <h3 className={styles.member_name}>{member.name}</h3>
                    <p className={styles.member_role}>{member.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* <div className={styles.launch}>
          <div className={styles.panel_img}>
            <Image src="/images/body-5.png" alt="X" width={500} height={500} priority color="white" className={styles.bg} />
          </div>
          <div className={styles.panel_text}>
            <h2>Launch Details</h2>
            <ul>
              <li>
                <b>Date</b>&nbsp; TBD
              </li>
              <li>
                <b>Supply</b>&nbsp; 5,000
              </li>
              <li>
                <b>Price</b>&nbsp; TBD
              </li>
            </ul>
            <button>Learn More</button>
          </div>
        </div> */}
      </main>
    </div>
  );
}
