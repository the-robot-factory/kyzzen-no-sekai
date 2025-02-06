import React from "react";
import styles from "./page.module.css";

const WhitelistRegistration: React.FC = () => {
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <h1 className={styles.title}>WHITELIST REGISTRATION</h1>
                <p className={styles.subtitle}>
                    Sign in / setup your Kyzzen profile to register for the whitelist or to view qualification status.
                </p>
                <div className={styles.buttons}>
                    <button className={styles.setupButton}>Set Up Kyzzen Profile</button>
                    <button className={styles.signInButton}>Sign In to Kyzzen Profile</button>
                </div>
            </div>
        </div>
    );
};

export default WhitelistRegistration;
