import React from 'react';
import styles from './page.module.css';

const WhitelistSkeleton: React.FC = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>WHITELIST REGISTRATION</h1>

      {/* Profile Section */}
      <div className={styles.profile_card}>
        <div className={styles.profile_info}>
          <div className={styles.avatar_loader}></div>
          <div className={styles.text_loader}></div>
        </div>
      </div>

      {/* Registration Status */}
      <div className={styles.registration_status}>
        <span>Registration Status:</span>
        <div className={styles.text_loader}></div>
      </div>

      {/* Connections */}
      <div className={styles.section}>
        <div className={styles.section_header}>
          <h2>Connections</h2>
        </div>
        {[...Array(5)].map((_, index) => (
          <div key={index} className={styles.connection_row}>
            <div className={styles.icon_loader}></div>
            <div className={styles.text_loader}></div>
            <div className={styles.text_loader}></div>
          </div>
        ))}
      </div>

      {/* Wallets */}
      <div className={styles.section}>
        <div className={styles.section_header}>
          <h2>Your Linked Wallets</h2>
        </div>
        {[...Array(5)].map((_, index) => (
          <div key={index} className={styles.connection_row}>
            <div className={styles.icon_loader}></div>
            <div className={styles.text_loader}></div>
            <div className={styles.text_loader}></div>
          </div>
        ))}
      </div>

      <div className={styles.network}>
        <p className={styles.network_text}>You qualify under 5 out of 40 whitelist partner community raffles.</p>
        <PartnerSkeleton />
      </div>
    </div>
  );
};

export default WhitelistSkeleton;

export const PartnerSkeleton = () => {
  return (
    <div className={styles.grid_section}>
      {Array.from({length: 10}, (_, idx) => (
        <div key={idx} className={styles.member_card}>
          <div className={styles.avatar_placeholder}></div>
          <div className={styles.member_details}>
            <div className={styles.text_loader}></div>
            <div className={styles.text_loader}></div>
          </div>
        </div>
      ))}
    </div>
  );
};
