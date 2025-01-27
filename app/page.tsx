import {Anton, Open_Sans} from 'next/font/google';
import styles from './page.module.css';
import Image from 'next/image';
import EndlessImageScroll from '../components/endless-scroll';
import CustomCarousel from '../components/carousel';

const anton = Anton({
  subsets: ['latin'],
  weight: '400',
});
const sans = Open_Sans({
  subsets: ['latin'],
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
          <div className={styles.hero_content}>
            <div className={styles.hero_title}>
              <div>
                <Image src="/images/logo.png" alt="avatar" width={550} height={130} priority className={styles.hero_title_logo} />
                <h1>NO SEKAI</h1>
              </div>
            </div>

            <div className={styles.hero_people}>
              <EndlessImageScroll images={imagesHero} />
            </div>
          </div>
        </div>
        <div className={styles.panel + ' ' + styles.vs}>
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
              <Image src="/images/girl-card.png" alt="avatar" width={380} height={480} priority className={styles.art_girl} />
            </div>
            <div className={styles.art_vs + ' ' + anton.className}>VS</div>
            <div>
              <Image src="/images/robot-card.png" alt="avatar" width={380} height={480} priority className={styles.art_robot} />
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
              <Image src="/images/logo.png" alt="avatar" width={320} height={90} priority className={styles.about_logo} />
            </div>
          </div>
          <div className={styles.art}>
            <Image src="/images/kyzzen.png" alt="avatar" width={700} height={450} priority className={styles.art_kyzzen} />
          </div>
        </div>

        <div className={styles.single}>
          <div className={styles.experiment}>
            <div className={styles.panel_text}>
              <h2>Is about to launch the biggest AI art experiment</h2>
            </div>

            <EndlessImageScroll images={images} />
            <div className={styles.panel_text}>
              <h2 className={styles.exp2}>to push the limits of generative art and creativity itself</h2>
            </div>
            <EndlessImageScroll images={images} direction="left" />
          </div>
        </div>
        <div className={styles.panel + ' ' + styles.founder}>
          <div>
            <div className={styles.panel_text}>
              <h2>Led By</h2>
              <p className={sans.className}>one of Solana’s earliest OGs</p>
            </div>
            <div className={styles.founder}>
              <div className={styles.founder_img}>
                {/* <Image src="/images/body-3.png" alt="avatar" width={400} height={450} priority /> */}
              </div>
              <div className={styles.founder_text}>
                <div>
                  <div className={styles.founder_detail}>
                    <Image src="/images/founder.png" alt="girl" width={60} height={60} priority />
                    <h2>OhMeOhMy</h2>
                    <Image src="/svg/xwhite.svg" alt="X" width={25} height={25} priority color="white" />
                  </div>
                  <ul>
                    <li>Kyzzen & CEO</li>
                    <li>MonkeDAO, Singapore Ambassador</li>
                    <li>Solarians RoboDAO, Council Advisor</li>
                    <li>Superteam, Singapore Member</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.panel + ' ' + styles.network}>
          <div className={styles.panel_text}>
            <p className={sans.className}>And supported by the</p>
            <h2>KYZZEN NETWORK</h2>
          </div>
          <div className={styles.network}>
            <div className={styles.grid_section}>
              {networkMembers.map((member, index) => (
                <div key={index} className={styles.member_card}>
                  {member.avatar ? (
                    <Image className={styles.avatar} src="/images/founder.png" alt="girl" width={75} height={75} priority />
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
        <div className={`${styles.slides} ${styles.panel}`}>
          <div>
            <div className={styles.panel_text}>
              <h2>With unprecedented utility focused on alpha, analytics and tools</h2>
            </div>
            <CustomCarousel slides={[<Slide key="slide1" />, <Slide2 key="slide2" />]} />
          </div>
        </div>
        <div className={`${styles.join_us} ${styles.panel}`}>
          <div className={styles.join_us_text}>
            <h1 className={styles.title}>JOIN US</h1>
            <p className={styles.subtxitle}>As we embark on this groundbreaking experiment to redefine the NFT space forever.</p>
            <div className={styles.details}>
              <div className={styles.detail}>
                <div className={`${styles.icon}`}>
                  <Image src="/images/Featured icon.png" alt="girl" width={55} height={55} priority />
                </div>
                <h3 className={styles.label}>Date</h3>
                <p className={styles.value}>TBD</p>
              </div>
              <div className={styles.detail}>
                <div className={`${styles.icon}`}>
                  <Image src="/images/Featured icon (1).png" alt="girl" width={55} height={55} priority />
                </div>
                <h3 className={styles.label}>Supply</h3>
                <p className={styles.value}>5,000</p>
              </div>
              <div className={styles.detail}>
                <div className={`${styles.icon}`}>
                  <Image src="/images/Featured icon (2).png" alt="girl" width={55} height={55} priority />
                </div>
                <h3 className={styles.label}>Price</h3>
                <p className={styles.value}>TBD</p>
              </div>
            </div>
            <button className={styles.cta}>
              <span className={styles.cta_text}>View more details</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

const Slide = () => {
  return (
    <div className={styles.slide}>
      <Image src="/images/stass.png" alt="avatar" width={450} height={400} priority />
      <div>
        <h2>AI Analytics Reports</h2>
        <p>Holders will enjoy access to our advanced, AI-generated analytical reports on NFT collections.</p>
      </div>
    </div>
  );
};

const Slide2 = () => {
  return (
    <div className={styles.slide}>
      <Image src="/images/body-2.png" alt="avatar" width={450} height={400} priority />
      <div>
        <h2>Alpha</h2>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing sit amet consectetur adipisicing.</p>
      </div>
    </div>
  );
};
