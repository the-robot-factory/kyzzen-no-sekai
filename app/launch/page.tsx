'use client';
import React, {useState} from 'react';
import Image from 'next/image';
import styles from './page.module.css';
import Modal from '@/components/modal/modal';

const Launch: React.FC = () => {
  const [modals, setModals] = useState({
    launch: false,
    bidding: false,
    benefit: false,
  });
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>KNS LAUNCH DETAILS</h1>

        <div className={styles.details}>
          <div className={styles.detail}>
            <div className={`${styles.icon}`}>
              <Image src="/images/Featured icon.png" alt="girl" width={35} height={35} priority />
            </div>
            <h3 className={styles.label}>Date</h3>
            <p className={styles.value}>TBD</p>
          </div>
          <div className={styles.detail}>
            <div className={`${styles.icon}`}>
              <Image src="/images/Featured icon (1).png" alt="girl" width={35} height={35} priority />
            </div>
            <h3 className={styles.label}>Supply</h3>
            <p className={styles.value}>5,000</p>
          </div>
          <div className={styles.detail}>
            <div className={`${styles.icon}`}>
              <Image src="/images/Featured icon (2).png" alt="girl" width={35} height={35} priority />
            </div>
            <h3 className={styles.label}>Starting Minimum Bid Price</h3>
            <p className={styles.value}>0.40</p>
          </div>
          <div className={styles.detail}>
            <div className={`${styles.icon}`}>
              <Image src="/images/Featured icon (2).png" alt="girl" width={35} height={35} priority />
            </div>
            <h3 className={styles.label}>Whitelist Supply</h3>
            <p className={styles.value}>2000</p>
          </div>
          <div className={styles.detail}>
            <div className={`${styles.icon}`}>
              <Image src="/images/Featured icon (2).png" alt="girl" width={35} height={35} priority />
            </div>
            <h3 className={styles.label}>Whitelist Price</h3>
            <p className={styles.value}>3,000th highest bid price in Public Bid Phase</p>
          </div>
        </div>

        <div className={styles.info}>
          <h3>More Information</h3>
          <ul>
            <li>
              Kyzzen no Sekai will be using a very unique auction-style launch mechanism created by our partners at BidHub for our
              launch. <span onClick={() => setModals({...modals, launch: true})}>Show More</span>
            </li>
            <li>
              Details on Bidding: <span onClick={() => setModals({...modals, bidding: true})}>View</span>
            </li>
            <li>
              Benefits of BidHub&apos;s Launch Mechanism: <span onClick={() => setModals({...modals, benefit: true})}>View</span>
            </li>
          </ul>
        </div>
        <Modal show={modals.launch} heading="LAUNCH DETAILS" hide={() => setModals({...modals, launch: false})}>
          <div className={styles.info_list}>
            <ul>
              <li>
                The launch will first kick off with a Public Bidding Phase (&quot;PBP&quot;) with a starting min bid price of 0.40
                SOL:
                <ul>
                  <li>PBP will be open for 2 hours.</li>
                  <li>
                    The top 3,000 bids will be guaranteed an NFT each, while the 3,001-5,000th highest bids will be considered
                    &quot;At Risk&quot; of being removed from qualification during the subsequent whitelist phases
                  </li>
                </ul>
              </li>
              <li>
                Whitelist Phase 1 (&quot;WP1&quot;) will begin 15min after PBP so that all information can be finalized and
                communicated to whitelist holders:
                <ul>
                  <li>WP1 will last for 45min.</li>
                  <li>Whitelisted users can purchase an NFT at the 3,000th highest bid price of PBP.</li>
                  <li>
                    With each Whitelist user that makes a purchase, the lowest &quot;At Risk&quot; bidder will be removed from
                    qualification. For instance, the 5,000th highest bid in PBP will be removed from qualification when the 1st
                    whitelist spot is purchased, the 4,999th highest bid will be removed when the 2nd whitelist spot is purchased,
                    etc.
                  </li>
                </ul>
              </li>
              <li>
                Whitelist Phase 2 (“WP2”) will begin 15min after WP1, will last for 45min and have the same purchase price as WP1
                (i.e. the 3000th highest bid in PBP).
              </li>
              <li>
                Distribution of the NFTs to the finalized qualified bids will commence one hour after WP2 ends. Depending on
                Solana&apos;s network traffic, distribution could take an hour - we appreciate your kind patience during this
                phase.
              </li>
            </ul>
          </div>
        </Modal>
        <Modal show={modals.bidding} heading="DETAILS ON BIDDING:" hide={() => setModals({...modals, bidding: false})}>
          <div className={styles.info_list}>
            <ul>
              <li>
                Once you have connected your wallet on the bidding page, you can review the latest details of the public bidding
                phase, including the time remaining and minimum viable bid.
              </li>
            </ul>
            <Image src="/images/DOG.png" alt="dog" width={962} height={702.85} priority />
            <ul>
              <li>
                You can then indicate your bid price (must be higher than the minimum viable bid amount) and the quantity of bids
                you would like to place, then review and submit your bids accordingly.
              </li>
            </ul>
            <Image src="/images/bid.png" alt="dog" width={962} height={402} priority />
            <ul>
              <li>There is a bidding fee of 0.002 SOL per bid submitted, which is paid to BidHub as their launch service fee.</li>
              <li>
                You can see your number of &quot;Active Bids&quot; once you have placed at least one bid. You can open the
                dropdown to see details of each bid.
              </li>
              <li>
                If one of your bids was outbidded (meaning it fell below the 5,000th highest bid during PBP), it will be updated
                as &quot;Refunded&quot; and the bid amount will be returned to your wallet immediately, so you can use that amount
                in your next bid.
              </li>
              <li>
                In the event of multiple bids at the exact same amount, they will be ranked based on how early each bid was
                submitted.
              </li>
              <li>If one of your bids was removed during the Whitelist phase, you will be refunded immediately as well.</li>
              <li>
                You have won if you have &quot;Active Bids&quot; when both the Public Bidding Phase and Whitelist Phase are
                completed and finalized. Finalization may take a few minutes after the Whitelist Phase completes.
              </li>
            </ul>
            <Image src="/images/DOG.png" alt="dog" width={962} height={702.85} priority />
            <ul>
              <li>You can watch this video by BidHub for more details on the bidding and refunding process.</li>
            </ul>
          </div>
        </Modal>
        <Modal
          show={modals.benefit}
          heading="Benefits of BidHub's Launch Mechanism"
          hide={() => setModals({...modals, benefit: false})}
        >
          <div className={styles.info_list}>
            <ul>
              <li>
                Minters: the opportunity to mint at a significantly lower price.
                <ul>
                  <li>
                    An auction-style launch allows Kyzzen no Sekai to set a significantly lower minimum bidding price than it
                    would have set on a typical fixed-price launch on a popular launchpad that would have charged higher fees
                    (that would&apos;ve further increased the mint price).
                  </li>
                </ul>
              </li>
              <li>
                Whitelisted Users: the option of last decision with all the information, ability to mint at below-average price,
                and no upfront risk.
                <ul>
                  <li>
                    In a typical NFT launch, whitelisted users typically mint before the public phase, and hence bear all the risk
                    upfront; if the public mint fails, they risk losing a lot of value. With BidHub&apos;s launch mechanism,
                    Whitelisted Users get to wait till the public bidding phase is completed, have a clear understanding of the
                    demand for the project, know the exact price it will cost them to mint (which in KNS&apos; launch it will be
                    below the average bid price at the 3000th highest price), and have the final decision to decide if they want
                    to mint at that price.
                  </li>
                </ul>
              </li>
              <li>
                KNS: the ability to get a fair valuation for their project, with a mint price purely dictated by market demand and
                collection supply.
                <ul>
                  <li>
                    The auction style and bidding fee of 0.002 SOL also significantly disincentivizes bots from participating in
                    the launch as it will be incredibly expensive for them to continuously outbid each other throughout the 2
                    hours of the public bidding phase.
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Launch;
