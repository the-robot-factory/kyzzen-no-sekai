
import { Anton } from 'next/font/google';
import styles from './page.module.css';
import Image from "next/image";

const anton = Anton({
  subsets: ["latin"],
  weight: "400"
})

export default function Home() {
  return (
    <div>
      <main>

        <div className={styles.hero + " " + anton.className}>
          <Image
            className={styles.hero_girl}
            src="/images/hero-girl.png"
            alt="girl"
            width={373}
            height={590}
            priority
          />
          <h1><span>KYZZEN</span><br />NO SEKAI</h1>
          <Image
            className={styles.hero_boy}
            src="/images/hero-boy.png"
            alt="boy"
            width={482}
            height={660}
            priority
          />

        </div>
        <div className={styles.panel}>
          <div className={styles.about}>
            <div className={styles.panel_img}>
              <Image
                src="/images/body-1.png"
                alt="X"
                width={500}
                height={500}
                priority
                color='white'
                className={styles.bg}
              />
            </div>
            <div className={styles.panel_border}></div>
            <div className={styles.panel_text}>
              <h2 className={anton.className}>About</h2>
              <p>KNS is a collection of 5,000 digital avatars set in the “World of Kyzzen”, which is a fictional representation of the NFT space</p>
              <p>Kyzzen is the largest NFT data and educational platform on the Solana blockchain.</p>
            </div>
          </div>
          <div className={styles.art}>
            <div className={styles.panel_img}>
              <Image
                src="/images/body-1.png"
                alt="X"
                width={500}
                height={500}
                priority
                color='white'
                className={styles.bg}
              />
            </div>
            <div className={styles.panel_border}></div>
            <div className={styles.panel_text}>
              <h2 className={anton.className}>The Art</h2>
              <p>KNS is a groundbreaking experiment that fuses cutting-edge AI technology with the dynamic, modern manga style of our artist, MIDORIMAE, unlocking a new level of creativity and pushing artistic boundaries like never before!</p>
            </div>
          </div>
        </div>

        <div className={styles.panel}>
          <div className={styles.founder}>
            <div className={styles.panel_img}>
              <Image
                src="/images/body-3.png"
                alt="X"
                width={500}
                height={500}
                priority
                color='white'
                className={styles.bg}
              />
            </div>
            <div className={styles.panel_border}></div>
            <div className={styles.panel_text}>
              <h2 className={anton.className}>Founder</h2>
              <div className={styles.founder_detail}>
                <Image
                  className={styles.hero_girl}
                  src="/images/founder.png"
                  alt="girl"
                  width={60}
                  height={60}
                  priority
                />
                <div>
                  <b>OhMeOhMy</b> <br />
                  <Image
                    src="/svg/x.svg"
                    alt="X"
                    width={25}
                    height={25}
                    priority
                    color='white'
                  />
                </div>
              </div>
              <ul>
                <li>Kyzzen, Founder & CEO</li>
                <li>MonkeDAO, Singapore Ambassador</li>
                <li>Solarians RoboDAO, Council Advisor</li>
                <li>Superteam, Singapore Member</li>
              </ul>
            </div>
          </div>
          <div className={styles.utility}>
            <div className={styles.panel_img}>
              <Image
                src="/images/body-4.png"
                alt="X"
                width={500}
                height={500}
                priority
                color='white'
                className={styles.bg}
              />
            </div>
            <div className={styles.panel_border}></div>
            <div className={styles.panel_text}>
              <h2 className={anton.className}>Utility</h2>
              <ul>
                <li>Premium Access to Kyzzen Platform & Tools</li>
                <li>Access to Kyzzen AI Art Tools</li>
                <li>Premium Quality Merch</li>
                <li>IRL Events</li>
                <li>Exclusive Presales & Whitelists</li>
                <li>Exclusive Deals & Discounts</li>
              </ul>
            </div>
          </div>
        </div>
        <div className={styles.launch}>
          <div className={styles.panel_text}>
            <h2 className={anton.className}>Launch Details</h2>
            <ul>
              <li><b>Date</b>&nbsp; TBD</li>
              <li><b>Supply</b>&nbsp; 5,000</li>
              <li><b>Price</b>&nbsp; TBD</li>
            </ul>
            <button>Learn More</button>
          </div>
        </div>
      </main>
    </div>
  );
}


