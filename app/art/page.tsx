'use client';
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
          <h2>OUR ART</h2>
        </div>
      </section>
      <section className={`${styles.panel}`}>
        <div className={styles.panel_img}>
          <Image src="/images/fighter.svg" alt="chats" fill priority />
        </div>
        <div className={styles.panel_text}>
          <h2>1. Art vs AI</h2>
          <p>
            NFTs were meant to empower artists - but now, AI-generated collections are flooding the space, making it harder for
            real artists to stand out.
          </p>

          <p>This shift has sparked a growing divide between human creators and machine output.</p>

          <p>But what if AI wasn’t the enemy, but a tool for artists instead?</p>
        </div>
      </section>
      <section className={`${styles.panel} ${styles.reverse}`}>
        <div className={styles.panel_img}>
          <Image src="/images/art-cross.png" alt="chats" fill priority />
        </div>
        <div className={styles.panel_text}>
          <h2>
            <span>2.</span> Limitations of Traditional NFT Collections
          </h2>
          <p>
            Most NFT collections are generating using a layer-based system, where each trait (e.g. hair, clothes, etc.) are drawn
            as separate image files and then layered on top of each other.
          </p>
          <p>This results in 2 major restrictions:</p>
          <ul>
            <li>
              <strong>Limited variation.</strong> E.g., the same T-shirt cannot be layered onto a buff guy and a skinny guy
              naturally.
            </li>
            <li>
              <strong>Restricted detailing.</strong> E.g., the shadow created from an afro hairstyle will be different from the
              shadow from a ponytail.
            </li>
          </ul>
          <p>We decided to use AI to help an artist solve for these 2 painpoints.</p>
        </div>
      </section>
      <section className={`${styles.panel}`}>
        <div className={styles.panel_img}>
          <Image src="/images/art-check.png" alt="chats" fill priority />
        </div>
        <div className={styles.panel_text}>
          <h2>
            <span>3.</span> Our Approach: Artist-Led, AI-Powered
          </h2>
          <p>
            We trained a model on the traits and completed work that were entirely drawn by a single artist, specifically for this
            new collection.
          </p>
          <p>Through iterative prompts and careful curation, the artist&apos;s hand shaped every output.</p>
          <p>
            AI helped us explore countless possibilities, capture unique scenarios, and reach a level of detail no single artist
            could achieve alone in a reasonable timeframe.
          </p>
        </div>
      </section>
      <section className={`${styles.panel} ${styles.single}`}>
        <div className={styles.panel_text}>
          <h2>4. The Result</h2>
          <p>
            A generative NFT collection with unparalleled diversity and rich visual storytelling, every piece a true collaboration
            between human creativity and machine precision.
          </p>
        </div>
        <div className={styles.panel_img}>
          <Image src="/images/together.svg" alt="chats" fill priority />
        </div>
        <br/><br/><br/>
      </section> 
    </main>
  );
}

export default Utility;
