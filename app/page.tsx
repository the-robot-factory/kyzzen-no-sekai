'use client';
import Image from 'next/image';
import styles from './page.module.css';
import EndlessImageScroll from '../components/endless-scroll';
import Carousel from '../components/carousel';
import { CAROUSEL_SLIDES, SCROLL_IMAGES } from '@/constants/data';
import { anton, openSans } from '@/constants/fonts';

function Home() {
  return (
    <main className={styles.main}>
      <HeroSection />
      <CollisionSection />
      <AboutSection />
      <FounderSection />
      <ExperimentSection />
      {/* <NetworkSection /> */}
      <UtilitySection />
      <JoinUsSection />
    </main>
  );
}

function HeroSection() {
  return (
    <section className={styles.hero}>
      <div className={styles.hero_content}>
        <div className={styles.hero_title}>
          <div>
            <Image
              src="/images/logo.png"
              alt="No Sekai Logo"
              width={550}
              height={130}
              priority
              className={styles.hero_title_logo}
            />
            <h1>NO SEKAI</h1>
          </div>
        </div>
        <div className={styles.hero_people}>
          <EndlessImageScroll images={HERO_IMAGES} />
        </div>
      </div>
    </section>
  );
}

function CollisionSection() {
  return (
    <section className={`${styles.panel} ${styles.vs}`}>
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
        <div className={styles.art_girlcon}>
          <Image src="/images/girl.png" alt="Human artist" width={350} height={400} priority className={styles.art_girl} />
        </div>
        <div className={`${styles.art_vs} ${anton.className}`}>VS</div>
        <div className={styles.art_robotcon}>
          <Image src="/images/robot.png" alt="AI robot" width={350} height={400} priority className={styles.art_robot} />
        </div>
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section className={`${styles.panel} ${styles.reverse}`}>
      <div className={styles.about}>
        <div className={styles.panel_text}>
          <Image src="/images/logo.png" alt="No Sekai Logo" width={320} height={90} priority className={styles.about_logo} />
          <p className={styles.about_text}>
            The Ultimate <br />
            Onboarding & <br />
            Discovery Platform
            <br />
            On Solana
          </p>
        </div>
      </div>
      <div className={`${styles.art} ${styles.about}`}>
        <Image
          src="/images/kyzzen.png"
          alt="Kyzzen platform preview"
          width={700}
          height={450}
          priority
          className={styles.art_kyzzen}
        />
      </div>
    </section>
  );
}

