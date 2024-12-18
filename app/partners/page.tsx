import React from "react";
import styles from "./page.module.css";
import Image from 'next/image';
import { Anton } from "next/font/google";

const networkMembers = [
    { name: "JemmyJemm", role: "MonkeDAO Co-Founder", avatar: ' ' },
    { name: "CryptoApe", role: "MultiChain Advisors, Founder", avatar: ' ' },
    { name: "PapiChuloGrim", role: "MultiChain Advisors CMO", avatar: ' ' },
    { name: "Zeneca", role: "Zen Academy Founder", avatar: ' ' },
    { name: "Genuine Articles", role: "GeckoDAO Founder", avatar: ' ' },
    { name: "Voshy", role: "GREED Academy Founder", avatar: ' ' },
    { name: "unjustmouse", role: "GREED Academy Head of Education", avatar: ' ' },
    { name: "Turnt Up Dylan", role: "Dead King Society Founder", avatar: ' ' },
    { name: "draxx.ts.sol", role: "Famous Fox Federation Co-Founder", avatar: ' ' },
    { name: "HoTsAuCe", role: "NFT Radar Community Manager", avatar: ' ' },
    { name: "Nom", role: "Bonk Co-Founder", avatar: ' ' },
    { name: "Kais", role: "Okay Bears Founder", avatar: ' ' },
    { name: "Easy", role: "BoDoggos Founder", avatar: ' ' },
    { name: "Solarians", role: "RoboDAO Council Member", avatar: ' ' },
    { name: "NFP", role: "Pesky Penguins Co-Founder", avatar: ' ' },
    { name: "Solana Sensei", role: "Sensei / Namaste Founder", avatar: ' ' },
    { name: "Timon", role: "Meerkat Millionaires Founder", avatar: ' ' },
    { name: "DogeFather", role: "Doge Capital Founder", avatar: ' ' },
    { name: "DJ Trix", role: "Fearless Bulls Club Founder", avatar: ' ' },
    { name: "SOK", role: "Raposa Founder", avatar: ' ' },
];
const anton = Anton({
    subsets: ['latin'],
    weight: '400',
});
const Network = () => {




    return (
        <div className={styles.network_container}>
            {/* Header */}
            <section className={styles.header_section}>
                <h1 className={styles.title + ' ' + anton.className}>Whitelist Partners</h1>
                <p className={styles.description}>
                    1,500 whitelist spots are allocated to the following 52 partner communities:
                </p>
            </section>

            {/* Grid Section */}
            <section className={styles.grid_section}>
                {networkMembers.concat(networkMembers,networkMembers).map((member, index) => (
                    <div key={index} className={styles.member_card}>
                        {member.avatar ? (
                            <Image className={styles.avatar} src="/images/founder.png" alt="girl" width={70} height={70} priority />
                        ) : (
                            <div className={styles.avatar_placeholder}></div>
                        )}
                    </div>
                ))}
            </section>
        </div>
    );
};

export default Network;
