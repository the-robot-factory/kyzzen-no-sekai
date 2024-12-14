import React from 'react'
import Image from "next/image";
import styles from "./header.module.css";


function Header() {
    return (
        <div className={styles.header}>
            <div className={styles.header_logo}>
                <Image
                    src="/svg/logo.svg"
                    alt="Kyzzen Logo"
                    width={180}
                    height={38}
                    priority
                />
            </div>
            <div className={styles.header_nav}>
                <ul>
                    <li>Home</li>
                    <li>Launch</li>
                    <li>Whitelist</li>
                    <li>Partners</li>
                    <li>Network</li>
                </ul>
            </div>
            <div className={styles.header_action}>
                <Image
                    src="/svg/x.svg"
                    alt="X"
                    width={25}
                    height={25}
                    priority
                />
                <Image
                    src="/svg/discord.svg"
                    alt="Discord"
                    width={25}
                    height={25}
                    priority
                />
            </div>
        </div>
    )
}

export default Header