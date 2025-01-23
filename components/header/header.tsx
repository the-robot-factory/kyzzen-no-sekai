'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from './header.module.css';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

function Header() {
  const [toggle, setToggle] = useState(false);

  const pathname = usePathname();

  const updateScreenSize = () => {
    setToggle(window.innerWidth > 600 ? true : false);
  };

  useEffect(() => {
    updateScreenSize();
    window.addEventListener('resize', updateScreenSize);
    return () => window.removeEventListener('resize', updateScreenSize);
  }, []);

  return (
    <div className={styles.header_con}>
    <div className={styles.con}>
    <div className={styles.header}>
        <div className={styles.header_top}>
          <div className={styles.header_logo}>
            <Link href="/">
              <Image src="/svg/logo.png" alt="Kyzzen Logo" width={151.22} height={45} priority />
            </Link>
          </div>
          <button className={styles.header_menu} onClick={() => setToggle(current => !current)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
        </div>

        {toggle && (
          <>
            <div className={styles.header_nav}>
              <ul>
                <li>Launch</li>
                <li>
                  <Link href="/whitelist" passHref>
                    <span className={pathname === '/whitelist' ? styles.active : ''}>Whitelist</span>
                  </Link>
                </li>
                <li>
                  <Link href="/partners" passHref>
                    <span className={pathname === '/partners' ? styles.active : ''}>Partners</span>
                  </Link>
                </li>
                <li>
                  <Link href="/network" passHref>
                    <span className={pathname === '/network' ? styles.active : ''}>Network</span>
                  </Link>
                </li>
              </ul>
            </div>
            <div className={styles.header_action}>
              <span>Join Us</span>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M4.03901 5L10.2164 12.7218L4 19H5.39907L10.8415 13.5034L15.2389 19H20L13.475 10.8438L19.2612 5H17.8621L12.8499 10.0623L8.8001 5H4.03901ZM6.09644 5.96344H8.2837L17.9422 18.0364H15.755L6.09644 5.96344Z"
                  fill="currentColor"
                />
              </svg>

              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M6.40637 16.2088C10.7559 17.9407 14.4573 18.2781 18.6518 15.5823C18.6211 15.6294 17.7914 16.8836 15.6094 17.5263C16.0704 18.1691 16.7004 18.9059 16.7004 18.9059C18.0987 18.9059 19.4662 18.4983 20.6493 17.7144C21.5712 17.0873 22.0936 16.0056 21.9861 14.8768C21.8017 12.9485 21.3561 11.0672 20.6647 9.26432C19.7888 6.91271 17.6838 5.28223 15.2407 5.04705C15.0256 5.03137 14.8719 5.03137 14.7797 5.03137L14.5339 5.28219C17.3458 6.09743 18.744 7.36729 18.7747 7.41435C14.457 5.18812 9.35573 5.1568 5.00728 7.32029C5.00728 7.32029 6.39018 5.92499 9.44788 5.18812L9.2635 5C8.94081 5 8.63349 5.03137 8.31085 5.07838C6.05212 5.47031 4.16219 7.05374 3.34781 9.23291C2.64098 11.1142 2.18003 13.0896 2.01103 15.0963C1.91883 16.1623 2.41053 17.2128 3.27099 17.8242C4.40802 18.5924 5.76017 19 7.1277 19C7.1277 19 7.68084 18.2631 8.23403 17.6047C6.15968 16.9776 5.31459 15.7234 5.29922 15.6764L5.68961 15.8797C5.92298 16.0014 6.16224 16.1116 6.40637 16.2088ZM8.81792 14.8455C7.81915 14.8141 7.03551 13.9519 7.06626 12.9171C7.097 11.9451 7.86527 11.1613 8.81792 11.1299C9.81668 11.1613 10.6003 12.0235 10.5696 13.0582C10.5235 14.0303 9.77057 14.8141 8.81792 14.8455ZM15.087 14.8455C14.0882 14.8141 13.3046 13.9519 13.3353 12.9171C13.3661 11.9451 14.1343 11.1613 15.087 11.1299C16.0858 11.1613 16.8694 12.0235 16.8387 13.0582C16.808 14.0303 16.0396 14.8141 15.087 14.8455Z"
                  fill="currentColor"
                />
              </svg>
            </div>
          </>
        )}
      </div>
      </div>
    </div>

  );
}

export default Header;