function FounderSection() {
  return (
    <section className={`${styles.panel} ${styles.founder}`}>
      <div>
        <div className={styles.panel_text}>
          <h2>Led By</h2>
          <p className={openSans.className}>one of Solana&apos;s earliest OGs</p>
        </div>
        <div className={styles.founder_con}>
          <div className={styles.founder_img} />
          <div className={styles.founder_text}>
            <div>
              <div className={styles.founder_detail}>
                <Image src="/images/founder.svg" alt="OhMeOhMy profile" width={50} height={50} priority />
                <h2>OhMeOhMy</h2>
                <a href="https://x.com/OhMeOhMy_Sol" target="_blank" rel="noopener noreferrer" aria-label="Follow OhMeOhMy on X">
                  <Image src="/svg/xwhite.svg" alt="X (Twitter)" width={32} height={34} priority className={styles.x} />
                </a>
              </div>
              <ul>
                <li>Kyzzen, Founder</li>
                <li>MonkeDAO, Singapore Ambassador</li>
                <li>Solarians RoboDAO, Council Advisor</li>
                <li>Superteam, Singapore Member</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ExperimentSection() {
  return (
    <section className={styles.single + ' ' + styles.experiment_con}>
      <div className={styles.experiment}>
        <div className={styles.panel_text}>
          <h2>Is about to launch the biggest AI art experiment</h2>
        </div>
        <EndlessImageScroll images={SCROLL_IMAGES} />
        <div className={styles.panel_text}>
          <h2 className={styles.exp2}>to push the limits of generative art and creativity itself</h2>
        </div>
        <EndlessImageScroll images={SCROLL_IMAGES} direction="left" />
      </div>
    </section>
  );
}

function UtilitySection() {
  const slides = CAROUSEL_SLIDES.map((slide, index) => <CarouselSlide key={`slide-${index}`} {...slide} />);

  return (
    <section className={`${styles.slides} ${styles.panel}`}>
      <div>
        <div className={styles.panel_text}>
          <h2>WITH UNPRECEDENTED UTILITY FOCUSED ON ALPHA, ANALYTICS AND TOOLS</h2>
        </div>
        <div>
          <Carousel>{slides}</Carousel>
        </div>
      </div>
    </section>
  );
}

function CarouselSlide({image, title, description}: {image: string; title: string; description: string}) {
  return (
    <div className={styles.slide}>
      <Image src={image} alt={title} width={450} height={400} priority />
      <div>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
    </div>
  );
}

function JoinUsSection() {
  const details = [
    {icon: '/images/Featured icon.png', label: 'Date', value: 'TBD'},
    {icon: '/images/Featured icon (1).png', label: 'Supply', value: '5,000'},
    {icon: '/images/Featured icon (2).png', label: 'Price', value: 'TBD'},
  ];

  return (
    <section className={`${styles.join_us} ${styles.panel}`}>
      <div className={styles.join_us_text}>
        <h1 className={styles.title}>JOIN US</h1>
        <p className={styles.subtitle}>As we embark on this groundbreaking experiment to redefine the NFT space forever.</p>
        <div className={styles.details}>
          {details.map(detail => (
            <div key={detail.label} className={styles.detail}>
              <div className={styles.icon}>
                <Image src={detail.icon} alt={detail.label} width={55} height={55} priority />
              </div>
              <h3 className={styles.label}>{detail.label}</h3>
              <p className={styles.value}>{detail.value}</p>
            </div>
          ))}
        </div>
        <button className={styles.cta}>
          <span className={styles.cta_text}>View more details</span>
        </button>
      </div>
    </section>
  );
}

export default Home;


 const HERO_IMAGES = [
  {url: '/images/Artboard 2.png', width: 310, height: 430, className: styles.hero_people_big},
  {url: '/images/Artboard 14.png', width: 170, height: 250, className: styles.hero_people_small},
  {url: '/images/Artboard 13.png', width: 310, height: 430, className: styles.hero_people_big},
  {url: '/images/Artboard 12.png', width: 170, height: 250, className: styles.hero_people_small},
  {url: '/images/Artboard 3.png', width: 310, height: 430, className: styles.hero_people_big},
  {url: '/images/Artboard 17.png', width: 170, height: 250, className: styles.hero_people_small},
  {url: '/images/Artboard 21.png', width: 310, height: 430, className: styles.hero_people_big},
  {url: '/images/Artboard 8.png', width: 170, height: 250, className: styles.hero_people_small},
  {url: '/images/Artboard 7.png', width: 310, height: 430, className: styles.hero_people_big},
  {url: '/images/Artboard 22.png', width: 170, height: 250, className: styles.hero_people_small},
  {url: '/images/Artboard 20.png', width: 310, height: 430, className: styles.hero_people_big},
  {url: '/images/Artboard 10.png', width: 170, height: 250, className: styles.hero_people_small},
  {url: '/images/Artboard 2.png', width: 310, height: 430, className: styles.hero_people_big},
  {url: '/images/Artboard 15.png', width: 170, height: 250, className: styles.hero_people_small},
  {url: '/images/Artboard 19.png', width: 310, height: 430, className: styles.hero_people_big},
  {url: '/images/Artboard 6.png', width: 170, height: 250, className: styles.hero_people_small},
  {url: '/images/Artboard 9.png', width: 310, height: 430, className: styles.hero_people_big},
  {url: '/images/Artboard 16.png', width: 170, height: 250, className: styles.hero_people_small},
  {url: '/images/Artboard 23.png', width: 310, height: 430, className: styles.hero_people_big},
  {url: '/images/Artboard 4.png', width: 170, height: 250, className: styles.hero_people_small},
  {url: '/images/Artboard 11.png', width: 310, height: 430, className: styles.hero_people_big},
  {url: '/images/Artboard 18.png', width: 170, height: 250, className: styles.hero_people_small},
];


// function NetworkSection() {
//   return (
//     <section className={`${styles.panel} ${styles.network}`}>
//       <div className={styles.panel_text}>
//         <p className={openSans.className}>And supported by the</p>
//         <h2>KYZZEN NETWORK</h2>
//       </div>
//       <div className={styles.network}>
//         <div className={styles.grid_section}>
//           {NETWORK_MEMBERS.map((member, index) => (
//             <NetworkMemberCard key={member.name} member={member} index={index} />
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

// function NetworkMemberCard({ member, index }) {
//   return (
//     <div className={styles.member_card}>
//       <Image
//         className={styles.avatar}
//         src={`/images/image 75${index % 3}.png`}
//         alt={`${member.name} avatar`}
//         width={75}
//         height={75}
//         priority
//       />
//       <div className={styles.member_details}>
//         <h3 className={styles.member_name}>{member.name}</h3>
//         <p className={styles.member_role}>{member.role}</p>
//       </div>
//     </div>
//   );
// }