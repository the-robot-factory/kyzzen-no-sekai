/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import Table from '@/components/table/table';
import styles from './page.module.css';
import Image from 'next/image';
import { SOCIAL_PROVIDERS } from '@/types/enums';
import { useMemo } from 'react';
import { SOCIALS } from '@/types/types';
import { screens } from '@/constants/screen';
import Tooltip from '@/components/tooltip/tooltip';
import Link from 'next/link';
import { useUser } from '@/context/user';
import { useFetchProfile } from '@/api/profile';

const WhitelistProfile = () => {
  const { userSession } = useUser();

  const { data, isFetching }: any = useFetchProfile(userSession?.id ?? '');

  const profile = useMemo(() => {
    return data?.profile?.nodes[0];
  }, [data]);

  const networkMembers = [
    { name: 'JemmyJemm', role: 'MonkeDAO Co-Founder', avatar: ' ' },
    { name: 'CryptoApe', role: 'MultiChain Advisors, Founder', avatar: ' ' },
    { name: 'PapiChuloGrim', role: 'MultiChain Advisors CMO', avatar: ' ' },
    { name: 'Zeneca', role: 'Zen Academy Founder', avatar: ' ' },
    { name: 'Genuine Articles', role: 'GeckoDAO Founder', avatar: ' ' },
    { name: 'Voshy', role: 'GREED Academy Founder', avatar: ' ' },
    { name: 'unjustmouse', role: 'GREED Academy Head of Education', avatar: ' ' },
    { name: 'Turnt Up Dylan', role: 'Dead King Society Founder', avatar: ' ' },
    { name: 'draxx.ts.sol', role: 'Famous Fox Federation Co-Founder', avatar: ' ' },
    { name: 'HoTsAuCe', role: 'NFT Radar Community Manager', avatar: ' ' },
    { name: 'Nom', role: 'Bonk Co-Founder', avatar: ' ' },
    { name: 'Kais', role: 'Okay Bears Founder', avatar: ' ' },
    { name: 'Easy', role: 'BoDoggos Founder', avatar: ' ' },
    { name: 'Solarians', role: 'RoboDAO Council Member', avatar: ' ' },
    { name: 'NFP', role: 'Pesky Penguins Co-Founder', avatar: ' ' },
    { name: 'Solana Sensei', role: 'Sensei / Namaste Founder', avatar: ' ' },
    { name: 'Timon', role: 'Meerkat Millionaires Founder', avatar: ' ' },
    { name: 'DogeFather', role: 'Doge Capital Founder', avatar: ' ' },
    { name: 'DJ Trix', role: 'Fearless Bulls Club Founder', avatar: ' ' },
    { name: 'SOK', role: 'Raposa Founder', avatar: ' ' },
  ];

  const socials: SOCIALS[] = [
    {
      id: SOCIAL_PROVIDERS.Mail,
      icon: '/svg/mail.svg',
      account: 'Email',
      linkedAccount: profile?.email,
      status: profile?.emailVerified,
      action: <>Not subscribed to Kyzzen Newsletter yet. <a href="" className={styles.link_action}>Subscribe here</a></>,
    },
    {
      id: SOCIAL_PROVIDERS.X,
      account: 'Twitter (X)',
      icon: '/svg/x.svg',
      linkedAccount: profile?.twitterUsername,
      status: profile?.discordVerified,
      action: <>Not following Kyzzen yet.  <a href="" className={styles.link_action}>Follow Here</a></>,
    },
    {
      id: SOCIAL_PROVIDERS.Discord,
      account: 'Discord',
      icon: '/svg/discord.svg',
      linkedAccount: profile?.discordUsername,
      status: profile?.discordVerified,
      action: <>Haven&apos;t joined discord server yet.  <a href="" className={styles.link_action}>Join here</a></>,
    },
    {
      id: SOCIAL_PROVIDERS.Telegram,
      account: 'Telegram',
      icon: '/svg/telegram.svg',
      linkedAccount: profile?.telegramUsername,
      status: profile?.telegramVerified,
      action: <>Not using Kyzzen’s Telegram Bot yet. <a href="" className={styles.link_action}>Try it out here.</a></>,
    },
    {
      id: SOCIAL_PROVIDERS.YouTube,
      account: 'YouTube',
      icon: '/svg/youtube.svg',
      linkedAccount: profile?.youtubeUsername,
      status: profile?.youtubeVerified,
      action: <>Not following Kyzzen yet.  <a href="" className={styles.link_action}>Follow here</a></>,
    },
  ];

  if (!isFetching && data) {
    return (
      <div className={styles.container}>
        <h1 className={styles.heading}>WHITELIST REGISTRATION</h1>

        {/* Profile Section */}
        <div className={styles.profile_card}>
          <div className={styles.profile_info}>
            <Image
              className={styles.profile_image}
              src={profile?.bannerURL ?? '/images/founder.png'}
              alt="girl"
              width={65}
              height={65}
              priority
            />
            <span className={styles.username}>{profile?.username}</span>
          </div>
        </div>

        {/* Registration Status */}
        <div className={styles.registration_status}>
          <span>
            Registration Status: <span className={styles.not_registered}> Not Registered</span>
          </span>
          <button className={styles.register_button}>Register for Whitelist</button>
        </div>

        {/* Connections */}
        <div className={styles.section}>
          <div className={styles.section_header}>
            <h2>
              Connections
              <Tooltip placement={window.innerWidth < screens.mobile.max ? 'bottom-start' : 'right'} text="hello world">
                <Image src="/svg/tooltip.svg" alt="info" width={20} height={20} />
              </Tooltip>
            </h2>
            <button className={styles.wallet_button}>Link / Unlink Connections</button>
          </div>
          <Table
            header={[{ name: 'Account' }, { name: 'Linked Account' }, { name: 'Status' }]}
            body={socials}
            isRow
            Row={SocialRow}
            style={{ margin: '0 auto', height: 'fit-content' }}
            className={styles.connection_table}
          />
        </div>

        {/* Wallets */}
        <div className={styles.section}>
          <div className={styles.section_header}>
            <h2>
              Your Linked Wallets
              <Tooltip placement={window.innerWidth < screens.mobile.max ? 'bottom-start' : 'right'} text="hello world">
                <Image src="/svg/tooltip.svg" alt="info" width={20} height={20} />
              </Tooltip>
            </h2>
            <button className={styles.wallet_button}>Add / Unlink Wallets</button>
          </div>
          <Table
            header={[{ name: 'Network' }, { name: 'Address' }, { name: '' }]}
            body={profile?.wallets}
            isRow
            Row={WalletRow}
            style={{ margin: '0 auto', height: 'fit-content' }}
            className={styles.connection_table}
          />
        </div>

        {/* Qualification */}
        <div className={styles.section}>
          <div className={styles.section_header}>
            <h2>Qualification</h2>
          </div>
          <section className={styles.network_section}>
            <div className={styles.network_header}>
              <div className={styles.network_tooltip}>
                Whitelist Leaderboard
                <Tooltip placement={window.innerWidth < screens.mobile.max ? 'bottom-start' : 'right'} text="hello world">
                  <Image src="/svg/tooltip.svg" alt="info" width={20} height={20} />
                </Tooltip>
              </div>
              <Link href="/whitelist">View point system</Link>
            </div>
            <div className={styles.network}>
              <p className={styles.network_text}>Rank = 302.</p>
              <p className={styles.network_text}>Points = 20,302.</p>
            </div>
          </section>
        </div>

        <section className={styles.network_section}>
          <div className={styles.network_header}>
            <div className={styles.network_tooltip}>
              Whitelist Partner Communities
              <Tooltip placement={window.innerWidth < screens.mobile.max ? 'bottom-start' : 'right'} text="hello world">
                <Image src="/svg/tooltip.svg" alt="info" width={20} height={20} />
              </Tooltip>
            </div>
            <Link href="/whitelist">View whitelist partner communities</Link>
          </div>
          <div className={styles.network}>
            <p className={styles.network_text}>You qualify under 5 out of 40 whitelist partner community allocations.</p>
            <div className={styles.grid_section}>
              {networkMembers.map((member, index) => (
                <div key={index} className={styles.member_card}>
                  {member.avatar ? (
                    <Image className={styles.avatar} src="/images/founder.png" alt="girl" width={65} height={65} priority />
                  ) : (
                    <div className={styles.avatar_placeholder}></div>
                  )}
                  <div className={styles.member_details}>
                    <h3 className={styles.member_name}>{member.name}</h3>
                    <p className={styles.member_role}>50 spots</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    );
  } else {
    return (
      <div>
        <h2>Loading Profile</h2>
      </div>
    );
  }
};

export default WhitelistProfile;

const SocialRow = ({ data }: { data: SOCIALS }) => {
  return (
    <tr className={styles.row}>
      <td>
        <div>
          <Image src={data?.icon} alt="social" width={20} height={20} />
          {data?.account}
        </div>
      </td>
      <td>{data.linkedAccount ? data?.linkedAccount : <span className={styles.not_linked}>No account linked</span>}</td>
      <td>{data.status ? <span className={styles.joined}>Joined {data.account}</span> : data.action}</td>
    </tr>
  );
};

const WalletRow = ({ data }: { data: string }) => {
  const isPrimary = (addr: string) => {
    return addr.includes('primary:');
  };
  return (
    <tr className={styles.row}>
      <td>
        <div>
          {isPrimary(data) ? (
            <Image src="/svg/star-fill.svg" alt="star" width={20} height={20} />
          ) : (
            <Image src="/svg/star-stroke.svg" alt="star" width={20} height={20} />
          )}
          <Image src="/svg/sol-spl.svg" alt="sol" width={20} height={20} />
        </div>
      </td>
      <td>{data?.replace('primary:', '')}</td>
      <td></td>
    </tr>
  );
};
